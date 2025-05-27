/*******************************************************************************************
 * objetivo: controller responsável pela regra de negócio referente ao login de usuarios
 * data: 26/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/

//import do arquivo para as mensagens e status code
const message = require('../../modulo/config')

//import do arquivo DAO para realizar os comando no banco
const loginDAO = require("../../model/DAO/login")

//import da biblioteca para criptografar as senhas
const bcrypt = require('bcrypt')



const loginUsuario = async function(usuario) {
     console.log("Valor do parâmetro 'usuario' no controller:", usuario)
    try {
        if (
       usuario.email === "" ||   usuario.email === undefined || usuario.email === null  ||  usuario.email.length >100  ||
       usuario.senha === "" ||   usuario.senha === undefined || usuario.senha === null  ||  usuario.senha.length >100
        ) {
        return message.ERROR_REQUIRED_FIELD //400
        
         } else {
        let dadosUsuarioLogado = {}

        let resultEmail = await loginDAO.selectEmailUsuario(usuario.email)

        if(resultEmail!= false || typeof(resultEmail) == 'object'){

            if(resultEmail.length > 0){

                let usuarioUnico = resultEmail[0]

                //comparando se a senha digitada esta certa
                let conferindoSenha = await bcrypt.compare(usuario.senha, usuarioUnico.senha)

                if (conferindoSenha){
                     dadosUsuarioLogado.status = true
                    dadosUsuarioLogado.status_code = 200
                    dadosUsuarioLogado.user = resultEmail
                }
                return dadosUsuarioLogado
            }else{
                //erro na senha
                return message.ERROR_NOT_FOUND //404
            }
      
        }else{
            //erro em achar o email
            return message.ERROR_NOT_FOUND//500
        }
        }
    } catch (error) {
        console.log(error);
        
      return message.ERROR_INTERNAL_SERVER_CONTROLLER //500
    }
}

module.exports = {
    loginUsuario
} 