/***********************************************************************************************
 * objetivo: criar uma API para realizar o CROUD do sistema de controle de receitas - Projeto Final
 * data: 22/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 * observação: 
 * 1) para criar a API precisamos instalar -> expres, cors e body-parser
 *      express: npm install express --save
 *      cors: npm install cors --save
 *      body-parser: nmp install body-parser --save
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
    response.header('Access-Cntrol-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors())

    next()
})


const controllerUsuarios = require('./controller/usuarios/controllerUsuarios')
const controllerLogin = require('./controller/login/controllerLogin')

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

app.post('/v1/controle-receitas/usuario/login', cors(), async function (request, response) {

     console.log("Conteúdo de request.body:", request.body)
    let dadosLogin = request.body

    let resultUsuario = await controllerLogin.loginUsuario(dadosLogin)

    response.status(resultUsuario.status_code)
    response.json(resultUsuario)

})

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen('8080', function(){
    console.log('API funcionando e aguardadndo requisições')
})