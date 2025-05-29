/************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de nivel de dificldade
 * data: 29/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 ************************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir um novo nivel
const insertNivelDificuldade = async function(dificuldade){
    try{
        let sql = `insert into tbl_nivel_dificuldade (
                   dificuldade
                )
                    values(
                        '${dificuldade.dificuldade}'
                    )`

        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return true
        else
            return false
 
    }catch (error){
        console.log(error);
        
        return false
    }

   
}

// função para atualizar um nivel existente
const updateNivelDificuldade = async function(dificuldade){

    try {
        
        let sql = `update tbl_nivel_dificuldade set dificuldade = '${dificuldade.dificuldade}'
                                    where id = ${dificuldade.id}
                                    `
                            
        let resultDificuldade = await prisma.$executeRawUnsafe(sql)

        if(resultDificuldade){
            return true
        }else{
            return false
        }

    } catch (error) {
        return false
    }

}

// função para deletar um nivel existente
const deleteNivelDifuculdade = async function(id){
    try {
        let sql = `delete from tbl_nivel_dificuldade where id = ${id}`

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

// função para retornar todos os niveis existentes
const selectAllNivelDificuldade = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_nivel_dificuldade order by id desc'

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

// função para buscar um nivel pelo id
const selecByIdNivelDificuldade = async function(id){
    
    try {
        let sql = `select * from tbl__nivel_dificulde where id = ${id}`

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
    insertNivelDificuldade,
    updateNivelDificuldade,
    deleteNivelDifuculdade,
    selectAllNivelDificuldade,
    selecByIdNivelDificuldade
}




