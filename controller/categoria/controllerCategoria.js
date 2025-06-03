/****************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de categorias
 * data: 03/06/25
 * autor: Eduarda Silva
 * versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const categoriaDAO = require('../../model/DAO/categoria.js')


// função para tratar a inserção de um novo nivel no DAO
const inserirCategoria = async function(categoria, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                categoria.categoria   == '' ||   categoria.categoria   == undefined || categoria.categoria  == null || categoria.categoria.length   >  10 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultCategoria = await categoriaDAO.insertCategoria(categoria)
       
               if(resultCategoria){
                   return message.SUCCESS_CREATED_ITEM //201
               }else{
                   return message.ERROR_INTERNAL_SERVER_MODEL //500
               }
                   
           }   
        }else{
            return message.ERROR_CONTENT_TYPE //415
        }

        
    }catch(error){
        return message.ERROR_INTERNAL_SERVER_CONTROLLER // 500
    }
    
        
}

// função para tratar a atualização de um nivel no DAO
const atualizarCategoria = async function(id, categoria, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                categoria.categoria      == ''        || categoria.categoria     == undefined   || categoria.categoria   == null || categoria.categoria.length   > 80
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultCategoria = await categoriaDAO.selectCategoriaById(parseInt(id))
               
               if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                    if(resultCategoria.length > 0){

                        //update
                        //adiciona o id do nivel no json com os dados
                        categoria.id = parseInt(id)

                        let result = await categoriaDAO.updateCategoria(categoria)

                        if(result){
                            return message.SUCCESS_UPDATED_ITEM //200
                        }else{
                          
                            
                            return message.ERROR_INTERNAL_SERVER_MODEL //500
                        }

                    }else{
                        return message.ERROR_NOT_FOUND // 404
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

// função para tratar a exclusão de um nivel no DAO
const excluirCategoria = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultCategoria = await categoriaDAO.selectCategoriaById(parseInt(id))

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                //se existir, faremos o delete
                if (resultCategoria.length > 0) {
    
                    //delete
                    let result = await categoriaDAO.deleteCategoria(parseInt(id))

                    if (result) {
                        return message.SUCCESS_DELETED_ITEM //200
                    } else {
                        return message.ERROR_INTERNAL_SERVER_MODEL //500
                    }
    
                } else {
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

// função para tratar o retorno de uma lista dos niveis no DAO
const listarCategoria = async function(){
        try {

            //objeto do tipo JSON
            let dadosCategoria = {}

            //chama a funçção para retornar os niveis cadastrados
            let resultCategoria = await categoriaDAO.selectAllCategorias()

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){
                if(resultCategoria.length > 0){

                    //criando um JSON de retorno de dados para API
                 dadosCategoria.status = true
                 dadosCategoria.status_code = 200
                 dadosCategoria.items = resultCategoria.length
                 dadosCategoria.categorias = resultCategoria

                    return dadosCategoria

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

// função para tratar o retorno de um nivel filtrando pelo ID do DAO
const buscarCategoria = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosCategoria = {}

            let resultCategoria= await categoriaDAO.selectCategoriaById(parseInt(id))

            if(resultCategoria != false || typeof(resultCategoria) == 'object'){

                if(resultCategoria.length > 0){

                 dadosCategoria.status = true
                 dadosCategoria.status_code = 200
                 dadosCategoria.categoria = resultCategoria
    
                    return dadosCategoria
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
    inserirCategoria,
    atualizarCategoria,
    excluirCategoria,
    listarCategoria,
    buscarCategoria
}