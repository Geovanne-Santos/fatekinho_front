import $ from 'jquery';



window.onerror = function(e){
    alert(e.toString())
}

export function iniciar_linhas_caca(){
    let $coluna =  $(".column.zero"),
        linha = '',
        cardEscolhida = 0;
    for(let x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha = "<div class='column0 card_caca pos"+x+" img"+cardEscolhida+"'><img class='imgs_caca' src='../src/assets/"+cardEscolhida+".png'><\/div>";
        $coluna.append(linha);
    }

    let $coluna1 =  $(".column.um"),
        linha1 = '';
    for(let x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha1 = "<div class='column1 card_caca pos"+x+" img"+cardEscolhida+"'><img class='imgs_caca' src='../src/assets/"+cardEscolhida+".png'><\/div>";
        $coluna1.append(linha1);
    }

    let $coluna2 =  $(".column.dois"),
        linha2 = '';
    for(let x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha2 = "<div class='column2 card_caca pos"+x+" img"+cardEscolhida+"'><img class='imgs_caca' src='../src/assets/"+cardEscolhida+".png'><\/div>";
        $coluna2.append(linha2);
    }

    let $coluna3 =  $(".column.tres"),
    linha3 = '';
    for(let x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha3 = "<div class='column3 card_caca pos"+x+" img"+cardEscolhida+"'><img class='imgs_caca' src='../src/assets/"+cardEscolhida+".png'><\/div>";
        $coluna3.append(linha3);
    }

    let $coluna4 =  $(".column.quatro"),
        linha4 = '';
    for(let x = 0; x < 150; x++){
        cardEscolhida = Math.floor(Math.random() * 3);
        linha4 = "<div class='column4 card_caca pos"+x+" img"+cardEscolhida+"'><img class='imgs_caca' src='../src/assets/"+cardEscolhida+".png'><\/div>";
        $coluna4.append(linha4);
    }
}

export function girarTodasAsColunas() {
	$("#txt_vitoria").val(null)
	remover_blink()
    let $PopUp = $(".popup .popuptext")
    let $linha1 = $(".linha1")
    let $linha2 = $(".linha2")
    let $linha3 = $(".linha3")
    let $vlinha1 = $(".vlinha1")
    let $vlinha2 = $(".vlinha2")
    let $vlinha3 = $(".vlinha3")
    let $vlinha4 = $(".vlinha4")
    let $vlinha5 = $(".vlinha5")
    let $linha4_1 = $(".linha4_part1")
    let $linha4_2 = $(".linha4_part2")
    let $linha5_1 = $(".linha5_part1")
    let $linha5_2 = $(".linha5_part2")

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

    let colunas = $(".column");
    let delayBase = 100; // Ajuste o atraso base conforme necessário
    let delayIncremental = 200; // Ajuste o incremento do atraso conforme necessário
    let delay = 0
    let cartasCaidas = [[], [], [], [], []];
    let cartasCaidas_classes = [[], [], [], [], []];
    let cardIndex = 0

    colunas.each(function(index) {
        let $coluna = $(this);
        delay = delayBase + (index * delayIncremental);
        cardIndex = Math.floor(Math.random() * (140 - 70 + 1)) + 70;
        let caiu = $coluna.find('.card.pos' + (cardIndex)),
            caiu2 = $coluna.find('.card.pos' + (cardIndex+1)),
            caiu3 = $coluna.find('.card.pos' + (cardIndex+2))
    
        if (caiu.length > 0) {
            let classes1 = caiu.attr('class').split(' '),
                classes2 = caiu2.attr('class').split(' '),
                classes3 = caiu3.attr('class').split(' ');
            let terceiraClasse1 = get_card(classes1[3]),
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
        let valor;
        let saldo;
        let novo_saldo;
        let card1;
        let card2;
        let card3;
        let card4;
        let card5;
        
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

export function girarColuna($coluna, delay, cardIndex) {
	$("#txt_vitoria").val()
    let card_altura = $coluna.find('.card').outerHeight();
    let card_position = cardIndex * card_altura;
    let currentPosition = $coluna.scrollTop();
    let distancia_ate_card= (card_position - currentPosition);

    let object = {
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
                'transform': 'translate3d(0px, -' + distancia_ate_card+ 'px, 0px)'
            });
        }, delay);

    } catch (err) {
        alert(err.message);
    }
}


export function get_card(card_number) {
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

export function ativar_botao(){
    $("#girar").prop('disabled', false);
    $("#bet_1").prop('disabled', false);
    $("#bet_10").prop('disabled', false);
    $("#bet_100").prop('disabled', false);
    $("#bet_all").prop('disabled', false);
}

export function desativar_botao(){
    $("#girar").prop('disabled', true);
    $("#bet_1").prop('disabled', true);
    $("#bet_10").prop('disabled', true);
    $("#bet_100").prop('disabled', true);
    $("#bet_all").prop('disabled', true);
}


export function ganhou(valor){
    let audio = new Audio('../sound_effect/ganhou.mp3');
    $("#txt_vitoria").val(`Ganhou ${valor} !!`)
    //$PopUp.css("visibility","visible");
    audio.play();
}



export function getIDinfo(){
    const usuario = localStorage.getItem("iduser");
    console.log("usuario: "+usuario);
    getCoins(usuario);
    
    console.log($("#bet_saldo").text());
    
}

export function getCoins(user) {
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

export function updateCoins(novoSaldo) {
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

export function remover_blink(){
	let todosElementos = document.querySelectorAll('.column0');

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

