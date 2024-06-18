// baralho de cartas
const deck = [
  '2-C', '2-D', '2-H', '2-S',
  '3-C', '3-D', '3-H', '3-S',
  '4-C', '4-D', '4-H', '4-S',
  '5-C', '5-D', '5-H', '5-S',
  '6-C', '6-D', '6-H', '6-S',
  '7-C', '7-D', '7-H', '7-S',
  '8-C', '8-D', '8-H', '8-S',
  '9-C', '9-D', '9-H', '9-S',
  '10-C', '10-D', '10-H', '10-S',
  '11-C', '11-D', '11-H', '11-S',
  '12-C', '12-D', '12-H', '12-S',
  '13-C', '13-D', '13-H', '13-S',
  '1-C', '1-D', '1-H', '1-S'
];
 
let playerHand = [];
let dealerHand = [];
let monteBaralho = [];
var saldo;
var bet;
var aposta;
var confirmarAposta = false;
var confirmeCardB = false;

const cardB = 'Back';


var numCartas = 10; 

var cartas = [];
for (var i = 1; i <= numCartas; i++) {
  cartas.push(`cards/BACK.png`);
}

// Função para iniciar o jogo
function startGame() {
  document.getElementById("bet-valor").value = 0;
  confirmarAposta = false;
  adicionarCartas();
  if(confirmarAposta===false){
    playerHand = [dealCard(), dealCard()];
    dealerHand = [dealCard(),backCard()];
    renderPlayerHands();
    renderDealerHands();
  }
  else alert("Conclua sua aposta para fazer um novo jogo!!!")
  calculaPontos()
}

function adicionarCartas() {
  var baralhoDiv = document.querySelector('.baralho');
  cartas.forEach(function(carta, index) {
    var img = document.createElement('img');
    img.src = carta;
    img.alt = "Carta";
    img.style.left = index * 20 + "px";
    baralhoDiv.appendChild(img);
  });
}

function dealCard() {
  const randomIndex = Math.floor(Math.random() * deck.length);
  const card = deck.splice(randomIndex, 1)[0];
  return card;
}


function draw(){
  var saldo = parseFloat(document.getElementById('saldo').innerText);
  var aposta = parseFloat(document.getElementById('bet-valor').value);

  var novoSaldo = saldo + aposta;

  document.getElementById('saldo').innerText = novoSaldo.toFixed(2);

}

function win(){
  var saldo = parseFloat(document.getElementById('saldo').innerText);
  var aposta = parseFloat(document.getElementById('bet-valor').value);

  var novoSaldo = saldo + (aposta * 2);

  document.getElementById('saldo').innerText = novoSaldo.toFixed(2);

}

function deal() {
if(confirmarAposta===false){
  var saldo = parseFloat(document.getElementById('saldo').innerText);
  var aposta = parseFloat(document.getElementById('bet-valor').value);
  
  if (saldo >= aposta && aposta != 0) { 
    var novoSaldo = saldo - aposta; 
    document.getElementById('saldo').innerText = novoSaldo.toFixed(2);
    confirmarAposta = true; 
    //startGame()
  } else if (aposta === 0) {alert("Selecione um valor para aposta!");}
    else{
    alert("Saldo insuficiente para esta aposta!");
    document.getElementById("bet-valor").value = 0;
  }
}
  
}

function selectValue(value) {
  aposta = parseFloat(document.getElementById('bet-valor').value);

  var novaAposta = aposta + value;

  document.getElementById('bet-valor').value = novaAposta.toFixed(2);
}



 

function calculaPontos(){
  document.getElementById('pontosDealer').value= calculateHandValue(dealerHand)
  document.getElementById('pontosJogador').value = calculateHandValue(playerHand)
}

function backCard(){
  const cardB = 'Back';
  confirmeCardB = true
  return cardB;

}
 function baralho(){
  const baralho = 'Back';
  const cardImage = document.createElement('img');
      cardImage.src = `cards/${baralho}.png`; 
      cardImage.alt = baralho;
      cardImage.classList.add('show'); 
      baralhoDiv.appendChild(cardImage);
  
 }

 
function renderDealerHands() {
  const dealerHandDiv = document.querySelector('.dealer-area');
  
  dealerHandDiv.innerHTML = '';
 
  // Mostra apenas a primeira carta do dealer
   /* const firstDealerCard = document.createElement('img');
    firstDealerCard.src = `cards/${dealerHand[0]}.png`; 
    firstDealerCard.alt = dealerHand[0];
    dealerHandDiv.appendChild(firstDealerCard);*/
    dealerHand.forEach((card, index) => {
      const cardImage = document.createElement('img');
      cardImage.src = `cards/${card}.png`; 
      cardImage.alt = card;
      cardImage.classList.add('show'); 
      dealerHandDiv.appendChild(cardImage);
      if(index===1 && confirmeCardB){index--;}
    });

    
  }

function renderPlayerHands() {
  const playerHandDiv = document.querySelector('.jogador-area');
  
  playerHandDiv.innerHTML = '';
 
  playerHand.forEach(card => {
    const cardImage = document.createElement('img');
    cardImage.src = `cards/${card}.png`; 
    cardImage.alt = card;
    cardImage.classList.add('show');
    //cardImage.classList.add('card');
    //cardImage.style.animationDelay = `${index * 0.1}s`;
    playerHandDiv.appendChild(cardImage);
  });

}

function hit() {
  
  if(confirmarAposta===true){
    //puxarCarta();
    playerHand.push(dealCard());
    renderPlayerHands();
    const playerTotal = calculateHandValue(playerHand);
    if (playerTotal > 21) {
      determineWinner();
    }
  }else alert("Faça uma aposta para pedir uma carta !!!");
  calculaPontos()
}
 
function stand() {
  dealerHand.splice(1,1);

  if(confirmarAposta===true){
      confirmeCardB = false;

      while (calculateHandValue(dealerHand) < 17) {
        dealerHand.push(dealCard());
      }
    renderDealerHands();
    determineWinner();

  }else alert ("Faça uma Aposta !!!");
  calculaPontos()
}
 
function calculateHandValue(hand) {
  let total = 0;
  let hasAce = false;
  for (const card of hand) {
    const value = parseInt(card.slice(0, -1));
    if (value > 10) {
      total += 10;
    } else if (value === 1) {
      hasAce = true;
      total += 1; 
    } else {
      total += parseInt(value);
    }
  }
  if (hasAce && total +10 <= 21) {
    total += 10;
  }
  return total;
}
 
function determineWinner() {
  const playerTotal = calculateHandValue(playerHand);
  //alert(playerTotal);
  const dealerTotal = calculateHandValue(dealerHand);
  let result;
  if (playerTotal > 21) {
    result = 'Você perdeu mais de 21. Dealer venceu.';
  } else if (dealerTotal > 21 && playerTotal <= 21) {
    result = 'Você venceu. Dealer mais de 21!!! ';
    win()
  } else if (playerTotal > dealerTotal) {
    result = 'Você venceu.';
    win()
  } else if (playerTotal < dealerTotal) {
    result = 'Dealer venceu.';
  } else {
    result = 'Empatou o Rodada.';
    draw()
   
  }
  const popupMessage = document.getElementById('popup-message');
  popupMessage.textContent = result;
  exibirPopupResultado();

  //alert(dealerTotal);

  document.getElementById("bet-valor").value = 0;
  
}

function exibirPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "block";
}

function fecharPopup() {
  var popup = document.getElementById("popup");
  popup.style.display = "none";
}

function exibirPopupResultado() {
  var popupRes = document.getElementById("popupResultado");
  popupRes.style.display = "block";
}

function fecharPopupResultado() {
  var popupRes = document.getElementById("popupResultado");
  popupRes.style.display = "none";
}


// Função para puxar uma carta
function puxarCarta() {
  var carta = document.querySelector('.baralho');
  baralho.classList.add('puxando'); // Adiciona a classe para iniciar a animação
}


  

document.getElementById('newGame-btn').addEventListener('click', startGame);
document.getElementById('deal-btn').addEventListener('click', deal);
document.getElementById('hit-btn').addEventListener('click', hit);
document.getElementById('stand-btn').addEventListener('click', stand);
 
window.addEventListener('load', startGame);

