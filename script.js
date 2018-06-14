let suits = ["Hearts", "Clubs", "Diamond", "Spades"];
let values = ["Ace", "King", "Queen", "Jack",
    "Ten", "Nine", "Eight", "Seven", "Six",
    "Five", "Four", "Three", "Two"];

let textArea = document.getElementById('text-area');
let newGameButton = document.getElementById('new-game-button');
let hitButton = document.getElementById('hit-button');
let stayButton = document.getElementById('stay-button');

let gameStarted = false,
    gameFinished = false,
    playerwon = false,
    playerCards = [],
    dealerCards = [],
    playerScore = 0,
    dealerScore = 0,
    deck = [];

hitButton.style.display = 'none';
stayButton.style.display = 'none';
showStatus();

newGameButton.addEventListener('click', function() {
    gameStarted = true;
    gameOver = false;
    playerWon = false;
    
    deck = createDeck();
    shuffleDeck(deck);
    dealerCards = [ getNextCard(), getNextCard() ];
    playerCards = [ getNextCard(), getNextCard() ];
    
    newGameButton.style.display = 'none';
    hitButton.style.display = 'inline';
    stayButton.style.display = 'inline';
    showStatus();
});

hitButton.addEventListener('click', function() {
    playerCards.push(getNextCard());
    checkForEndOfGame();
    showStatus();
  });
  
  stayButton.addEventListener('click', function() {
    gameOver = true;
    checkForEndOfGame();
    showStatus();
  });
  
function createDeck(){
    let deck = [];
    for(let suitIdx = 0; suitIdx < suits.length; suitIdx++){
        for(let valIdx = 0; valIdx < values.length; valIdx++){
            let card = {
                suit: suits[suitIdx],
                value: values[valIdx]
            };
            deck.push(card);
        }
    }
    return deck;
}

function shuffleDeck(deck){
    for(let i = 0; i < deck.length; i++){
        let swapIdx = Math.trunc(Math.random() * deck.length);
        let temp = deck[swapIdx];
        deck[swapIdx] = deck[i];
        deck[i] = temp;
    }
}

function getCardString(card) {
    return card.value + ' of ' + card.suit;
}

function getNextCard() {
    return deck.shift();
}

function updateScores(){
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
}

function getScore(cardArray){
    let score = 0;
    let hasAce = false;
    for(let i = 0; i < cardArray.length; i++){
        card = cardArray[i];
        score += getCardNumericValue(card);
    }
    if(hasAce && score + 10 <= 21){
        return score + 10;
    }
    return score;
    
}

function getCardNumericValue(card){
    switch(card.value){
        case 'Ace':
            return 1;
        case 'Two':
            return 2;
        case 'Three':
            return 3;
        case 'Four':
            return 4;
        case 'Five':
            return 5;
        case 'Six':
            return 6;
        case 'Seven':
            return 7;
        case 'Eight':
            return 8;
        case 'Nine':
            return 9;
        case 'Ten':
            return 10;
        case 'Jack':
            return 11;
        case 'Queen':
            return 12;
        case 'King':
            return 13;
        default:
            return 0;

    }
}

function updateScores() {
    dealerScore = getScore(dealerCards);
    playerScore = getScore(playerCards);
  }
  
  function checkForEndOfGame() {
    
    updateScores();
    
    if (gameOver) {
      // let dealer take cards
      while(dealerScore < playerScore 
            && playerScore <= 21 
            && dealerScore <= 21) {
        dealerCards.push(getNextCard());
        updateScores();
      }
    }
    
    if (playerScore > 21) {
      playerWon = false;
      dealerWon = true;
      gameOver = true;
    }
    else if (dealerScore > 21) {
      playerWon = true;
      dealerWon = false;
      gameOver = true;
    }
    else if (playerScore === dealerScore){
        dealerWon = false;
        playerwon = false;
        gameOver = true;
        //textArea.innerText += "This is a Tie!!!";
    }
    else if (gameOver) {
      
      if (playerScore > dealerScore) {
        playerWon = true;
        dealerWon = false;
      }
      else if (dealerScore > playerScore){
        playerWon = false;
        dealerWon = true;
      }
      else {
          playerwon = false;
          dealerWon = false;
      }
    }
  }
  
  function showStatus() {
    if (!gameStarted) {
      textArea.innerText = 'Welcome to Blackjack!';
      return;
    }
    
    let dealerCardString = '';
    for (let i=0; i < dealerCards.length; i++) {
      dealerCardString += getCardString(dealerCards[i]) + '\n';
    }
    
    let playerCardString = '';
    for (let i=0; i < playerCards.length; i++) {
      playerCardString += getCardString(playerCards[i]) + '\n';
    }
    
    updateScores();
     
    textArea.innerText = 
      'Dealer has:\n' +
      dealerCardString + 
      '(score: '+ dealerScore  + ')\n\n' +
      
      'Player has:\n' +
      playerCardString +
      '(score: '+ playerScore  + ')\n\n';
    
    if (gameOver) {
      if (playerWon) {
        textArea.innerText += "YOU WIN!";
      }
      else if(dealerWon) {
        textArea.innerText += "DEALER WINS";
      }
      else {
          textArea.innerText += "TIE!!!"
      }
      newGameButton.style.display = 'inline';
      hitButton.style.display = 'none';
      stayButton.style.display = 'none';
    }
  
  }