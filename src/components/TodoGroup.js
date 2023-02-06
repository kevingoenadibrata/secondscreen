import { Box, Heading, CheckBox } from 'grommet';

const TodoGroup = ({ title, entries, handleCheck }) => {
    return (
        <Box margin={{ bottom: '32px' }}>
            <Heading size="24px" style={{ letterSpacing: '-1px' }}>
                {title}
            </Heading>
            <Box gap="16px">
                {entries.map((item) => (
                    <Box
                        style={{ opacity: item.isChecked ? 0.3 : 1 }}
                        direction="row"
                        align="center"
                        gap="8px"
                    >
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
