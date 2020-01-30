
function ConvertDecimalToHexadecimalBigEndian(number){
let base = 16;
let divnumber=number;
let quotient = 0;
let reste=0;
let resultat='';


do {
    quotient = Math.floor(divnumber/base);
    reste=divnumber % base;

    if (reste == 10){
        reste = 'A';
    }else if (reste == 11){
        reste = 'B';
    }else if (reste == 12){
        reste = 'C';      
    }else if (reste == 13){
        reste = 'D';
    }else if (reste == 14){
        reste = 'E';
    }else if (reste == 15){
        reste = 'F';
    }
  
    resultat = reste + resultat;
    divnumber = quotient;

} while (quotient != 0)

if (resultat.length % 2 == 1){
    resultat = '0' + resultat;
}
return resultat

}

function ConvertDecimalToHexadecimalLittleEndian(number){
    let base = 16;
    let divnumber=number;
    let quotient = 0;
    let reste=0;
    let resultat='';
    let i = 0;
    let byte = '';
    
    do {
        i++;
        quotient = Math.floor(divnumber/base);
        reste=divnumber % base;
    
        if (reste == 10){
            reste = 'A';
        }else if (reste == 11){
            reste = 'B';
        }else if (reste == 12){
            reste = 'C';      
        }else if (reste == 13){
            reste = 'D';
        }else if (reste == 14){
            reste = 'E';
        }else if (reste == 15){
            reste = 'F';
        }
       byte = reste + byte;

       if  (i == 2 || quotient == 0){
           if (byte.length != 2){
               byte =  '0' + byte;
           }
           resultat = resultat + byte;
           byte = '';
           i=0;

       }

        divnumber = quotient;
    
    } while (quotient != 0)
    
    return resultat
    
    }

console.log(ConvertDecimalToHexadecimalBigEndian(466321))
console.log(ConvertDecimalToHexadecimalLittleEndian(466321))