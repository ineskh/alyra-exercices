let eth = 2;
let ethdollars = 100;
let cdtX = 100;//dai


function Collateralisation (){
    
let result = (eth*ethdollars/cdtX)*100; //valeur du depot par apport a la valeur de la dette

console.log(" Collateralisation --> " , result, "%");
}

function Liquidation() {

let liquid = cdtX*(150/100);

console.log(" Liquidation (collaterale vaut -->) ", liquid, " $");

let etherprice =  liquid/eth;

console.log(" Prix de liquidation ether --> ", etherprice, " $");
return etherprice;
}

function EnCasDeLiquidation (){
    console.log("En cas de liquidation "); 
    //console.log("Le makerDAO vent tes ethers au pris ", Liquidation(), " $ ");


    let cout = cdtX+cdtX*(10+3)/100;
    let OwnerDAI = cdtX*(150/100)-cout;  
    let loss = ethdollars*eth - cout;
    console.log("Le cout (on vend) --> ", cout , "$", " Ce qui reste pour le owner --> ", OwnerDAI ,"$" , " et les ", cdtX , " DAI de départ", " et il a perdu ", loss, "$" );
    let ownerEther = OwnerDAI*eth/150;
    console.log("ce qui lui reste d'ether = ", ownerEther); 
    return ownerEther;
    
}

function Nette (){
    let prixEther = 150/eth; 

    let x= cdtX/prixEther + EnCasDeLiquidation();
    console.log("Nette = " , x  ); 
}



Collateralisation();

Liquidation();

EnCasDeLiquidation();

Nette();