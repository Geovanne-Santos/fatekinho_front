
export interface AnimalComponenteProps {
    bicho: {
        numero: number;
        nome: string;
        dezenas: number[];
        img: string;
    };
    itens: number[];
    selecionarItens: () => void;
}