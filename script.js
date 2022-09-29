//==STEP PLAN ==//
// 1. function for player and dealer
// 2. create and shuffle deck
// 3. draw cards for player and dealer
// 4. winning conditions
// 5. did anyone get 21?
// 6. otherwise, higher hand value
// 7. display hands and declare winner

//==GLOBAL VARIABLES==//
//== GAME MODES==//
var GAME_START = "begin";
var GAME_CARDS_DRAWN = "dealing";
var GAME_RESULTS_SHOWN = "results";
var GAME_HIT_OR_STAND = "hit or stand";
var currentGameMode = GAME_START;

//==STORE HANDS==//
var playerHand = [];
var dealerHand = [];

//==GAME DECK==//
var gameDeck = [];

//==CREATING AN EMPTY DECK==//
var createDeck = function () {
  // deck array
  var deck = [];
  // for 'while loop' to create suits for cards
  var suits = ["♦️", "♣️", "❤️", "♠️"];
  var indexSuits = 0;
  while (indexSuits < suits.length) {
    var currentSuit = suits[indexSuits];
    var indexRanks = 1;
    while (indexRanks <= 13) {
      var cardName = indexRanks;
      if (cardName == 1) {
        cardName = "Ace";
        // define ace value as 11 all the way. if handValue > 10, -11 to total value
        // vs. coding a function to redefine the value for ace
      }
      if (cardName == 11) {
        cardName = "Jack";
      }
      if (cardName == 12) {
        cardName = "Queen";
      }
      if (cardName == 13) {
        cardName = "King";
      }
      var card = {
        name: cardName,
        suit: currentSuit,
        rank: indexRanks,
      };
      deck.push(card);
      indexRanks = indexRanks + 1;
    }
    indexSuits = indexSuits + 1;
  }
  return deck;
};
//==GENERATE RANDOM NUMBER==//
var getRandomIndex = function (size) {
  return Math.floor(Math.random() * size);
};

// Function that shuffles a deck, used by createNewDeck function
var shuffleDeck = function (cards) {
  var index = 0;
  while (index < cards.length) {
    var randomIndex = getRandomIndex(cards.length);
    var currentItem = cards[index];
    var randomItem = cards[randomIndex];
    cards[index] = randomItem;
    cards[randomIndex] = currentItem;
    index = index + 1;
  }
  return cards;
};

// Function that creates and shuffles a deck
var createNewDeck = function () {
  var newDeck = createDeck();
  var shuffledDeck = shuffleDeck(newDeck);
  return shuffledDeck;
};

//==BLACKJACK=//
var checkBlackJack = function (handArray) {
  //check player hand
  var playerCardOne = handArray[0];
  var playerCardTwo = handArray[1];
  var isBlackJack = false;

  //if there is blackjack, return true
  if (
    (playerCardOne.name == "Ace" && playerCardTwo.rank >= 10) ||
    (playerCardOne.rank >= 10 && playerCardTwo.name == "Ace")
  ) {
    isBlackJack = true;
  }
  return isBlackJack;
};

//==CALCULATE HAND==//
var calculateTotalHandValue = function (handArray) {
  var totalHandValue = 0;
  var aceCounter = 0;
  //loop through player / dealer hand and add up values
  var index = 0;
  while (index < handArray.length) {
    var currentCard = handArray[index];
    if (
      currentCard.name == "Jack" ||
      currentCard.name == "Queen" ||
      currentCard.name == "King"
    ) {
      totalHandValue = totalHandValue + 10;
    } else if (currentCard.name == "Ace") {
      totalHandValue = totalHandValue + 11;
      aceCounter = aceCounter + 1;
    } else {
      totalHandValue = totalHandValue + currentCard.rank;
    }
    index = index + 1;
  }
  index = 0;
  while (index < aceCounter) {
    if (totalHandValue > 21) {
      totalHandValue = totalHandValue - 10;
    }
    index = index + 1;
  }
  return totalHandValue;
};

//==DISPLAY HANDS==//
var displayPlayerAndDealerHands = function (playerHandArray, dealerHandArray) {
  var playerMessage = `Your hand: <br>`;
  var index = 0;
  while (index < playerHandArray.length) {
    playerMessage =
      playerMessage +
      playerHandArray[index].name +
      " of " +
      playerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  var dealerMessage = `Dealer's hand: <br>`;
  var index = 0;
  while (index < dealerHandArray.length) {
    dealerMessage =
      dealerMessage +
      dealerHandArray[index].name +
      " of " +
      dealerHandArray[index].suit +
      "<br>";
    index = index + 1;
  }
  return playerMessage + "<br>" + dealerMessage + "<br>";
};

//== DISPLAY TOTAL HANDS==//
var displayHandTotalValues = function (playerHandValue, dealerHandValue) {
  var totalHandValueMessage =
    "<br>Player total hand value: " +
    playerHandValue +
    "<br>Dealer total hand value: " +
    dealerHandValue;
  return totalHandValueMessage;
};

var main = function (input) {
  var outputMessage = "";
  //FIRST CLICK - DEAL
  if (currentGameMode == GAME_START) {
    //CREATE GAME DECK
    gameDeck = createNewDeck();
    //DEAL 2 CARDS TO PLAYER AND DEALER
    playerHand.push(gameDeck.pop());
    playerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    dealerHand.push(gameDeck.pop());
    //GAME MODE
    currentGameMode = GAME_CARDS_DRAWN;
    //RETURN OUTPUT MESSAGE
    outputMessage =
      "All cards are dealt. Are you feeling lucky?<br><br><img src = https://c.tenor.com/Ez15J7SPv-YAAAAM/money-show.gif/><br>Click on the MONEY MONEY 🤑 button to see all hands.";
    return outputMessage;
  }
  //SECOND CLICK - BLACKJACK?
  if (currentGameMode == GAME_CARDS_DRAWN) {
    // CHECK FOR BLACKJACK
    var playerHasBlackJack = checkBlackJack(playerHand);
    var dealerHasBlackJack = checkBlackJack(dealerHand);
    if (playerHasBlackJack == true || dealerHasBlackJack == true) {
      // PLAYER DEALER HAS BLACKJACK = TIE
      if (playerHasBlackJack == true && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br> Its a blackjack tie!" +
          "<img src=https://c.tenor.com/rnED_ARUXo4AAAAM/danielcraig-bond.gif>" +
          "<br>So close! Ready for another round?";
      }
      // PLAYER HAS BLACKJACK > PLAYER WINS
      else if (playerHasBlackJack == true && dealerHasBlackJack == false) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>BlackJack!" +
          "<img src=https://c.tenor.com/46dxApXEHh0AAAAM/smug-daniel-craig.gif>" +
          "<br>Lets get rolling 🤑";
      }
      // DEALER HAS BLACKJACK > DEALER WINS
      else if (playerHasBlackJack == false && dealerHasBlackJack == true) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "<br>Dealer has BlackJack!" +
          "<img src=https://c.tenor.com/Y9uTBpcI_28AAAAM/really-daniel-craig.gif>" +
          "<br>Play again?";
      }
      currentGameMode = GAME_START;
      playerHand = [];
      dealerHand = [];
    } else {
      outputMessage =
        displayPlayerAndDealerHands(playerHand, dealerHand) +
        "<br" +
        "There is no black jack!" +
        "<br" +
        "Please click on HIT or STAND button to continue playing.";
      currentGameMode = GAME_HIT_OR_STAND;
    }
    // OUTPUT MESSAGE
    return outputMessage;
  }

  // THIRD CLICK
  if (currentGameMode == GAME_HIT_OR_STAND) {
    //HIT
    if (input == "hit" || input == "HIT") {
      // CALCULATE HANDS
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      playerHand.push(gameDeck.pop());
      outputMessage = `${displayPlayerAndDealerHands(
        playerHand,
        dealerHand
      )} <br> You drew another card. <br> Click HIT or STAND button if you would like to draw another.`;
    }
    //STAND
    else if (input == "stand" || input == "STAND") {
      // CALCULATE HANDS
      var playerHandTotalValue = calculateTotalHandValue(playerHand);
      var dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      // DEALERS HAND
      while (dealerHandTotalValue < 17) {
        dealerHand.push(gameDeck.pop());
        dealerHandTotalValue = calculateTotalHandValue(dealerHand);
      }
      // SAME VALUE = TIE
      if (
        playerHandTotalValue == dealerHandTotalValue ||
        (playerHandTotalValue > 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "It is a tie!" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          "<img src = https://c.tenor.com/P5DB2iGAecsAAAAi/peach-cat.gif/>" +
          "<br>Click on the DEAL button to restart";
      }
      // PLAYER VALUE > DEALER VALUE = PLAYER WINS
      else if (
        (playerHandTotalValue > dealerHandTotalValue &&
          playerHandTotalValue <= 21) ||
        (playerHandTotalValue <= 21 && dealerHandTotalValue > 21)
      ) {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Player wins!" +
          "<br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          "<br>" +
          "<img src = https://c.tenor.com/IgknKg_YnbgAAAAd/fluffy-cute.gif/>" +
          "<br>Think you can beat the Dealer again? Click on the DEAL button to try!";
      }
      // DEALER VALUE > PLAYER VALUE = DEALER WINS
      else {
        outputMessage =
          displayPlayerAndDealerHands(playerHand, dealerHand) +
          "Dealer wins!" +
          "<br>" +
          displayHandTotalValues(playerHandTotalValue, dealerHandTotalValue) +
          "<br>" +
          "<br>" +
          "<img src = https://c.tenor.com/CvUVf5IfFS8AAAAM/dog-fail.gif/>" +
          "<br>You snooze, you lose! <br> Better luck next time...or not? Click on the DEAL button to play again!";
      }
      currentGameMode = GAME_START;
      playerHand = [];
      dealerHand = [];
    }
    return outputMessage;
  }
};

