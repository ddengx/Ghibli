let clickAudio = new Audio('audio/click.wav');
let matchAudio = new Audio('audio/match.wav');
let winAudio = new Audio('audio/win.wav')

// Attaches an mouseclick listener to a card (i.e. onclick), flips the card when clicked, and calls the function 'onCardFlipped' after the flip is complete.

// The 'cardObject' parameter is a custom card object we created in the 'createCards' function.

// This function will make the card element associated with 'cardObject' clickable and call onCardFlipped with that cardObject after the flip is complete. */

function flipCardWhenClicked(cardObject) {
  // Adds an "onclick" attribute/listener to the element that will call the function below.
  cardObject.element.onclick = function() {
    // Card is already flipped, return.
    if (cardObject.element.classList.contains("flipped")) {
      return;
    }
  
    // Play the "click" sound.
    clickAudio.play();

    // Add the flipped class immediately after a card is clicked.
    cardObject.element.classList.add("flipped");

    // Wait 500 milliseconds (1/2 of a second) for the flip transition to complete and then call onCardFlipped.
    setTimeout(function() {
      // THE CODE BELOW RUNS AFTER a 500ms delay.
      onCardFlipped(cardObject);
    }, 500);
  };
}

/* Set up the game. This functions calls createCards() and adds onclicks to each card created. */
function setUpGame() {
	let cardObjects = 
		createCards(document.getElementById("card-container"), shuffleCardImageClasses());

	if (cardObjects != null) {
		for (let i = 0; i < cardObjects.length; i++) {
			flipCardWhenClicked(cardObjects[i]);
		}
	}
}