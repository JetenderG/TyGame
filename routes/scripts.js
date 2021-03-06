const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "space"];
const letterContainer = document.querySelector('.letters-container');
const pargraphContainer = document.querySelector(".paragraph-data");
const lettersPressed = document.querySelectorAll('key');
const generateText = document.querySelector('.generateText');
const typingContainer = document.querySelector(".typing-container");
const btnGenerate = document.querySelector('.generateText');
const userTyped = document.getElementsByClassName("user-text")[0];
let typeOfEvent;
//This is where we populate the page with letters and symbols respresenting the keys from the array from which represents the keyboard

/Mobi|Android/i.test(navigator.userAgent) ? typeOfEvent = "touch" : typeOfEvent ="click";



let checkTyping = (text, word) => {
    console.log("Checking Typing Alert")
    console.log(String(text), word)
    let userText = text.textContent;
    let wordText = word.sentence;
    for (let i = 0; i < userText.length; i++) {
        console.log("h")
        switch (userText[i] === wordText[i]) {
            case true:
                break;
            case false:
                let span = document.createElement("span");
                //span.className = "incorrectGS";
                span.classList.add("user-text","incorrectGS")
                span.textContent = userText[i]
                replaceChar(text, i, span)
                console.log(span)
                break;
        }
    }
}

let revealIssue = (arg) =>{
    console.log("Invoked the realIssue function")
    arg.forEach(element => {
        userTyped.append(element)
    });

}
let attemptOne = (typed, word) => {
    console.log("AttemptOne function invokeds")
    if (typed.length === 0) {
        console.log("None Typed Yet")
    } else {
        looped(typed, word)
        .then(data => {
         return replaceCharacter(data, typed)  
        })
        .then(data => {
       //     revealIssue(data)
        })
    }

}

let looped = (typed, word) => {
    let errorResults = [];
    console.log(typed, word)
    console.log("Looped Invoked")
    if (typed.length === 0 ){
        return Promise.reject("Error")
    }
    for (let i = 0; i < typed.length; i++) {
        switch (typed[i] === word[i]) {
            case true:
                console.log(typed[i], word[i])
                break;
            case false:
                let errSpell = {
                    letter: typed[i],
                    index: i
                }
                errorResults.push(errSpell)
                console.log(errorResults)
                break;

        }

    }
    return Promise.resolve(errorResults);
}


let replaceCharacter = (arg, typed) =>{
    
    let reConstructive = typed.split("");
    arg.forEach(char => {
        let newCharacter =   document.createElement("span");
            newCharacter.textContent = char.letter;
            console.log(char.index)
            Array
            reConstructive[char.index] = newCharacter

                   

        });
     //    let newString =   reConstructive.join("")
       // console.log(reConstructive)
        return Promise.resolve(reConstructive);
}

let replaceChar = (word, index, element) => {
    console.log("replaceChar working , element name" + element)
    console.log(element)

    let argWord = Array.from(word.textContent);
    argWord[index] = element;
    // word.innerHTML = " ";
    word.append(element);
    console.log(word)
    return word;



}




keys.forEach(element => {
    let letter = document.createElement('button');
    letter.setAttribute("class", "key")
    letter.setAttribute("id", `${element}`)
    letter.textContent = element;
    letterContainer.appendChild(letter)
});


generateText.addEventListener(`${typeOfEvent}`, () => {
    btnGenerate.disabled = true;
    fetch("/api/facts")
        .then(response => response.json())
        .then(data => {
            pargraphContainer.append(data.sentence)
            document.addEventListener(`${typeOfEvent}`, (event) => {
                console.log(event.key)
                if (keys.includes(event.key) || event.key === " ") {
                    let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
                    pressedKey.classList.add("button_active")
                    userTyped.append(event.key)
                } else if (event.key === "Backspace") {
                    let userWritten = userTyped.textContent;
                    userTyped.textContent = userWritten.substring(0, userWritten.length - 1)
                }
                //  checkTyping(userTyped, data)
                attemptOne(userTyped.textContent, data.sentence)
            })
            document.addEventListener('keyup', (event) => {
                if (keys.includes(event.key) || event.key === " ") {
                    let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
                    pressedKey.classList.remove("button_active")
                }
            })
        });
})