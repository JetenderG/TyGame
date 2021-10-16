const keys = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","space"];
const letterContainer = document.querySelector('.letters-container')
const pargraphContainer = document.querySelector(".paragraph-data")
const lettersPressed = document.querySelectorAll('key');
const generateText = document.querySelector('.generateText')
const typingContainer = document.querySelector(".typing-container");
keys.forEach(element => {

    let letter = document.createElement('button');
    letter.setAttribute("class", "key")
    letter.setAttribute("id", `${element}`)
    letter.textContent = element;

    letterContainer.appendChild(letter)
});



let word_find_test = "Good Morning";
let word_empty_arg = [];
let createEmptyWordArg = (word) =>{
    for (let i = 0; i < word.length; i++){
    }   
}
createEmptyWordArg(word_find_test)

let checkTyping = (text, word) =>{
    
    let countWord = word.length;

    
}


generateText.addEventListener('click', ()=>{
    console.log("sfse")
  fetch("/api/facts")
  .then(response => response.json())
  .then(data => {
      pargraphContainer.append(data.sentence)
      document.addEventListener('keydown', (event)=>{        

        if (keys.includes(event.key) || event.key === " "){
            console.log(event.key)
            let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
            pressedKey.classList.add("button_active")
    
            typingContainer.append(event.key)
        }
    })
    document.addEventListener('keyup', (event)=>{
        if (keys.includes(event.key) || event.key === " "){
            let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
            pressedKey.classList.remove("button_active")
        }
    })


  });
})
