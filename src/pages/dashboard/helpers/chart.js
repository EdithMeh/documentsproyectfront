export const data_first = {
    labels: ['Desarrollo', 'Testing', 'OutSourcing'],
    datasets: [
        {
            label: 'Cantidad de proyectos',
            data: [10, 3, 5],
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export const options_first = {
    indexAxis: 'y',
    elements: {
        bar: {
            borderWidth: 1,
        },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Vista de tipos de proyectos.',
        },
    },
};

export const data_second = {
    labels: ['Carolina', 'Edith', 'Manuel', 'Gonzalo', 'Mariela', 'Marco'],
    datasets: [
        {
            label: 'Cantidad de proyectos',
            data: [9, 8, 5, 5, 3, 2],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

export const options_second = {
    indexAxis: 'y',
    // Elements options apply to all of the options unless overridden in a dataset
    // In this case, we are setting the border of each horizontal bar to be 2px wide
    elements: {
        bar: {
            borderWidth: 1,
        },
    },
    responsive: true,
    plugins: {
        title: {
            display: true,
            text: 'Vista de tipos de proyectos.',
        },
    },
};
