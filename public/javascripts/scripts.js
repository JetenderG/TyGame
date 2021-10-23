const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "space"];
const letterContainer = document.querySelector('.letters-container');
const pargraphContainer = document.querySelector(".paragraph-data");
const lettersPressed = document.querySelectorAll('key');
const generateText = document.querySelector('.generateText');
const typingContainer = document.querySelector(".typing-container");
const btnGenerate = document.querySelector('.generateText');
const userTyped = document.getElementsByClassName("user-text")[0];

//This is where we populate the page with letters and symbols respresenting the keys from the array from which represents the keyboard
keys.forEach(element => {

    let letter = document.createElement('button');
    letter.setAttribute("class", "key")
    letter.setAttribute("id", `${element}`)
    letter.textContent = element;

    letterContainer.appendChild(letter)
});



let compareCharacterAt = (txt_char, word_char) =>{
    console.log(txt_char, word_char)
    switch (txt_char === word_char){
        case true:
             break;
        case false:
            console.log("he")
            let regex = new RegExp(`[${txt_char}]` )
            console.log(regex)
            userTyped.textContent.replace(regex, `<span style = "color:red">${txt_char}</span>`)
            break;   
        }
}

let checkTyping = (text, word) => {
    console.log(String(text), word)
    if(text === word){
        alert("good")
    }
    for (let i = 0; i < text.length; i++){
        console.log("Looped")
        compareCharacterAt(text[i],word[i])
    }


}


generateText.addEventListener('click', () => {
    btnGenerate.disabled = true;
    fetch("/api/facts")
        .then(response => response.json())
        .then(data => {
            pargraphContainer.append(data.sentence)
            document.addEventListener('keydown', (event) => {
                console.log(event.key)
                if (keys.includes(event.key) || event.key === " ") {
                    console.log(userTyped)
                    let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
                    pressedKey.classList.add("button_active")

                    userTyped.append(event.key)
                } else if (event.key === "Backspace") {
                    let userWritten = userTyped.textContent;
                   userTyped.textContent = userWritten.substring(0, userWritten.length - 1)

                }

                            checkTyping(userTyped.textContent, data.sentence)

            })



            document.addEventListener('keyup', (event) => {
                if (keys.includes(event.key) || event.key === " ") {
                    let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
                    pressedKey.classList.remove("button_active")
                }
            })


        });
})