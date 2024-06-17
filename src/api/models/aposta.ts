export type aposta = {
    id: Number;
    idCliente: Number;
    valor: number;
    jogo: string;
    modalidade: Number;
    tipo: Number;
    dataCadastro: Date;
    finalizada: boolean;
    ganho: number;
    dataCadastroSorteio?: Date;
};