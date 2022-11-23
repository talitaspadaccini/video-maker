const readline = require('readline-sync') // biblioteca que permite que sejam informados dados ao sistema utilizando-se da linha de comando.

// Função que agrupa tudo
function start(){
    const content = {};

    content.searchTerm = askAndReturnSearchTerm(); // Perguntar pelo termo de busca
    content.prefix = askAndReturnPrefix(); // Pergunta pelo prefixo

    // Ao executar a função será injetado uma propriedade nova no objeto content
    // Vão retornar a string inserida e colocar o valor no searchTerm
    function askAndReturnSearchTerm(){
        // retorna método 'question' da biblioteca readline, que será injetado no content.searchTerm pela função
        return readline.question('Digite o termo a ser buscado na Wikipedia: ');
    }

    // Retorna prefixo que será utilizado para fazer um título no YT mais completo
    function askAndReturnPrefix(){
        // método 'keyInSelect' - select de opções que retorna uma chave selecionada pelo usuário como resultado.
        // consiste num array 
        const prefixes = ['Quem é','Oque é', 'A história do', 'A história da'];
        const selectedPrefixIndex = readline.keyInSelect(prefixes, 'Escolha uma opção: ');
        const selectedPrefixText = prefixes[selectedPrefixIndex];

        // retorna valor do texto pelo index e injeta em content.prefix
        return selectedPrefixText;
    }

    console.log(content);
}

start();