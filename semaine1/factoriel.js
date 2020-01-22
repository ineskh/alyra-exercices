

let a = window.prompt("Entrez un entier naturel positif")

function factoriel(a) {

    if(a === 0)
    {
        return 1

    }else{

        resultat =1

        for(i = 2; i <= a; i++) {

            resultat = resultat*i
        }

        return resultat
        
    }
}
    
console.log("Le factoriel de ", a ," est ", factoriel(a))