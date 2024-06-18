import { useGetFatecoins } from "../../api/controllers/fatecoins";
import { ContainerProps } from "./Container.types";
import fatecoins from "../../assets/coin.svg"
import "./style.css"

export function Container({ titulo, children, classes }: ContainerProps) {
    return (
        <div className={`p-8 px-32 pt-10 w-full ${classes} mt-16 text-left`}>
        
            {titulo && <h2 className="text-4xl font-extrabold dark:text-white pb-10 ">{titulo}</h2>}
            {children}
        </div>

    )
}