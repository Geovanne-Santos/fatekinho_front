export function Header() {
  return (
    <header className="w-screen flex justify-between py-8 px-4 border-b-4 border-white-500">
      <div className="flex items-center gap-10">
        <span>icone foda</span>
        <h1 className="text-2xl font-bold">FATEKINHO</h1>
      </div>  

      <div className="flex">
        <button>Cadastrar</button>
        <button>Entrar</button>
      </div>
    </header>
  ) 
}
