/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de usuarios
 * data: 22/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const insertUsuario = async function (usuario){
    try {
        let sql = `insert into tbl_usuarios (
                    nome,
                    email,
                    senha,
                    palavra_chave,
                    foto_perfil
                )
                    values(
                        '${usuario.nome}',
                        '${usuario.email}',
                        '${usuario.senha}',
                        '${usuario.palavra_chave}',
                        '${usuario.foto_perfil}'
                    )`

          // await só funciona com o "async", serve para fazer uma pausa no terminal para aguardar a conexão com o banco de dados
          let result = await prisma.$executeRawUnsafe(sql)

          if (result) {
            return result
          } else {
            return false
          }
    } catch (error) {
        console.log(error);
        return false
    }
}

// função para atualizar um filme existente
const updateUsuario = async function(usuario){

    try {
        
        let sql = `update tbl_usuarios set nome           = '${usuario.nome}', 
                                          email           = '${usuario.email}', 
                                          senha           = '${usuario.senha}', 
                                          palavra_chave   = '${usuario.palavra_chave}', 
                                          foto_perfil     = '${usuario.foto_perfil}'
                                    where id = ${usuario.id}
                                    `
                            
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um usuario
const deleteUsuario = async function(id){
    try {
        let sql = `delete from tbl_usuarios where id = ${id}`

        let result =  await prisma.$executeRawUnsafe(sql)

        if (result) {
            return true
        } else {
            return false
        }
    } catch (error) {
        return false
    }
}

// função para retornar todos os usuarios existentes
const selectAllUsuario = async function(){
    try{
        let sql = 'select * from tbl_usuarios order by id desc'

        //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        return false
    }
}

// função para buscar um usuario pelo id
const selecByIdUsuario = async function(id){
    
    try {
        let sql = `select * from tbl_usuarios where id = ${id}`

        let result =  await prisma.$queryRawUnsafe(sql)

        if (result) {
            return result
        } else {
            return false
        }
    } catch (error) {
        return false
    }

}


module.exports = {
    insertUsuario,
    updateUsuario,
    deleteUsuario,
    selectAllUsuario,
    selecByIdUsuario
}
