import { LabelProps } from "./Label.types";

export function Label({texto, textoGrifado, classes, personalizado, tamanho}: LabelProps) {
    return (
        <p className={`${personalizado ? personalizado : "dark:text-gray-400"} ${tamanho ? "text-" + tamanho : ""} w-full sm:w-auto rounded-lg inline-flex items-center justify-center ${classes}`}>
            <b className="pr-1">{textoGrifado} </b> {texto}
        </p>
    )
}