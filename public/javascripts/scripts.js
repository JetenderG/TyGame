const keys = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "space"];
const letterContainer = document.querySelector('.letters-container');
const pargraphContainer = document.querySelector(".paragraph-data");
const lettersPressed = document.querySelectorAll('deviceEventType');
const generateText = document.querySelector('.generateText');
const typingContainer = document.querySelector(".typing-container");
const btnGenerate = document.querySelector('.generateText');
const userTyped = document.querySelector(".user-text");
const minElement = document.getElementById("min");
const secElement = document.getElementById("sec");
const milElement = document.getElementById("mil");
const generatedWord = document.querySelector(".generatedWord");
let typeOfEvent;
let deviceEventType;

//Check the device type
//For example if its a touch device it would choose the touchstart event
/Mobi|Android/i.test(navigator.userAgent) ? typeOfEvent = "touchstart" : typeOfEvent ="click";

//This is where we populate the page with letters and symbols respresenting the keys from the array from which represents the keyboard

let timerState = true;

let outcome = (toCheck) =>{
    let errSG = 0;
    timerState = false;
    console.log(document.querySelectorAll(".errorCharacter").length)
}

////////////////////////////////////////////

//Creates a timer in which a millsecond, seconds, and minute are retained and displayed on the screen

let timeA, timeB, timeC,secs,mins,mill;
timeA = timeB = timeC = Date.now();   
let timer = () =>{
    // console.log(Math.floor(Date.now() -timeA) , "milleseconds")
    // console.log(Math.floor((Date.now() -timeB) / 1000), "seconds")
    // console.log(Math.floor((Date.now() -timeC)/ 1000 / 60), "min")
    mill =  String(Math.floor(Date.now() -timeA)).slice(0,2)
    secs = Math.floor((Date.now() -timeB ) / 1000); 
    mins = Math.floor((Date.now() -timeC)/ 1000 / 60); 
    milElement.innerHTML = mill
    secElement.innerHTML =  secs <= 9 ?  `0${secs}` : secs;
    minElement.innerHTML = mins <= 9 ?  `0${mins}` : mins;
    
    if (Math.floor(Date.now() -timeA) >= 1000){
        if (Math.floor((Date.now() - timeB)/ 1000) > 59){
            timeA = timeB = Date.now();
            console.log("this is the double ifs")
        }else{
            timeA = Date.now();
            
            console.log("this is the single ifs")
        }
        
    }
    
}
let invokeTimer = () => setInterval(timer,10);
let stopTimer = clearInterval(invokeTimer)
//////////////////////////////////////////////////////////////////
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
//creates a red character to indicate error
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

//creates a button and other attributes for each letter on the keyboard and spacebar
keys.forEach(element => {
    let letter = document.createElement('button');
    letter.setAttribute("class", "key")
    letter.setAttribute("id", `${element}`)
    letter.textContent = element;
    letter.dataset.letter = element;
    letterContainer.appendChild(letter)
});












generateText.addEventListener(`${typeOfEvent}`, () => {
  //  console.log("GEEEEE")
    btnGenerate.disabled = true;
    fetch("/api/facts")
    .then(response => response.json())
    .then(data => {
        invokeTimer();
        generatedWord.textContent = data.sentence
        document.addEventListener(`${typeOfEvent === "click" ? "keydown" : "touchstart"}`, (event) => {
          deviceEventType = typeOfEvent === "click"? deviceEventType = event.key : deviceEventType = event.target.textContent;
          
          
          
          
          
          console.log(deviceEventType)
            if (keys.includes(deviceEventType) ||   deviceEventType === " ") {   
                console.log( userTyped.textContent.length , data.sentence.length )      
            if ( userTyped.textContent.length >= data.sentence.length ){
             return   outcome(userTyped.textContent)
            }
                console.log(deviceEventType)
            let pressedKey = document.querySelector(`#${deviceEventType === " " ? "space" : deviceEventType }`);
                    pressedKey.classList.add("button_active")
                    userTyped.append(deviceEventType)
                } else if (event.deviceEventType === "Backspace") {
                    let userWritten = userTyped.textContent;
                    userTyped.textContent = userWritten.substring(0, userWritten.length - 1)
                }
                attemptOne(userTyped.textContent, data.sentence)
            })
           
            document.addEventListener(`${typeOfEvent === "click" ? "keyup" : "touchstart"}`, (event) => {
                if (keys.includes(deviceEventType) || deviceEventType === " ") {
                    let pressedKey = document.querySelector(`#${deviceEventType === " " ? "space" : deviceEventType }`);
                    pressedKey.classList.remove("button_active")
                }
            })
        });
})


