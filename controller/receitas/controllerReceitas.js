/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de receitas
 * data: 29/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

//import do arquivo para as mensagens e status code
const message = require('../../modulo/config')

//import do arquivo DAO para realizar os comando no banco
const receitaDAO = require("../../model/DAO/receitas")
const receitaCategoriaDAO  = require('../../model/DAO/receitaCategoria')

const controllerUsuario  = require('../usuarios/controllerUsuarios')
const controllerNivelDificuldade  = require('../dificuldade/controllerNivelDificuldade')
const controllerReceitaCategoria  = require('./controllerReceitaCategoria')



// inserir receita no banco
const inserirReceita = async function(receita, contentType){
    try {
        
        // contentType é quem chega no body, deve ser em formado json
        if (String(contentType).toLowerCase() == 'application/json') {
            if(  
                 receita.titulo               == ""  || receita.titulo               == undefined  || receita.titulo               == null  || receita.titulo.length     > 70   ||
                 receita.descricao            == ""  || receita.descricao            == undefined  || receita.descricao            == null  || receita.descricao.length  > 100  ||
                 receita.modo_de_preparo      == ""  || receita.modo_de_preparo      == undefined  || receita.modo_de_preparo      == null  || 
                 receita.imagem_receita       == ""  || receita.imagem_receita       == undefined  || receita.imagem_receita       == null  || receita.imagem_receita.length  > 255  ||
                 receita.ingredientes         == ""  || receita.ingredientes         == undefined  || receita.ingredientes         == null  || 
                 receita.tempo_preparo        == ""  || receita.tempo_preparo        == undefined  || receita.tempo_preparo        == null  || receita.tempo_preparo.length  > 20  ||
                 receita.porcoes              == ""  || receita.porcoes              == undefined  || receita.porcoes              == null  || receita.porcoes.length  > 20  ||
                 receita.id_usuarios          == ""  || receita.id_usuarios          == undefined  || receita.id_usuarios          == null  || isNaN(receita.id_usuarios)       || receita.id_usuarios <= 0   ||
                 receita.id_nivel_dificuldade == ""  || receita.id_nivel_dificuldade == undefined  || receita.id_nivel_dificuldade == null  || isNaN(receita.id_nivel_dificuldade)   || receita.id_nivel_dificuldade <= 0  
                 
            ){
                console.log('Validação falhou! Motivos:NAO SEIIII');
                return message.ERROR_REQUIRED_FIELD //400 - dados nao preencidos
                
            }else {
                let receitaJason = {}
                let result= await receitaDAO.insertReceita(receita)

                //verificando se tem algum campo chamado "categoria" para ser add e se esse campo retorna um array
                if (receita.categoria && Array.isArray(receita.categoria)) {
                    // Obtém o ID da categoria inserido
                    let receitaInserida = await receitaDAO.selectLastInsertId()
                    //acessa a propriedade id dentro do objeto retornado
                    let idReceita = receitaInserida[0].id
                    
                    // Para cada gênero no array do body, cria uma variavel genero na lista de filme 
                    for (let categoria of receita.categoria) {
                        // verifica se o campo "categoria" possui um atributo id e se é int
                        if (categoria.id && !isNaN(categoria.id)) {
                            // adicionando os ids na tbl_receita_categoria
                            let receitaCategoria = {
                                id_receita: idReceita,
                                id_categoria: categoria.id
                            }
                            await receitaCategoriaDAO.insertReceitaCategoria(receitaCategoria);
                        }
                    }
                }
   
               if (result) {
                return message.SUCCESS_CREATED_ITEM //201 - item criado
                   
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //415
    }
}

// atualizar receita no banco
const atualizarReceita = async function(id, receita, contentType){
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id                           == ""  || id                           == undefined  || id                           == null  || isNaN(id) || id <= 0         || 
                receita.titulo               == ""  || receita.titulo               == undefined  || receita.titulo               == null  || receita.titulo.length     > 70   ||
                receita.descricao            == ""  || receita.descricao            == undefined  || receita.descricao            == null  || receita.descricao.length  > 100  ||
                receita.modo_de_preparo         == ""  || receita.modo_de_preparo         == undefined  || receita.modo_de_preparo         == null  || 
                receita.imagem_receita       == ""  || receita.imagem_receita       == undefined  || receita.imagem_receita       == null  || receita.imagem_receita.length  > 255  ||
                receita.ingredientes         == ""  || receita.ingredientes         == undefined  || receita.ingredientes         == null  || 
                receita.tempo_preparo        == ""  || receita.tempo_preparo        == undefined  || receita.tempo_preparo        == null  || receita.tempo_preparo.length  > 20  ||
                receita.porcoes              == ""  || receita.porcoes              == undefined  || receita.porcoes              == null  || receita.porcoes.length  > 20  ||
                receita.id_usuarios          == ""  || receita.id_usuarios          == undefined  || receita.id_usuarios          == null  || isNaN(receita.id_usuarios) || receita.id_usuarios <= 0 ||
                receita.id_nivel_dificuldade == ""  || receita.id_nivel_dificuldade == undefined  || receita.id_nivel_dificuldade == null  || isNaN(receita.id_nivel_dificuldade) || receita.id_nivel_dificuldade <= 0
            ) {
                return message.ERROR_REQUIRED_FIELD //400 - dados nao preencidos 
               
            } else {

                // verificando se o id existe no banco
                let result = await receitaDAO.selecByIdReceita(parseInt(id))

                if(result != false || typeof(result) == "object"){
                    if (result.length > 0) {
                        //adicionando id no json com os dados 
                        receita.id = parseInt(id)

                            let resultReceita = await receitaDAO.updateReceita(receita)

                            if (resultReceita) {
                                return message.SUCCESS_UPDATED_ITEM //200 - usuario atualizado
                            }else {
                                return message.ERROR_INTERNAL_SERVER_MODEL //500 
                            } 
                        
                    } else {
                        return message.ERROR_NOT_FOUND
                    }
                }else{
                    return message.ERROR_INTERNAL_SERVER_MODEL //500  
                }
        
            }
        } else {
            return message.ERROR_CONTENT_TYPE //415
        }
        
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}


//exculindo receita
const excluirReceita = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let result = await receitaDAO.selecByIdReceita(parseInt(id))

            if(result != false || typeof(result) == 'object'){

                //se existir, faremos o delete
                if (result.length > 0) {

                    //delete na entidade relacionamento
                    let deleteCategoria = await receitaCategoriaDAO.deleteByReceita(id);
                    
                    if (deleteCategoria) {
                         //delete
                        let resultReceita = await receitaDAO.deleteReceita(parseInt(id))


                        if (resultReceita) {
                            return message.SUCCESS_DELETED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL 
                        }
                    }else{
                        let resultReceita = await receitaDAO.deleteReceita(parseInt(id))


                        if (resultReceita) {
                            return message.SUCCESS_DELETED_ITEM //200
                        } else {
                            return message.ERROR_INTERNAL_SERVER_MODEL 
                        }
                    }

                } else {
                    return message.ERROR_INTERNAL_SERVER_MODEL 
                }
            }else{
                return message.ERROR_NOT_FOUND 
            }
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// listar todas as receitas
const listarReceita = async function(){
    try {

        let arrayReceita = []
        let dadosReceita = {}

        //chama a função para retornar as receitas cadastradas
        let resultReceita = await receitaDAO.selectAllReceita()

        if(resultReceita!= false || typeof(resultReceita) == 'object'){
            if(resultReceita.length > 0){

                //criando um JSON de retorno de dados para API
                dadosReceita.status = true
                dadosReceita.status_code = 200
                dadosReceita.items = resultReceita.length

                for(const itemReceita of resultReceita){
                    
                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemReceita.id_usuarios)
                    itemReceita.usuario = dadosUsuario.user
                    delete itemReceita.id_usuarios
                        
                    let dadosDificuldade = await controllerNivelDificuldade.buscarNivelDificuldade(itemReceita.id_nivel_dificuldade)
                    //Adiciona um atributo de nivel dificuldade no JSON de receita e coloca os dados do nivel 
                    itemReceita.dificuldade = dadosDificuldade.nivel
                    //Remover o id do JSON
                    delete itemReceita.id_nivel_dificuldade

                    
                    // fazendo interação com a tbl_receita_categoria
                    let dadosCategoria = await controllerReceitaCategoria.buscarCategoriaPorReceita(itemReceita.id)
            
                    // verificando se retorna array e se não é false
                    if (dadosCategoria && Array.isArray(dadosCategoria.receitaCategoria)) {
                      
                        itemReceita.categoria = dadosCategoria.receitaCategoria
                    } else {
                        //se for false retorna um array vazio 
                        itemReceita.categoria = []
                    }

                    arrayReceita.push(itemReceita)
 
                }

                dadosReceita.receitas = arrayReceita

                return dadosReceita

            }else{
                return message.ERROR_NOT_FOUND //404
            }
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

// função para tratar o retorno de uma receita filtrando pelo ID do DAO
const buscarReceita = async function(id){

try {
    

    if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
        
        return message.ERROR_REQUIRED_FIELD //400

    } else {

        let arrayReceita = []
        let dadosReceita = {}

        let resultReceita= await receitaDAO.selecByIdReceita(parseInt(id))

        if(resultReceita!= false || typeof(resultReceita) == 'object'){

            if(resultReceita.length > 0){

                dadosReceita.status = true
                dadosReceita.status_code = 200

                for(const itemReceita of resultReceita){

                    let dadosUsuario = await controllerUsuario.buscarUsuario(itemReceita.id_usuarios)
                    itemReceita.usuario = dadosUsuario.user
                    delete itemReceita.id_usuarios
                        
                    let dadosDificuldade = await controllerNivelDificuldade.buscarNivelDificuldade(itemReceita.id_nivel_dificuldade)
                    //Adiciona um atributo de nivel dificuldade no JSON de receita e coloca os dados do nivel 
                    itemReceita.dificuldade = dadosDificuldade.nivel
                    //Remover o id do JSON
                    delete itemReceita.id_nivel_dificuldade

                    
                    // fazendo interação com a tbl_receita_categoria
                    let dadosCategoria = await controllerReceitaCategoria.buscarCategoriaPorReceita(itemReceita.id)
                    
                    // verificando se retorna array e se não é false
                    if (dadosCategoria && Array.isArray(dadosCategoria.receitaCategoria)) {
                      
                        
                        itemReceita.categoria = dadosCategoria.receitaCategoria
                    } else {
                        //se for false retorna um array vazio 
                        itemReceita.categoria = []
                    }

                    arrayReceita.push(itemReceita)
 
                }
                dadosReceita.receita = arrayReceita

                return dadosReceita
            }else{
                return message.ERROR_NOT_FOUND //404
            }
      
        }else{
            return message.ERROR_INTERNAL_SERVER_MODEL //500
        }
    }
} catch (error) {
    return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
}
}


module.exports = {
    inserirReceita,
    atualizarReceita,
    excluirReceita,
    listarReceita,
    buscarReceita
}