import { Icon } from "../Icons";

type HeaderProps = {
  playerMoney: number;
};

export function GameHeader({ playerMoney }: HeaderProps) {
  return (
    <header className="p-1 px-4 bg-slate-800 flex justify-between border border-b border-slate-700">
      <a
        className="text-primary text-4xl flex items-center hover:animate-pulse"
        href="#"
      >
        <img src="./assets/mascote.svg" alt="" className="w-12 h-12" />
        Aviator
      </a>
      <div className="flex gap-2 items-center justify-center">
        <a
          className="bg-secondary text-slate-900 flex py-0.5 px-3 items-center gap-1 justify-center rounded-full"
          title="Clique aqui para saber como jogar o jogo"
          href="./how-to-play.html"
        >
          <Icon.QuestionMarkCircle className="size-5" />

          <span className="hidden sm:inline-block"> Como jogar? </span>
        </a>

        <div className="flex gap-2 items-center justify-center py-0.5 px-3 bg-slate-900 border-slate-700 border rounded-full text-white">
          <span>
            <img src="./assets/coin.svg" alt="fatecoins" className="w-6 h-6" />
          </span>
          <span id="player-money">{playerMoney}</span>
        </div>
      </div>
    </header>
  );
}
