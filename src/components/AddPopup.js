import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Layer,
    Select,
    TextInput
} from 'grommet';
import { useState } from 'react';

const AddPopup = ({ showAddPopup, setShowAddPopup, categories, addEntry }) => {
    const [contentInput, setContentInput] = useState('');
    const [categoryInput, setCategoryInput] = useState(categories[0] || '');
    const [othersInput, setOthersInput] = useState('');

    const handleSubmit = () => {
        const isOthers = categoryInput === '_others';
        const category = isOthers ? othersInput : categoryInput;

        if (contentInput === '' || category === '') return;

        addEntry(contentInput, category);
        setContentInput('');
        setCategoryInput('');
        setOthersInput('');
        setShowAddPopup(false);
    };

    if (!showAddPopup) return null;
    return (
        <Layer
            onEsc={() => setShowAddPopup(false)}
            onClickOutside={() => setShowAddPopup(false)}
        >
            <Card width="medium" background="light-1">
                <CardHeader
                    pad="medium"
                    border={[{ side: 'bottom', color: 'light-4' }]}
                >
                    Add a new Todo entry
                </CardHeader>
                <CardBody pad="medium" direction="column" gap="16px">
                    <TextInput
                        placeholder="what to do"
                        value={contentInput}
                        onChange={(e) => setContentInput(e.target.value)}
                    />
                    <Select
                        options={[...categories, '_others']}
                        value={categoryInput}
                        onChange={({ option }) => setCategoryInput(option)}
                    />
                    {categoryInput === '_others' && (
                        <TextInput
                            placeholder="new category name"
                            value={othersInput}
                            onChange={(e) => setOthersInput(e.target.value)}
                        />
                    )}
                    <Button primary label="Add" onClick={handleSubmit} />
                </CardBody>
            </Card>
        </Layer>
    );
};

export default AddPopup;
