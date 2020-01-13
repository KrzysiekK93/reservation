import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Tabs, AppBar, Tab, Typography, Box, Button} from '@material-ui/core';
import Ticket from './ticket/Ticket';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    button: {
        margin: theme.spacing(1),
    },
}));

export default function Tickets(props) {
    const [value, setValue] = useState(0);
    const [data, setData] = useState();
    const [basketData, setBasketData] = useState([]);
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getValue(items) {
        if (basketData.length === 0) {
            setBasketData([{...items}])
        } else {
            basketData.map(el => {
                el.Movies.map(item => {
                    if (item.id == items.Movies[0].id) {
                        return item.value = items.Movies[0].value
                    } else {
                        setBasketData([{ ...basketData, ...items}])  
                    }
                })
            })
        }
    }

    useEffect(() => {
        setData(props.data);
    }, [data])

    
    function TabPanel(props) {
        const { children, value, index, ...other } = props;
        return (
            <Typography
                component="div"
                role="tabpanel"
                hidden={value !== index}
                id={`scrollable-auto-tabpanel-${index}`}
                aria-labelledby={`scrollable-auto-tab-${index}`}
                {...other}
            >
                <Box p={3}>{children}</Box>
            </Typography>
        );
    }
      
    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    function passData() {
        data.map(el => {
            el.Movies.map(item => {
                if (item.id === basketData[0].Movies[0].id) {
                    return item.value = basketData[0].Movies[0].value;
                }
            })
        })
        props.getSelected(data, basketData);
    }

    var renderData = () => data.map((item, index) => {
        return (
            <TabPanel value={value} index={index} key={index}>
                <Ticket data={item} getValue={getValue}/>
            </TabPanel>
        )}
    );

    var renderTabs = () => data.map((item, index) => {
        return (
            <Tab key={index} label={item.day} {...a11yProps(index)} />
        )
    });

    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Tabs 
                        value={value} 
                        onChange={handleChange} 
                        scrollButtons="auto"
                        aria-label="scrollable auto tabs example"
                    >
                        {data && renderTabs()}
                    </Tabs>
                </AppBar>
                {data && renderData()}
                <Button variant="contained" color="primary" className={classes.button} onClick={() => passData()}>
                    Reserve
                </Button>
            </div>
        </div>
    );
}