google.charts.load('current', {'packages':['corechart', 'controls']});
google.charts.setOnLoadCallback(drawDashboard);

function drawDashboard(){

    $.ajax({
        url: "js/classSurveyReport.json",
        dataType: "json",
        success:function(dataFromJSON){
            var data = new google.visualization.DataTable();
            data.addColumn('number', 'Age');
            data.addColumn('number', 'Rating');
            data.addColumn('string', 'Politics');
            
            for (var i = 0; i < dataFromJSON.length; i++) {
                data.addRow([dataFromJSON[i].age, dataFromJSON[i].campus_rating, dataFromJSON[i].political_leaning])
            }

            var scatterChart = new google.visualization.ChartWrapper({
                chartType: 'ScatterChart',
                containerId: 'chart1',
                options: {
                    width: 600,
                    height: 400,
                    title: 'Age vs Campus Rating',
                    legend: 'none',
                    backgroundColor: {
                        fill:'transparent'
                    },
                    hAxis:{
                        title: "Age",
                        ticks: [15,20,25,30,35,40,45,50],
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'black'
                        }
                    },
                    vAxis: {
                        title: "Campus Rating",
                        gridlines: {
                            color: '#7f8c8d'
                        },
                        textStyle: {
                            color: 'black'
                        }
                    }
                },
                view:{
                    columns: [0, 1]
                }
            });

            var dashboard = new google.visualization.Dashboard(
                document.getElementById('dashboard')
            );

            var ageRangeSlider = new google.visualization.ControlWrapper({
                controlType: 'NumberRangeFilter',
                containerId: 'control1',
                options: {
                    filterColumnLabel: 'Age',
                    ui: {
                        labelStacking: "vertical"
                    }
                }
            });

            var polPicker = new google.visualization.ControlWrapper({
                controlType: 'CategoryFilter',
                containerId: 'control2',
                options:{
                    filterColumnLabel: 'Politics',
                    ui: {
                        allowMultiple: false,
                        allowTyping: false,
                        labelStacking: "vertical"
                    }
                }
            });

            dashboard.bind([ageRangeSlider, polPicker], [scatterChart]);

            dashboard.draw(data);

            drawColumn(dataFromJSON);
            drawPie(dataFromJSON);
            drawDonut(dataFromJSON);
    
            google.visualization.events.addListener(ageRangeSlider, 'statechange', function(){
                var range = ageRangeSlider.getState();
                var view = new google.visualization.DataView(data);
                view.setRows(data.getFilteredRows([
                    {
                        column: 0, /*this column is age*/
                        minValue: range.lowValue,
                        maxValue: range.highValue
                    }    
                ]));

                var filteredRows = view.ol; /*ol is an array created from the view variable, which holds the new range of filtered row ids*/
                var newData = [];
                for (var i = 0; i < filteredRows.length; i++) {
                    newData.push(dataFromJSON[filteredRows[i]]);
                }

                drawColumn(newData);
                drawPie(newData); 
                drawDonut(newData);   

            })
        }    
    });

}

// Column Chart ===================================================
function drawColumn(data){

    var dataColumn = new google.visualization.DataTable();
    dataColumn.addColumn('string', 'rating_lable');
    dataColumn.addColumn('number', 'male');
    dataColumn.addColumn('number', 'female');
    dataColumn.addColumn('number', 'other');

    var male0 = 0, female0 = 0, other0 = 0;
    var male1 = 0, female1 = 0, other1 = 0;
    var male2 = 0, female2 = 0, other2 = 0;
    var male3 = 0, female3 = 0, other3 = 0;
    var male4 = 0, female4 = 0, other4 = 0;
    var male5 = 0, female5 = 0, other5 = 0;
    var male6 = 0, female6 = 0, other6 = 0;

    for (var i = 0; i < data.length; i++) {
        if(data[i].gender == "Male" && data[i].campus_rating == 0) {
            male0++;
        } else if(data[i].gender == "Female" && data[i].campus_rating == 0) {
            female0++;
        } else if(data[i].gender == "Other" && data[i].campus_rating == 0) {
            other0++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 1) {
            male1++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 1) {
            female1++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 1) {
            other1++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 2) {
            male2++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 2) {
            female2++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 2) {
            other2++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 3) {
            male3++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 3) {
            female3++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 3) {
            other3++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 4) {
            male4++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 4) {
            female4++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 4) {
            other4++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 5) {
            male5++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 5) {
            female5++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 5) {
            other5++;
        } else if(data[i].gender == "Male" && data[i].campus_rating == 6) {
            male6++; 
        } else if(data[i].gender == "Female" && data[i].campus_rating == 6) {
            female6++; 
        } else if(data[i].gender == "Other" && data[i].campus_rating == 6) {
            other6++;
        } 
    }

    dataColumn.addRow(['0', male0, female0, other0]);
    dataColumn.addRow(['1', male1, female1, other1]);
    dataColumn.addRow(['2', male2, female2, other2]);
    dataColumn.addRow(['3', male3, female3, other3]);
    dataColumn.addRow(['4', male4, female4, other4]);
    dataColumn.addRow(['5', male5, female5, other5]);
    dataColumn.addRow(['6', male6, female6, other6]);

    var options = {
        title: 'Class Campus Ratings and Gender Split', 
        width: 800,
        height: 400,
        legend: 'right',
        backgroundColor: 'transparent',
        hAxis: {
            title: 'Rating (0=Filth 6=Fantastic)'
        },
        vAxis: {
            title: 'Count (Students)'
        },
        view: {
            columns: [0, 1, 2, 3]
        }
    };

    var Column = new google.visualization.ColumnChart(document.getElementById('chart4'));
    Column.draw(dataColumn, options);

}
// End ===================================================

// Pie Chart ===================================================
function drawPie(data){

    var dataPie = new google.visualization.DataTable();
        dataPie.addColumn('string', 'sign');
        dataPie.addColumn('number', 'sign_count');
  
        var starSigns = ['Gemini', 'Taurus', 'Scorpio', 'Cancer', 'Libra', 'Sagittarius', 'Capricorn', 'Aries'];
        var starCount = [0, 0, 0, 0, 0, 0, 0, 0]; 
        
        for (var i = 0; i < data.length; i++) {
            if (data[i].star_sign == 'Gemini') {
                starCount[0]++;
            } else if (data[i].star_sign == 'Taurus') {
                starCount[1]++;
            } else if (data[i].star_sign == 'Scorpio') {
                starCount[2]++;
            } else if (data[i].star_sign == 'Cancer') {
                starCount[3]++;
            } else if (data[i].star_sign == 'Libra') {
                starCount[4]++;
            } else if (data[i].star_sign == 'Sagittarius') {
                starCount[5]++;
            } else if (data[i].star_sign == 'Capricorn') {
                starCount[6]++;
            } else if (data[i].star_sign == 'Aries') {
                starCount[7]++;
            }
        };

        for (var i = 0; i < starSigns.length; i++) {
            dataPie.addRow([
                starSigns[i],
                starCount[i]
            ]);
        };

        var options = {
            title: 'Star Signs',
            is3D: true,
            width: 500,
            height: 400,
            pieSliceText: 'lable',
            legend: 'right',
            backgroundColor: 'transparent',
            view: {'columns': [0, 1]}
        };

    var Pie = new google.visualization.PieChart(document.getElementById('chart2'));
    Pie.draw(dataPie, options);

}
// End ===================================================

// Donut Chart ===================================================
function drawDonut(data){

    var dataDonut = new google.visualization.DataTable();
        dataDonut.addColumn('string', 'Politics');
        dataDonut.addColumn('number', 'politics_count');

        var polLean = ['Right', 'Left', 'Other'];
        var polCount = [0, 0, 0]; 
        
       for (var i = 0; i < data.length; i++) {
            if (data[i].political_leaning == 'Right') {
                polCount[0]++;
            } else if (data[i].political_leaning == 'Left') {
                polCount[1]++;
            } else if (data[i].political_leaning == 'Other') {
                polCount[2]++;
            }
        };

        for (var i = 0; i < polLean.length; i++) {
            dataDonut.addRow([
                polLean[i],
                polCount[i]
            ]);
        };

        var options = {
            title: 'Political Leaning',
            pieHole: 0.4,
            width: 500,
            height: 400,
            legend: 'right',
            backgroundColor: 'transparent',
            view: {'columns': [0, 1]}
        };

    var Donut = new google.visualization.PieChart(document.getElementById('chart3'));
    Donut.draw(dataDonut, options);

}
// End ===================================================
