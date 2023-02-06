import { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { Box, Spinner } from 'grommet';
import TodoGroup from './TodoGroup';

const Todo = () => {
    const [entries, setEntries] = useState({});
    const [isFetching, setIsFetching] = useState(false);

    Airtable.configure({
        endpointUrl: 'https://api.airtable.com',
        apiKey: process.env.REACT_APP_AIRTABLE_API_KEY
    });

    const base = Airtable.base(process.env.REACT_APP_AIRTABLE_BASE);

    const callbackResponse = (err, rec) => {
        if (err || rec.length === 0) {
            console.error(err);
            return;
        }
        const processedRecs = rec.map((item) => ({
            ...item.fields,
            id: item.id
        }));

        const todo = {};

        console.log(processedRecs);

        for (let i = 0; i < processedRecs.length; i++) {
            const label = processedRecs[i].categoryLabel[0] || '';
            console.log(label);
            if (!todo[label]) {
                todo[label] = {
                    title: label,
                    entries: [processedRecs[i]]
                };
            } else {
                todo[label].entries.push(processedRecs[i]);
            }
        }

        setEntries(todo);
        setIsFetching(false);
    };

    const handleCheck = (label, id, isChecked) => {
        const masterTemp = { ...entries };
        const temp = entries[label].entries;

        for (let i = 0; i < temp.length; i++) {
            if (temp[i].id === id) {
                masterTemp[label].entries[i].isChecked = isChecked;
            }
        }

        setEntries(masterTemp);
        base('TodoPoints').update([{ id, fields: { isChecked } }]);
    };

    useEffect(() => {
        const fetchData = async () => {
            setIsFetching(true);
            base('TodoPoints').select().firstPage(callbackResponse);
        };
        fetchData();
    }, []);

    return (
        <Box
            pad="medium"
            border={{
                color: isFetching ? 'brand' : 'dark-1',
                size: isFetching ? 'xlarge' : 'medium'
            }}
            width="50vw"
            round
            direction="column"
        >
            {isFetching && (
                <Box
                    pad="medium"
                    width="100%"
                    height="100%"
                    align="center"
                    justify="center"
                >
                    <Spinner size="large" />
                </Box>
            )}
            {Object.values(entries).map((item) => (
                <TodoGroup
                    title={item.title}
                    entries={item.entries}
                    handleCheck={handleCheck}
                />
            ))}
        </Box>
    );
};

export default Todo;
