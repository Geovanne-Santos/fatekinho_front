import { Link } from "react-router-dom";
import { BotaoLinkProps } from "./BotaoLink.types";

export function BotaoLink({ texto, link}:BotaoLinkProps) {
    return (
        <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg bg-[#FAF753] text-[#1E1E1E]">
            {<Link to={link}>{texto}</Link>}
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
        </a>
    )
}