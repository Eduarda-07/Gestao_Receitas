/**********************************************************************************
 * Objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de filmes
 * Data: 13/06/2025
 * Autor: Eduara
 * Versão: 1.0
 **********************************************************************************/

//Import do arquivo de mensagens e status code do projeto
const message = require('../../modulo/config.js')

//Import do aquivo para realizar o CRUD de dados no Banco de Dados
const receitaCategoriaDAO = require('../../model/DAO/receitaCategoria.js')

//Função para tratar a inserção de um novo genero no DAO
const inserirReceitaCategoria = async function(receitaCategoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
        {
                if (
                    receitaCategoria.id_receita       == ''   || receitaCategoria.id_receita      == undefined    || receitaCategoria.id_receita   == null || isNaN(receitaCategoria.id_receita)   || receitaCategoria.id_receita   <=0 ||
                    receitaCategoria.id_categoria     == ''   || receitaCategoria.id_categoria    == undefined    || receitaCategoria.id_categoria == null || isNaN(receitaCategoria.id_categoria) || receitaCategoria.id_categoria <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{
                    //Chama a função para inserir no BD e aguarda o retorno da função
                    let resultReceitaCategoria = await receitaCategoriaDAO.insertReceitaCategoria(receitaCategoria)

                    if(resultReceitaCategoria)
                        return message.SUCCESS_CREATED_ITEM //201
                    else
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                }
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a atualização de um genero no DAO
const atualizarReceitaCategoria = async function(id, receitaCategoria, contentType){
    try {
        if(String(contentType).toLowerCase() == 'application/json')
            {
                if (id                                == ''  || id                              == undefined    || id                            == null || isNaN(id)  || id  <= 0   ||
                    receitaCategoria.id_receita       == ''  || receitaCategoria.id_receita     == undefined    || receitaCategoria.id_receita   == null || isNaN(receitaCategoria.id_receita)   || receitaCategoria.id_receita   <=0 ||
                    receitaCategoria.id_categoria     == ''  || receitaCategoria.id_categoria   == undefined    || receitaCategoria.id_categoria == null || isNaN(receitaCategoria.id_categoria) || receitaCategoria.id_categoria <=0
                )
                {
                    return message.ERROR_REQUIRED_FIELD //400
                }else{
                    //Validação para verificar se o ID existe no BD
                    let resultReceitaCategoria = await receitaCategoriaDAO.selectByIdReceitaCategoria(parseInt(id))

                    if(resultReceitaCategoria != false || typeof(resultReceitaCategoria) == 'object'){
                        if(resultReceitaCategoria.length > 0 ){
                            //Update
                            //Adiciona o ID do genero no JSON com os dados
                            receitaCategoria.id = parseInt(id)

                            let result = await receitaCategoriaDAO.updateReceitaCategoria(receitaCategoria)

                            if(result){
                                return message.SUCCESS_UPDATED_ITEM //200
                            }else{
                                return message.ERROR_INTERNAL_SERVER_MODEL //500
                            }
                        }else{
                            return message.ERROR_NOT_FOUND //404
                        }
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }
            }else{
                return message.ERROR_CONTENT_TYPE //415
            }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar a exclusão de um genero no DAO
const excluirReceitaCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{

            //Função que verifica se  ID existe no BD
            let resultReceitaCategoria = await receitaCategoriaDAO.selectByIdReceitaCategoria(parseInt(id))

            if(resultReceitaCategoria != false || typeof(resultReceitaCategoria) == 'object'){
                //Se existir, faremos o delete
                if(resultReceitaCategoria.length > 0){
                    //delete
                    let result = await receitaCategoriaDAO.deleteByReceita(parseInt(id))

                    if(result){
                        return message.SUCCESS_DELETED_ITEM //200
                    }else{
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
                }else{
                    return message.ERROR_NOT_FOUND //404
                }
            }else{
                return message.ERROR_INTERNAL_SERVER_MODEL //500
            }
        }
    } catch (error) {
        console.log(error);
        
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

//Função para tratar o retorno de uma lista de generos do DAO
const listarReceitaCategoria = async function(){
    try {
        //Objeto do tipo JSON
        let dadosReceitaCategoria = {}
        //Chama a função para retornar os generos cadastrados
        let resultReceitaCategoria = await receitaCategoriaDAO.selectAllReceitaCategoria()

        if(resultReceitaCategoria != false || typeof(resultReceitaCategoria) == 'object'){
            if(resultReceitaCategoria.length > 0){
                //Criando um JSON de retorno de dados para a API
                dadosReceitaCategoria.status = true
                dadosReceitaCategoria.status_code = 200
                dadosReceitaCategoria.items = resultReceitaCategoria.length
                dadosReceitaCategoria.receitaCategoria = resultReceitaCategoria

                return dadosReceitaCategoria
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

//Função para tratar o retorno de um genero filtrando pelo ID do DAO
const buscarReceitaCategoria = async function(id){
    try {
        if(id == '' || id == undefined || id == null || isNaN(id) || id <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadosReceitaCategoria = {}

            let resultReceitaCategoria = await receitaCategoriaDAO.selectByIdFilmeGenero(parseInt(id))
            
            if(resultReceitaCategoria != false || typeof(resultReceitaCategoria) == 'object'){
                if(resultReceitaCategoria.length > 0){
                     //Criando um JSON de retorno de dados para a API
                    dadosReceitaCategoria.status = true
                    dadosReceitaCategoria.status_code = 200
                    dadosReceitaCategoria.receitaCategoria = resultReceitaCategoria

                    return dadosReceitaCategoria //200
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

//Função para retornar os generos relacionados a um filme
const buscarCategoriaPorReceita = async function(id_receita){
    try {
        if(id_receita == '' || id_receita == undefined || id_receita == null || isNaN(id_receita) || id_receita <=0){
            return message.ERROR_REQUIRED_FIELD //400
        }else{
            let dadosReceitaCategoria = {} 

            let resultCategoria = await receitaCategoriaDAO.selectCategoriaByIdReceita(parseInt(id_receita))
            
            if(resultCategoria && Array.isArray(resultCategoria) && resultCategoria.length > 0){
               
                dadosReceitaCategoria.status = true
                dadosReceitaCategoria.status_code = 200
                dadosReceitaCategoria.receitaCategoria = resultCategoria 

                return dadosReceitaCategoria // 200
            }else{
           
                return message.ERROR_NOT_FOUND // 404
            }
        }

    } catch (error) {
        return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    inserirReceitaCategoria,
    atualizarReceitaCategoria,
    excluirReceitaCategoria,
    listarReceitaCategoria,
    buscarReceitaCategoria,
    buscarCategoriaPorReceita
}
