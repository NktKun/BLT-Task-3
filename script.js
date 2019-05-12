// Игровое поле
const cards = document.querySelectorAll(".card");

var firstCard;
var secondCard;
var lockBoard = false;
var flippedCard = false;
var counter = 0;

startGame();
shuffle();

function startGame() {
    cards.forEach(card => card.addEventListener('click', flipCard));
    
}

function shuffle() {
  cards.forEach(card => {
    var randomColor = Math.floor(Math.random() * 16);
    card.style.order = randomColor;
  });
};

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');
    if (!flippedCard) {
       flippedCard = true;
       firstCard = this;
       return;
    }
    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
  var isMatch = firstCard.dataset.type === secondCard.dataset.type;

  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  counter++;
  if (counter == 8) {
      findTIME();
      alert("Вы выиграли!\nЗатраченное время: " + time);
      location.reload();
    }
  resetBoard();
}

function unflipCards() {
  lockBoard = true;

  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [flippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

//Секундомер
var init = 0;
var startDate;
var clocktimer;
var time;

function startTIME() {
    var thisDate = new Date();
    var t = thisDate.getTime() - startDate.getTime();
    var ms = t%1000; t-=ms; ms=Math.floor(ms/10);
    t = Math.floor (t/1000);
    var s = t%60; t-=s;
    t = Math.floor (t/60);
    var m = t%60; t-=m;
    t = Math.floor (t/60);
    var h = t%60;
    if (h<10) h='0'+h;
    if (m<10) m='0'+m;
    if (s<10) s='0'+s;
    if (ms<10) ms='0'+ms;
    if (init==1) document.clockform.clock.value = h + ':' + m + ':' + s + '.' + ms;
    clocktimer = setTimeout("startTIME()",10);
}

function findTIME() {
    if (init==0) {
        startDate = new Date();
        startTIME();
        init=1;
    } 
    else {
        init = 0;
        clearTimeout(clocktimer);
        time = document.clockform.clock.value;
    }
    return time;
}

function clearFields() {
    init = 0;
    clearTimeout(clocktimer);
    document.clockform.clock.value='00:00:00.00';
}