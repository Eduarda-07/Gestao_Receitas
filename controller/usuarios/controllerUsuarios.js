/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao CROUD de usuarios
 * data: 22/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

//import do arquivo para as mensagens e status code
const message = require('../../modulo/config')

//import do arquivo DAO para realizar os comando no banco
const usuariosDAO = require("../../model/DAO/usuarios")

//import da biblioteca para criptografar as senhas
const bcrypt = require('bcrypt')

// inserir usuario no banco
const inserirUsuario = async function(usuario, contentType){
    try {
        
        // contentType é quem chega no body, deve ser em formado json
        if (String(contentType).toLowerCase() == 'application/json') {
            if(  
                 usuario.nome             == ""  || usuario.nome             == undefined  || usuario.nome             == null  || usuario.nome.length   > 100  ||
                 usuario.email            == ""  || usuario.email            == undefined  || usuario.email            == null  || usuario.email.length   > 100  ||
                 usuario.senha            == ""  || usuario.senha            == undefined  || usuario.senha            == null  || 
                 usuario.palavra_chave    == ""  || usuario.palavra_chave    == undefined  || usuario.palavra_chave    == null  
                 
            ){

                return message.ERROR_REQUIRED_FIELD //400 - dados nao preencidos
                
            }else {
                 let hashedSenha
                try {
                    
                    // o numero 10 é um nível de segurança basico
                    hashedSenha = await bcrypt.hash(usuario.senha, 10)
                } catch (hashError) {
                    console.log("Erro ao gerar hash da senha:", hashError)
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Erro no servidor
                }
                
                usuario.senha = hashedSenha


                let hashedPalavra
                try {
                    
                    // o numero 10 é um nível de segurança basico
                    hashedPalavra = await bcrypt.hash(usuario.palavra_chave, 10)
                } catch (hashError) {
                    console.log("Erro ao gerar hash da palavra:", hashError)
                    return message.ERROR_INTERNAL_SERVER_CONTROLLER // Erro no servidor
                }
                
                usuario.palavra_chave = hashedPalavra

                let result= await usuariosDAO.insertUsuario(usuario)
   
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

// atualizar usuario no banco
const atualizarUsuario = async function(id, usuario, contentType){
    try {
        
        if (String(contentType).toLowerCase() == 'application/json') {
            if (
                id                       == ""  ||  id                      == undefined  || id                       == null  || isNaN(id) || id <= 0         || 
                usuario.nome             == ""  || usuario.nome             == undefined  || usuario.nome             == null  || usuario.nome.length   > 100  ||
                usuario.email            == ""  || usuario.email            == undefined  || usuario.email            == null  || usuario.email.length   > 100  ||
                usuario.senha            == ""  || usuario.senha            == undefined  || usuario.senha            == null  || 
                usuario.palavra_chave    == ""  || usuario.palavra_chave    == undefined  || usuario.palavra_chave    == null  || 
                usuario.foto_perfil !== undefined && usuario.foto_perfil !== null && usuario.foto_perfil.length > 200
            ) {
                console.log("Erro ao gerar campos nao preenchidos")
                return message.ERROR_REQUIRED_FIELD //400 - dados nao preencidos 
               
            } else {

                // verificando se o id existe no banco
                let result = await usuariosDAO.selecByIdUsuario(parseInt(id))
                console.log("Erro ao verificar id")

                if(result != false || typeof(result) == "object"){
                    if (result.length > 0) {
                        //adicionando id no json com os dados 
                        usuario.id = parseInt(id)
                        if (usuario.senha && usuario.senha.length > 0) {
                            try {
                                usuario.senha = await bcrypt.hash(usuario.senha, 10)
                                
                            } catch (hashError) {
                                console.error("Erro ao gerar hash da nova senha:", hashError)
                                return message.ERROR_INTERNAL_SERVER_CONTROLLER
                            }
                        }
                          if (usuario.palavra_chave && usuario.palavra_chave.length > 0) {
                            try {
                                usuario.palavra_chave = await bcrypt.hash(usuario.palavra_chave, 10)
                                
                            } catch (hashError) {
                                console.error("Erro ao gerar hash da nova palavra chave:", hashError)
                                return message.ERROR_INTERNAL_SERVER_CONTROLLER
                            }
                        }
                            let resultUsuario = await usuariosDAO.updateUsuario(usuario)

                            if (resultUsuario) {
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


//exculindo usuario
const excluirUsuario = async function(id){
    try {
        if (id == '' || id == undefined || id == null || isNaN(id) || id <= 0) {
            return message.ERROR_REQUIRED_FIELD //400
        } else {

            //função para verificar se o id existe no banco de dados
            let result = await usuariosDAO.selecByIdUsuario(parseInt(id))

            if(result != false || typeof(result) == 'object'){

                //se existir, faremos o delete
                if (result.length > 0) {
    
                    //delete
                    let resultUsuario = await usuariosDAO.deleteUsuario(parseInt(id))

                    if (resultUsuario) {
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

// listar todos os usuarios
const listarUsuario = async function(){
    try {
        let dadosUsuario = {}

        //chama a função para retornar os usuarios cadastrados
        let resultUsuarios = await usuariosDAO.selectAllUsuario()

        if(resultUsuarios!= false || typeof(resultUsuarios) == 'object'){
            if(resultUsuarios.length > 0){

                //criando um JSON de retorno de dados para API
                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.items = resultUsuarios.length
                dadosUsuario.users = resultUsuarios

                return dadosUsuario

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

// função para tratar o retorno de um filme filtrando pelo ID do DAO
const buscarUsuario = async function(id){

try {

    if ( id === ""   ||   id === undefined || id === null  || isNaN(id)  || id <= 0 ) {
        
        return message.ERROR_REQUIRED_FIELD //400

    } else {

        let dadosUsuario = {}

        let resultUsuario= await usuariosDAO.selecByIdUsuario(parseInt(id))

        if(resultUsuario!= false || typeof(resultUsuario) == 'object'){

            if(resultUsuario.length > 0){

                dadosUsuario.status = true
                dadosUsuario.status_code = 200
                dadosUsuario.user = resultUsuario

                return dadosUsuario
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
    inserirUsuario,
    atualizarUsuario,
    excluirUsuario,
    listarUsuario,
    buscarUsuario
}