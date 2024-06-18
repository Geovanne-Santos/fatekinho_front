import { useState } from 'react';
import { Link } from 'react-router-dom';
import Banner from '../../assets/banner.png';
import BannerRinha from '../../assets/BANNER_RINHA_CAPA.png';
import BannerBlackJack from '../../assets/BANNER_blackjack_CAPA.png';
import BannerRoleta from '../../assets/capa_ROLETA.png';
import BannerJackpot from '../../assets/JackSpot_1.png';
import BannerMiniblaze from '../../assets/Mini_blaze.png';
import BannerAviator from '../../assets/capa_aviazinho.png';
import BannerLoteria from '../../assets/loteria_funcional.png';
import BannerJogoBicho from '../../assets/galo.bingo.jpg';

const games = [
  {
    name: 'Rinha de Galo',
    image: BannerRinha,
    details: 'Faça sua aposta de quem irá ganhar!',
    link: "/game/rooster-fight",
  },
  {
    name: 'BlackJack',
    image: BannerBlackJack,
    details: 'Jogue o clássico jogo de cartas Blackjack!',
    link: "/game/blackjack",
  },
  {
    name: 'Roleta',
    image: BannerRoleta,
    details: 'Gire a roleta e aposte na sorte!',
    link: "/game/roleta",
  },
  {
    name: 'Aviator',
    image: BannerAviator,
    details: 'Voando alto com Aviator!',
    link: "/game/aviator",
  },
  {
    name: 'Jackpot',
    image: BannerJackpot,
    details: 'Busque o grande Jackpot!',
    link: "/game/caca-niquel",
  },
  {
    name: 'Mini Blaze',
    image: BannerMiniblaze,
    details: 'A mini aventura com Mini Blaze!',
    link: "/game/minesweeper",
  },
  {
    name: 'Loteria',
    image: BannerLoteria,
    details: 'Tente a sorte na Loteria!',
    link: "/game/loterias",
  },
  
  {
    name: 'Jogo do bicho',
    image: BannerJogoBicho,
    details: 'Sorte se esconde nas patas do bicho.',
    link: "/game/jogo-bicho",
  },
];

export function Home() {
  const [hoveredGame, setHoveredGame] = useState(null);

  const handleMouseEnter = (index: any) => {
    setHoveredGame(index);
  };

  const handleMouseLeave = () => {
    setHoveredGame(null);
  };

  return (
    <section className="px-4 md:px-12 py-10 md:py-20 w-full bg-coins">
      <div className="flex flex-col items-center justify-center w-full md:w-4/6 m-auto">
        <div
          className="flex items-center bg-cover bg-center w-full mb-6 rounded-xl px-6 py-6 md:p-10"
          style={{ backgroundImage: `url(${Banner})` }}
        >
          <div className="flex flex-col gap-4 bg-[#090F15] p-4 md:p-8 ml-4 md:ml-14 rounded-3xl shadow-lg shadow-black">
            <h1 className="text-2xl md:text-3xl font-bold">
              Bem Vindo ao FATEKINHO!
            </h1>
            <p className="mb-4 md:mb-10 text-sm md:text-base">
              Cadastre-se e receba bônus de depósito de até R$ 200!
            </p>
            <Link
              to={'/register'}
              className="bg-[#ED1836] text-[#FFFFFF] text-center py-2 text-sm md:text-base rounded-md w-2/4 transition hover:bg-red-700"
            >
              CADASTRAR-SE
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
          {games.map((game, index) => (
            <Link
              to={game.link}
              key={index}
              className="relative bg-cover bg-center h-48 md:h-48 rounded-lg overflow-hidden cursor-pointer"
              style={{ backgroundImage: `url(${game.image})` }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              {hoveredGame === index && (
                <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-75 text-white p-4 md:p-8 transform scale-105 transition-transform">
                  <h2 className="text-lg md:text-xl font-bold">{game.name}</h2>
                  <p className="text-sm md:text-base">{game.details}</p>
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
