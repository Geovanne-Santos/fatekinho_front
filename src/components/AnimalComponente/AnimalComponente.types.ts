
export interface AnimalComponenteProps {
    bicho: {
        numero: number;
        nome: string;
        dezenas: number[];
    };
    itens: number[];
    selecionarItens: () => void;
}