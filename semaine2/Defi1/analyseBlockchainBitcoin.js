function convertTo(){
    if (document.getElementById("select").value == "Decimal"){
        document.getElementById("decimal").value = document.getElementById("number").value;
        decimalToHexadecimal();
        decimalToBinaire();

    }
}

function decimalToHexadecimal() {
    var decimal = document.getElementById("number").value

    if (isDecimal(decimal)) {
        var hexa = parseInt(decimal, 10).toString(16);
        document.getElementById("hexadecimal").value = hexa;
    }
}

function decimalToBinaire() {
    var decimal = document.getElementById("number").value

    if (isDecimal(decimal)) {
        binaire = parseInt(decimal, 10).toString(2);
        document.getElementById("binaire").value = binaire;
    }
}


function isDecimal(dec) {

    var d = parseInt(dec, 10);
    return (d == dec);
}

function hexadecimaltoDecimal() {

    var hexa = document.getElementById("number").value;

    if (!isHexa(hexa)) {

        alert(" " + hexa + " is not an Hexadecimal")

    } else {

        var dec = parseInt(hexa, 16).toString(10);
        document.getElementById("number").value = dec;

    }

}

function isHexa(hexa) {

    var h = parseInt(hexa, 16).toString(16);

    return (h == hexa);
}
