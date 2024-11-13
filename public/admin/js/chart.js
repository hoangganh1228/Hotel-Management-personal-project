// public/js/chart.js

// Hàm vẽ biểu đồ tròn
function drawPieChart(overviewRevenue) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Phòng');
    data.addColumn('number', 'Doanh thu');

    overviewRevenue.forEach(item => {
      data.addRow([item.roomName, item.phong]);
    });

    const options = {
      title: 'Doanh Thu Theo Phòng',
      pieHole: 0.4,
      legend: { position: 'bottom' }
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart_div'));
    chart.draw(data, options);
  });
}

// Hàm vẽ biểu đồ cột
function drawBarChart(customerRevenue) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'Khách hàng');
    data.addColumn('number', 'Doanh thu');

    customerRevenue.forEach(item => {
      // Hiển thị cả tên và email của khách hàng trong trục X
      data.addRow([`${item.customerName} (${item.customerEmail})`, item.revenue]);
    });

    const options = {
      title: 'Doanh Thu Theo Khách Hàng',
      hAxis: { title: 'Khách hàng' },
      vAxis: { title: 'Doanh thu' },
      legend: { position: 'none' },
    };

    const chart = new google.visualization.ColumnChart(document.getElementById('barchart_div'));
    chart.draw(data, options);
  });
}
