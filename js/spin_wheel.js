import $ from 'jquery';
$(document).ready(function (){
    iniciar_roleta();
    $("#resultado").text("")
    getIDinfo();
    let random_number = 0

    $(".btn_add.um").on("click",function (){
        $("#bet_valor").val( 1);
    });
    $(".btn_add.dez").on("click",function (){
        $("#bet_valor").val(10);
    });
    $(".btn_add.cem").on("click",function (){
        $("#bet_valor").val( 100);
    });
    $(".btn_add.all").on("click",function (){
        let saldo = $("#user_saldo").val();
        $("#bet_valor").val(saldo);
    });

    $(".aposta.amarelo").on("click", async function(){
        let aposta = $("#bet_valor").val();
        let saldo = $("#user_saldo").val();
        let check = await checkCoins(saldo,aposta)
        if (check === true) {
            random_number = Math.floor(Math.random()*36);
            rodar("amarelo",aposta,random_number)
        }else{
            return;
        }
    });
    $(".aposta.vermelho").on("click", async function(){
        let aposta = $("#bet_valor").val();
        let saldo = $("#user_saldo").val();
        let check = await checkCoins(saldo,aposta)
        if (check === true) {
            random_number = Math.floor(Math.random()*36);
            rodar("vermelho",aposta,random_number)
        }else{
            return;
        }
    });
    $(".aposta.coringa").on("click", async function(){
        let aposta = $("#bet_valor").val();
        let saldo = $("#user_saldo").val();
        let check = await checkCoins(saldo,aposta)
        if (check === true) {
            random_number = Math.floor(Math.random()*36);
            rodar("coringa",aposta,random_number)
        }else{
            return;
        }
    });
    $(".btn_par,.btn_impar").on("click",async function () {
        let aposta = $("#bet_valor").val();
        let saldo = $("#user_saldo").val();
        let check = await checkCoins(saldo,aposta)
        let numero = $(this).text();
        if (check === true) {
            random_number = Math.floor(Math.random()*36);
            rodar(numero,aposta,random_number)
        }else{
            return;
        }
    })



});



export function iniciar_roleta() {
    let $container = $(".container"),
        linha = "";
    linha += "<div class='linha'>";
    linha += "  <div class='cartao coringa'>0</div>";
    linha += "  <div class='cartao vermelho'>1</div>";
    linha += "  <div class='cartao amarelo'>2</div>";
    linha += "  <div class='cartao vermelho'>3</div>";
    linha += "  <div class='cartao amarelo'>4</div>";
    linha += "  <div class='cartao vermelho'>5</div>";
    linha += "  <div class='cartao amarelo'>6</div>";
    linha += "  <div class='cartao vermelho'>7</div>";
    linha += "  <div class='cartao amarelo'>8</div>";
    linha += "  <div class='cartao vermelho'>9</div>";
    linha += "  <div class='cartao amarelo'>10</div>";
    linha += "  <div class='cartao vermelho'>11</div>";
    linha += "  <div class='cartao amarelo'>12</div>";
    linha += "  <div class='cartao vermelho'>13</div>";
    linha += "  <div class='cartao amarelo'>14</div>";
    linha += "  <div class='cartao vermelho'>15</div>";
    linha += "  <div class='cartao amarelo'>16</div>";
    linha += "  <div class='cartao vermelho'>17</div>";
    linha += "  <div class='cartao amarelo'>18</div>";
    linha += "  <div class='cartao vermelho'>19</div>";
    linha += "  <div class='cartao amarelo'>20</div>";
    linha += "  <div class='cartao vermelho'>21</div>";
    linha += "  <div class='cartao amarelo'>22</div>";
    linha += "  <div class='cartao vermelho'>23</div>";
    linha += "  <div class='cartao amarelo'>24</div>";
    linha += "  <div class='cartao vermelho'>25</div>";
    linha += "  <div class='cartao amarelo'>26</div>";
    linha += "  <div class='cartao vermelho'>27</div>";
    linha += "  <div class='cartao amarelo'>28</div>";
    linha += "  <div class='cartao vermelho'>29</div>";
    linha += "  <div class='cartao amarelo'>30</div>";
    linha += "  <div class='cartao vermelho'>31</div>";
    linha += "  <div class='cartao amarelo'>32</div>";
    linha += "  <div class='cartao vermelho'>33</div>";
    linha += "  <div class='cartao amarelo'>34</div>";
    linha += "  <div class='cartao vermelho'>35</div>";
    linha += "  <div class='cartao amarelo'>36</div>";

    linha += "</div>";

    for (let x = 0; x < 100; x++) {
        $container.append(linha);
    }
}



export function rodar(escolha, valor, number){
    $(".cartao").removeClass("borderVerde","borderVermelho");

    let ganho = 0
    $("#resultado").text("Girando...")
    let $carrosel = $(".carrosel .container"),
        order = [
            0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
        ],
        posicao = order.indexOf(number);
    let rows = 38,
        card = 75 + 3 * 2,
        onde_parar = rows * 37 * card + posicao * card;

    let randomize = Math.floor(Math.random() * 75) - 75 / 2;
    onde_parar += randomize;

    let object = {
        x: Math.floor(Math.random() * 50) / 100,
        y: Math.floor(Math.random() * 20) / 100,
    };

    $carrosel.css({
        "transition-timing-function":
            "cubic-bezier(0," + object.x + "," + object.y + ",1)",
        "transition-duration": "6s",
        transform: "translate3d(-" + onde_parar + "px, 0px, 0px)",
    });

    setTimeout(function () {
        let saldo = parseInt($("#user_saldo").val());
        console.log("saldo antes de rodar: "+saldo)
        $carrosel.css({
            "transition-timing-function": "",
            "transition-duration": "",
        });
        let resetTo = -(posicao * card + randomize);
        $carrosel.css("transform", "translate3d(" + resetTo + "px, 0px, 0px)");

        if (posicao===0 && escolha === "coringa"){
            $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
            ganho = valor*6
            $("#resultado").text(`Você ganhou ${ganho}!`)
            let novo_saldo = saldo+ganho
            console.log("ganho ="+ganho+" saldo = "+saldo+" novosaldo = "+novo_saldo)
            updateCoins(novo_saldo)

        } else if (posicao % 2 === 0 && escolha === "amarelo" ){
            $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
            ganho = valor*2
            $("#resultado").text(`Você ganhou ${ganho}!`)
            let novo_saldo = saldo+ganho
            console.log("ganho ="+ganho+" saldo = "+saldo+" novosaldo = "+novo_saldo)
            updateCoins(novo_saldo)
        } else if (posicao % 2 !== 0 && escolha === "vermelho" ){
            $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
            ganho = valor*2
            $("#resultado").text(`Você ganhou ${ganho}!`)
            let novo_saldo = saldo+ganho
            console.log("ganho ="+ganho+" saldo = "+saldo+" novosaldo = "+novo_saldo)
            updateCoins(novo_saldo)
        } else if (posicao === escolha ){
            $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
            ganho = valor*9
            $("#resultado").text(`Você ganhou ${ganho}!`)
            let novo_saldo = saldo+ganho
            console.log("ganho ="+ganho+" saldo = "+saldo+" novosaldo = "+novo_saldo)
            updateCoins(novo_saldo)
        } else {
            $(".cartao:contains('"+posicao+"')").addClass("borderVermelha");
            $("#resultado").text(`Você perdeu ${valor}!`)
        }
        add_history_card(posicao)
        document.getElementById("resultado").textContent =
            "Fatequinho girou " + posicao;
    }, 6 * 1000);
}

export function add_history_card(number){
    let $container_inferior = $(".carrosel-anteriores"),
        linha = "";

    linha += "<div class='linha'>";
    if(number % 2 === 0){
        linha += `<div class='cartao-inf amarelo'>${number}</div>`;
        linha += "</div>";
    } else if(number % 2 !== 0){
        linha += `<div class='cartao-inf vermelho'>${number}</div>`;
        linha += "</div>";
    } else if(number === 0){
        linha += `<div class='cartao-inf coringa'>${number}</div>`;
        linha += "</div>";
    }

    $container_inferior.append(linha);
}

// Funções para chamar API

export async function checkCoins(saldo,aposta) {
    if (aposta === "0") {
        alert("Por favor, insira uma quantia antes de girar.");
        return false;
    }
    if (aposta > saldo) {
        alert("Saldo Insuficiente");
        return false;
    } else {
        let saldo_att = saldo - aposta
        await updateCoins(saldo_att)
        return true;
    }
}

export function getIDinfo(){
    const usuario = localStorage.getItem("iduser");
    console.log("usuario: "+usuario);
    getCoins(usuario);

}

export function getCoins(user) {
    const url = `http://localhost:8080/fatecoins/get/cliente/${user}`;

    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Manipula os dados recebidos da API
            //console.log('Dados da API:', data);
            //console.log('Moedas', data.qtd);
            $("#user_saldo").val(data.qtd);
            // Faça algo com os dados, como atualizar o saldo na ‘interface’ do usuário
            return data.qtd
        })
        .catch(error => {
            // Trata erros ocorridos durante o request
            console.error('Erro:', error);
            // Aqui você pode lidar com o erro conforme a sua lógica de aplicativo
        });
}

export function updateCoins(novoSaldo) {
    const id = localStorage.getItem("iduser");
    const url = `http://localhost:8080/fatecoins/update/${id}`;

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ qtd: novoSaldo }) // Aqui você pode ajustar o corpo da requisição conforme necessário
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro na requisição: ' + response.statusText);
            }
            console.log('Saldo atualizado com sucesso!');
            // Aqui você pode lidar com a resposta conforme necessário
            getCoins(id)
        })
        .catch(error => {
            // Trata erros ocorridos durante o request
            console.error('Erro:', error);
            // Aqui você pode lidar com o erro de acordo com sua lógica de aplicativo
        });
}
