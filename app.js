/***********************************************************************************************
 * objetivo: criar uma API para realizar o CROUD do sistema de controle de receitas - Projeto Final
 * data: 22/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 * observação: 
 * 1) para criar a API precisamos instalar -> expres, cors e body-parser
 *      express: npm install express --save
 *      cors: npm install cors --save
 *      body-parser: npm install body-parser --save
 * 2) para criar interação com o banco de dados precisamos instalar -> prisma e prisma/client
 *       prisma -> npm install prisma --save (gerencia conexão com o banco)
 *       prisma/client -> npm install @prisma/client --save (para rodar scripts SQL)
 * 
 * Após a instalação do prisma e do prisma client, devemos:
 * 1) npx prisma init
 * 
 * Você deverá configurar o arquivo .env e schema.prisma com as credenciais do BD
 * 
 * Após essa configuração deverá rodar o seguinte comando:
 *  1) npx prisma migrate dev (tomar cuidado: acontece um reset no banco)
 * 
 * Para criptografar as senhas e palavras chaves deve-se instalar o bcrypt:
 *      npm install bcrypt (o import dessa biblioteca deve ser feito na controler de usuários)
 ***********************************************************************************************/


require('dotenv').config();

// import das bibliotecas para criar api
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')




//manipular o body da requisição para chegar apenas JSON
const bodyParserJSON = bodyParser.json()

// cria o objeto app com referências do express para criar api
const app = express()

// configurações de acesso do CORS para API
app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*')
    response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})


const controllerUsuarios = require('./controller/usuarios/controllerUsuarios')
const controllerLogin = require('./controller/login/controllerLogin')
const controllerNivelDificuldade = require('./controller/dificuldade/controllerNivelDificuldade')
const controllerCategoria = require('./controller/categoria/controllerCategoria')
const controllerReceita = require('./controller/receitas/controllerReceitas')
const controllerRecuperarSenha = require('./controller/nova senha/controllerNovaSenha')

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

 app.post('/v1/controle-receitas/usuario', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultUsuario = await controllerUsuarios.inserirUsuario(dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)
})

app.put('/v1/controle-receitas/usuario/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let id =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body


    let resultUsuario = await controllerUsuarios.atualizarUsuario(id, dadosBody, contentType)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

app.get('/v1/controle-receitas/usuario', cors(), async function(request, response) {
    
    let resultUsuario = await controllerUsuarios.listarUsuario()

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

app.get('/v1/controle-receitas/usuario/:id', cors(), async function(request, response) {
    
    let id = request.params.id

    let resultUsuario = await controllerUsuarios.buscarUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

app.delete('/v1/controle-receitas/usuario/:id', cors(), async function (request, response) {
    
    let id =  request.params.id

    let resultUsuario = await controllerUsuarios.excluirUsuario(id)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)


})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-receitas/usuario/login', cors(),bodyParserJSON, async function (request, response) {

    //  console.log("Conteúdo de request.body:", request.body)
    let dadosLogin = request.body

    let resultUsuario = await controllerLogin.loginUsuario(dadosLogin)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-receitas/nivelDificuldade', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultCategoria = await controllerNivelDificuldade.inserirNivelDificuldade(dadosBody, contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.get('/v1/controle-receitas/nivelDificuldade', cors(), async function(request, response) {
    
    let resultDificuldade = await controllerNivelDificuldade.listarNivelDificuldade()

    response.status(resultDificuldade.status_code)
    response.json(resultDificuldade)
})

app.get('/v1/controle-receitas/nivelDificuldade/:id', cors(), async function(request, response) {
    
    let idDificuldade = request.params.id

    let resultDificuldade = await controllerNivelDificuldade.buscarNivelDificuldade(idDificuldade)

    response.status(resultDificuldade.status_code)
    response.json(resultDificuldade)
})

app.delete('/v1/controle-receitas/nivelDificuldade/:id', cors(), async function (request, response) {
    
    let idDificuldade =  request.params.id

    let resultDificuldade = await controllerNivelDificuldade.excluirNivelDificuldade(idDificuldade)

    response.status(resultDificuldade.status_code)
    response.json(resultDificuldade)
})

app.put('/v1/controle-receitas/nivelDificuldade/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']

    let idDificuldade =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultDificuldade = await controllerNivelDificuldade.atualizarNivelDificuldade(idDificuldade, dadosBody, contentType)

    response.status(resultDificuldade.status_code)
    response.json(resultDificuldade)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-receitas/categoria', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultCategoria = await controllerCategoria.inserirCategoria(dadosBody, contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.get('/v1/controle-receitas/categoria', cors(), async function(request, response) {
    
    let resultCategoria = await controllerCategoria.listarCategoria()

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.get('/v1/controle-receitas/categoria/:id', cors(), async function(request, response) {
    
    let idCategoria = request.params.id

    let resultCategoria = await controllerCategoria.buscarCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.delete('/v1/controle-receitas/categoria/:id', cors(), async function (request, response) {
    
    let idCategoria =  request.params.id

    let resultCategoria = await controllerCategoria.excluirCategoria(idCategoria)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

app.put('/v1/controle-receitas/categoria/:id', cors(), bodyParserJSON, async function (request, response) {
    
    let contentType = request.headers['content-type']

    let idCategoria =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultCategoria = await controllerCategoria.atualizarCategoria(idCategoria, dadosBody, contentType)

    response.status(resultCategoria.status_code)
    response.json(resultCategoria)
})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-receitas/receita', cors(), bodyParserJSON, async function (request, response){

    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe do body da requisição os dados encaminhados
    let dadosBody = request.body
    let resultReceita = await controllerReceita.inserirReceita(dadosBody, contentType)

    response.status(resultReceita.status_code)
    response.json(resultReceita)
})

app.get('/v1/controle-receitas/receita', cors(), async function(request, response) {
    
    //chama a função para retornar os receireceitaet 
    resultReceita = await controllerReceita.listarReceita()

    response.status(resultReceita.status_code)
    response.json(resultReceita)

})

app.get('/v1/controle-receitas/receita/:id', cors(), async function(request, response) {
    
    let idReceita = request.params.id

    let resultReceita = await controllerReceita.buscarReceita(idReceita)

    response.status(resultReceita.status_code)
    response.json(resultReceita)

})

app.delete('/v1/controle-receitas/receita/:id', cors(), async function (request, response) {
    
    let idReceita =  request.params.id

    let resultReceita = await controllerReceita.excluirReceita(idReceita)

    response.status(resultReceita.status_code)
    response.json(resultReceita)

    // no teste deste endpoint o filme 3 foi deletado!!!!

})

app.put('/v1/controle-receitas/receita/:id', cors(), bodyParserJSON, async function (request, response) {
    
    //recebe o content type da requisição
    let contentType = request.headers['content-type']

    //recebe o id da requisição
    let idReceita =  request.params.id

    //recebe os dados da requisição pelo body
    let dadosBody = request.body

    let resultReceita = await controllerReceita.atualizarReceita(idReceita, dadosBody, contentType)

    response.status(resultReceita.status_code)
    response.json(resultReceita)

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.post('/v1/controle-receitas/usuario/recuperar-senha', cors(), bodyParserJSON, async function (request, response) {

    let dadosRecuperacao = request.body
    let contentType      = request.headers['content-type']


    let resultRecuperacao = await controllerRecuperarSenha.recuperarSenha(dadosRecuperacao, contentType)
    
    response.status(resultRecuperacao.status_code)
    response.json(resultRecuperacao)
  }
)

////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.get('/v1/controle-receitas/filtros/id/', cors(), async function(request,response){

    // pegua o parametro passado pela query 
    //se existir transforma em numero, se não existir transforma em null
    const categoria = request.query.categoria ? parseInt(request.query.categoria) : null
    const dificuldade = request.query.dificuldade ? parseInt(request.query.dificuldade) : null

    const result = await controllerReceita.buscarReceitabyFiltros(categoria, dificuldade)

    response.status(result.status_code)
    response.json(result)

})

////////////////////////////////////////////////////////////////////////////////////////////////////////////


app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições')
})