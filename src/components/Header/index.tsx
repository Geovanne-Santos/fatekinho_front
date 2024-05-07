export function Header() {
  return (
    <header className="w-screen flex justify-between py-5 px-20 border-b-4 border-white-500">
      <div className="flex items-center gap-10">
        <span>icone foda</span>
        <h1 className="text-2xl font-bold">FATEKINHO</h1>
      </div>  

      <div className="flex gap-10 bg-[#090F15] p-4 rounded">
        <button>Cadastrar</button>
        <button>Entrar</button>
      </div>
    </header>
  ) 
}
