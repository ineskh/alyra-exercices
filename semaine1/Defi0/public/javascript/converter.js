function decimalToHexadecimal() {
    var decimal = document.getElementById("number").value

    if (!isDecimal(decimal)) {

        alert(" " + decimal + " is not a Decimal")

    } else {

        var hexa = parseInt(decimal, 10).toString(16)
        document.getElementById("number").value = hexa

        var url = "http://numbersapi.com/" + decimal.toString(10)

        document.getElementById("anecdote").value = httpGet(url)
    }
}

function isDecimal(dec) {

    var d = parseInt(dec, 10)
    return (d == dec)
}

function hexadecimaltoDecimal() {

    var hexa = document.getElementById("number").value

    if (!isHexa(hexa)) {

        alert(" " + hexa + " is not an Hexadecimal")

    } else {

        var dec = parseInt(hexa, 16).toString(10)
        document.getElementById("number").value = dec
        var url = "http://numbersapi.com/" + dec.toString(10)

        document.getElementById("anecdote").value = httpGet(url)

    }


}

function isHexa(hexa) {

    var h = parseInt(hexa, 16).toString(16)

    return (h == hexa)
}


function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}



