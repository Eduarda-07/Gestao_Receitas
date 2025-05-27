/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o login de suarios
 * data: 26/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const selectEmailUsuario = async function (email) {
    try {
        let sql = `SELECT * FROM tbl_usuarios WHERE email = '${email}'`
        let result = await prisma.executeRawUnsafe(sql)

          if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false;
    }
}

module.exports = {
    selectEmailUsuario
}