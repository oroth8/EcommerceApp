function makeNewChart(){

    let orderCount=[];
    let dates;
    let newDates=[];


    $("#chart-area").empty();
    let newCanvas=$("<canvas>");
    newCanvas.attr("id","myChart");
    newCanvas.attr("style","width: 400 height:200");       

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
        console.log(orderCount);
        $("#chart-area").append(newCanvas);
 
    });
    }

makeNewChart();