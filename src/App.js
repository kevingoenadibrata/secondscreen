import './App.css';
import Todo from './components/Todo';
import Clock from 'react-live-clock';
import { Grommet, Box, grommet, Page, Text, Grid } from 'grommet';
import { deepMerge } from 'grommet/utils';

function App() {
    const theme = deepMerge(grommet, {
        global: {
            font: {
                family: 'Space Mono'
            }
        },
        heading: {
            extend: 'letter-spacing: -2px'
        },
        text: {
            extend: 'letter-spacing: -2px'
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
            <Page pad="medium" width="100vw" direction="row" justify="between">
                <Box pad="large" gap="32px">
                    <Text size="xlarge">Hi, Kevin Go</Text>
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
