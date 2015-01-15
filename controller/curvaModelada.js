/*
** Este script hace el grafico highcharts en la ventana alumnoModelado.html
*/

$(function () {
    $('#container').highcharts({
        chart: {
            type: 'area'
        },
        title: {
            text: 'Curva modelada'
        },
        subtitle: {
            text: 'Taller de Prospeccion Geofisica'
        },
        xAxis: {
            categories: ['10', '50', '80', '100', '130', '150', '200'],
            tickmarkPlacement: 'on',
            title: {
                enabled: false
            }
        },
        yAxis: {
            title: {
                text: 'Profundidad'
            },
            labels: {
                formatter: function () {
                    return this.value / 1000;
                }
            }
        },
        tooltip: {
            shared: true,
            valueSuffix: ' millions'
        },
        plotOptions: {
            area: {
                stacking: 'normal',
                lineColor: '#666666',
                lineWidth: 1,
                marker: {
                    lineWidth: 1,
                    lineColor: '#666666'
                }
            }
        },
        series: [ {
            name: 'Curva',
            data: [2, 2, 20, 30, 13, 5, 1]
        }]
    });
});