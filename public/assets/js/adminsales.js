
// We will make a chart of showing sales each day during the past 2 weeks.
function makeNewChart(){
    // orderCount will be the total number of sales as an array where each element represents a different day.  The dates will be date strings and the new dates will be human friendly date views.
    let orderCount=[];
    let dates;
    let newDates=[];

    // We first empty the area the chart will be in so the we can populate it.  We then set the canvas up to contain our chart.
    $("#chart-area").empty();
    let newCanvas=$("<canvas>");
    newCanvas.attr("id","myChart");
    newCanvas.attr("style","width: 400 height:200");       

        // We send a get request which will count the number of sales on each of the days.  On return, we format this data to be useable in the chart.
    $.get("/adminsales/Order").done(function(results){
            orderCount=results.orderCount;
            dates=results.dates;
            for(let i=0; i<dates.length; i++){
                dates[i]=new Date(dates[i]);
                dates[i]=dates[i].toLocaleDateString("en-US");
            }
            newDates=[...dates];
            for(let i=0; i<dates.length; i++){
                newDates[i]=dates[13-i];
            }
            // Creates the chart.  Most is boilerplate from chart.js, but the datalabels and data use the variables we defined above.
    let myChart = new Chart(newCanvas, {
        type: 'line',
        data: {
            labels: newDates,
            datasets: [{
                label: '# of Orders',
                data: orderCount,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
//   attached the created chart to the DOM.
        $("#chart-area").append(newCanvas);
 
    });
    }

    // runs the make new chart function.
makeNewChart();
