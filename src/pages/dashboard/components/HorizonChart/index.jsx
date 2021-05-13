import React from 'react';
import {Bar} from 'react-chartjs-2';

export function HorizontalBarChart(props) {
    const {title, options, data} = props;
    return (
        <>
            <div className='header'>
                <h1 className='title'>{title}</h1>
            </div>
            <Bar data={data} options={options}/>
        </>
    )
}
