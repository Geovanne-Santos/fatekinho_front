

$(document).ready(function(){

    iniciar_linhas();
    $('.entrar').show();
    $('#btn_entrar').hide();
    $("#txt_vitoria").text("Ganhou!!")
    getIDinfo();

    setTimeout(function() {
        // Esconde a tela de loading
        $('#btn_entrar').css("visibility","visible");
        $('#btn_entrar').show();
        $('.entrar_container').hide();
      }, 5000);

    $('#bet_valor').text(0)
    
    var larguraTela = $(window).width();
    var alturaTela = $(window).height();
    

    console.log("Largura da tela: " + larguraTela);
    console.log("Altura da tela: " + alturaTela);

    $('#btn_entrar').click(function(){
        $('.entrar').hide();
        background_music();
    });

    $("#girar").click(function(){
		
		let saldo = parseInt($("#bet_saldo").text())
		let aposta = parseInt($("#bet_valor").text())
		
        desativar_botao()
        if(aposta===0){
            alert("entre uma valor de aposta!")
            ativar_botao();
        }else{
            aposta = $('#bet_valor').text()
            saldo = parseFloat($('#bet_saldo').text())
            if(aposta>saldo){
                alert("Saldo insuficiente!")
                ativar_botao();
            }else{
                $('#bet_saldo').text(saldo-aposta)
                saldo -= aposta
				updateCoins(saldo)
                girarTodasAsColunas();
                
            }
            
        }
        

    });
    $('#bet_1').click(function(){
        inserir_moedas_sound();
        $('#bet_valor').text(1);
        $('.ativo').removeClass("ativo"); // Remove a classe 'ativo' de todos os elementos
        $(this).addClass("ativo"); // Adiciona a classe 'ativo' apenas ao elemento clicado
    });
    
    $('#bet_10').click(function(){
        inserir_moedas_sound();
        $('#bet_valor').text(10);
        $('.ativo').removeClass("ativo");
        $(this).addClass("ativo");
    });
    
    $('#bet_100').click(function(){
        inserir_moedas_sound();
        $('#bet_valor').text(100);
        $('.ativo').removeClass("ativo");
        $(this).addClass("ativo");
    });
    
    $('#bet_all').click(function(){
        inserir_moedas_sound();
        $('#bet_valor').text(parseFloat($('#bet_saldo').text()));
        $('.ativo').removeClass("ativo");
        $(this).addClass("ativo");
    });
    
});

window.onerror = function(e){
    alert(e.toString())
}

function iniciar_linhas(){
    var $coluna =  $(".column.zero"),
        linha = '',
        cardEscolhida = 0;
    for(var x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column0 card pos"+x+" img"+cardEscolhida+"'><img src='../imgs/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }

    var $coluna =  $(".column.um"),
        linha = '';
    for(var x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column1 card pos"+x+" img"+cardEscolhida+"'><img src='../imgs/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }

    var $coluna =  $(".column.dois"),
    linha = '';

    for(var x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column2 card pos"+x+" img"+cardEscolhida+"'><img src='../imgs/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }

    var $coluna =  $(".column.tres"),
    linha = '';
    for(var x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column3 card pos"+x+" img"+cardEscolhida+"'><img src='../imgs/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }

    var $coluna =  $(".column.quatro");
    linha = '';
    for(var x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column4 card pos"+x+" img"+cardEscolhida+"'><img src='../imgs/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }
}

function girarTodasAsColunas() {
	$("#txt_vitoria").val(null)
	remover_blink()
    var $PopUp = $(".popup .popuptext")
    var $linha1 = $(".linha1")
    var $linha2 = $(".linha2")
    var $linha3 = $(".linha3")
    var $vlinha1 = $(".vlinha1")
    var $vlinha2 = $(".vlinha2")
    var $vlinha3 = $(".vlinha3")
    var $vlinha4 = $(".vlinha4")
    var $vlinha5 = $(".vlinha5")
    var $linha4_1 = $(".linha4_part1")
    var $linha4_2 = $(".linha4_part2")
    var $linha5_1 = $(".linha5_part1")
    var $linha5_2 = $(".linha5_part2")

    $linha1.css("visibility","hidden")
    $linha2.css("visibility","hidden")
    $linha3.css("visibility","hidden")
    $vlinha1.css("visibility","hidden")
    $vlinha2.css("visibility","hidden")
    $vlinha3.css("visibility","hidden")
    $vlinha4.css("visibility","hidden")
    $vlinha5.css("visibility","hidden")
    $linha4_1.css("visibility","hidden")
    $linha4_2.css("visibility","hidden")
    $linha5_1.css("visibility","hidden")
    $linha5_2.css("visibility","hidden")
    $PopUp.css("visibility","hidden")

    var colunas = $(".column");
    var delayBase = 100; // Ajuste o atraso base conforme necessário
    var delayIncremental = 200; // Ajuste o incremento do atraso conforme necessário
    var delay = 0
    var cartasCaidas = [[], [], [], [], []];
    var cartasCaidas_classes = [[], [], [], [], []];
    var cardIndex = 0

    colunas.each(function(index) {
        var $coluna = $(this);
        delay = delayBase + (index * delayIncremental);
        cardIndex = Math.floor(Math.random() * (140 - 70 + 1)) + 70;
        var caiu = $coluna.find('.card.pos' + (cardIndex)),
            caiu2 = $coluna.find('.card.pos' + (cardIndex+1)),
            caiu3 = $coluna.find('.card.pos' + (cardIndex+2))
    
        if (caiu.length > 0) {
            var classes1 = caiu.attr('class').split(' '),
                classes2 = caiu2.attr('class').split(' '),
                classes3 = caiu3.attr('class').split(' ');
            var terceiraClasse1 = get_card(classes1[3]),
                terceiraClasse2 = get_card(classes2[3]),
                terceiraClasse3 = get_card(classes3[3]);

            // alert("numero escolhido: "+cardIndex+"");
            girarColuna($coluna, delay, cardIndex);
            cartasCaidas[index].push(terceiraClasse1),
            cartasCaidas[index].push(terceiraClasse2),
            cartasCaidas[index].push(terceiraClasse3);
            cartasCaidas_classes[index].push(caiu.attr('class')),
            cartasCaidas_classes[index].push(caiu2.attr('class')),
            cartasCaidas_classes[index].push(caiu3.attr('class'));
        } else {
            console.log("Elemento '.card.pos" + cardIndex + "' não encontrado.");
        }
        //alert("numero escolhido: "+cardIndex+"")
    });
    
    

    // transformar um vetor 1,5 em uma matrix 3x5 porem respeitando a order da criação dos slots

    // resultado: criar 3 vetores 1,5

    
    

    setTimeout(function(){
        console.log("coluna 1: "+cartasCaidas_classes[0])
        console.log("coluna 2: "+cartasCaidas_classes[1])
        console.log("coluna 3: "+cartasCaidas_classes[2])
        console.log("coluna 4: "+cartasCaidas_classes[3])
        console.log("coluna 5: "+cartasCaidas_classes[4])
        var valor;
        var saldo;
        var novo_saldo;
        var card1;
        var card2;
        var card3;
        var card4;
        var card5;
        
        switch (true) {
			case (
				cartasCaidas[0][0] === cartasCaidas[1][1] && // ganhou com todos iguais em V
				cartasCaidas[0][0] === cartasCaidas[2][2] &&
				cartasCaidas[0][0] === cartasCaidas[3][1] &&
				cartasCaidas[0][0] === cartasCaidas[4][0] 
				):
				card1 = cartasCaidas_classes[0][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][2].replace(/ /g, ".")
            	card4 = cartasCaidas_classes[2][1].replace(/ /g, ".")
            	card5 = cartasCaidas_classes[4][0].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	document.querySelector("."+card4).classList.add('blink');
            	document.querySelector("."+card5).classList.add('blink');
				$linha5_1.css("visibility", "visible");
				$linha5_2.css("visibility", "visible");
				
				valor = parseInt($("#bet_valor").text())*7
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
				break;
				
			case (
				cartasCaidas[0][2] === cartasCaidas[1][1] && // ganhou com todos iguais em ^
				cartasCaidas[0][2] === cartasCaidas[2][0] &&
				cartasCaidas[0][2] === cartasCaidas[3][1] &&
				cartasCaidas[0][2] === cartasCaidas[4][2] 
				):
				card1 = cartasCaidas_classes[0][2].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][0].replace(/ /g, ".")
            	card4 = cartasCaidas_classes[3][1].replace(/ /g, ".")
            	card5 = cartasCaidas_classes[4][2].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	document.querySelector("."+card4).classList.add('blink');
            	document.querySelector("."+card5).classList.add('blink');
            	
				$linha4_1.css("visibility", "visible");
				$linha4_2.css("visibility", "visible");
				
				valor = parseInt($("#bet_valor").text())*7
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
				break;
			
            case (
                cartasCaidas[0][0] === cartasCaidas[1][0] && // ganhou com todos iguais na linha 1
                cartasCaidas[0][0] === cartasCaidas[2][0] &&
                cartasCaidas[0][0] === cartasCaidas[3][0] &&
                cartasCaidas[0][0] === cartasCaidas[4][0]
            ):
            	card1 = cartasCaidas_classes[0][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][0].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][0].replace(/ /g, ".")
            	card4 = cartasCaidas_classes[2][0].replace(/ /g, ".")
            	card5 = cartasCaidas_classes[4][0].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	document.querySelector("."+card4).classList.add('blink');
            	document.querySelector("."+card5).classList.add('blink');
                $linha1.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*5
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[0][1] === cartasCaidas[1][1] && // ganhou com todos iguais na linha 2
                cartasCaidas[0][1] === cartasCaidas[2][1] &&
                cartasCaidas[0][1] === cartasCaidas[3][1] &&
                cartasCaidas[0][1] === cartasCaidas[4][1]
            ):
            	card1 = cartasCaidas_classes[0][1].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][1].replace(/ /g, ".")
            	card4 = cartasCaidas_classes[2][1].replace(/ /g, ".")
            	card5 = cartasCaidas_classes[4][1].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	document.querySelector("."+card4).classList.add('blink');
            	document.querySelector("."+card5).classList.add('blink');
            	
                $linha2.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*5
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[0][2] === cartasCaidas[1][2] && // ganhou com todos iguais na linha 3
                cartasCaidas[0][2] === cartasCaidas[2][2] &&
                cartasCaidas[0][2] === cartasCaidas[3][2] &&
                cartasCaidas[0][2] === cartasCaidas[4][2]
            ):
            	card1 = cartasCaidas_classes[0][2].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][2].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][2].replace(/ /g, ".")
            	card4 = cartasCaidas_classes[2][2].replace(/ /g, ".")
            	card5 = cartasCaidas_classes[4][2].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	document.querySelector("."+card4).classList.add('blink');
            	document.querySelector("."+card5).classList.add('blink');
            	
                $linha3.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*5
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[0][0] === cartasCaidas[0][1] && // ganhou com todos iguais na coluna 1
                cartasCaidas[0][0] === cartasCaidas[0][2]
            ):
            	card1 = cartasCaidas_classes[0][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[0][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[0][2].replace(/ /g, ".")

            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	
                $vlinha1.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*2
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[1][0] === cartasCaidas[1][1] && // ganhou com todos iguais na coluna 2
                cartasCaidas[1][0] === cartasCaidas[1][2]
            ):
            	card1 = cartasCaidas_classes[1][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[1][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[1][2].replace(/ /g, ".")
            	console.log("Card1: "+card1)
            	console.log("Card1: "+card2)
            	console.log("Card1: "+card3)
            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	
            	card1 = card1 + ' blink';
				card2 = card2 + ' blink';
				card3 = card3 + ' blink';
            	
            	console.log("Card1: "+card1+" Classes: "+$(card1).attr('class'))
            	console.log("Card2: "+card2+" Classes: "+$(card2).attr('class'))
            	console.log("Card3: "+card3+" Classes: "+$(card3).attr('class'))
            	
            	
                $vlinha2.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*2
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[2][0] === cartasCaidas[2][1] && // ganhou com todos iguais na coluna 3
                cartasCaidas[2][0] === cartasCaidas[2][2]
            ):
            	card1 = cartasCaidas_classes[2][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[2][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[2][2].replace(/ /g, ".")
            	console.log("Card1: "+card1)
            	console.log("Card1: "+card2)
            	console.log("Card1: "+card3)
            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	
            	card1 = card1 + ' blink';
				card2 = card2 + ' blink';
				card3 = card3 + ' blink';
            	
            	console.log("Card1: "+card1+" Classes: "+$(card1).attr('class'))
            	console.log("Card2: "+card2+" Classes: "+$(card2).attr('class'))
            	console.log("Card3: "+card3+" Classes: "+$(card3).attr('class'))
            	
            	
                $vlinha3.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*2
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[3][0] === cartasCaidas[3][1] && // ganhou com todos iguais na coluna 4
                cartasCaidas[3][0] === cartasCaidas[3][2]
            ):
            	card1 = cartasCaidas_classes[3][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[3][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[3][2].replace(/ /g, ".")
            	console.log("Card1: "+card1)
            	console.log("Card1: "+card2)
            	console.log("Card1: "+card3)
            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	
            	card1 = card1 + ' blink';
				card2 = card2 + ' blink';
				card3 = card3 + ' blink';
            	
            	console.log("Card1: "+card1+" Classes: "+$(card1).attr('class'))
            	console.log("Card2: "+card2+" Classes: "+$(card2).attr('class'))
            	console.log("Card3: "+card3+" Classes: "+$(card3).attr('class'))
            	
            	
                $vlinha4.css("visibility", "visible");
                valor = parseInt($("#bet_valor").text())*2
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;

            case (
                cartasCaidas[4][0] === cartasCaidas[4][1] && // ganhou com todos iguais na coluna 5
                cartasCaidas[4][0] === cartasCaidas[4][2]
            ):
            	card1 = cartasCaidas_classes[4][0].replace(/ /g, ".")
            	card2 = cartasCaidas_classes[4][1].replace(/ /g, ".")
            	card3 = cartasCaidas_classes[4][2].replace(/ /g, ".")
            	console.log("Card1: "+card1)
            	console.log("Card1: "+card2)
            	console.log("Card1: "+card3)
            	document.querySelector("."+card1).classList.add('blink');
            	document.querySelector("."+card2).classList.add('blink');
            	document.querySelector("."+card3).classList.add('blink');
            	card1 = card1 + ' blink';
				card2 = card2 + ' blink';
				card3 = card3 + ' blink';
            	
            	console.log("Card1: "+card1+" Classes: "+$(card1).attr('class'))
            	console.log("Card2: "+card2+" Classes: "+$(card2).attr('class'))
            	console.log("Card3: "+card3+" Classes: "+$(card3).attr('class'))
            	
                $vlinha5.css("visibility", "visible");
                
                valor = parseInt($("#bet_valor").text())*2
                saldo = parseInt($("#bet_saldo").text())
                novo_saldo = saldo + (valor)
                $("#bet_saldo").text(novo_saldo)
                updateCoins(novo_saldo)
                ganhou(valor);
                break;
                
             

            default:
                break;
        }

        console.log(cartasCaidas)
        console.log(cartasCaidas_classes)
        ativar_botao();
    },6900)

    

    

}

function girarColuna($coluna, delay, cardIndex) {
	$("#txt_vitoria").val()
    var card_altura = $coluna.find('.card').outerHeight();
    var card_position = cardIndex * card_altura;
    var currentPosition = $coluna.scrollTop();
    var distancia_ate_card = (card_position - currentPosition);

    var object = {
		x: Math.floor(Math.random() * 50) / 100,
        y: Math.floor(Math.random() * 20) / 100
	};
    try {
        $coluna.css({
            'transition-timing-function': 'cubic-bezier(0,' + object.x + ',' + object.y + ',1)',
            'transition-duration': '0s', // Define a duração da transição como 0 para reiniciar
            'transform': 'translate3d(0px, 0px, 0px)' // Retorna à posição inicial
        });

        // Forçar um novo cálculo de layout para garantir que a reinicialização ocorra
        $coluna[0].offsetHeight; // Isso força o navegador a recalcular o layout

        // Agora, aplique a animação com o atraso especificado
        setTimeout(function() {
            $coluna.css({
                'transition-timing-function': 'cubic-bezier(0,' + object.x + ',' + object.y + ',1)',
                'transition-duration': '6s',
                'transform': 'translate3d(0px, -' + distancia_ate_card + 'px, 0px)'
            });
        }, delay);

    } catch (err) {
        alert(err.message);
    }
}

function isScrolledIntoView(elem) {
    var docViewTop = $(window).scrollTop();
    var docViewBottom = docViewTop + $(window).height();
    var elemTop = $(elem).offset().top;
    var elemBottom = elemTop + $(elem).height();
    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
}
function get_card(card_number) {
    if(card_number==='img0'){
        return 'seven';
    }else if(card_number==='img1'){
        return  'bonus';
    }else if(card_number==='img2'){
        return  'cherry';
    }else if(card_number==='img3'){
        return  'lemon';
    }else if(card_number==='img4'){
        return  'diamond';
    }
}

function ativar_botao(){
    $("#girar").prop('disabled', false);
    $("#bet_1").prop('disabled', false);
    $("#bet_10").prop('disabled', false);
    $("#bet_100").prop('disabled', false);
    $("#bet_all").prop('disabled', false);
}

function desativar_botao(){
    $("#girar").prop('disabled', true);
    $("#bet_1").prop('disabled', true);
    $("#bet_10").prop('disabled', true);
    $("#bet_100").prop('disabled', true);
    $("#bet_all").prop('disabled', true);
}

function inserir_moedas_sound(){
    var audio = new Audio('../sound_effect/insert_coin.wav');
    audio.play();
}

function ganhou(valor){
    var $PopUp = $(".popup .popuptext");
    var audio = new Audio('../sound_effect/ganhou.mp3');
    $("#txt_vitoria").val(`Ganhou ${valor} !!`)
    //$PopUp.css("visibility","visible");
    audio.play();
}

function background_music(){
    var audio = $("#audio-loop")[0]; // [0] para acessar o elemento DOM diretamente
    audio.play();
}

function getIDinfo(){
    const usuario = localStorage.getItem("iduser");
    console.log("usuario: "+usuario);
    let moedas = getCoins(usuario);
    
    console.log($("#bet_saldo").text());
    
}

function getCoins(user) {
    const url = `http://localhost:8080/fatecoins/get/cliente/${user}`;

    fetch(url, {
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
        $("#bet_saldo").text(data.qtd);
        // Faça algo com os dados, como atualizar o saldo na ‘interface’ do usuário
        return data.qtd
    })
    .catch(error => {
        // Trata erros ocorridos durante o request
        console.error('Erro:', error);
        // Aqui você pode lidar com o erro conforme a sua lógica de aplicativo
    });
}

function updateCoins(novoSaldo) {
    const id = localStorage.getItem("iduser");
    const url = `http://localhost:8080/fatecoins/update/${id}`;

    fetch(url, {
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
        //console.log('Saldo atualizado com sucesso!');
        // Aqui você pode lidar com a resposta conforme necessário
        getCoins(id)
    })
    .catch(error => {
        // Trata erros ocorridos durante o request
        console.error('Erro:', error);
        // Aqui você pode lidar com o erro de acordo com sua lógica de aplicativo
    });
}

function remover_blink(){
	var todosElementos = document.querySelectorAll('.column0');

	// Itera sobre cada elemento
	todosElementos.forEach(function(elemento) {
	    // Verifica se o elemento tem a classe 'blink'
	    if (elemento.classList.contains('blink')) {
	        // Remove a classe 'blink'
	        elemento.classList.remove('blink');
	    }
	});
	todosElementos = document.querySelectorAll('.column1');

	// Itera sobre cada elemento
	todosElementos.forEach(function(elemento) {
	    // Verifica se o elemento tem a classe 'blink'
	    if (elemento.classList.contains('blink')) {
	        // Remove a classe 'blink'
	        elemento.classList.remove('blink');
	    }
	});
	todosElementos = document.querySelectorAll('.column2');

	// Itera sobre cada elemento
	todosElementos.forEach(function(elemento) {
	    // Verifica se o elemento tem a classe 'blink'
	    if (elemento.classList.contains('blink')) {
	        // Remove a classe 'blink'
	        elemento.classList.remove('blink');
	    }
	});
	todosElementos = document.querySelectorAll('.column3');

	// Itera sobre cada elemento
	todosElementos.forEach(function(elemento) {
	    // Verifica se o elemento tem a classe 'blink'
	    if (elemento.classList.contains('blink')) {
	        // Remove a classe 'blink'
	        elemento.classList.remove('blink');
	    }
	});
	todosElementos = document.querySelectorAll('.column4');

	// Itera sobre cada elemento
	todosElementos.forEach(function(elemento) {
	    // Verifica se o elemento tem a classe 'blink'
	    if (elemento.classList.contains('blink')) {
	        // Remove a classe 'blink'
	        elemento.classList.remove('blink');
	    }
	});
	
}

