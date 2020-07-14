import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';

const data = [
    {
        date: '07/01', weight: 12
    },
    {
        date: '07/08', weight: 9
    },
    {
        date: '07/15', weight: 14
    },
    {
        date: '07/23', weight: 15.7
    },
];

export default function WeightSpark(customerinfo) {
    // const [customerinfo, setCustomerInfo] = React.useState({});

    // useEffect(() => {
    //     const userId = localStorage.getItem('user_id');
    //     const db = firebase.database().ref().child('/customers/' + userId);;

    //     const getCustomer = snap => {
    //         console.log(snap.val())
    //         if (snap.val()) {
    //             setCustomerInfo(snap.val());
    //         }
    //     }
    //     db.on('value', getCustomer, error => alert(error));
    //     return () => { db.off('value', getCustomer); };
    // }, []);

    return (
        <AreaChart
            width={400}
            height={125}
            data={data}
            margin={{
                top: 10, right: 40, left: 0, bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={15} label="Weight Limit" stroke="red" />
            <Area type="monotone" dataKey="weight" stroke='#6a09a4' fill="#b1adf4" />
        </AreaChart>
    );
}