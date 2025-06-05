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

const selectEmailPalavra = async function (email, palavra_chave) {
    try {
        let sql = `SELECT * FROM tbl_usuarios WHERE email = '${email}' and palavra_chave = '${palavra_chave}'`
      
        let result = await prisma.$queryRawUnsafe(sql)
       

          if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        
        return false;
    }
}

const updateSenhaUsuarioById = async function (id, senha) {
    try {
      const sql = `update tbl_usuarios set senha = '${senha}' WHERE id = ${id}`
  
      return await prisma.$executeRawUnsafe(sql)
    } catch (error) {
      console.log(error)
      return false
    }
  }
  

module.exports = {
    updateSenhaUsuarioById,
    selectEmailPalavra
}