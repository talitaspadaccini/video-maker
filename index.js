const readline = require('readline-sync') // biblioteca que permite que sejam informados dados ao sistema utilizando-se da linha de comando.
const Parser = require('rss-parser');

// Função que agrupa tudo
const TREND_URL = 'https://trends.google.com/trends/trendingsearches/daily/rss?geo=BR'

async function start(){
    const content = {};

    content.searchTerm = await askAndReturnSearchTerm();
    content.prefix = askAndReturnPrefix(); // Pergunta pelo prefixo

    // Ao executar a função será injetado uma propriedade nova no objeto content
    // Vão retornar a string inserida e colocar o valor no searchTerm
    async function askAndReturnSearchTerm(){
        // retorna método 'question' da biblioteca readline, que será injetado no content.searchTerm pela função
        const response = readline.question('Digite o termo a ser buscado na Wikipedia o digite G para busca no Google Trends:');
                
        return (response.toUpperCase() === 'G') ? await askAndReturnTrend() : response;
    }

    async function askAndReturnTrend(){
        console.log('Por favor, aguarde...');
        const trends = await getGoogleTrends();
        const choice = readline.keyInSelect(trends, 'Escolha a trend: ');

        return trends[choice];
    }

    async function getGoogleTrends(){
        const parser = new Parser();
        const trends = await parser.parseURL(TREND_URL);
        return trends.items.map(({title}) => title);
    }
    
    // Retorna prefixo que será utilizado para fazer um título no YT mais completo
    function askAndReturnPrefix(){
        // método 'keyInSelect' - select de opções que retorna uma chave selecionada pelo usuário como resultado.
        // consiste num array 
        const prefixes = ['Quem é','Oque é', 'A história de'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex];

        // retorna valor do texto pelo index e injeta em content.prefix
        return selectedPrefixText;
    }

    console.log(content);
}

start();