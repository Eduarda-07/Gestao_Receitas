/****************************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de nivel de dificuldade
 * data: 29/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 ***************************************************************************************************/

// import do arquivo de mensagens e status code o projeto
const message = require('../../modulo/config.js')

// import do arquivo para realizar o CROUD de dados no Banco de Dados
const dificuldadeDAO = require('../../model/DAO/dificuldade')


// função para tratar a inserção de um novo nivel no DAO
const inserirNivelDificuldade = async function(dificuldade, contentType){

    try{

        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if ( 
                dificuldade.dificuldade   == '' ||   dificuldade.dificuldade   == undefined || dificuldade.dificuldade  == null || dificuldade.dificuldade.length   >  10 
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{
               let resultDificuldade = await dificuldadeDAO.insertNivelDificuldade(dificuldade)
       
               if(resultDificuldade){
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
const atualizarNivelDificuldade = async function(id, dificuldade, contentType){
    try {
        
        //contentType é quem chega o body, especificando que deve ser json
        if(String(contentType).toLowerCase() == 'application/json'){
            if (
                id      == '' ||     id      == undefined || id     == null || isNaN(id)    || id <= 0  || 
                dificuldade.dificuldade      == ''        || dificuldade.dificuldade     == undefined   || dificuldade.dificuldade   == null || dificuldade.dificuldade.length   > 10
               )
       
           {
               return message.ERROR_REQUIRED_FIELD //400
           }else{

               //validação para verificar se o id existe no banco
               let resultDificuldade = await dificuldadeDAO.selecByIdNivelDificuldade(parseInt(id))
               
               if(resultDificuldade != false || typeof(resultDificuldade) == 'object'){

                    if(resultDificuldade.length > 0){

                        //update
                        //adiciona o id do nivel no json com os dados
                        dificuldade.id = parseInt(id)

                        let result = await dificuldadeDAO.updateNivelDificuldade(dificuldade)

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
const excluirNivelDificuldade = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let resultDificuldade = await dificuldadeDAO.selecByIdNivelDificuldade(parseInt(id))

            if(resultDificuldade != false || typeof(resultDificuldade) == 'object'){

                //se existir, faremos o delete
                if (resultDificuldade.length > 0) {
    
                    //delete
                    let result = await dificuldadeDAO.deleteNivelDificuldade(parseInt(id))

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
const listarNivelDificuldade = async function(){
        try {

            //objeto do tipo JSON
            let dadosDificuldade = {}

            //chama a funçção para retornar os niveis cadastrados
            let resultDifuculdade = await dificuldadeDAO.selectAllNivelDificuldade()

            if(resultDifuculdade != false || typeof(resultDifuculdade) == 'object'){
                if(resultDifuculdade.length > 0){

                    //criando um JSON de retorno de dados para API
                    dadosDificuldade.status = true
                    dadosDificuldade.status_code = 200
                    dadosDificuldade.items = resultDifuculdade.length
                    dadosDificuldade.generos = resultDifuculdade

                    return dadosDificuldade

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
const buscarNivelDificuldade = async function(id){
    
    try {

        if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
            
            return message.ERROR_REQUIRED_FIELD //400

        } else {

    
            let dadosDificuldade = {}

            let resultDificuldade= await dificuldadeDAO.selecByIdNivelDificuldade(parseInt(id))

            if(resultDificuldade != false || typeof(resultDificuldade) == 'object'){

                if(resultDificuldade.length > 0){

                    dadosDificuldade.status = true
                    dadosDificuldade.status_code = 200
                    dadosDificuldade.nivel = resultDificuldade
    
                    return dadosDificuldade
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
    inserirNivelDificuldade,
    atualizarNivelDificuldade,
    excluirNivelDificuldade,
    listarNivelDificuldade,
    buscarNivelDificuldade
}