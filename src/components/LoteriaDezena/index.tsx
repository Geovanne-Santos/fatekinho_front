import { LoteriaDezenasProps } from "./LoteriaDezena.types";

export function LoteriaDezena({ dezena, tamanho }: LoteriaDezenasProps) {
    return (
        <div className="rounded-full bg-[#FAF753] text-[#1E1E1E]">
            <h5 className={`py-${tamanho.y} px-${tamanho.x} font-bold text-${tamanho.y}xl`}>{dezena}</h5>
        </div>
    )
}