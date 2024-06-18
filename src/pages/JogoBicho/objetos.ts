import avestruz from "../../assets/bichos/avestruz.png";
import aguia from "../../assets/bichos/aguia.png";
import burro from "../../assets/bichos/burro.png";
import borboleta from "../../assets/bichos/borboleta.png";
import cachorro from "../../assets/bichos/cachorro.png";
import cabra from "../../assets/bichos/cabra.png";
import carneiro from "../../assets/bichos/carneiro.png";
import camelo from "../../assets/bichos/camelo.png";
import cobra from "../../assets/bichos/cobra.png";
import coelho from "../../assets/bichos/coelho.png";
import cavalo from "../../assets/bichos/cavalo.png";
import elefante from "../../assets/bichos/elefante.png";
import galo from "../../assets/bichos/galo.png";
import gato from "../../assets/bichos/gato.png";
import jacare from "../../assets/bichos/jacare.png";
import leao from "../../assets/bichos/leao.png";
import macaco from "../../assets/bichos/macaco.png";
import porco from "../../assets/bichos/porco.png";
import pavao from "../../assets/bichos/pavao.png";
import peru from "../../assets/bichos/peru.png";
import touro from "../../assets/bichos/touro.png";
import tigre from "../../assets/bichos/tigre.png";
import urso from "../../assets/bichos/urso.png";
import veado from "../../assets/bichos/veado.png";
import vaca from "../../assets/bichos/vaca.png";


export const bichos = [
    { nome: "Avestruz", numero: 1, dezenas: [1, 2, 3, 4], img: avestruz },
    { nome: "Águia", numero: 2, dezenas: [5, 6, 7, 8], img: aguia },
    { nome: "Burro", numero: 3, dezenas: [9, 10, 11, 12], img: burro },
    { nome: "Borboleta", numero: 4, dezenas: [13, 14, 15, 16], img: borboleta },
    { nome: "Cachorro", numero: 5, dezenas: [17, 18, 19, 20], img: cachorro },
    { nome: "Cabra", numero: 6, dezenas: [21, 22, 23, 24], img: cabra },
    { nome: "Carneiro", numero: 7, dezenas: [25, 26, 27, 28], img: carneiro },
    { nome: "Camelo", numero: 8, dezenas: [29, 30, 31, 32], img: camelo },
    { nome: "Cobra", numero: 9, dezenas: [33, 34, 35, 36], img: cobra },
    { nome: "Coelho", numero: 10, dezenas: [37, 38, 39, 40], img: coelho },
    { nome: "Cavalo", numero: 11, dezenas: [41, 42, 43, 44], img: cavalo },
    { nome: "Elefante", numero: 12, dezenas: [45, 46, 47, 48], img: elefante },
    { nome: "Galo", numero: 13, dezenas: [49, 50, 51, 52], img: galo },
    { nome: "Gato", numero: 14, dezenas: [53, 54, 55, 56], img: gato },
    { nome: "Jacaré", numero: 15, dezenas: [57, 58, 59, 60], img: jacare },
    { nome: "Leão", numero: 16, dezenas: [61, 62, 63, 64], img: leao },
    { nome: "Macaco", numero: 17, dezenas: [65, 66, 67, 68], img: macaco },
    { nome: "Porco", numero: 18, dezenas: [69, 70, 71, 72], img: porco },
    { nome: "Pavão", numero: 19, dezenas: [73, 74, 75, 76], img: pavao },
    { nome: "Peru", numero: 20, dezenas: [77, 78, 79, 80], img: peru },
    { nome: "Touro", numero: 21, dezenas: [81, 82, 83, 84], img: touro },
    { nome: "Tigre", numero: 22, dezenas: [85, 86, 87, 88], img: tigre },
    { nome: "Urso", numero: 23, dezenas: [89, 90, 91, 92], img: urso },
    { nome: "Veado", numero: 24, dezenas: [93, 94, 95, 96], img: veado },
    { nome: "Vaca", numero: 25, dezenas: [97, 98, 99, 100], img: vaca }
];

export const modalidades = [
    { id: 1, nome: "Grupo", tipo: 1, itensMaximo: 10, quebra: /./g, minimoSelecionado: 1},
    { id: 2, nome: "Milhar", tipo: 2, itensMaximo: 4, quebra: /.{1,4}/g, minimoSelecionado: 4},
    { id: 3, nome: "Centena", tipo: 2, itensMaximo: 3, quebra: /.{1,3}/g, minimoSelecionado: 3},
    { id: 4, nome: "Dezena", tipo: 2, itensMaximo:  2, quebra: /.{1,2}/g, minimoSelecionado: 2},
    //{ id: 5, nome: "Unidade", tipo: 2, itensMaximo:  1},
    //{ id: 6, nome: "Passe vai vem", tipo: 1, itensMaximo:  2},
    { id: 7, nome: "Milhar invertida", tipo: 2, itensMaximo:  4, quebra: /.{1,1}/g, minimoSelecionado: 4},
    { id: 8, nome: "Centena invertida", tipo: 2 , itensMaximo: 3, quebra: /.{1,1}/g, minimoSelecionado: 3},
    { id: 9, nome: "Dezena invertida", tipo: 2, itensMaximo:  2, quebra: /.{1,1}/g, minimoSelecionado: 2},
    //{ id: 10, nome: "Milhar/Centena", tipo: 2, itensMaximo:  4},
    //{ id: 11, nome: "Duque de dezena", tipo: 2, itensMaximo:  4, quebra: 2},
    //{ id: 12, nome: "Terno de dezena", tipo: 2, itensMaximo:  6, quebra: 2},
    { id: 13, nome: "Duque de grupo", tipo: 1 , itensMaximo: 2, quebra: /./g, minimoSelecionado: 2},
    { id: 14, nome: "Terno de grupo", tipo: 1 , itensMaximo: 3, quebra: /./g, minimoSelecionado: 3},
    { id: 15, nome: "Quadra de grupo", tipo: 1 , itensMaximo: 4, quebra: /./g, minimoSelecionado: 4},
    { id: 16, nome: "Quina de grupo", tipo: 1 , itensMaximo: 5, quebra: /./g, minimoSelecionado: 5}
];
