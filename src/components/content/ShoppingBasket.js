import React, { useEffect, useState, Fragment } from 'react';

function ShoppingBasket(props) {
    const [data, setData] = useState([]);

    useEffect(()=>{
        setData(props.data);
        console.log(data);
    }, [props.data])

    return (
        <Fragment>
            {data && data.map((item, index) => {
                return (
                    <div key={index}>
                        <h3>{item.day}</h3>
                        <ul>
                            {item.Movies && item.Movies.map((el, index) => {
                                if (el.ticketsNumber > 0) {
                                    return (
                                        <li key={index}>
                                            <strong>{el.name}</strong> -- <span>number of tickets: {el.ticketsNumber}</span>
                                        </li>
                                        )
                                } else {
                                    return <span>---</span>
                                }
                            })}
                        </ul>
                    </div>
                )
            })}
        </Fragment>
    );
}

export default ShoppingBasket;