const alphabet = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"];
const letterContainer = document.querySelector('.letters-container')


alphabet.forEach(element => {

    let letter = document.createElement('button');
    
    letter.textContent = element;

    letterContainer.appendChild(letter)
});