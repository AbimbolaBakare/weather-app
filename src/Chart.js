import React from 'react';
import { Bar } from 'react-chartjs-2';

export default function Chart(props) {
    const data = {
        labels: props.forecast.map(d => d.dt_txt),
        datasets: [
            {
                queue: 'queue1',
                label: 'Temperature (\xB0C)',
                backgroundColor: 'rgba(75,192,192,1)',
                hoverBackgroundColor: '#F98783',
                hoverBorderColor: '#D73933',
                data: props.forecast.map(d => d.max),
            },
            {
                queue: 'queue2',
                label: 'Humidity (%)',
                backgroundColor: '#8794D2',
                hoverBackgroundColor: '#62CDFF',
                borderColor: '#26ADEC',
                hoverBorderColor: '#1E86B6',
                data: props.forecast.map(d => d.humidity),
            },
            {
                queue: 'queue3',
                label: 'Windspeed (m/s)',
                backgroundColor: 'salmon',
                hoverBackgroundColor: '#FFFF6F',
                borderColor: '#D8D831',
                hoverBorderColor: '#D8D831',
                data: props.forecast.map(d => d.speed),
            }
        ]
    }

    return (
        <Bar
            data={data}
            width={120}
            height={70}
            options={{
                maintainAspectRatio: true,
                duration: 2000
            }}
        />
    )
}