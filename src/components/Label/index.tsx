import { LabelProps } from "./Label.types";

export function Label({texto, textoGrifado, classes}: LabelProps) {
    return (
        <p className={`dark:text-gray-400 w-full sm:w-auto rounded-lg inline-flex items-center justify-center ${classes}`}>
            <b className="pr-1">{textoGrifado} </b> {texto}
        </p>
    )
}