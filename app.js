// Financial Dashboard App
// Mock data - Replace with API calls in production

const financialData = {
    leftToSpend: 174.36,
    totalBudget: 1000,
    plannedVsActual: {
        labels: ['Ingresos', 'Gastos Fijos', 'Gastos Variables', 'Ahorros', 'Deudas'],
        planned: [800, 120, 350, 220, 150],
        actual: [750, 750, 150, 220, 130]
    },
    expensesBreakdown: {
        labels: ['Gastos Fijos', 'Gastos Variables', 'Ahorros', 'Deudas'],
        values: [9.2, 25.6, 41.4, 23.8],
        colors: ['#10B981', '#EF4444', '#F59E0B', '#FCA5A5']
    }
};

// Chart.js default configuration
Chart.defaults.font.family = '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
Chart.defaults.font.size = 13;
Chart.defaults.color = '#6B7280';

// Initialize charts when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    initGaugeChart();
    initBarChart();
    initDonutChart();
    updateLastUpdateTime();
});

// Gauge Chart (Doughnut variant)
function initGaugeChart() {
    const ctx = document.getElementById('gaugeChart');
    if (!ctx) return;

    const percentage = (financialData.leftToSpend / financialData.totalBudget) * 100;
    const remaining = 100 - percentage;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [percentage, remaining],
                backgroundColor: [
                    '#EF4444',
                    '#E5E7EB'
                ],
                borderWidth: 0,
                circumference: 180,
                rotation: 270
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '75%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    enabled: false
                }
            }
        }
    });
}

// Bar Chart - Planned vs Actual
function initBarChart() {
    const ctx = document.getElementById('barChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: financialData.plannedVsActual.labels,
            datasets: [
                {
                    label: 'PLANEADO',
                    data: financialData.plannedVsActual.planned,
                    backgroundColor: '#6B9B8E',
                    borderRadius: 6,
                    barThickness: 20
                },
                {
                    label: 'REAL',
                    data: financialData.plannedVsActual.actual,
                    backgroundColor: '#EF4444',
                    borderRadius: 6,
                    barThickness: 20
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        boxWidth: 12,
                        boxHeight: 12,
                        padding: 15,
                        font: {
                            size: 12,
                            weight: '600'
                        }
                    }
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': $' + context.parsed.y;
                        }
                    }
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
                        maxRotation: 45,
                        minRotation: 0
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#E5E7EB',
                        drawBorder: false
                    },
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        },
                        font: {
                            size: 11
                        }
                    }
                }
            }
        }
    });
}

// Donut Chart - Expenses Breakdown
function initDonutChart() {
    const ctx = document.getElementById('donutChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: financialData.expensesBreakdown.labels,
            datasets: [{
                data: financialData.expensesBreakdown.values,
                backgroundColor: financialData.expensesBreakdown.colors,
                borderWidth: 0,
                spacing: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            cutout: '65%',
            plugins: {
                legend: {
                    display: false
                },
                tooltip: {
                    backgroundColor: '#1F2937',
                    padding: 12,
                    cornerRadius: 8,
                    titleFont: {
                        size: 13,
                        weight: '600'
                    },
                    bodyFont: {
                        size: 12
                    },
                    callbacks: {
                        label: function(context) {
                            return context.label + ': ' + context.parsed + '%';
                        }
                    }
                }
            }
        }
    });
}

// Update last update time
function updateLastUpdateTime() {
    const lastUpdateElement = document.getElementById('lastUpdate');
    if (!lastUpdateElement) return;

    const now = new Date();
    const formattedDate = now.toLocaleDateString('es-ES', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });

    lastUpdateElement.textContent = formattedDate;
}

// Function to update data dynamically (for future API integration)
function updateDashboardData(newData) {
    if (newData.leftToSpend !== undefined) {
        financialData.leftToSpend = newData.leftToSpend;
        document.querySelector('.amount').textContent = '$' + newData.leftToSpend.toFixed(2);
    }

    if (newData.plannedVsActual) {
        financialData.plannedVsActual = newData.plannedVsActual;
    }

    if (newData.expensesBreakdown) {
        financialData.expensesBreakdown = newData.expensesBreakdown;
    }

    // Reinitialize charts with new data
    initGaugeChart();
    initBarChart();
    initDonutChart();
    updateLastUpdateTime();
}

// Expose updateDashboardData for external use (e.g., from Jelou WebView)
window.updateDashboardData = updateDashboardData;
