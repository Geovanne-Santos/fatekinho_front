import "./spin_wheel.css";
import {iniciar_roleta, checkCoins, rodar} from "../../../js/spin_wheel";
import $ from 'jquery';
import {useEffect, useState} from "react";
import {useGetFatecoins} from "../../api/controllers/fatecoins.ts";
//verificar css, pois esta quebrando o site todo (não alterar tag somente classes)
export function Roleta() {
    const {data} = useGetFatecoins(1);
    const [saldo, setSaldo] = useState<number>(0)
    useEffect(() => {
        if(data){
            $("#user_saldo").val(data.qtd)
            setSaldo(parseInt(data.qtd))
            atualizarSaldo()
        }
    }, [data]);

    const atualizarSaldo = () =>{
        window.localStorage.setItem(
            "player-money",
            JSON.stringify({money:saldo})
        )
        dispatchEvent(new Event("storage"))
    }

    useEffect(() => {
        iniciar_roleta();
        $("#resultado").text("");


        const handleBetValueClick = (value:number) => {
            $("#bet_valor").val(value);
        };

        const handleApostaClick = async (cor:string) => {
            const aposta = $("#bet_valor").val();
            const saldo = $("#user_saldo").val();
            const check = await checkCoins(saldo, aposta);
            if (check) {
                const random_number = Math.floor(Math.random() * 36);
                rodar(cor, aposta, random_number);
            }
        };

        $(".btn_add.um").on("click", () => handleBetValueClick(1));
        $(".btn_add.dez").on("click", () => handleBetValueClick(10));
        $(".btn_add.cem").on("click", () => handleBetValueClick(100));
        $(".btn_add.all").on("click", () => handleBetValueClick(saldo));

        $(".aposta.amarelo").on("click", () => handleApostaClick("amarelo"));
        $(".aposta.vermelho").on("click", () => handleApostaClick("vermelho"));
        $(".aposta.coringa").on("click", () => handleApostaClick("coringa"));

        $(".btn_par,.btn_impar").on("click", async function () {
            const aposta = $("#bet_valor").val();
            const saldo = $("#user_saldo").val();
            const check = await checkCoins(saldo, aposta);
            const numero = $(this).text();
            if (check) {
                const random_number = Math.floor(Math.random() * 36);
                rodar(numero, aposta, random_number);
            }
        });

        return () => {
            $(".btn_add.um").off("click");
            $(".btn_add.dez").off("click");
            $(".btn_add.cem").off("click");
            $(".btn_add.all").off("click");

            $(".aposta.amarelo").off("click");
            $(".aposta.vermelho").off("click");
            $(".aposta.coringa").off("click");

            $(".btn_par,.btn_impar").off("click");
        };
    }, []);
    return (
        <>
            <div className="corpo">
                <div className="menu-lateral mt-16">
                    <div className="container-user">
                        <p id="user_name">Moedas</p>
                        <input type="number" name="" id="user_saldo" value={0} readOnly={true}></input>
                    </div>
                    <div className="input-container-r">
                        <input type="number" name="int_moedas" id="bet_valor" value={0} readOnly={true}></input>
                        <button className="btn_add um">+1</button>
                        <button className="btn_add dez">+10</button>
                        <button className="btn_add cem">+100</button>
                        <button className="btn_add all">+All</button>
                    </div>
                    <h2>Selecionar cor:</h2>
                    <div className="btn_container">
                        <button className="aposta amarelo">1.5X</button>
                        <button className="aposta vermelho">1.5X</button>
                        <button className="aposta coringa">6X</button>
                    </div>
                    <h2>Selecionar numero:</h2>
                    <div className="container_colunas">
                        <div className="column">
                            <button className="btn_impar">1</button>
                            <button className="btn_par">4</button>
                            <button className="btn_impar">7</button>
                            <button className="btn_par">10</button>
                            <button className="btn_impar">13</button>
                            <button className="btn_par">16</button>
                            <button className="btn_impar">19</button>
                            <button className="btn_par">22</button>
                            <button className="btn_impar">25</button>
                            <button className="btn_par">28</button>
                            <button className="btn_impar">31</button>
                            <button className="btn_par">34</button>
                        </div>

                        <div className="column">
                            <button className="btn_par">2</button>
                            <button className="btn_impar">5</button>
                            <button className="btn_par">8</button>
                            <button className="btn_impar">11</button>
                            <button className="btn_par">14</button>
                            <button className="btn_impar">17</button>
                            <button className="btn_par">20</button>
                            <button className="btn_impar">23</button>
                            <button className="btn_par">26</button>
                            <button className="btn_impar">29</button>
                            <button className="btn_par">32</button>
                            <button className="btn_impar">35</button>
                        </div>

                        <div className="column">
                            <button className="btn_impar">3</button>
                            <button className="btn_par">6</button>
                            <button className="btn_impar">9</button>
                            <button className="btn_par">12</button>
                            <button className="btn_impar">15</button>
                            <button className="btn_par">18</button>
                            <button className="btn_impar">21</button>
                            <button className="btn_par">24</button>
                            <button className="btn_impar">27</button>
                            <button className="btn_par">30</button>
                            <button className="btn_impar">33</button>
                            <button className="btn_par">36</button>
                        </div>
                    </div>
                </div>
                <div className="tela-jogo">
                    <div className="screen1">
                        <div id="resultado">Girando...</div>
                        <div className='carrosel'>
                            <div className='seta'></div>
                            <div className='container'></div>
                        </div>
                    </div>
                    <div className="menu-inferior">
                        <h4>Giros anteriores</h4>
                        <div className="container-anteriores">
                            <div className="carrosel-anteriores">

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}