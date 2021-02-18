//google chart driver
google.charts.load('current', {'packages':['corechart']});

function addDataToTable(dataToAdd) {
    let array = [['Cantidad (q)', 'Costes Fijos (Cf)', 'Costes Totales (Ct)', 'Ingresos Totales (It)']];

    dataToAdd.forEach((line) => {
        let tmpArr = [];
        tmpArr.push(line.Cantidad);
        tmpArr.push(parseInt(line.CostesFijos));
        tmpArr.push(parseInt(line.CostesTotales));
        tmpArr.push(parseInt(line.IngresosTotales));
        array.push(tmpArr);
    });

    let graph = google.visualization.arrayToDataTable(array);

    let options = {
        title: 'Umbral de rentabilidad',
        legend: { position: 'bottom' },
        colors: ['darkred', 'red', 'green']
    };

    let chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    chart.draw(graph, options);
}
//google chart driver


//tabletop driver
let publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1kko-t9faAMT0uBkaAw4f4aA7opBWPAawOZO8KJgrtS4/edit?usp=sharing';

function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
        callback: showInfo,
        simpleSheet: true });
}

function showInfo(data, tabletop) {
    // alert('Successfully processed!')
    console.log(data);
    addDataToTable(data);
}

window.addEventListener('DOMContentLoaded', init);
//tabletop driver
