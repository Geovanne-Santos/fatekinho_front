export type loteria = {
    id: Number;
    nome: string;
    codigo: string;
    descricao: string;
};

export interface loteriaResultadoResponse {
    acumulou: boolean;
    concurso: number;
    data: string;
    dataProximoConcurso: string;
    dezenas: string[];
    dezenasOrdemSorteio: string[];
    estadosPremiados: any[];
    local: string;
    localGanhadores: ganhadores[];
    loteria: string;
    mesSorte: string;
    observacao: string;
    premiacoes: premiacao[];
    proximoConcurso: number;
    timeCoracao: string;
    trevos: string[];
    valorAcumuladoConcursoEspecial: number;
    valorAcumuladoConcurso05: number;
    valorAcumuladoProximoConcurso: number;
    valorArrecadado: number;
    valorEstimadoProximoConcurso: number;
}

interface premiacao {
    faixa: number;
    descricao: string;
    valorPremio: number;
    ganhadores: number;
}

interface ganhadores {
    posicao: number;
    ganhadores: number;
    municipio: string;
    nomeFantasiaUL: string;
    uf: string;
    serie: string;
}

