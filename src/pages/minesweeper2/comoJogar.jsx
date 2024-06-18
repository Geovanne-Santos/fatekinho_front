import { Link } from "react-router-dom"
import mascote from "../../assets/mascote.svg"
import aviatorIcon from "../../assets/aviator_icon.png"
import example01 from "../../assets/minesweeper/game-images/example01.png"
import example02 from "../../assets/minesweeper/game-images/example02.png"
import example03 from "../../assets/minesweeper/game-images/example03.png"
import bomb from "../../assets/minesweeper/bomb.png"
import cyne from "../../assets/minesweeper/diamonds/cyan.png"

export function ComoJogarMineSweeper() {

    return (
        <div id="app" className="bg-background w-full min-h-screen">

            <header
                className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700"
            >

                <a
                    className="text-primary text-4xl flex items-center hover:animate-pulse"
                    href="#"
                >
                    <img src={mascote} alt="" className="size-12" />
                    <span className="hidden sm:inline-block"> Minesweeper </span>
                </a>
                <div className="flex gap-2 items-center justify-center">
                    <Link to="/game/minesweeper">
                        <a
                            className="bg-secondary flex py-0.5 px-3 items-center gap-1 justify-center rounded-full text-gray-800"
                            title="Clique aqui para voltar para o jogo"

                        >

                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M7.793 2.232a.75.75 0 0 1-.025 1.06L3.622 7.25h10.003a5.375 5.375 0 0 1 0 10.75H10.75a.75.75 0 0 1 0-1.5h2.875a3.875 3.875 0 0 0 0-7.75H3.622l4.146 3.957a.75.75 0 0 1-1.036 1.085l-5.5-5.25a.75.75 0 0 1 0-1.085l5.5-5.25a.75.75 0 0 1 1.06.025Z" clipRule="evenodd" />
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
                            Como funciona o jogo Campo Minado do Fatekinho?
                        </h1>
                    </div>
                    <p>
                        Ele é o clássico <b> Jogo de Campo Minado </b>, no qual as minas e
                        as gemas ficam escondidas em uma grade de quadrados. Seu trabalho é
                        acertar em qual bloco a gema está escondida e tomar cuidado para não
                        clicar na mina e perder toda a aposta.
                    </p>

                    <p>
                        Você pode conseguir, ao final, ter o valor de sua aposta
                        multiplicado em
                        <b className="italic text-cyan-400">15 vezes</b>!
                    </p>

                    <div className="flex flex-col md:flex-row gap-4 my-8 items-center">
                        <div
                            className="w-full flex-1 px-8 py-4 rounded-lg flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-800 border border-t-slate-600 border-l-slate-600 border-b-slate-700 border-r-slate-700 ring-1 ring-inset ring-slate-900/20 shadow-lg"
                        >
                            <div className="flex flex-col gap-1">
                                <h5 className="font-bold text-2xl">Gemas</h5>
                                <span className="text-slate-400 text-sm">
                                    Gemas encontradas nos blocos irão multiplicar seu ganho
                                </span>
                                <span
                                    className="mt-2 rounded-full w-min py-0.5 px-4 bg-cyan-500 text-slate-800 font-bold"
                                >20</span>
                            </div>
                            <div className="relative size-20 min-w-20">
                                <img
                                    src={cyne}
                                    data-diamond-img
                                    alt="Diamante"
                                    className="absolute top-0 right-0 size-20 blur-lg"
                                />
                                <img
                                    data-diamond-img
                                    src={cyne}
                                    alt="Diamante"
                                    className="absolute top-0 right-0 size-20 inline-block"
                                />
                            </div>
                        </div>
                        <div
                            className="w-full flex-1 px-8 py-4 rounded-lg flex flex-col sm:flex-row gap-2 justify-between items-center bg-slate-800 border border-t-slate-600 border-l-slate-600 border-b-slate-700 border-r-slate-700 ring-1 ring-inset ring-slate-900/20 shadow-lg"
                        >
                            <div className="flex flex-col gap-1">
                                <h5 className="font-bold text-2xl">Minas</h5>
                                <span className="text-slate-400 text-sm">
                                    Minas escondidas acabam com a sua sorte e fazem perder tudo
                                </span>
                                <span
                                    className="mt-2 rounded-full w-min py-0.5 px-4 bg-red-500 text-slate-800 font-bold"
                                >10</span>
                            </div>
                            <img
                                className="size-20 min-w-20"
                                src={bomb}
                                alt="Bomba"
                            />
                        </div>
                    </div>

                    <img
                        src={example01}
                        alt="Exemplo de partida"
                        className="block rounded-md border-gray-400 border w-full sm:w-2/3 self-center"
                    />

                    <p>
                        O <b> funcionamento do Jogo do Campo Minado no Fatekinho </b> é
                        muito simples:
                    </p>
                    <ul className="list-disc pl-8">
                        <li>Você começa uma rodada colocando um valor de aposta;</li>
                        <li>Você clica em um dos blocos da grade;</li>
                        <li>
                            Dependendo da sua sorte, no bloco selecionado pode estar uma gema
                            ou uma mina;
                        </li>
                        <li>Você decide quando sacar o dinheiro e terminar a rodada.</li>
                    </ul>

                    <img
                        src={example02}
                        alt="Exemplo de partida"
                        className="block rounded-md border-gray-400 border w-full sm:w-2/3 self-center"
                    />

                    <p>
                        Este é um <b>baseado na sorte</b> então a sorte pode ou não estar do
                        seu lado:
                    </p>

                    <p>
                        Se você
                        <b> retirar sua aposta (fazer cash out) </b>
                        enquanto estiver ganhando um valor satisfatório e antes de ter
                        clicado em uma mina, você ganha o valor da sua aposta multiplicado
                        por um valor dependendo da quantidade de gemas encontradas
                        <img
                            src={cyne}
                            alt="Diamante"
                            className="w-5 h-5 inline-block"
                        />
                        <img
                            src={cyne}
                            alt="Diamante"
                            className="w-5 h-5 inline-block"
                        />
                        <img
                            src={cyne}
                            alt="Diamante"
                            className="w-5 h-5 inline-block"
                        />
                    </p>
                    <p>
                        Se você <b> clicar em um bloco que tem uma mina</b>, você perde todo
                        os seus ganhos multiplicados mais o valor da aposta inicial.
                        <img
                            src={bomb}
                            alt="Bomba"
                            className="w-5 h-5 inline-block"
                        />
                        <img
                            src={bomb}
                            alt="Bomba"
                            className="w-5 h-5 inline-block"
                        />
                        <img
                            src={bomb}
                            alt="Bomba"
                            className="w-5 h-5 inline-block"
                        />
                    </p>

                    <div className="self-center my-4">
                        <Link to="/game/minesweeper">
                            <a className="diamond px-6 py-3 rounded">Gostou do jogo? Aposte agora</a>
                        </Link>
                    </div>
                </section>
            </main>
        </div>
    )
}