function convertTo(){

    let dec = 0;
    if (document.getElementById("select").value == "Decimal"){

        dec = document.getElementById("number").value;

    }else if (document.getElementById("select").value == "Hexadecimal"){

        dec = hexadecimaltoDecimal(document.getElementById("number").value);
    }

    document.getElementById("decimal").value = dec;
    document.getElementById("hexadecimal").value = decimalToHexadecimal(dec);
    document.getElementById("binaire").value = decimalToBinaire(dec);
    document.getElementById("HLE").value = ConvertDecimalToHexadecimalLittleEndian(dec);
    document.getElementById("varInt").value = ConvertDecimalToHexadecimalVariableLittleEndian(dec);

}
function analyse(){
    
    let  f = document.getElementById('file');
    let file = f.files[0];
    fr = new FileReader();
    document.getElementById("jsonfile").value = fr.result;
    



}

function loadFile() {
    var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      var newArr = JSON.parse(lines);
      
      console.log(newArr); 
      
      document.getElementById("json").innerHTML = JSON.stringify(newArr, undefined, 2);
    }
  }

function load() {
    let f = document.getElementById('file').files[0];
    var mydata = f;
    alert(mydata.length);
/*
    var div = document.getElementById('data');

    for(var i = 0;i < mydata.length; i++)
    {
        //div.innerHTML = div.innerHTML + "<p class='inner' id="+i+">"+ mydata[i].name +"</p>" + "<br>";
    }*/
}
function decimalToHexadecimal(decimal) {

    
    if (isDecimal(decimal)) {

        return parseInt(decimal, 10).toString(16);;
    }else{
        alert(" " + decimal + " is not a Decimal")
    }
}

function decimalToBinaire(decimal) {

    if (isDecimal(decimal)) {

        return parseInt(decimal, 10).toString(2);
    }else{
        alert(" " + decimal + " is not a Decimal")
    }

}

function BinaireToDecimal(binaire) {
    
    return  parseInt(binaire, 2).toString(10);

}

function ConvertDecimalToHexadecimalLittleEndian(decimal){

    if (isDecimal(decimal)) {
    
        let hexa = parseInt(decimal, 10).toString(16)
        console.log(hexa)
        if (hexa.length % 2 == 1){
            hexa = "0" + hexa;
        }
        let littleHexa = '';
        let i = hexa.length 
        while (i >= 0){
            littleHexa = littleHexa + hexa.slice(i-2, i); 
            i=i-2;
        }
    
    return littleHexa;
    }else{
        alert(" " + decimal + " is not a Decimal")
    }

}

function ConvertDecimalToHexadecimalVariableLittleEndian(number){


    if (isDecimal(number)) {
    
        let hexa = parseInt(number, 10).toString(16)
        if (hexa.length % 2 == 1){
            hexa = "0" + hexa;
        }
        let littleHexa = '';
        let i = hexa.length 
        while (i >= 0){
            littleHexa = littleHexa + hexa.slice(i-2, i); 
            i=i-2;
        }

        resultat = littleHexa; //on va chercher le varLittle Hexa

        if (number <= 252){

            return resultat;


        }else if (number <= 65535){

            while (resultat.length < 4){

                resultat = resultat + "00";
            } 

            resultat = "fd" + resultat;                

        }else if (number <= 4294967295){

            while (resultat.length < 8){

                resultat = resultat + "00";
            }
            resultat = "fe" + resultat;

        }else if ( number <= 18446744073709552000){

            while (resultat.length < 16){

                resultat = resultat + "00";
            }

        }
    
        return resultat;
    } else{
        alert(" " + number + " is not a Decimal")
    }

}


function isDecimal(dec) {

    var d = parseInt(dec, 10);
    return (d == dec);
}

function hexadecimaltoDecimal(hexa) {


    if (!isHexa(hexa)) {

        alert(" " + hexa + " is not an Hexadecimal")

    } else {

        return parseInt(hexa, 16).toString(10);
    }

}

function isHexa(hexa) {

    var h = parseInt(hexa, 16).toString(16);

    return (h == hexa);
}

 
 
