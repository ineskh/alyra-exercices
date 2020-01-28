
let CryptoJS = require("crypto-js")
let bs58 = require('bs58')
 


/*function RandomNumberavecApi() {
   
    tab = new Uint8Array(32);
    window.crypto.getRandomValues(tab);
    privateKey = "";
    for (i = 0; i < tab.length; i++) {
        if (tab[i].toString(16).length % 2 == 1) {
            
            privateKey = privateKey + "0" + tab[i].toString(16);
        } else {
            privateKey = privateKey + tab[i].toString(16);

        }      

    }
    document.getElementById("randomNumberValue").value = privateKey;
    //let result = GenerateBitcoinAddress(privateKey);
    //document.getElementById("address").value = result;
    return privateKey;

}
*/
function RandomNumber() {
   
    tab = new Uint8Array(32);
    let privateKey = "";

    for (i = 0; i < tab.length; i++) {

        let random = Math.floor(Math.random() * Math.floor(256)).toString(16);

        if (random.length % 2 == 1) { 
            
            privateKey = privateKey + "0" + random.toString(16);

        } else {

            privateKey = privateKey + random.toString(16);

        }
    }
    console.log("Voici ma clé privée ",privateKey);
    return privateKey;

}



function GenerateBitcoinAddress(privateKey) {

   
    let hash = CryptoJS.SHA256(privateKey)  
   
    let hash160  = CryptoJS.RIPEMD160(hash);

    hash160 = "00"+ hash160.toString();

    let doubleHash = CryptoJS.SHA256(CryptoJS.SHA256((hash160)));

    let controle = doubleHash.toString().substring(0,8);

    let result = hash160.toString() + controle.toString();

    let bytes = Buffer.from(result, 'hex')

    let  address = bs58.encode(bytes);

    console.log("Voici mon adresse = ", address);

    return address;
}

let privateKey = RandomNumber()
GenerateBitcoinAddress(privateKey)