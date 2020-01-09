import React, { useState } from 'react';
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
    const [sValue, setSValue] = useState();
    const classes = useStyles();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    function getSelected() {
        const pData = setPreparedDataFn();
        pData.map(el => {
            el.Movies.map(item => {
                console.log(item);
                console.log(sValue);
                if (item.id === sValue.id ) {
                    item.ticketsNumber = sValue.value
                }
            })
        })
        props.getSelected(pData);
    }

    function setPreparedDataFn() {
        const d = JSON.parse(JSON.stringify(props.data));
        d.map(el => {
            el.Movies.map(item => {
                item.ticketsNumber = 0;
            })
        })
        return d;
    }

    function getValue(item) {
        console.log("item", item)
        console.log("sValue", sValue)
        // setSValue(item);
    }

    
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

    var renderData = () => props.data.map((item, index) => {
        return (
            <TabPanel value={value} index={index} key={index}>
                <Ticket data={item} getValue={getValue}/>
            </TabPanel>
        )}
    );

    var renderTabs = () => props.data.map((item, index) => {
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
                        {renderTabs()}
                    </Tabs>
                </AppBar>
                {renderData()}
                <Button variant="contained" color="primary" className={classes.button} onClick={() => getSelected()}>
                    Reserve
                </Button>
            </div>
        </div>
    );
}