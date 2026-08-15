const CACHE_NAME = "encanto-kids-adm-v4";

const ARQUIVOS_CACHE = [
    "./",
    "./login.html",
    "./dashboard.html",
    "./reservas.html",
    "./clientes.html",
    "./calendario.html",
    "./contratos.html",
    "./brinquedos.html",
    "./financeiro.html",
    "./configuracoes.html",
    "./manifest.json",
    "./assets/favicon.jpeg",
    "./assets/logo.png",
    "./assets/icon-192.png",
    "./assets/icon-512.png"
];


/* =========================================
INSTALAR
========================================= */

self.addEventListener(
    "install",
    event => {

        event.waitUntil(

            caches
            .open(CACHE_NAME)
            .then(async cache => {

                for(
                    const arquivo
                    of ARQUIVOS_CACHE
                ){

                    try{

                        await cache.add(
                            arquivo
                        );

                        console.log(
                            "Cache OK:",
                            arquivo
                        );

                    }
                    catch(erro){

                        console.warn(
                            "Não foi possível colocar no cache:",
                            arquivo,
                            erro
                        );

                    }

                }

            })

        );

        self.skipWaiting();

    }
);


/* =========================================
ATIVAR
========================================= */

self.addEventListener(
    "activate",
    event => {

        event.waitUntil(

            caches
            .keys()
            .then(nomes => {

                return Promise.all(

                    nomes.map(nome => {

                        if(
                            nome !==
                            CACHE_NAME
                        ){

                            return caches.delete(
                                nome
                            );

                        }

                    })

                );

            })

        );

        self.clients.claim();

    }
);


/* =========================================
REQUISIÇÕES
========================================= */

self.addEventListener(
    "fetch",
    event => {

        const requisicao =
        event.request;


        if(
            requisicao.url.includes(
                "supabase.co"
            )
        ){

            return;

        }


        if(
            requisicao.method !== "GET"
        ){

            return;

        }


        event.respondWith(

            fetch(requisicao)

            .then(resposta => {

                if(
                    resposta &&
                    resposta.status === 200 &&
                    resposta.type !== "opaque"
                ){

                    const copia =
                    resposta.clone();


                    caches
                    .open(CACHE_NAME)
                    .then(cache => {

                        cache.put(
                            requisicao,
                            copia
                        );

                    });

                }


                return resposta;

            })

            .catch(async () => {

                const cache =
                await caches.match(
                    requisicao
                );


                if(cache){

                    return cache;

                }


                if(
                    requisicao.mode ===
                    "navigate"
                ){

                    return caches.match(
                        "./login.html"
                    );

                }

            })

        );

    }
);
