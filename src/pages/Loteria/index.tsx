import { useEffect } from "react";
import { useGetLoterias } from "../../api/controllers/loteria";
import { Container } from "../../components/Container";
import { Link } from "react-router-dom";
import { BotaoLink } from "../../components/BotaoLink";
import { Carregando } from "../../components/Carregando";

export function Loteria() {
  const { data, isLoading } = useGetLoterias();
  useEffect(() => {
    console.log(data)
  }, [data]);
  return (
    <Container titulo="Loterias">
      {!isLoading && data && data?.length > 0 ?
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 w-full">
          {data?.map((item) => {
            return (
              < >
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                  </a>
                  <div className="p-5">
                    <a href="#">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{item.nome}</h5>
                    </a>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.descricao}</p>
                    <BotaoLink texto="Ver concursos" link={`/game/loterias/${item.codigo}`} />
                  </div>
                </div>
              </>
            )
          })}
        </section> :
        <Carregando />}

    </Container>

  );
}
