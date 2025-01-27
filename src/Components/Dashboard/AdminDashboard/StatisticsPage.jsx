
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title, CategoryScale } from 'chart.js';


ChartJS.register(ArcElement, Tooltip, Legend, Title, CategoryScale);

const StatisticsPage = () => {

    const [statistics, setStatistics] = useState(null);

    useEffect(() => {
        const fetchStats = async () => {
            
                const response = await fetch('http://localhost:5000/statistics');
                const data= await response.json();
                setStatistics(data);
        }
        fetchStats();

    }, []);

    if(!statistics){
        return <div>Loading...</div>
    }

    // pie chart

    const pieData = {
        labels: ['Total Products', 'Accepted Products', 'pending Products', 'Reviews', 'Users'],
        datasets: [
            {
                data: [
                    statistics.totalProducts,
                    statistics.accepted,
                    statistics.pending,
                    statistics.reviews,
                    statistics.users,

                ],
                backgroundColor: ['#FF5733', '#33FF57', '#FFFC33', '#3375FF', '#F333FF'],
                hoverOffset: 4,
            },
        ],
    };
    return (
        <div className='p-4'>
            <h2 className='text-2xl font-bold mb-4 text-center'>statistics page</h2>
            
            <div className='flex justify-center my-20'>
                <div style={{ width: '300px', height: '300px'}}>
                    <Pie data={pieData}></Pie>
                </div>

            </div>
        </div>
    );
};

export default StatisticsPage;