const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "space"];
const letterContainer = document.querySelector('.letters-container');
const pargraphContainer = document.querySelector(".paragraph-data");
const lettersPressed = document.querySelectorAll('key');
const generateText = document.querySelector('.generateText');
const typingContainer = document.querySelector(".typing-container");
const btnGenerate = document.querySelector('.generateText');
const userTyped = document.querySelector(".user-text");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const milElement = document.getElementById("mil");
//This is where we populate the page with letters and symbols respresenting the keys from the array from which represents the keyboard

let timerState = true;

let outcome = (toCheck) =>{
    let errSG = 0;
    timerState = false;
    console.log(document.querySelectorAll(".errorCharacter").length)
}

let timer = () =>{
   // millseconds variable as well
    let oldestDate  = Date.now() // gives us millseconds
    let secondsDuration = Math.floor(oldestDate / 1000); 
    let secs = 0; 
    let mins = 0;
    const interval = 1000
    setInterval(() => {
        let present = Math.floor(Date.now() - oldestDate)
        console.log(present)
        if (present >= 1000){
            console.log("hefsfesf")
            secs++;
            milElement.innerHTML = String(present).slice(0,1)
           // secs <= 9 ?  `"0${secs}` : secs;
            secElement.innerHTML =  secs <= 9 ?  `0${secs}` : secs;
            if (secs === 60){
                secs = 0;
                mins++
            minElement.innerHTML = mins <= 9 ?  `0${mins}` : mins;
            }
        }

      

        oldestDate = oldestDate + interval  
        
    //    secElement.innerHTML = secs;
         console.log(secs)
    }, interval);
}

let revealIssue = (arg) => {
    console.log("Invoked the realIssue function")
    console.log(arg)
    userTyped.innerHTML = ""
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
                revealIssue(data)
            })
    }
}
let looped = (typed, word) => {
    let errorResults = [];
    console.log("Looped Invoked")
    if (typed.length === 0) {
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
                break;
        }
    }
    return Promise.resolve(errorResults);
}
let replaceCharacter = (arg, typed) => {
    let reConstructive = typed.split("");
    arg.forEach(char => {
        let newCharacter = document.createElement("span");
        newCharacter.classList.add("errorCharacter")
        newCharacter.textContent = char.letter;
        reConstructive[char.index] = newCharacter
    });
    return Promise.resolve(reConstructive);
}
keys.forEach(element => {
    let letter = document.createElement('button');
    letter.setAttribute("class", "key")
    letter.setAttribute("id", `${element}`)
    letter.textContent = element;
    letterContainer.appendChild(letter)
});
generateText.addEventListener('click', () => {
    btnGenerate.disabled = true;
    fetch("/api/facts")
        .then(response => response.json())
        .then(data => {
            timer();
            pargraphContainer.textContent = data.sentence
            document.addEventListener('keydown', (event) => {
                console.log(data, userTyped.textContent)
                if (keys.includes(event.key) || event.key === " ") {   
                console.log( userTyped.textContent.length , data.sentence.length )      
            if ( userTyped.textContent.length >= data.sentence.length ){
             return   outcome(userTyped.textContent)
            }
                    let pressedKey = document.querySelector(`#${event.key === " " ? "space" : event.key }`);
                    pressedKey.classList.add("button_active")
                    userTyped.append(event.key)
                } else if (event.key === "Backspace") {
                    let userWritten = userTyped.textContent;
                    userTyped.textContent = userWritten.substring(0, userWritten.length - 1)
                }
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