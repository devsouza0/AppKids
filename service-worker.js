const CACHE_NAME = "encanto-kids-adm-v2";

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
    "./assets/logo.png"
    "./assets/icon-192.png",
"./assets/icon-512.png",
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
            .then(cache => {

                return cache.addAll(
                    ARQUIVOS_CACHE
                );

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


        /* Não mexer nas requisições do Supabase */

        if(
            requisicao.url.includes(
                "supabase.co"
            )
        ){

            return;

        }


        /* Somente GET */

        if(
            requisicao.method !== "GET"
        ){

            return;

        }


        event.respondWith(

            fetch(requisicao)

            .then(resposta => {

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


                return resposta;

            })

            .catch(() => {

                return caches.match(
                    requisicao
                );

            })

        );

    }
);
