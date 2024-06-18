import mascote from "../../assets/mascote.svg"
import aviatorIcon from "../../assets/aviator_icon.png"
import example01 from "../../assets/brigaGalo/game-images/example01.png"
import example02 from "../../assets/brigaGalo/game-images/example02.png"
import red from "../../assets/rooster-img/red.png";
import blue from "../../assets/rooster-img/blue.png";
import { Link } from "react-router-dom"

export function ComoJogarRoosterFight() {

  return (
    <div id="app" class="bg-background w-full min-h-screen">

      <header
        class="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
      >

        <a
          class="text-primary text-4xl flex items-center hover:animate-pulse"
          href="#"
        >
          <img src={mascote} alt="" class="size-12" />
          <span class="hidden sm:inline-block">Rinha de Galo</span>
        </a>
        <div class="flex gap-2 items-center justify-center">
          <Link to="/game/rooster-fight">
            <a
              class="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full text-gray-800"
              title="Clique aqui para voltar para o jogo"

            >

              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                <path fill-rule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clip-rule="evenodd" />
              </svg>

              <span class="hidden sm:inline-block">Voltar</span>
            </a>
          </Link>
        </div>
      </header>
      <main class="w-full flex items-center justify-center">
        <section
          class="font-serif m-2 sm:m-8 max-w-4xl w-full flex flex-col p-0.5 sm:p-2 gap-6 mb-24 text-gray-300"
        >
          <div class="flex flex-col sm:flex-row items-center gap-2">
            <h1 class="text-3xl font-bold text-gray-100">
              Como funciona o jogo Rinha de Galo do Fatekinho?
            </h1>
          </div>

          <div
            class="flex items-center p-4 mb-4 text-sm rounded-lg bg-slate-800 text-red-400"
            role="alert"
          >

            <svg class="size-10 flex-shrink-0 inline me-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10.339 2.237a.531.531 0 0 0-.678 0 11.947 11.947 0 0 1-7.078 2.75.5.5 0 0 0-.479.425A12.11 12.11 0 0 0 2 7c0 5.163 3.26 9.564 7.834 11.257a.48.48 0 0 0 .332 0C14.74 16.564 18 12.163 18 7c0-.538-.035-1.069-.104-1.589a.5.5 0 0 0-.48-.425 11.947 11.947 0 0 1-7.077-2.75ZM10 6a.75.75 0 0 1 .75.75v3.5a.75.75 0 0 1-1.5 0v-3.5A.75.75 0 0 1 10 6Zm0 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" clip-rule="evenodd" />
            </svg>
            <span class="sr-only">Atenção</span>
            <div>
              <span class="text-xl font-medium">Atenção</span>
              <p class="text-base">
                Nenhum animal foi ferido durante as brigas de galos, este jogo é
                apenas uma simulação de uma rinha de galo
              </p>
            </div>
          </div>

          <p>
            O jogo se trata de uma simulação de uma
            <b>briga de galo</b>
            Ele é o clássico, no qual dois galos disputam uma briga e apenas um
            deles sai como vencedor dessa intensa briga.
          </p>

          <p>
            Você pode, se o seu galo escolhido vencer a disputa, ter a sua
            aposta
            <b class="italic text-yellow-400">dobrada!</b>
          </p>

          <img
            src={example01}
            alt="Exemplo de partida"
            class="block rounded-md border-gray-400 border w-full sm:w-2/3 self-center"
          />

          <p>
            No jogo você escolhe um dos dois galos que estão brigando, um do
            time
            <b class="text-red-500">Vermelho</b>
            e o outro do time
            <b class="text-blue-500">Azul.</b>
            Mas apenas um deles irá ganhar a briga.
          </p>

          <div
            class="w-full flex flex-col lg:flex-row gap-4 my-8 items-center max-w-2xl lg:max-w-4xl mx-auto"
          >

            <div
              class="w-full flex-1 px-8 py-4 rounded-lg flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-800 border border-t-slate-600 border-l-slate-600 border-b-slate-700 border-r-slate-700 ring-1 ring-inset ring-slate-900/20 shadow-lg"
            >
              <div class="flex flex-col gap-1 justify-center">
                <h5 class="font-bold text-2xl">Frango da sadia</h5>
                <span class="text-slate-400 text-sm">
                  Esse galo representa o time azul
                </span>
                <span
                  class="whitespace-nowrap mt-2 rounded-full w-min py-0.5 px-4 bg-cyan-500 text-slate-800 font-bold"
                >
                  Time Azul
                </span>
              </div>
              <div class="relative size-32 min-w-32">
                <img
                  src={blue}
                  alt="Galo azul"
                  class="absolute top-0 right-0 size-32 blur-lg"
                />
                <img
                  src={blue}
                  alt="Galo azul"
                  class="absolute top-0 right-0 size-32 inline-block"
                />
              </div>
            </div>

            <div
              class="w-full flex-1 px-8 py-4 rounded-lg flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-800 border border-t-slate-600 border-l-slate-600 border-b-slate-700 border-r-slate-700 ring-1 ring-inset ring-slate-900/20 shadow-lg"
            >

              <div class="flex flex-col gap-1 justify-center">
                <h5 class="font-bold text-2xl">Galo Ataliba</h5>
                <span class="text-slate-400 text-sm">
                  Esse galo representa o time vermelho
                </span>
                <span
                  class="whitespace-nowrap mt-2 rounded-full w-min py-0.5 px-4 bg-red-500 text-slate-800 font-bold"
                >
                  Time Vermelho
                </span>
              </div>
              <div class="relative size-32 min-w-32">
                <img
                  src={red}
                  alt="Galo vermelho"
                  class="absolute top-0 right-0 size-32 blur-lg"
                />
                <img
                  src={red}
                  alt="Galo vermelho"
                  class="absolute top-0 right-0 size-32 inline-block"
                />
              </div>
            </div>
          </div>

          <p>
            O
            <b>funcionamento do Jogo do Rinha de Galo no Fatekinho</b>
            é muito simples:
          </p>
          <ol class="list-decimal pl-8">
            <li>
              Acesse o jogo através desse
              <Link to="/game/rooster-fight"><a href="./index.html" class="text-indigo-400 underline">link</a></Link>
            </li>
            <li>
              Aposte no seu galo favorito clicando no galo vermelho ou no galo
              azul
            </li>
            <li>Assista à batalha entre os galos</li>
            <li>
              Descubra se o seu galo venceu a briga! Cada briga tem uma chance
              de 50% de vitória para cada galo
            </li>
          </ol>

          <img
            src={example02}
            alt="Exemplo de partida"
            class="block rounded-md border-gray-400 border w-full sm:w-2/3 self-center"
          />
        </section>
      </main>
    </div>
  )
}