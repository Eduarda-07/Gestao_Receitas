/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente à recuperação de senha
 * data: 05/06/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import das mensagens e status code
const message = require('../../modulo/config');

// import do DAO de usuários para atualizar a senha
const novaSenhaDAO = require('../../model/DAO/novaSenha');

const loginDAO = require("../../model/DAO/login")

// import do bcrypt para comparar hashes e gerar hash de nova senha
const bcrypt = require('bcrypt');

const recuperarSenha = async function (id, dados, contentType) {
  try {
    if (String(contentType).toLowerCase() == 'application/json') {
      if (
       id == "" || id == undefined || id == null || isNaN(id)||
       dados.email           == ""  ||  dados.email          == undefined  || dados.email          == null  ||  dados.email.length  >100  ||
       dados.palavra_chave   == ""  ||  dados.palavra_chave  == undefined  || dados.palavra_chave  == null  ||
       dados.nova_senha      == ""  ||  dados.nova_senha     == undefined  || dados.nova_senha     == null  
    ) {
      return message.ERROR_REQUIRED_FIELD;
    }else{

      let resultEmail = await loginDAO.selectEmailUsuario(dados.email)

      if(resultEmail!= false || typeof(resultEmail) == 'object'){
        console.log(resultEmail);
          
         if(resultEmail.length > 0){

          let usuario = resultEmail[0]

          let chaveCorreta = await bcrypt.compare(dados.palavra_chave, usuario.palavra_chave)
          if (!chaveCorreta) {
              return message.ERROR_NOT_FOUND
          }else{

            // Atualiza a senha do usuário no banco de dados
            let novaSenha = await bcrypt.hash(dados.nova_senha, 10)

            let atualizacao = await novaSenhaDAO.updateSenhaUsuario(id, novaSenha)
               
            if (atualizacao) {        
              return message.SUCCESS_UPDATED_ITEM
            }else {
              // Caso a atualização no banco de dados falhe
              return message.ERROR_INTERNAL_SERVER_MODEL
            }
          }
        } else {
            // Usuário não encontrado com o email e palavra-chave fornecidos
            return message.ERROR_NOT_FOUND; 
          }
      }else{
        return message.ERROR_NOT_FOUND
      }
        // return message.ERROR_CONTENT_TYPE
      }
    }else{
      return message.ERROR_CONTENT_TYPE;
    }

    
  } catch (error) {
    console.log(error);
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};


module.exports = {
    recuperarSenha
}