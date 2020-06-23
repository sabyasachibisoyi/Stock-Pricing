google.charts.load('current', {packages: ['corechart']});

var stocks=[];
var stocksList = "";
var stockPriceObj = {};

function drawChart() {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Stock');
    data.addColumn('number', 'Stock Price');
    stockPriceArr = []
    console.log(stockPriceObj);
    for(var stock in stockPriceObj){
        stockEle = [stock,stockPriceObj[stock]];
        stockPriceArr.push(stockEle);
    }
    console.log(stockPriceArr);
    data.addRows(stockPriceArr);
    var chart = new google.visualization.BarChart(document.getElementById('stockBarChart'));
    chart.draw(data, null);
    }
    
function addStockName(){
    var stockSymbol = document.getElementById('stockId').value;
    console.log(stockSymbol);
    if (!stocks.includes(stockSymbol)){
        stocks.push(stockSymbol);
        stocksList += "<li>"+stockSymbol+"</li>";
    }
    document.getElementById("addedStockList").innerHTML = stocksList;
    console.log(stockPriceObj);
    fetchStockData(stockSymbol); 
}

function fetchEachStockData(stockSymbol){
    console.log("Called with stock",stockSymbol);
    var xhr = new XMLHttpRequest();
    var url = "https://cloud.iexapis.com/stable/stock/"+stockSymbol+"/quote?token=pk_737ab3af607748a7bf70117281b71fe7";
    xhr.onreadystatechange = function (){
        if(this.readyState==4 && this.status==200){
            var stockData = JSON.parse(this.responseText);
            stockPriceObj[stockSymbol] = stockData.latestPrice;
            console.log(stockData,stockSymbol);
        }
        if(xhr.status==400){
            console.log("URL/Data Not Found");
        }
    };
    xhr.open('GET',url, true);
    xhr.send();
    setTimeout(function(){ 
        console.log(stockPriceObj);
        drawChart(); }, 300);
    console.log("Ended");
}

function fetchStockData(stockSymbol){
    fetchEachStockData(stockSymbol);
    setInterval(function (){
        console.log("Called again");
        for (var i=0;i<stocks.length;i++){
            fetchEachStockData(stocks[i]);
        }
    },5000);
}
