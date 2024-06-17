import { useGetFatecoins } from "../../api/controllers/fatecoins";
import { ContainerProps } from "./Container.types";
import fatecoins from "../../assets/coin.svg"
import "./style.css"

export function Container({ titulo, children }: ContainerProps) {
    const { data } = useGetFatecoins(1)
    return (
        <div className="p-8 px-32 pt-10 w-full">
            {data && <div className="flex jus justify-end items-center">
                <img src={fatecoins} className="coin mr-2" />
                {data.qtd}
            </div>}
            {titulo && <h2 className="text-4xl font-extrabold dark:text-white pb-10">{titulo}</h2>}
            {children}
        </div>

    )
}