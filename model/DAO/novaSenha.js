/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para atualizar a senha de um suarios
 * data: 05/06/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const updateSenhaUsuario = async function (id, novaSenhaHash) {
    try {
        let sql = `update tbl_usuarios set senha = '${novaSenhaHash}' where id = ${id}`

        let result = await prisma.$executeRawUnsafe(sql)
        return result   
    } catch (error) {
        return false
    }
}

module.exports = {
    updateSenhaUsuario
}