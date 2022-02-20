
/* Gameplan:
1. Get input, attempts, and button fields
2. Add event listener to button
3. Function => will create a random number b/w 1 and 10, decrease attempts by 1, and reset after three attempts */

const guess = document.getElementById("number-input");
// ^ guess is the variable for the number input
const attempts = document.getElementById("attempt-number");
// ^ this variable will hold the number of attempts left
const check = document.getElementById("check-button");
// ^ check is the variable for the submission button
const alerts = document.getElementById("messages");
// ^ alerts will give hints and inform user of wins/losses in a div
const reset = document.getElementById("try-again");
// ^ reset is the variable for the try again button that will give user chance to play again

console.log(guess);
console.log(attempts);
console.log(check);
console.log(alerts);
console.log(reset);

//console.log() used to check if variables were received in js

check.addEventListener("click", randomGame);
    

/*check.addEventListener("keyup", function (event) {
        if (event.code === "Enter") {
         event.preventDefault();
         check.click();
        }
 }) */
 /* In the above addEventListener, I tried using a keyup function to allow for user to have the option of pressing
Enter on keyboard to submit input but it is currently not working. For now, it is commented out */

reset.addEventListener("click", () => {
    // this click event of the try again button will reset the following
    check.disabled = false;
    // ^ the check button will be enabled again
    attempts.innerHTML = "3";
    // ^ user will reset back to 3 attempts
    alerts.innerHTML = "<br>";
    /* ^ a break is added within alerts to keep similar div dimensions. Because the win and loss messages 
    take up about two lines, when the try again button is rehidden, without the break the div decreases
    in height by two lines. The break makes the hiding of the try again button during resetting more natural*/
    guess.value = "";
    // ^ the number input field is cleared
    reset.style.visibility = "hidden";
    // the try again button is set to hidden
})

function randomNumber () {
    let number = Math.ceil((Math.random()) * 10);
    return number
    /* ^ this function produces a random number from 1-10. Math.random() returns a random number from 0 to 1,
    not including 1. By multiplying by 10, the range increases to 0 -10, not including 10. Math.ceil() takes 
    rounds the random number to the next highest integer which changes the range to 1 to 10, including 10. For example,
    Math.ceil(0.23) = 1. This will be the main logic used for the number game*/

}

function randomGame () {
    let numAttempts = Number(attempts.innerText);
    // ^ setting an local variable for number of attempts
    if (numAttempts >= 3) {
        number = randomNumber();
        // ^ randomNumber function called to provide random number for the game
        /* ^ At the beginning of each game, numAttempts is 3. Therefore, a new random number
        called "number" will be chosen at the beginning of each game with this if statement.
        The goal of this game is to guess this random number within 3 attempts. */  
    }
    console.log("The random number: ", number);
    // ^ used for checking the random number
    let guesser = guess.value;
    // ^ a local variable for guess
    console.log("Guess: ", guesser);
    // ^ checking if guesser is passing through as guess value



    // the following are if statements for edge cases and input requirements
    if (guesser - Math.floor(guesser) != 0) {
        // ^ by subtracting guesser by it's floor, can determine if there is decimal value(s)
        // if there are decimal value(s) for an input, then it is not a whole number
        alerts.innerHTML = "Please enter a whole number from 1 through 10";
        return
    } // ^ this if statement filters for non-whole numbers
    
    if (guesser < 1 || guesser > 10) {
        alerts.innerHTML= "Please enter a number from 1 through 10";
        return
    } // ^ this if statement acts as a filter for numbers outside of acceptable range
    
    /* if input meets both requirements above then user's guess will be accepted and
    the code will continue to run after this line */

    else {
    numAttempts = numAttempts - 1; 
    // ^ shows that an attempt has been used
    attempts.innerText = numAttempts;
    // ^ reassigns the new numAttempts to interface for user to see
    console.log("number of attempts left: ", numAttempts);
    }
    


    // the following are if statements for win, loss, and intermediate steps in the game
    if (number == guesser) {
        alerts.innerHTML = "Hooray! You've guessed correctly"
        check.disabled = true;
        reset.style.visibility = "visible";
        return
        /* ^ if user guesses correctly at any point, a winning message is shown and game is disabled.
        Also, try again button shows */
    } 
    if (numAttempts == 0 && number !== guesser) {
        alerts.innerHTML = `You've lost. The number was ${number}.  Better luck next time!`
        check.disabled = true;
        reset.style.visibility = "visible";
        return
        /* if user loses, the user is notified of the loss and the winning guess. Game is disabled
        and try again button shows */
    }
    /* if numAttempts is greater than 0, it will pass through the first if statement above and enter
    one of the else if statements below */
    else if (number > guesser) {
        alerts.innerHTML = "Go higher"
        return    
    }
    else if (number < guesser) {
        alerts.innerHTML = "Go lower"
        return
    }
     /* the above two if statements act as hints for the user to either choose a higher or lower 
     guess on their next attempt */
}

