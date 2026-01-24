// Payment Mode Donut Chart
const adminSalesPaymentModeCtx = document.getElementById('adminSalesPaymentModeChart').getContext('2d');
const adminSalesPaymentModeChart = new Chart(adminSalesPaymentModeCtx, {
    type: 'doughnut',
    data: {
        labels: ['Credit/Debit', 'Google Pay', 'Net Banking', 'UPI BHIM'],
        datasets: [{
            data: [63, 37, 15, 0],
            backgroundColor: ['#7C3AED', '#14B8A6', '#F59E0B', '#6B7280'],
            borderWidth: 0,
            cutout: '70%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// Business Chart (Revenue) - Area Chart
const adminSalesBusinessCtx = document.getElementById('adminSalesBusinessChart').getContext('2d');
const adminSalesBusinessChart = new Chart(adminSalesBusinessCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            data: [10, 42, 32, 65, 28, 25, 22, 42, 15, 32, 28, 65],
            borderColor: '#7C3AED',
            backgroundColor: 'rgba(124, 58, 237, 0.2)',
            borderWidth: 2,
            fill: true,
            tension: 0.4,
            pointRadius: 0
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6B7280'
                }
            },
            y: {
                grid: {
                    color: '#F3F4F6'
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6B7280'
                }
            }
        }
    }
});

// State Wise Revenues Donut Chart
const adminSalesStateWiseCtx = document.getElementById('adminSalesStateWiseChart').getContext('2d');
const adminSalesStateWiseChart = new Chart(adminSalesStateWiseCtx, {
    type: 'doughnut',
    data: {
        labels: ['MH', 'GJ', 'RJ'],
        datasets: [{
            data: [50, 30, 20],
            backgroundColor: ['#7C3AED', '#C084FC', '#BEF264'],
            borderWidth: 0,
            cutout: '70%'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        }
    }
});

// Target vs Reality Chart
const adminSalesTargetCtx = document.getElementById('adminSalesTargetChart').getContext('2d');
const adminSalesTargetChart = new Chart(adminSalesTargetCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [
            {
                label: 'Target',
                data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100],
                backgroundColor: '#FDE047',
                borderRadius: 4,
                barThickness: 10
            },
            {
                label: 'Reality',
                data: [85, 83, 84, 83, 84, 83, 83, 84, 84, 83, 83, 84],
                backgroundColor: '#4ADE80',
                borderRadius: 4,
                barThickness: 10
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6B7280'
                }
            },
            y: {
                grid: {
                    color: '#F3F4F6'
                },
                ticks: {
                    font: {
                        size: 12
                    },
                    color: '#6B7280',
                    callback: function(value) {
                        if (value === 0) return '0';
                        if (value === 20) return '20k';
                        if (value === 40) return '40k';
                        if (value === 60) return '60k';
                        if (value === 80) return '80k';
                        if (value === 100) return '1.0M';
                        return value;
                    }
                },
                max: 100
            }
        }
    }
});

// State Revenues Bar Chart
const adminSalesStateRevenuesCtx = document.getElementById('adminSalesStateRevenuesChart').getContext('2d');
const adminSalesStateRevenuesChart = new Chart(adminSalesStateRevenuesCtx, {
    type: 'bar',
    data: {
        labels: ['MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH', 'MH'],
        datasets: [{
            data: [22, 26, 22, 20, 16, 18, 22, 26, 22, 20, 7, 18],
            backgroundColor: [
                '#3B82F6', '#22C55E', '#3B82F6', '#3B82F6', 
                '#3B82F6', '#3B82F6', '#3B82F6', '#22C55E', 
                '#3B82F6', '#3B82F6', '#EF4444', '#3B82F6'
            ],
            borderRadius: 4,
            barThickness: 12
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                enabled: true
            }
        },
        scales: {
            x: {
                grid: {
                    display: false
                },
                ticks: {
                    font: {
                        size: 11
                    },
                    color: '#6B7280'
                }
            },
            y: {
                grid: {
                    color: '#F3F4F6'
                },
                ticks: {
                    font: {size: 11
                },
                color: '#6B7280',
                callback: function(value) {
                    return value + 'k';
                }
            },
            max: 25
        }
    }
}});