/**
 * Created by jeffjorgensen on 27/10/2016.
 */




/*
 $(document).ready(){


    var apiLink = "http://52.57.230.3/man2API/php/BankPhp.php?apikey=" + apikey;


    //GetOffersURL
    /*{ "resp":{"code":"200", "status":"OK", "method":"GET"},
        "user":{ "name":"JEFF0310" }, "what":"offers", "data":
        [{ "id":"3", "amount":"0.01", "currency":"LUCA0526",
            "since":"2016-10-27 09:11:24" },{ "id":"4", "amount":"0.00",
            "currency":"LUCA0526", "since":"2016-10-27 09:11:54" }] }
}
*/


//TO-DO: OK, update functionality

var apikey = "bb6b0f1d688877c52b2753bfb4ce0a4e";

$(document).ready(function() {


        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=account_info&apikey=' + apikey,

            'success': function (data) {
                JSONdata = JSON.parse(data);
                console.log(JSONdata);

                var user = JSONdata.user.name;

                var amount = JSONdata.data[0].amount;
                var currency = JSONdata.data[0].currency;

                $('#PUser').text("You're logged in as " + user);
                $('#PAmount').text("amount: " + amount);
                $('#Pcurrency').text("Your currency: " + currency);

            }

    });

});

    function getAllOffers() {
        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=offers&apikey=' + apikey,

            'success': function (dataString) {
                JSONdata = JSON.parse(dataString);
                console.log(JSONdata);

                setUpOfferTable();

            }

        });
    }

    function setUpOfferTable() {

        var getAllOfferTable = $('#allOfferTable');

        /*
        var getAllOfferTable = document.createElement("table");

        var getAllOfferHeadRow = document.createElement("tr");

        var getAllOfferIdHead = document.createElement("th");
        var idText = document.createTextNode("ID");
        getAllOfferIdHead.appendChild(idText);

        var getAllOfferAmountHead = document.createElement("th");
        var amountText = document.createTextNode("Amount");
        getAllOfferAmountHead.appendChild(amountText);

        var getAllOfferCurrencyHead = document.createElement("th");
        var currencyText = document.createTextNode("Currency");
        getAllOfferCurrencyHead.appendChild(currencyText);

        var getAllOfferSinceHead = document.createElement("th");
        var sinceText = document.createTextNode("Since");
        getAllOfferSinceHead.appendChild(sinceText);

        getAllOfferHeadRow.appendChild(getAllOfferIdHead);
        getAllOfferHeadRow.appendChild(getAllOfferAmountHead);
        getAllOfferHeadRow.appendChild(getAllOfferCurrencyHead);
        getAllOfferHeadRow.appendChild(getAllOfferSinceHead);

        getAllOfferTable.appendChild(getAllOfferHeadRow);

        */

        //div.appendChild(getAllOfferTable);

        for (i = 0; i < JSONdata.data.length; i++) {
            doTable(JSONdata.data[i]);
        }

    }

    function doTable(dataObject) {

        //insert new rows dynamically

        var rowHtml = "<tr>" +
            "<td>" + dataObject.id + "</td>" +
            "<td>" + dataObject.amount + "</td>" +
            "<td>" + dataObject.currency + "</td>" +
            "<td>" + dataObject.since + "</td>" +
            "</tr>";

        $('#offres_tbl').append(rowHtml);

        /*
        var row = table.insertRow(index);

         var id = dataObject.id;
         var amount = dataObject.amount;
         var currency = dataObject.currency;
         var since = dataObject.since;

        var d1 = row.insertCell(0);
        var d2 = row.insertCell(1);
        var d3 = row.insertCell(2);
        var d4 = row.insertCell(3);

        d1.innerHTML = dataObject.id;
        d2.innerHTML = dataObject.amount;
        d3.innerHTML = dataObject.currency;
        d4.innerHTML = dataObject.since;
        */

    }

    function setOffers() {

        var amount = $('#sellInputField').get(0).value;
        var title = "Offer set: " + amount;
        alert(title);

        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=sell&amount=' + amount + '&apikey=' + apikey,

            'success': function (dataString) {
                respondString = JSON.parse(dataString);

                console.log(respondString);
            }

        });
    }

//TO-DO: test function

    function buyOffer() {

        var offerID = $('#offerID').get(0).value;
        console.log(offerID);


        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=buy&offer=' + offerID + '&apikey=' + apikey,

            'success': function (data) {
                JSONData = JSON.parse(data);

                console.log(JSONData);

                var offerID = JSONData.data.id;
                var offerCurrency = JSONData.data.offerCurrency;
                var buyCurrency = JSONData.data.buyCurrency;
                var amount = JSONData.data.amount;
                var offerTime = JSONData.data.offerTime;
                var buyTime = JSONData.data.buyTime;

                alert(offerID + offerCurrency + buyCurrency + amount + offerTime + buyTime);

            }
        });
    }

    function getExchangeRate() {

        $('#exchangeTbl').empty();
        var fromCurrencySelectBox = $('#fromCurrency');
        fromCurrencySelectBox.empty();
        var toCurrencySelectBox = $('#toCurrency');
        toCurrencySelectBox.empty();

        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=offers&apikey=' + apikey,

            'success': function (dataString) {
                returnJSON = JSON.parse(dataString);

                console.log(returnJSON);

                //getCurrencyList();
                var list = getCurrencyList();
                var fromCurrencySelectBox = $('#fromCurrency');
                var toCurrencySelectBox = $('#toCurrency');

                setExchangeSelectBox(list, fromCurrencySelectBox);
                setExchangeSelectBox(list, toCurrencySelectBox);

            }
        });

    }

    function setExchangeSelectBox(list, currencySelectBox){

        var myCurrency = "<option>JEFF0310</option>";
        currencySelectBox.append(myCurrency);

        for(i = 0; i < list.length; i++){
            var option = "<option>" +list[i] + "</option>";
            currencySelectBox.append(option);
        }
    }

    function calculateExchangeRate() {
        //clear #exchangeAmount
        $('#exchangeAmount').empty();

        //Get text from Select-box and show 'em
        var fromCurrencyBox = $('#fromCurrency').get(0);
        var fromCurrency = fromCurrencyBox.options[fromCurrencyBox.selectedIndex].text;
        var toCurrencyBox = $('#toCurrency').get(0);
        var toCurrency = toCurrencyBox.options[toCurrencyBox.selectedIndex].text;

        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=exchange_' +
            'rate&from=' + fromCurrency + '&to=' + toCurrency + '&apikey=' + apikey,

            'method': 'GET',

            'data': {
                "fromCurrency": fromCurrency,
                "toCurrency": toCurrency
            },


            'success': function (data) {
                JSONCalculatedExchangeRate = JSON.parse(data);

                var amount = JSONCalculatedExchangeRate.data.amount;
                $('#exchangeAmount').append("Excheange Rate: " + amount);
            }

        });
    }

//get list of distinct currencies from getAllOffers
    function getCurrencyList() {

        var array = uniques(returnJSON.data);

        function uniques(arr) {
            var a = [];
            for (i = 0, l = arr.length; i < l; i++)
                if (a.indexOf(arr[i].currency) === -1 && arr[i] !== '')
                    a.push(arr[i].currency);
            return a;
        }


        for (i = 0; i < array.length; i++) {
            setCurrencyElement(array[i])
        }

        console.log(array);

        return array;

    }

    function setCurrencyElement(currency) {

        //var exchangeRateListElement = document.createElement("li");

        var rowExchangeCurrency = "<tr class='a'>" +
            "<td>" + currency + "</td>" +
            "</tr>";

        $('#exchangeTbl').append(rowExchangeCurrency);

        /*
        exchangeRateListElement.appendChild(document.createTextNode(dataObject));
        list.appendChild(exchangeRateListElement);
        */

    }

    function getCurrencyElement(){
        var table = $('#exchangeTbl');
        //var cells = document.querySelectorAll(table +'td');
        array = [];

        for (i = 0; i < table.cells.length; i++){
            array.append(table.cells.item(i));
            //array[i].addEventListener('click', logText);
        }

        console.log(array.length);
    }

//TO-DO: OK, check UI

    function getAccountInfo() {
        $.ajax({

            'url': 'http://52.57.228.6/man2API/php/BankPhp.php?what=account_info&apikey=' + apikey,

            'success': function (data) {
                JSONdata = JSON.parse(data);
                console.log(JSONdata);

                var user = JSONdata.user.name;

                var amount = JSONdata.data[0].amount;
                var currency = JSONdata.data[0].currency;

                $('#PUser').text("You're logged in as " + user);
                $('#PAmount').text("amount: " + amount);
                $('#Pcurrency').text("Your currency: " + currency);

            }

        });
    }


//TO-DO: check update
    function startRefresh(){
        $.get('', function(data){
            var current = $(this)
            //$(document.body).html(data);
            //$(document.body).html(data);
        });
    }
$(function(){
    setTimeout(startRefresh, 5000);
});