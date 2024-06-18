import "./style.css";
import React,{ useEffect, useState } from 'react';
import carta_back from "./cards/BACK.png";
import C_2 from './cards/2-C.png';
import D_2 from './cards/2-D.png';
import H_2 from './cards/2-H.png';
import S_2 from './cards/2-S.png';

import C_3 from './cards/3-C.png';
import D_3 from './cards/3-D.png';
import H_3 from './cards/3-H.png';
import S_3 from './cards/3-S.png';

import C_4 from './cards/4-C.png';
import D_4 from './cards/4-D.png';
import H_4 from './cards/4-H.png';
import S_4 from './cards/4-S.png';

import C_5 from './cards/5-C.png';
import D_5 from './cards/5-D.png';
import H_5 from './cards/5-H.png';
import S_5 from './cards/5-S.png';

import C_6 from './cards/6-C.png';
import D_6 from './cards/6-D.png';
import H_6 from './cards/6-H.png';
import S_6 from './cards/6-S.png';

import C_7 from './cards/7-C.png';
import D_7 from './cards/7-D.png';
import H_7 from './cards/7-H.png';
import S_7 from './cards/7-S.png';

import C_8 from './cards/8-C.png';
import D_8 from './cards/8-D.png';
import H_8 from './cards/8-H.png';
import S_8 from './cards/8-S.png';

import C_9 from './cards/9-C.png';
import D_9 from './cards/9-D.png';
import H_9 from './cards/9-H.png';
import S_9 from './cards/9-S.png';

import C_10 from './cards/10-C.png';
import D_10 from './cards/10-D.png';
import H_10 from './cards/10-H.png';
import S_10 from './cards/10-S.png';

import C_11 from './cards/11-C.png';
import D_11 from './cards/11-D.png';
import H_11 from './cards/11-H.png';
import S_11 from './cards/11-S.png';

import C_12 from './cards/12-C.png';
import D_12 from './cards/12-D.png';
import H_12 from './cards/12-H.png';
import S_12 from './cards/12-S.png';

import C_13 from './cards/13-C.png';
import D_13 from './cards/13-D.png';
import H_13 from './cards/13-H.png';
import S_13 from './cards/13-S.png';

import C_1 from './cards/1-C.png';
import D_1 from './cards/1-D.png';
import H_1 from './cards/1-H.png';
import S_1 from './cards/1-S.png';
import $ from "jquery";
import {useGetFatecoins} from "../../api/controllers/fatecoins.ts";
import {useSelector} from "react-redux";
import {getUserId} from "../../features/auth/authLogin.ts";

export function Blackjack() {
    const lista = [
        { card: '2-C', img: C_2 },
        { card: '2-D', img: D_2 },
        { card: '2-H', img: H_2 },
        { card: '2-S', img: S_2 },

        { card: '3-C', img: C_3 },
        { card: '3-D', img: D_3 },
        { card: '3-H', img: H_3 },
        { card: '3-S', img: S_3 },

        { card: '4-C', img: C_4 },
        { card: '4-D', img: D_4 },
        { card: '4-H', img: H_4 },
        { card: '4-S', img: S_4 },

        { card: '5-C', img: C_5 },
        { card: '5-D', img: D_5 },
        { card: '5-H', img: H_5 },
        { card: '5-S', img: S_5 },

        { card: '6-C', img: C_6 },
        { card: '6-D', img: D_6 },
        { card: '6-H', img: H_6 },
        { card: '6-S', img: S_6 },

        { card: '7-C', img: C_7 },
        { card: '7-D', img: D_7 },
        { card: '7-H', img: H_7 },
        { card: '7-S', img: S_7 },

        { card: '8-C', img: C_8 },
        { card: '8-D', img: D_8 },
        { card: '8-H', img: H_8 },
        { card: '8-S', img: S_8 },

        { card: '9-C', img: C_9 },
        { card: '9-D', img: D_9 },
        { card: '9-H', img: H_9 },
        { card: '9-S', img: S_9 },

        { card: '10-C', img: C_10 },
        { card: '10-D', img: D_10 },
        { card: '10-H', img: H_10 },
        { card: '10-S', img: S_10 },

        { card: '11-C', img: C_11 },
        { card: '11-D', img: D_11 },
        { card: '11-H', img: H_11 },
        { card: '11-S', img: S_11 },

        { card: '12-C', img: C_12 },
        { card: '12-D', img: D_12 },
        { card: '12-H', img: H_12 },
        { card: '12-S', img: S_12 },

        { card: '13-C', img: C_13 },
        { card: '13-D', img: D_13 },
        { card: '13-H', img: H_13 },
        { card: '13-S', img: S_13 },

        { card: '1-C', img: C_1 },
        { card: '1-D', img: D_1 },
        { card: '1-H', img: H_1 },
        { card: '1-S', img: S_1 },
    ]

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
    const [playerHand, setPlayerHand] = useState<string[]>([]);
    const [playerValue, setPlayerValue] = useState<number>(0);
    const [dealerHand, setDealerHand] = useState<string[]>([]);
    const [dealerValue, setDealerValue] = useState<number>(0)
    const [saldo, setSaldo] = useState<number>(0);
    const [bet, setBet] = useState<number>(0);
    const [aposta,setAposta] = useState<number>(0);
    const [confirmarAposta, setConfirmarAposta] = useState<boolean>(false);
    const [confirmeCardB, setConfirmeCardB] = useState<boolean>(false);
    const [popupMessage, setPopupMessage] = useState<string>('');
    const id = useSelector(getUserId);
    const { data} = useGetFatecoins(id || 0);

    const cardB = 'Back';

    const numCartas = 10;
    const cartas = [];
    for(let i = 1; i <= numCartas; i++){
        cartas.push(carta_back);
    }
    useEffect(() => {
        if (data) {

            $("#saldo").text(data.qtd);
            setSaldo(parseInt(data.qtd));
            atualizarSaldo()


        }
    }, [data]);
    const atualizarSaldo = () =>{
        window.localStorage.setItem(
            "player-money",
            JSON.stringify({money:saldo})
        )
        dispatchEvent(new Event("storage"))
    }
    useEffect(() => {
        startGame();
    }, []);
    useEffect(() => {
        renderPlayerHands();
        setPlayerValue(calculateHandValue(playerHand));

    }, [playerHand]);

    useEffect(() => {
        renderDealerHands()
        setDealerValue(calculateHandValue(dealerHand));
    }, [dealerHand]);

    const startGame = () => {
        const betValorElem = document.getElementById('bet-valor') as HTMLInputElement;

        if (betValorElem) {
            betValorElem.value = "0";
            setConfirmarAposta(false);
            adicionarCartas();

            if (!confirmarAposta) {
                setPlayerHand([dealCard(), dealCard()]);
                setDealerHand([dealCard(), backCard()]);
                console.log("Player hand: "+playerHand)
                console.log("Dealer hand: "+dealerHand)
                renderPlayerHands();
                renderDealerHands();
            } else {
                alert("Conclua sua aposta para fazer um novo jogo!!!");
            }
            calculaPontos();
        }
    };

    const adicionarCartas = () => {
        const baralhoDiv = document.querySelector('.baralho');
        if (baralhoDiv) {
            cartas.forEach((carta, index) => {
                const img = document.createElement('img');
                img.src = carta;
                img.alt = "Carta";
                img.style.left = index * 20 + "px";
                baralhoDiv.appendChild(img);
            });
        }
    };

    const dealCard = (): string => {
        const randomIndex = Math.floor(Math.random() * deck.length);
        return deck.splice(randomIndex, 1)[0];
    };

    const calculaPontos = () => {
        const pontosDealerElem = $('#pontosDealer');
        const pontosJogadorElem = $('#pontosJogador');

        if (pontosDealerElem && pontosJogadorElem) {
            setDealerValue(calculateHandValue(dealerHand));
            setPlayerValue(calculateHandValue(playerHand));
        }
    };

    const calculateHandValue = (hand: string[]): number => {
        let total = 0;
        let hasAce = false;
        for (const card of hand) {
            if(card != "Back"){
                const value = parseInt(card.slice(0, -1));
                if (value > 10) {
                    total += 10;
                } else if (value === 1) {
                    hasAce = true;
                    total += 1;
                } else {
                    total += value;
                }
            }

        }
        if (hasAce && total + 10 <= 21) {
            total += 10;
        }
        return total;
    };
    function renderDealerHands() {
        const dealerHandDiv = document.querySelector('.dealer-area');

        if (dealerHandDiv) {
            dealerHandDiv.innerHTML = '';

            dealerHand.forEach((card, index) => {
                // Verifica se é a segunda carta e se confirmeCardB é verdadeiro para mostrar a imagem de costas
                const cardInfo = lista.find(l => l.card === card);
                const cardImage = document.createElement('img');
                if(cardInfo){
                    cardImage.src = cardInfo.img; // Atribui o src com a propriedade img da carta encontrada
                    cardImage.alt = card; // Define o texto alternativo com o nome da carta
                    cardImage.classList.add('show');
                    dealerHandDiv.appendChild(cardImage);

                    cardImage.classList.add('show');
                    dealerHandDiv.appendChild(cardImage);
                }

                if (index === 1 && confirmeCardB){index--}
            });
        }
    }



    const renderPlayerHands = () => {
        const playerHandDiv = document.querySelector('.jogador-area');

        if (playerHandDiv) {
            playerHandDiv.innerHTML = '';

            playerHand.forEach(card => {
                console.log("carta: "+card)
                // Encontrar o objeto correspondente na lista com base no nome da carta
                const cardInfo = lista.find(l => l.card === card);
                console.log("cartas encontrada: "+cardInfo)
                if (cardInfo) {
                    // Criar elemento de imagem
                    const cardImage = document.createElement('img');
                    // Atribuir o src com a propriedade img da carta encontrada
                    cardImage.src = cardInfo.img;
                    cardImage.alt = card;
                    cardImage.classList.add('show');
                    // Adicionar a imagem ao div da mão do jogador
                    playerHandDiv.appendChild(cardImage);
                }
            });
        }
    };


    const draw = () => {
        const saldoElem = document.getElementById('saldo');
        const betValorElem = document.getElementById('bet-valor') as HTMLInputElement;

        if (saldoElem && betValorElem) {
            const saldo = parseFloat(saldoElem.innerText);
            const aposta = parseFloat(betValorElem.value);

            const novoSaldo = saldo + aposta;

            saldoElem.innerText = novoSaldo.toFixed(2);
        }
    };

    const win = () => {
        const saldoElem = document.getElementById('saldo');
        const betValorElem = document.getElementById('bet-valor') as HTMLInputElement;

        if (saldoElem && betValorElem) {
            const saldo = parseFloat(saldoElem.innerText);
            const aposta = parseFloat(betValorElem.value);

            const novoSaldo = saldo + aposta * 2;

            saldoElem.innerText = novoSaldo.toFixed(2);
        }
    };

    const deal = () => {
        if (!confirmarAposta) {
            const saldoElem = document.getElementById('saldo');
            const betValorElem = document.getElementById('bet-valor') as HTMLInputElement;

            if (saldoElem && betValorElem) {
                const saldo = parseFloat(saldoElem.innerText);
                const aposta = parseFloat(betValorElem.value);

                if (saldo >= aposta && aposta !== 0) {
                    const novoSaldo = saldo - aposta;
                    saldoElem.innerText = novoSaldo.toFixed(2);
                    setConfirmarAposta(true);
                } else if (aposta === 0) {
                    alert("Selecione um valor para aposta!");
                } else {
                    alert("Saldo insuficiente para esta aposta!");
                    betValorElem.value = "0";
                }
            }
        }
    };









    const backCard = (): string => {
        setConfirmeCardB(true);
        return cardB;
    };

    const hit = () => {
        if (confirmarAposta) {
            // Cria uma cópia atualizada de playerHand
            const newPlayerHand = [...playerHand];

            // Adiciona uma carta à mão do jogador
            newPlayerHand.push(dealCard());

            // Atualiza o estado playerHand com a nova cópia
            setPlayerHand(newPlayerHand);

            // Renderiza a mão do jogador após a atualização do estado
            renderPlayerHands();

            // Calcula o total de pontos do jogador com a nova mão
            const playerTotal = calculateHandValue(newPlayerHand);

            // Verifica se o jogador estourou
            if (playerTotal > 21) {
                determineWinner();
            }

            // Atualiza os pontos
            calculaPontos();
        } else {
            alert("Faça uma aposta para pedir uma carta !!!");
            calculaPontos();
            renderPlayerHands();
        }
    };







    const stand = () => {
        // Lógica para a vez do dealer (banca) jogar
        dealerHand.splice(1, 1)
        renderDealerHands()
        // Isso geralmente envolve um loop onde o dealer continua a pegar cartas até que sua mão atinja um valor específico (ex: 17 ou mais).
        if(confirmarAposta){
            setConfirmeCardB(false);
        }
        while (calculateHandValue(dealerHand) < 17) {
            dealerHand.push(dealCard())
            renderDealerHands()
        }

        renderDealerHands();
        // Após o dealer jogar, determine o resultado da rodada
        determineWinner();
    };



    const addValueToBet = (value:number) => {
        setBet(prevBet => prevBet + value);
    }

    const determineWinner = () => {
        renderDealerHands()
        renderPlayerHands()
        const playerTotal = calculateHandValue(playerHand);
        const dealerTotal = calculateHandValue(dealerHand);
        let result = '';
        if (playerTotal > 21) {
            result = 'Você perdeu mais de 21. Dealer venceu.';
        } else if (dealerTotal > 21 && playerTotal <= 21) {
            result = 'Você venceu. Dealer mais de 21!!! ';
            win();
        } else if (playerTotal > dealerTotal) {
            result = 'Você venceu.';
            win();
        } else if (playerTotal < dealerTotal) {
            result = 'Dealer venceu.';
        } else {
            result = 'Empatou o Rodada.';
            draw();
        }
        setPopupMessage(result);
        exibirPopupResultado(result);
        setBet(0)
    };

    const exibirPopup = () => {
        const popup = document.getElementById("popup");
        if(popup){
            popup.style.display = "block";
        }
    }

    const fecharPopup = () => {
        const popup = document.getElementById("popup");
        if(popup){
            popup.style.display = "none";
        }
    }

    const exibirPopupResultado = (text:string) => {
        const popupRes = document.getElementById("popupResultado");
        if (popupRes) {
            popupRes.style.display = "block";
            const popupMessageElement = document.getElementById('popup-message');
            if (popupMessageElement) {
                popupMessageElement.innerText = text;
            }
        }
    }

    const fecharPopupResultado = () => {
        const popupRes = document.getElementById("popupResultado");
        if (popupRes) {
            popupRes.style.display = "none";
        }
    };

    return (
        <>
            <div className="container mt-16">
                <a href="#" onClick= {exibirPopup} className="link">Regras do Jogo</a>

                <div className="popup" id="popup">
                    <div className="popup-content">
                        <span className="close" onClick={fecharPopup}>&times;</span>
                        <p className="jaro-text" id="popup-message">O Blackjack, também conhecido como 21, é um jogo de cartas popular em
                            que os jogadores competem contra o
                            dealer (a casa), não entre si. O objetivo do jogo é ter uma mão com um valor total o mais
                            próximo possível de
                            21, sem ultrapassá-lo. Aqui estão as regras básicas do Blackjack:

                            Cartas e Valores:
                            O jogo é jogado com um ou mais baralhos padrão de 52 cartas. As cartas de 2 a 10 valem seu
                            valor nominal. As cartas de figura (Valete, Rainha e Rei) valem 10 pontos cada. O Ás pode
                            valer 1 ou 11,
                            dependendo da situação.
                            Início do Jogo:
                            Cada jogador recebe duas cartas viradas para cima, enquanto o dealer recebe uma carta virada
                            para cima e outra virada para baixo (conhecida como "carta buraco").
                            Jogo do Jogador: Após receber suas duas cartas, o jogador pode optar por "pedir carta",
                            recebendo uma carta
                            adicional, ou "ficar", mantendo sua mão atual.
                            Jogo do Dealer:
                            Depois que todos os jogadores tiverem terminado de jogar, o dealer revela sua carta virada
                            para baixo e joga de acordo com um conjunto predefinido de regras. Geralmente, o dealer deve
                            "pedir" enquanto
                            sua mão total for menor que 17 e "ficar" quando sua mão total for 17 ou mais.
                            Vitória e Derrota:
                            O jogador ganha se sua mão total for maior que a do dealer sem exceder 21, ou se o dealer
                            ultrapassar 21. O jogador também ganha se tiver um Blackjack enquanto o dealer não tiver. O
                            jogador perde se
                            sua mão total exceder 21 ou se a mão do dealer for maior.
                            Empate (Push):
                            Se o jogador e o dealer tiverem a mesma pontuação (exceto em caso de Blackjack), é
                            considerado
                            um empate, e o jogador recupera sua aposta.</p>
                    </div>
                </div>

                <h1 className="jaro-text">Blackjack</h1>
                <div className="game-area">
                    <div className="baralho"></div>

                    {/*Cartas do dealer*/}
                    <div className="dealer">
                        <h2 className="jaro-text h2-text">DEALER</h2>
                        <input id="pontosDealer" type="number" value={dealerValue}/>
                    </div>

                    <div className="dealer-hand">
                        <div className="dealer-area">
                            <img src="cards/ " alt="Carta 3"/>
                            <img src="cards/" alt="Carta 4"/>
                        </div>
                    </div>
                    {/*Cartas do jogador*/}

                    <h2 className="jaro-text h2-text">JOGADOR</h2>
                    <input id="pontosJogador" type="number" value={playerValue}/>
                    <div className="player-hand">

                        <div className="jogador-area">
                            <img src="cards/" alt="Carta 1"></img>
                            <img src="cards/" alt="Carta 2"></img>

                        </div>
                    </div>
                    <h3 className="jaro-text ">MENU DE APOSTA</h3>

                    <div className="menu">

                        <div className="input-container">
                            <label htmlFor="amount" className="jaro-text">R$</label>
                            <input id="bet-valor" type="number" min="1" value={bet.toFixed(2)}/>
                        </div>
                        <div className="container-btn">
                            <button className="bet-btn btn" onClick={() => addValueToBet(0.5)}>R$ 0,50</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(1.0)}>R$ 1</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(3)}>R$ 3</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(5)}>R$ 5</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(10)}>R$ 10</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(20)}>R$ 20</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(50)}>R$ 50</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(100)}>R$ 100</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(200)}>R$ 200</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(300)}>R$ 300</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(500)}>R$ 500</button>
                            <button className="bet-btn btn" onClick={() => addValueToBet(1000)}>R$ 1000</button>
                        </div>
                        <button id="deal-btn" className="jaro-text" onClick={() => {setAposta(bet); deal();}}>Apostar</button>
                    </div>
                </div>
                <div className="buttons">
                    <button id="newGame-btn" onClick={startGame} className="jaro-text btn">Novo Jogo</button>
                    <button id="hit-btn" onClick={hit} className="jaro-text puxando btn">Pedir Carta</button>
                    <button id="stand-btn" onClick={stand} className="jaro-text btn">Ficar</button>
                </div>

                <div className="menu-saldo">
                    <label htmlFor="amount" className="jaro-text">SALDO R$</label>
                    <span id="saldo">1000</span>

                </div>
            </div>
            <div id="popupResultado" className="popup">
                <div className="popup-content-resultado">
                    <span className="close" onClick={fecharPopupResultado}>&times;</span>
                    <p id="popup-message" className="jaro-text">{popupMessage}</p>
                </div>
            </div>

            <script src="blackjack.js"></script>
        </>
    )
}