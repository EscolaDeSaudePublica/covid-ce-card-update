const estado = document.currentScript.getAttribute('data-uf');
/**
 * Objeto de configuração para cada estado.
 * classePrefixo: Prefixo da classe que se deseja utilizar
 * apiUrl: URL da api a ser consultada, via GET
 * camposApi: Mapeamento do resultado do JSON para os nomes das classes
 *            AS CHAVES não devem ser ALTERADAS, pois são utilizadas para mapear as classes no html
 */
const covidConfig = {
    ce: {
        classePrefixo: 'covid_api_ce',
        apiUrl: 'https://dev.org.br/api/casos-ceara-por-dia',
        camposApi: {
            casos_confirmados: "casos_confirmados",
            casos_internados: "casos_internados",
            casos_internados_percent_total: "casos_internados_percent_total",
            casos_internados_uti: "casos_internados_uti",
            casos_internados_uti_percent_total: "casos_internados_uti_percent_total",
            casos_internados_domiciliar: "casos_internados_domiciliar",
            casos_internados_domiciliar_percent_total: "casos_internados_domiciliar_percent_total",
            casos_obitos: "casos_obitos",
            casos_obitos_percent_total: "casos_obitos_percent_total",
            casos_recuperados: "casos_recuperados",
            casos_recuperados_percent_total: "casos_recuperados_percent_total",
            casos_recuperados: "casos_recuperados"
        }
    }
};

function consultarDadosApi({url, camposApi}) {
    return fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((dadosApi) => {
            dadosApi = dadosApi[0]; // @TODO: DELETAR ESSA LINHA QUANDO API ESTIVER PRONTA
            let dados = {};
            for (let campo in camposApi) {
                if (dadosApi.hasOwnProperty('campo')) {
                    dados[campo] = dadosApi[camposApi[campo]]
                }
            }
            return dadosApi;
        });
}

function covidDataState(estado) {
    const uf = estado || 'ce';

    const prefixo = covidConfig[uf].classePrefixo || covidConfig.ce.classePrefixo;
    consultarDadosApi({
        url: covidConfig[uf].apiUrl || covidConfig.ce.apiUrl,
        camposApi: covidConfig[uf].camposApi || covidConfig.ce.camposApi
    })
        .then(function (dadosApi) {
            console.log(dadosApi);

            const covidClasses = [
                "casos_confirmados",
                "casos_internados",
                "casos_internados_percent_total",
                "casos_internados_uti",
                "casos_internados_uti_percent_total",
                "casos_internados_domiciliar",
                "casos_internados_domiciliar_percent_total",
                "casos_obitos",
                "casos_obitos_percent_total",
                "casos_recuperados",
                "casos_recuperados_percent_total",
                "casos_recuperados"
            ];

            for (const classe of covidClasses) {
                const classeAtual = `${prefixo}_${classe}`;
                const elementos = document.getElementsByClassName(classeAtual);
                for (campo in elementos) {
                    elemento.innerHTML = 10
                }
            }
        });
}

covidDataState(estado);