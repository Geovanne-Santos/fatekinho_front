//import "./spin_wheel.css"
//verificar css, pois esta quebrando o site todo (não alterar tag somente classes)
export function Roleta() {
    return (
        <>
            <div className="menu-lateral">
                <h2>Roleta</h2>
                <div className="input-container">
                    <input type="number" min="0.01" step="0.01" id="entrada" placeholder="Quantia" value="0" onInput="validity.valid||(value='');" />
                    <button className="btn_add um">+1</button>
                    <button className="btn_add dez">+10</button>
                    <button className="btn_add cem">+100</button>
                </div>
                <h1>Selecione a cor:</h1>
                <div className="btn_container">
                    <button className="aposta amarelo">1.5X</button>
                    <button className="aposta preto">1.5X</button>
                    <button className="aposta coringa">6X</button>
                </div>
                <h1>Selecione um numero:</h1>
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
            <div className="jogo">
                <div className="saldo">
                    Saldo total
                    <h1>R$<div id="saldo_atual">100.00</div></h1>
                </div>
                <div id="resultado"></div>
                <div className='carrosel'>
                    <div className='seta'></div>
                    <div className='container'></div>
                </div>
                <div id="ganho"></div>
            </div>
        </>
    )
}