/* 
   NAVIGATION
 */
document.getElementById('customer-dashboard-myCustomersBtn').addEventListener('click', function() {
  window.location.href = '../html/vendorMyCustomer.html';
});

/* 
   ACTIVE CUSTOMERS CHART
 */
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

      generateLabels: function(chart) {
        const datasets = chart.data.datasets;
        return datasets.map((dataset, i) => ({
          text: dataset.label,
          fillStyle: dataset.borderColor,   
          strokeStyle: dataset.borderColor, 
          lineWidth: 0,
          hidden: !chart.isDatasetVisible(i),
          index: i
        }));
      },

      boxWidth: 8,
      boxHeight: 8,
      padding: 20,
      color: '#3F3F3F',
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
  font: function(context) {
    const width = window.innerWidth;

    if (width <= 767) {
      return { size: 9, family: 'Nunito Sans' };     
    } else if (width <= 1024) {
      return { size: 11, family: 'Nunito Sans' };
    } else {
      return { size: 13, family: 'Nunito Sans' };
    }
  },
  color: '#3F3F3F'
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
      color: '#3F3F3F'
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

/* 
   HEATMAP DATA
 */
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
  'WB': [1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500, 1500],
  'DL': [2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000,2000],
  'TN': [3000,3000,3000,3000,3000,3000,3000,3000,3000,3000,3000,3000]
};

/* 
   HEATMAP RENDERING
 */
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





const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatValueForMobile(value) {
  if (window.innerWidth <= 767) {
    if (value >= 1000) {
      const k = value / 1000;
      return k % 1 === 0 ? k + 'K' : k.toFixed(1) + 'K';
    }
  }
  return value.toLocaleString();
}

function renderOptimizedHeatmap() {
  const grid = document.getElementById('heatmapGrid');
  const yLabels = document.getElementById('yLabels');
  const xLabels = document.getElementById('xLabels');

  grid.innerHTML = '';
  yLabels.innerHTML = '';
  xLabels.innerHTML = '';

  const fragmentGrid = document.createDocumentFragment();
  const fragmentY = document.createDocumentFragment();
  const fragmentX = document.createDocumentFragment();

  Object.keys(heatmapData).forEach(region => {
    const d = document.createElement('div');
    d.textContent = region;
    fragmentY.appendChild(d);
  });

  Object.values(heatmapData).forEach(row => {
    row.forEach(value => {
      const cell = document.createElement('div');
      cell.className = 'heatmap-cell';
      cell.textContent = formatValueForMobile(value); 
      fragmentGrid.appendChild(cell);
    });
  });

  months.forEach(m => {
    const s = document.createElement('span');
    s.textContent = m;
    fragmentX.appendChild(s);
  });

  yLabels.appendChild(fragmentY);
  grid.appendChild(fragmentGrid);
  xLabels.appendChild(fragmentX);
}

// Re-render on window resize to update format
let resizeTimer;
window.addEventListener('resize', function() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function() {
    renderOptimizedHeatmap();
  }, 250);
});


renderOptimizedHeatmap();
