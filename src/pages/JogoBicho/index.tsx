import { useState } from "react";
import { Container } from "../../components/Container";
import { bichos, modalidades } from "./objetos";
import { Label } from "../../components/Label";
import { AnimalComponente } from "../../components/AnimalComponente";

export function JogoBicho() {
    const [modalidade, setModalidade] = useState({ id: 0, tipo: 0 })
    return (
        <>
            <Container titulo="Jogo do bicho">
                <Label texto={modalidades.find((m) => m.id == modalidade.id) ? modalidades.find((m) => m.id == modalidade.id)?.nome : ""} textoGrifado="Escolha a modalidade:" classes="mb-5" />
                <br />
                {modalidades.map((m) => {
                    return (
                        <button
                            type="button"
                            className={` ${modalidade.id == m.id ? "text-[#1E1E1E] bg-[#FAF755]" : "text-white bg-[#090F15]"} 
                            font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2`}
                            onClick={() => setModalidade(modalidade.id == m.id ? { id: 0, tipo: 0 } : { id: m.id, tipo: m.tipo })}>
                            {m.nome}
                        </button>
                    )
                })}
                <br />
                <Label textoGrifado={modalidade.tipo == 1 ? "Escolha seu grupo" : "Insira seu jogo"} classes="mt-16 mb-5" /><br />
                {modalidade.tipo == 1 ?
                    <div className="grid gap-x-8 gap-y-4 grid-cols-8">
                        {bichos.map((b) => {
                            return (
                                <AnimalComponente bicho={b} />
                            )
                        })}
                    </div> :
                    <input type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  />
                }
            </Container>
        </>
    )
}