import Car from "../../assets/car.png";

export function Login() {
  return (
    <section className="flex justify-center items-center w-full h-full bg-coins">
      <div className="flex items-center justify-center w-2/5 h-2/5 bg-[#000000] rounded-3xl" style={{ backgroundImage: `url(${Car})`}}>
        <h1>Login</h1>
        <div>
          <label htmlFor="">Email Cadastrado *:</label>
          <input type="text" />
        </div>
      </div>
    </section>
  );
}
