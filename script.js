function createNewCard() {
  // Creating variable to store element
  let cardElement = document.createElement('div');

  // Adding class and children
  cardElement.classList.add('card');
  cardElement.innerHTML = `
    <div class="card-down"></div>
    <div class="card-up"></div>`;

  // Return
  return cardElement;
}
// createNewCardTest();


function appendNewCard(parentElement) {
  // Creating card and appending to parent element
  let cardElement = createNewCard();
  parentElement.appendChild(cardElement);
  return cardElement;
}
// appendNewCardTest();


function shuffleCardImageClasses() {
  // Instantiating card class array and returning it shuffled
  let cardClasses = [
    'image-1', 'image-1', 
    'image-2', 'image-2', 
    'image-3', 'image-3',
    'image-4', 'image-4',
    'image-5', 'image-5',
    'image-6', 'image-6'
  ]

  return _.shuffle(cardClasses);
}
 // shuffleCardImageClassesTest()


function createCards(parentElement, shuffledImageClasses) {
  // Declaring empty array to store card objects
  let arr = [];

  // Looping to instantiate all 12 cards and adding it to the array
  for (let i = 0; i < 12; i++) {
    arr.push({
      index: i,
      element: appendNewCard(parentElement),
      imageClass: shuffledImageClasses[i]
    });
    arr[i].element.classList.add(arr[i].imageClass);
  }

  // Return the full array
  return arr;
}
 // createCardsTest();


function doCardsMatch(cardObject1, cardObject2) {
  // Returns true if card image class matches, false if not
  return (cardObject1.imageClass === cardObject2.imageClass)
    ? true
    : false;
}
 // doCardsMatchTest();

// Global dictionary for flip/match counters
let counters = {};

function incrementCounter(counterName, parentElement) {
  // Increment the counter with the passed in name and change the parent element's innerHTML to reflect changes
  if (counters[counterName] === undefined) counters[counterName] = 0;
  counters[counterName]++;
  parentElement.innerHTML = counters[counterName];
}
 // incrementCounterTest();

// Global variable to keep track of last flipped card
let lastCardFlipped = null;

function onCardFlipped(newlyFlippedCard) {
  // Increment flip counter
  incrementCounter('flips', document.getElementById('flip-count'));

  // If the card is the first flipped
  if (lastCardFlipped === null) {
    lastCardFlipped = newlyFlippedCard;
    return;
  }

  // If the cards match or not
  // Does not match: remove flipped classes, clear last flipped, and return
  // Does match: increment match counter, play audio
  if (!doCardsMatch(lastCardFlipped, newlyFlippedCard)) {
    lastCardFlipped.element.classList.remove('flipped');
    newlyFlippedCard.element.classList.remove('flipped');
    lastCardFlipped = null;
    return;
  } else {
    lastCardFlipped.element.classList.add('glow', 'border-glow');
    newlyFlippedCard.element.classList.add('glow', 'border-glow');
    incrementCounter('matches', document.getElementById('match-count'));
    (counters['matches'] === 6) ? winAudio.play() : matchAudio.play();
  }

  // Reset last card flipped
  lastCardFlipped = null;
}

function resetGame() {
  // Storing card container node
  let cardContainer = document.getElementById('card-container');

  // Remove all children
  while (cardContainer.firstChild) {
    cardContainer.removeChild(cardContainer.firstChild);
  }

  // Resetting counter innerHTMLs
  document.getElementById('flip-count').innerHTML = '0';
  document.getElementById('match-count').innerHTML = '0';

  // Resetting global variables and then set up the game
  counters = {};
  lastCardFlipped = null;
  setUpGame();
}

// Sets the volume of the audio effects
function setVolume() {
  let volume = document.getElementById('volume').value;
  let text = document.querySelector('#slider-value');
  (document.getElementById('volume').value === '0') 
    ? text.innerHTML = `🔇`
    : text.innerHTML = `🔊 ${volume}`;
  clickAudio.volume = volume/100;
  winAudio.volume = volume/100;
  matchAudio.volume = volume/100;
}

// Set up the game
setUpGame();