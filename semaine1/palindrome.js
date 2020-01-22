
let chain = window.prompt("Entrez une phrase")

chain =  chain.toLowerCase()

let phrase = chain.split('')


function palindrome(phrase) {

    for (i = 0; i < Math.floor(phrase.length/2); i++)
    {
        
        if (phrase[i] !== phrase[phrase.length-1]) {

            return false

        }

        
    }
    return true
}

console.log(chain, " : palindrome -> ",  palindrome(chain))