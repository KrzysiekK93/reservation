import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import { createStyles, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme =>
  createStyles({
    textField: {
      marginLeft: theme.spacing(5),
      width: 80,
    },
    row: {
        width: '100%',
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        margin: '0',
        display: 'flex',
    },
    count: {
        display: 'flex',
        margin: '0',
        fontSize: '14px',
        color: '#dadada',
        marginLeft: '12px',
        display: 'flex',
        alignItems: 'center'
    },
    big: {
        color: 'green',
        margin: '0 5px',
        fontSize: '16px'
    },
    wrapper: {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column'
    },
    paragraph: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginLeft: '32px'
    }
  }),
);

export default function Ticket(props) {
    const [data, setData] = useState();

    useEffect(() => {
       setData(props.data)
    }, [data]);

    const classes = useStyles();
    const renderData = () => data.Movies.map(item => {
        return (
            <div className={classes.wrapper}>
                <div className={classes.row}>
                    <h3 className={classes.title}>
                        {item.name}
                    </h3>
                    <p className={classes.count}>(Left tickets <strong className={classes.big}>{item.ticketsNumber}</strong>)</p>
                </div>
                <div className={classes.paragraph}>
                    <h5 className={classes.description}>
                        Pick count of tickets
                    </h5>
                    <TextField
                        id={item.id}
                        label="Tickets"
                        type="number"
                        InputProps={{ inputProps: { min: 0, max: item.ticketsNumber }}}
                        className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        margin="normal"
                        variant="outlined"
                        onChange={(e) => handleChange(e)}
                    />
                </div>
            </div>
        )}
    )

    const handleChange = (e) => {
        const d = JSON.parse(JSON.stringify(data));
        d.Movies.map(item => {
            if(item.id == e.target.id) {
                item.value = parseFloat(e.target.value);
            }
        })
        setData(d);
        props.getValue(d)
    }

    return (
        <div>
            {data && renderData()}
        </div>
    );
}