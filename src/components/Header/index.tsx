import { BurgerIcon } from "../../utils/BurguerIcon";

export function Header({isOpen, setIsOpen}: any) {
  
  return (
    <header className="w-screen flex justify-between py-5 px-20 border-b-4 border-white-500">
      <div className="flex items-center gap-10">
        <BurgerIcon isOpen={isOpen} setIsOpen={setIsOpen}/>
        <h1 className="text-2xl font-bold">FATEKINHO</h1>
      </div>  

      <div className="flex gap-4 bg-[#090F15] p-2 rounded">
        <button className="py-1 px-4 rounded bg-[#FAF753] text-[#1E1E1E]">Cadastrar</button>
        <button className="py-1 px-4 rounded">Entrar</button>
      </div>
    </header>
  ) 
}
