
//version sans utiliser les fonctions du langage comme c'est indiqué dans le cours
    function ConvertDecimalToHexadecimalVariableLittleEndian(number){

        if (parseInt(number,10) !== number){
            //is not a decimal
            return undefined;
        }

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
         
        return resultat
        
        }

        function Version2ConvertDecimalToHexadecimalVariableLittleEndian(number){

            if (parseInt(number,10) !== number){
                //is not a decimal
                return undefined;
            }
            
            let hexa = number.toString(16)
            if (hexa.length % 2 == 1){
                hexa = "O" + hexa;
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

        }
       

console.log(ConvertDecimalToHexadecimalVariableLittleEndian(466321))
console.log(Version2ConvertDecimalToHexadecimalVariableLittleEndian(466321))

console.log(ConvertDecimalToHexadecimalVariableLittleEndian(255))
console.log(Version2ConvertDecimalToHexadecimalVariableLittleEndian(255))
