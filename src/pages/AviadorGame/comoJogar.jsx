import mascote from "../../assets/mascote.svg"
import aviatorIcon from "../../assets/aviator_icon.png"
import example01 from "../../assets/game-images/example01.png"
import example02 from "../../assets/game-images/example02.png"
import example03 from "../../assets/game-images/example03.png"
import { Link } from "react-router-dom"

export function ComoJogarAviator() {


  return (
    <div id="app" className="bg-background w-full min-h-screen">
      <header
        className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
      >

        <a
          className="text-primary text-4xl flex items-center hover:animate-pulse"
          href="./index.html"
        >
          <img src={mascote} alt="" className="w-12 h-12" />
          Aviator
        </a>
        
        <div className="flex gap-2 items-center justify-center">
        <Link to="/game/aviator/">
          <a
            className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full text-gray-800"
            title="Clique aqui para voltar para o jogo"
          >

            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
              <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clip-rule="evenodd" />
            </svg>

            <span className="hidden sm:inline-block"> Voltar </span>
          </a>
          </Link>
        </div>
        
      </header>
      <main className="w-full flex items-center justify-center">
        <section
          className="font-serif m-2 sm:m-8 max-w-4xl w-full flex flex-col p-0.5 sm:p-2 gap-6 mb-24 text-gray-300"
        >
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <h1 className="text-3xl font-bold text-gray-100">
              Como funciona o jogo Aviãozinho Fatekinho?
            </h1>
            <img
              src={aviatorIcon}
              alt="Ícone do aviãozinho"
              className="h-20 w-20 object-contain"
            />
          </div>
          <p>
            Ele é o famoso <b> Jogo do Aviãozinho </b>, no qual você ganha
            dinheiro dependendo do tempo que o avião permanece na tela.
          </p>
          <p>
            O <b> funcionamento do Jogo do Aviãozinho no Fatekinho </b> é muito
            simples:
          </p>
          <ul className="list-disc pl-8">
            <li>Você começa uma rodada colocando um valor de aposta;</li>
            <li>Um avião decola e fica um tempo sobrevoando na tela;</li>
            <li>
              Enquanto o avião está subindo, um multiplicador vai sendo
              mostrado, aumentando consecutivamente o valor da sua aposta;
            </li>
            <li>Quando o avião sai da tela, o jogo termina.</li>
          </ul>

          <img
            src={example01}
            alt="Exemplo de partida"
            className="block rounded-md border-gray-400 border w-2/3 self-center"
          />

          <p>Assim, neste jogo, há algumas <b> possibilidades: </b></p>

          <ul className="list-disc pl-8">
            <li>
              Você
              <b>
                retira sua aposta (faz cash out) enquanto o avião ainda está na
                tela.
              </b>
              Os seus ganhos serão referentes à multiplicação do valor apostado
              pelo multiplicador que estava na tela no momento do cash out (por
              exemplo, 1x; 2x; 3x etc.);
            </li>
            <li>
              Você <b> não retira sua aposta e o avião voa para longe </b>,
              então, você perde o valor apostador naquela rodada.
            </li>
          </ul>

          <img
            src={example02}
            alt="Exemplo de partida"
            className="block rounded-md border-gray-400 border w-2/3 self-center"
          />

          <p>
            Como tem regras simples e é muito dinâmico, o
            <b> Jogo do Aviãozinho permite ganhos rápidos e altos. </b>Por isso,
            faz tanto sucesso com os apostadores.
          </p>
          <p>
            São vários os recursos disponíveis no jogo do
            <b> Aviãozinho online no Fatekinho </b>, como a possibilidade de
            colocar <b>duas apostas simultâneas </b> e de visualizar as
            <b>partidas anteriores.</b>
          </p>

          <h2 className="text-3xl font-bold text-gray-100">
            Como ganhar no jogo do Aviãozinho?
          </h2>
          <p>
            O segredo para ganhar no jogo do Aviãozinho é
            <b> fazer o cash out antes que o avião decole e saia da tela. </b>
            Mas, claro, isso
            <b> garantindo o maior multiplicador possível, </b> para conseguir
            um bom lucro.
          </p>
          <img
            src={example03}
            alt="Exemplo de partida"
            className="block rounded-md border-gray-400 border w-2/3 self-center"
          />

          <p>
            Embora as regras do <b>jogo do avião </b> sejam fáceis, não se
            engane: O jogo do aviãozinho é bastante desafiador e muito
            emocionante. O que explica seu sucesso nos cassinos virtuais.
          </p>

          <p>Para ficar mais simples, vamos dar um exemplo:</p>

          <ul className="list-disc pl-8">
            <li>
              Você inicia a partida com uma <b> aposta mínima de R$ 1; </b>
            </li>
            <li>O avião começa a decolar;</li>
            <li>
              Quando atinge o <b> multiplicador de 2x, você faz o cash out; </b>
            </li>
            <li>
              O avião sobrevoa até o multiplicador de 5x e depois sai da tela;
            </li>
            <li>Nessa rodada, <b> você ganhou R$ 2. </b></li>
          </ul>

          <p>
            Mas e se tivesse aguardado e não feito o cash out? Se o avião
            tivesse, por exemplo, saído da tela no multiplicador de 1x e você
            não tivesse retirado sua aposta, teria perdido a rodada.
          </p>
          <Link to="/game/aviator/">
            <div className="self-center my-4">
              <a className="button-bet">Gostou do jogo? Aposte agora</a>
            </div>
          </Link>
        </section>
      </main>
    </div>
  )
}