import { useEffect } from "react";
import { Label } from "../Label"
import { AnimalComponenteProps } from "./AnimalComponente.types"
import "./style.css"

export function AnimalComponente({ bicho, selecionarItens, itens }: AnimalComponenteProps) {
    useEffect(() => {
        console.log(itens.find((i) => i == bicho.numero), itens.find((i) => i == bicho.numero) != undefined ? "bg-[#090F15]" : "bg-[#090F15]")
      }, [itens]);
    return (
        <div className={`${itens.find((i) => i == bicho.numero) != undefined  ? "bg-[#FAF755] text" : "bg-[#090F15]"} rounded-md card-bicho p-4 text-center`} onClick={selecionarItens}>
            <div className="grid grid-cols-4 text-left">
                <div className="col-span-1">
                    <Label texto={bicho?.numero.toString()} personalizado={itens.find((i) => i == bicho.numero) != undefined  ? "dark:text-gray-800 font-bold" : ""}/>
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    <img src={bicho.img} alt="" className="my-4" />
                </div>
                <div className="col-span-1 text-right">
                    {bicho.dezenas.map((d) => {
                        return (
                            <>
                                <Label texto={d.toString()} personalizado={itens.find((i) => i == bicho.numero) != undefined  ? "dark:text-gray-800 font-bold" : ""}/><br />
                            </>
                        )
                    })}
                </div>
            </div>


            <Label texto={bicho.nome} personalizado={itens.find((i) => i == bicho.numero) != undefined  ? "dark:text-gray-800 font-bold" : ""}/>
        </div>
    )
}