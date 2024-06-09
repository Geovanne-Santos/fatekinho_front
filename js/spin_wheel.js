$(document).ready(function () {
    iniciar_roleta();
    $(".cartao").removeClass("borderVerde");
    var random_number = 0
    $(".aposta.amarelo").on("click", function() {
        var quantia = $("#entrada").val();
        var saldo = $("#saldo_atual").text();
        if (quantia === "0") {
          alert("Por favor, insira uma quantia antes de girar.");
          return;
        }
        if (quantia > saldo){
            alert("Saldo insuficiente");
            return; // Encerrar a função se não houver quantia
        }
        random_number = Math.floor(Math.random()*36);
        var saldo_atualizado = saldo-quantia
        $("#saldo_atual").text(saldo_atualizado.toFixed(2));
        girar("amarelo",quantia,random_number);
        random_number = 0;
    });
    $(".aposta.preto").on("click", function() {
        var quantia = $("#entrada").val();
        if (quantia === "0") {
          alert("Por favor, insira uma quantia antes de girar.");
          return; // Encerrar a função se não houver quantia
        }
        random_number = Math.floor(Math.random()*36);
        var saldo = $("#saldo_atual").text();
        if (parseFloat(quantia) > saldo){
            alert("Saldo insuficiente");
            return; // Encerrar a função se não houver quantia
        }
        var saldo_atualizado = saldo-quantia
        $("#saldo_atual").text(saldo_atualizado.toFixed(2));
        girar("preto",quantia,random_number);
        random_number = 0;
    });
    $(".aposta.coringa").on("click", function() {
        var quantia = $("#entrada").val();
        var saldo = $("#saldo_atual").text();
        if (quantia === "0") {
          alert("Por favor, insira uma quantia antes de girar.");
          return; // Encerrar a função se não houver quantia
        }
        if (quantia > saldo){
            alert("Saldo insuficiente");
            return; // Encerrar a função se não houver quantia
        }
        random_number = Math.floor(Math.random()*36);
        var saldo_atualizado = saldo-quantia
        $("#saldo_atual").text(saldo_atualizado.toFixed(2));
        girar("coringa",quantia,random_number);
        random_number = 0;
      });
    $(".btn_impar, .btn_par").on("click", function() {
        var quantia = $("#entrada").val();
        var saldo = $("#saldo_atual").text();
        if (quantia === "0") {
          alert("Por favor, insira uma quantia antes de girar.");
          return; // Encerrar a função se não houver quantia
        }
        if (quantia > saldo){
            alert("Saldo insuficiente");
            return; // Encerrar a função se não houver quantia
        }
        var numero = $(this).text();
        random_number = Math.floor(Math.random()*36);
        var saldo_atualizado = saldo-quantia
        $("#saldo_atual").text(saldo_atualizado.toFixed(2));
        girar_numero(numero,quantia,random_number);
        random_number = 0;
    });
    $(".btn_add.um").on("click",function (){
        var valor_atual = parseFloat($("#entrada").val());
        $("#entrada").val(valor_atual + 1.00);
    });
    $(".btn_add.dez").on("click",function (){
        var valor_atual = parseFloat($("#entrada").val());
        $("#entrada").val(valor_atual + 10.00);
    });
    $(".btn_add.cem").on("click",function (){
        var valor_atual = parseFloat($("#entrada").val());
        $("#entrada").val(valor_atual + 100.00);
    });
});





function iniciar_roleta() {
  var $container = $(".container"),
    linha = "";
  linha += "<div class='linha'>";
  linha += "  <div class='cartao vermelho '>0</div>";
  linha += "  <div class='cartao preto'>1</div>";
  linha += "  <div class='cartao amarelo'>2</div>";
  linha += "  <div class='cartao preto'>3</div>";
  linha += "  <div class='cartao amarelo'>4</div>";
  linha += "  <div class='cartao preto'>5</div>";
  linha += "  <div class='cartao amarelo'>6</div>";
  linha += "  <div class='cartao preto'>7</div>";
  linha += "  <div class='cartao amarelo'>8</div>";
  linha += "  <div class='cartao preto'>9</div>";
  linha += "  <div class='cartao amarelo'>10</div>";
  linha += "  <div class='cartao preto'>11</div>";
  linha += "  <div class='cartao amarelo'>12</div>";
  linha += "  <div class='cartao preto'>13</div>";
  linha += "  <div class='cartao amarelo'>14</div>";
  linha += "  <div class='cartao preto'>15</div>";
  linha += "  <div class='cartao amarelo'>16</div>";
  linha += "  <div class='cartao preto'>17</div>";
  linha += "  <div class='cartao amarelo'>18</div>";
  linha += "  <div class='cartao preto'>19</div>";
  linha += "  <div class='cartao amarelo'>20</div>";
  linha += "  <div class='cartao preto'>21</div>";
  linha += "  <div class='cartao amarelo'>22</div>";
  linha += "  <div class='cartao preto'>23</div>";
  linha += "  <div class='cartao amarelo'>24</div>";
  linha += "  <div class='cartao preto'>25</div>";
  linha += "  <div class='cartao amarelo'>26</div>";
  linha += "  <div class='cartao preto'>27</div>";
  linha += "  <div class='cartao amarelo'>28</div>";
  linha += "  <div class='cartao preto'>29</div>";
  linha += "  <div class='cartao amarelo'>30</div>";
  linha += "  <div class='cartao preto'>31</div>";
  linha += "  <div class='cartao amarelo'>32</div>";
  linha += "  <div class='cartao preto'>33</div>";
  linha += "  <div class='cartao amarelo'>34</div>";
  linha += "  <div class='cartao preto'>35</div>";
  linha += "  <div class='cartao amarelo'>36</div>";
  linha += "  <div class='cartao preto'>37</div>";

  linha += "</div>";

  for (var x = 0; x < 100; x++) {
    $container.append(linha);
  }
}

function girar(escolha,valor,number){
    $(".cartao").removeClass("borderVerde");
    var saldo_atual = parseFloat($("#saldo_atual").text());
  document.getElementById("resultado").textContent = "Girando...";
  document.getElementById("ganho").textContent = "";
  var $carrosel = $(".carrosel .container"),
    order = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
    ],
    posicao = order.indexOf(number);
  var rows = 38,
    card = 75 + 3 * 2,
    onde_parar = rows * 37 * card + posicao * card;

  var randomize = Math.floor(Math.random() * 75) - 75 / 2;
  onde_parar += randomize;

  var object = {
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
    $carrosel.css({
      "transition-timing-function": "",
      "transition-duration": "",
    });
    var resetTo = -(posicao * card + randomize);
    $carrosel.css("transform", "translate3d(" + resetTo + "px, 0px, 0px)");

    if (posicao===0 && escolha === "coringa"){
        $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
        document.getElementById("ganho").textContent = "Você ganhou "+Math.floor((valor*6)*100)/100+"!";
        $("#saldo_atual").text(saldo_atual+(valor*6));

    } else if (posicao % 2 === 0 && escolha === "amarelo" ){
        $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
        document.getElementById("ganho").textContent = "Você ganhou "+Math.floor((valor*1.5)*100)/100+"!";
        $("#saldo_atual").text(saldo_atual+(valor*1.5));
    } else if (posicao % 2 !== 0 && escolha === "preto" ){
        $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
        document.getElementById("ganho").textContent = "Você ganhou "+Math.floor((valor*1.5)*100)/100+"!";
        $("#saldo_atual").text(saldo_atual+(valor*1.5));
    } else {
        $(".cartao:contains('"+posicao+"')").addClass("borderVermelha");
        document.getElementById("ganho").textContent = "Você perdeu!";
    }

    document.getElementById("resultado").textContent =
      "Fatequinho girou " + posicao;
  }, 6 * 1000);
}

function girar_numero(escolha,valor,number){
    $(".cartao").removeClass("borderVerde");
    var saldo_atual = parseFloat($("#saldo_atual").text());
  document.getElementById("resultado").textContent = "Girando...";
  document.getElementById("ganho").textContent = "";
  var $carrosel = $(".carrosel .container"),
    order = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
      21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
    ],
    posicao = order.indexOf(number);
  var rows = 38,
    card = 75 + 3 * 2,
    onde_parar = rows * 37 * card + posicao * card;

  var randomize = Math.floor(Math.random() * 75) - 75 / 2;
  onde_parar += randomize;

  var object = {
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
    $carrosel.css({
      "transition-timing-function": "",
      "transition-duration": "",
    });
    var resetTo = -(posicao * card + randomize);
    $carrosel.css("transform", "translate3d(" + resetTo + "px, 0px, 0px)");
      $(".cartao:contains('"+posicao+"')").addClass("borderVerde");
    if (posicao=== escolha){
       document.getElementById("ganho").textContent = "Você ganhou "+Math.round((saldo_atual+valor*6)*100)/100+"!";
        $("#saldo_atual").text(saldo_atual+(valor*6));
    } else {
        document.getElementById("ganho").textContent = "Você perdeu!";
    }

    document.getElementById("resultado").textContent =
      "Fatequinho girou " + posicao;
  }, 6 * 1000);
}


