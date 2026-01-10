/* ===============================
   NAVIGATION
================================ */
document.getElementById('customer-dashboard-myCustomersBtn').addEventListener('click', function() {
  window.location.href = '../html/vendorMyCustomer.html';
});

/* ===============================
   ACTIVE CUSTOMERS CHART
================================ */
const ctx = document.getElementById('customer-dashboard-activeCustomersChart').getContext('2d');

const activeCustomersChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
datasets: [
  {
    label: 'First time customer',
    data: [9800, 7600, 5400, 2500, 3200, 5000, 4200, 2000, 2600, 3600, 5400, 7600],
    borderColor: '#9b51e0',
    backgroundColor: 'rgba(155, 81, 224, 0.1)',
    tension: 0.45,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 6
  },
  {
    label: 'Repeat Customer',
    data: [2400, 1800, 1400, 7200, 10000, 4000, 4500, 4800, 4300, 3800, 4000, 4500],
    borderColor: '#21a593',
    backgroundColor: 'rgba(33, 165, 147, 0.1)',
    tension: 0.45,
    borderWidth: 2,
    pointRadius: 0,
    pointHoverRadius: 6
  }
]

  },
  options: {
    responsive: true,
    maintainAspectRatio: false,
plugins: {
  legend: {
    display: true,
    position: 'bottom',
    align: 'start',
    labels: {
      usePointStyle: true,
      pointStyle: 'circle',

      // 🔥 IMPORTANT PART
      generateLabels: function(chart) {
        const datasets = chart.data.datasets;
        return datasets.map((dataset, i) => ({
          text: dataset.label,
          fillStyle: dataset.borderColor,   // ✅ solid fill
          strokeStyle: dataset.borderColor, // ✅ no hollow
          lineWidth: 0,
          hidden: !chart.isDatasetVisible(i),
          index: i
        }));
      },

      boxWidth: 8,
      boxHeight: 8,
      padding: 20,
      color: '#666666',
      font: {
        size: 12,
        weight: '400',
        family: 'Nunito Sans'
      }
    }
  },
  tooltip: {
    mode: 'index',
    intersect: false
  }
},
scales: {
  x: {
    border: {
      display: false   
    },
    grid: {
      display: true,
      drawBorder: false,
      borderDash: [4, 4],   
      color: '#dbe5e3'
    },
    ticks: {
      font: {
        size: 12,
        family: 'Nunito Sans'
      },
      color: '#666'
    }
  },
  y: {
    border: {
      display: false  
    },
    beginAtZero: true,
    max: 10000,
    ticks: {
      stepSize: 2500,
      font: {
        size: 12,
        family: 'Nunito Sans'
      },
      color: '#666'
    },
    grid: {
      display: true,
      drawBorder: false,
      borderDash: [4, 4],  
      color: '#dbe5e3'
    }
  }
},

    interaction: {
      mode: 'index',
      intersect: false
    }
  }
});

/* ===============================
   HEATMAP DATA
================================ */
const heatmapData = {
  'MH': [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
  'KA': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  'GJ': [2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324],
  'AP': [5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424],
  'JK': [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
  'CG': [2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324],
  'MP': [5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424],
  'UP': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  'HR': [3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500, 3500],
  'PB': [2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324, 2324],
  'RJ': [5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424, 5424],
  'WB': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500]
};

/* ===============================
   HEATMAP RENDERING
================================ */
function getHeatmapCellClass(value) {
  if (value <= 1500) return 'customer-dashboard-heatmap-cell-1';
  if (value <= 2000) return 'customer-dashboard-heatmap-cell-2';
  if (value <= 2324) return 'customer-dashboard-heatmap-cell-3';
  if (value <= 2500) return 'customer-dashboard-heatmap-cell-4';
  if (value <= 3000) return 'customer-dashboard-heatmap-cell-5';
  if (value <= 3500) return 'customer-dashboard-heatmap-cell-6';
  if (value <= 4000) return 'customer-dashboard-heatmap-cell-7';
  if (value <= 4500) return 'customer-dashboard-heatmap-cell-8';
  if (value <= 5000) return 'customer-dashboard-heatmap-cell-9';
  if (value <= 5424) return 'customer-dashboard-heatmap-cell-10';
  return 'customer-dashboard-heatmap-cell-11';
}

function renderHeatmap() {
  const tbody = document.getElementById('customer-dashboard-heatmapBody');
  tbody.innerHTML = '';

  for (const [region, values] of Object.entries(heatmapData)) {
    const row = document.createElement('tr');
    
    // Region name cell
    const regionCell = document.createElement('td');
    regionCell.textContent = region;
    row.appendChild(regionCell);

    // Value cells
    values.forEach(value => {
      const cell = document.createElement('td');
      cell.textContent = value.toLocaleString();
      cell.className = getHeatmapCellClass(value);
      row.appendChild(cell);
    });

    tbody.appendChild(row);
  }
}

/* ===============================
   INIT
================================ */
renderHeatmap();