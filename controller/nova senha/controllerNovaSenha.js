/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente à recuperação de senha
 * data: 05/06/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

// import das mensagens e status code
const message = require('../../modulo/config');

// import do DAO de login para buscar o usuário via e-mail
const loginDAO = require('../../model/DAO/login');

// import do DAO de usuários para atualizar a senha
const novaSenhaDAO = require('../../model/DAO/novaSenha');

// import do bcrypt para comparar hashes e gerar hash de nova senha
const bcrypt = require('bcrypt');

const recuperarSenha = async function (id, dados, contentType) {
  try {
    if (String(contentType).toLowerCase() !== 'application/json') {
      return message.ERROR_CONTENT_TYPE;
    }

    if (
        id                   == ""  ||  id                   == undefined  || id                   == null  || isNaN(id) || id      <= 0  || 
       dados.email           == ""  ||  dados.email          == undefined  || dados.email          == null  ||  dados.email.length  >100  ||
       dados.palavra_chave   == ""  ||  dados.palavra_chave  == undefined  || dados.palavra_chave  == null  ||
       dados.nova_senha      == ""  ||  dados.nova_senha     == undefined  || dados.nova_senha     == null  
    ) {
      return message.ERROR_REQUIRED_FIELD;
    }else{
        let dadosUsuarioLogado = {}

        let resultEmailPalavra = await novaSenhaDAO.selectEmailPalavra(usuario.email, usuario.palavra_chave)

        if(resultEmail!= false || typeof(resultEmail) == 'object'){

            if(resultEmailPalavra.length > 0){

                //pegar o primeiro resultado
                let usuarioUnico = resultEmailPalavra[0]
                console.log(usuarioUnico)

                // //comparando se a senha digitada esta certa
                // let conferindoSenha = await bcrypt.compare(usuario.senha, usuarioUnico.senha)
                // console.log(conferindoSenha)
                // if (conferindoSenha){
                //     dadosUsuarioLogado.status = true
                //     dadosUsuarioLogado.status_code = 200
                //     dadosUsuarioLogado.user = {
                //         id: usuarioUnico.id,
                //         nome: usuarioUnico.nome,
                //         email: usuarioUnico.email,
                //         foto_perfil: usuarioUnico.foto_perfil || null 
                //     }
                // }

                let atualizarSenha = await novaSenhaDAO.updateSenhaUsuarioById(id, usuario.senha)
                return dadosUsuarioLogado
            }
         }
    }

  } catch (error) {
    console.log(error);
    return message.ERROR_INTERNAL_SERVER_CONTROLLER;
  }
};


module.exports = {
    recuperarSenha
}