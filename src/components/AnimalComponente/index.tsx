import avestruz from "../../assets/bichos/avestruz.png"
import { Label } from "../Label"
import { AnimalComponenteProps } from "./AnimalComponente.types"
import "./style.css"

export function AnimalComponente({ bicho }: AnimalComponenteProps) {
    return (
        <div className="bg-[#090F15] rounded-md card-bicho p-4 text-center">
            <div className="grid grid-cols-4 text-left">
                <div className="col-span-1">
                    <Label texto={bicho?.numero.toString()} />
                </div>
                <div className="col-span-2 flex justify-center items-center">
                    <img src={avestruz} alt="" className="my-4" />
                </div>
                <div className="col-span-1 text-right">
                    {bicho.dezenas.map((d) => {
                        return (
                            <>
                                <Label texto={d.toString()} /><br />
                            </>
                        )
                    })}
                </div>
            </div>


            <Label texto={bicho.nome} />
        </div>
    )
}