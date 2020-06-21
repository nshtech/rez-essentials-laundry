import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine
} from 'recharts';

const data = [
    {
        name: '07/01', uv: 12
    },
    {
        name: '07/08', uv: 9
    },
    {
        name: '07/15', uv: 14
    },
    {
        name: '07/23', uv: 15.7
    },
];

export default function WeightSpark() {

    return (
        <AreaChart
            width={500}
            height={150}
            data={data}
            margin={{
                top: 10, right: 30, left: 0, bottom: 0,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <ReferenceLine y={15} label="Weight Limit" stroke="red" />
            <Area type="monotone" dataKey="uv" stroke='#6a09a4' fill="#b1adf4" />
        </AreaChart>
    );
}