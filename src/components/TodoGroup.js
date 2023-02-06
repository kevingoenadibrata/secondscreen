import { Box, Heading, CheckBox } from 'grommet';

const TodoGroup = ({ title, entries, handleCheck }) => {
    return (
        <Box>
            <Heading size="small">{title}</Heading>
            {entries.map((item) => (
                <CheckBox
                    pad="8px"
                    checked={item.isChecked}
                    label={item.content}
                    onChange={(event) =>
                        handleCheck(title, item.id, event.target.checked)
                    }
                    style={{ textDecoration: 'line-through' }}
                />
            ))}
        </Box>
    );
};

export default TodoGroup;
