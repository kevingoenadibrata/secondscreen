import { Box, Heading, CheckBox } from 'grommet';

const TodoGroup = ({ title, entries, handleCheck }) => {
    return (
        <Box margin={{ bottom: '32px' }}>
            <Heading size="24px" style={{ letterSpacing: '-1px' }}>
                {title}
            </Heading>
            <Box gap="16px">
                {entries.map((item) => (
                    <Box>
                        <CheckBox
                            checked={item.isChecked}
                            label={item.content}
                            onChange={(event) =>
                                handleCheck(
                                    title,
                                    item.id,
                                    event.target.checked
                                )
                            }
                        />
                    </Box>
                ))}
            </Box>
        </Box>
    );
};

export default TodoGroup;
