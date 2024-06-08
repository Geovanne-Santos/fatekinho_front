import { ContainerProps } from "./Container.types";

export function Container({ titulo, children }: ContainerProps) {
    return(
        <div className="p-8 px-32 pt-10 w-full">
            {titulo && <h2 className="text-4xl font-extrabold dark:text-white pb-10">{titulo}</h2>}
            {children}
        </div>
        
    )
}