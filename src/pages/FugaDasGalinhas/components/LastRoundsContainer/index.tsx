import { Icon } from "../Icons";

export function LastRoundsContainer() {
  return (
    <section className="flex items-center gap-2 w-full">
      <button
        className="flex items-center justify-center py-0.5 px-2 rounded-full text-xs text-gray-500 bg-gray-800 border border-gray-700 hover:brightness-125"
        title="Limpar o histórico de partidas anteriores"
        id="clear-last-rounds"
        type="button"
      >
        <Icon.TrashCan className="size-4" />
      </button>
      <ul
        id="last-rounds-list"
        className="py-1 overflow-x-auto gap-1.5 flex items-center w-full"
      >
        <li>
          <span className="text-sm text-gray-400 flex items-center gap-2">
            <Icon.Clock className="size-4" />
            Aqui ficará o histórico das partidas anteriores
          </span>
        </li>
      </ul>
    </section>
  );
}
