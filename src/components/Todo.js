import { useEffect, useState } from 'react';
import Airtable from 'airtable';
import { Box, Spinner, Button, Heading } from 'grommet';
import TodoGroup from './TodoGroup';
import { Update } from 'grommet-icons';

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

    const fetchData = async () => {
        setIsFetching(true);
        setEntries({});
        base('TodoPoints').select().firstPage(callbackResponse);
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <Box
            pad="medium"
            border={{
                color: isFetching ? 'control' : 'dark-1',
                size: 'large'
            }}
            width="50vw"
            round
        >
            {isFetching && (
                <Box
                    pad="medium"
                    width="100%"
                    height="100%"
                    align="center"
                    justify="center"
                >
                    <Spinner color="control" size="large" />
                </Box>
            )}
            {!isFetching && (
                <Box
                    direction="row"
                    justify="between"
                    align="center"
                    border={[{ color: 'dark-2', side: 'bottom' }]}
                >
                    <Heading size="small">Todo</Heading>
                    <Box>
                        <Button primary icon={<Update />} onClick={fetchData} />
                    </Box>
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
