import './App.css';
import Todo from './components/Todo';
import Clock from 'react-live-clock';
import { Grommet, Box, grommet, Page, Text } from 'grommet';
import { deepMerge } from 'grommet/utils';

function App() {
    const theme = deepMerge(grommet, {
        global: {
            font: {
                family: 'Space Mono',
                size: '18px',
                height: '20px'
            }
        },
        checkBox: {
            size: '32px'
        },
        box: {
            extend: 'transition-duration: 1000ms'
        }
    });

    return (
        <Grommet theme={theme} full themeMode="dark">
            <Page
                pad="medium"
                direction="row"
                justify="between"
                fill="horizontal"
                height="100vh"
            >
                <Box pad="large" gap="32px">
                    <Text size="xxlarge">Hi, Kevin Go</Text>
                    <Clock
                        format={'HH:mm:ss A'}
                        ticking={true}
                        className="clock"
                    />
                </Box>
                <Todo />
            </Page>
        </Grommet>
    );
}

export default App;
