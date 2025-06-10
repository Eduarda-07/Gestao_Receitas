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
    //  console.log("Valor do parâmetro 'usuario' no controller:", usuario)
    try {
        if (
       usuario.email === "" ||   usuario.email === undefined || usuario.email === null  ||  usuario.email.length >100  ||
       usuario.senha === "" ||   usuario.senha === undefined || usuario.senha === null  
        ) {
        return message.ERROR_REQUIRED_FIELD //400
        
         } else {
        let dadosUsuarioLogado = {}

        let resultEmail = await loginDAO.selectEmailUsuario(usuario.email)
        // console.log(`Erro no select email `)

        if(resultEmail!= false || typeof(resultEmail) == 'object'){

            if(resultEmail.length > 0){

                let usuarioUnico = resultEmail[0]
                // console.log(usuarioUnico)

                //comparando se a senha digitada esta certa
                let conferindoSenha = await bcrypt.compare(usuario.senha, usuarioUnico.senha)
                console.log(conferindoSenha)
                if (conferindoSenha){
                    dadosUsuarioLogado.status = true
                    dadosUsuarioLogado.status_code = 200
                    dadosUsuarioLogado.user = {
                        id: usuarioUnico.id,
                        nome: usuarioUnico.nome,
                        email: usuarioUnico.email,
                        foto_perfil: usuarioUnico.foto_perfil || null 
                    }
                }
                return dadosUsuarioLogado
            }else{
                console.log(`Erro senha`)
                //erro na senha
                return message.ERROR_NOT_FOUND //404
            }
      
        }else{
            console.log(`Erro email`)
            //erro em achar o email
            return message.ERROR_INTERNAL_SERVER_MODEL
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