/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CROUD de receitas
 * data: 29/05/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova receita
const insertReceita = async function(receita){
    try{
        let sql = `insert into tbl_receita (
                    titulo, 
                    descricao, 
                    modo_de_preparo, 
                    imagem_receita, 
                    ingredientes, 
                    tempo_preparo,
                    porcoes,
                    id_usuarios,
                    id_nivel_dificuldade
                )
                 
                    values(
                        '${receita.titulo}',
                        '${receita.descricao}',
                        '${receita.modo_de_preparo}',
                        '${receita.imagem_receita}',
                        '${receita.ingredientes}',
                        '${receita.tempo_preparo}',
                        '${receita.porcoes}',
                         ${receita.id_usuarios},
                         ${receita.id_nivel_dificuldade}
                    )`

         
        let result = await prisma.$executeRawUnsafe(sql)

        if(result)
            return result
        else
            return false
 
    }catch (error){
    //    console.log(error);
        return false
    }

   
}

// função para atualizar uma receita existente
const updateReceita = async function(receita){

    try {
        
        let sql = `update tbl_receita set   titulo                = '${receita.titulo}', 
                                            descricao             = '${receita.descricao}', 
                                            modo_de_preparo       = '${receita.modo_de_preparo}', 
                                            imagem_receitas       = '${receita.imagem_receita}', 
                                            ingredientes          = '${receita.ingredientes}',
                                            tempo_preparo         = '${receita.tempo_preparo}',
                                            porcoes               = '${receita.porcoes}',
                                            id_usuarios           = ${receita.id_usuarios},
                                            id_nivel_dificuldade  = ${receita.id_nivel_dificuldade}
                                    where id = ${receita.id}
                                    `
                            
        let result = await prisma.$executeRawUnsafe(sql)

        if(result){
            return true
        }else{
            return false
        }

    } catch (error) {
        // console.log(error);
        
        return false
    }

}

// função para deletar uma receita existente
const deleteReceita = async function(id){
    try {
        let sql = `delete from tbl_receita where id = ${id}`

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

// função para retornar todos as receitas existentes
const selectAllReceita = async function(){
    try{

        //scriptSQL para retornar todos os dados
        let sql = 'select * from tbl_receita order by id desc'

        let result = await prisma.$queryRawUnsafe(sql)

        if(result)
            return result
        else
            return false

    }catch(error){
        return false
    }
}

// função para buscar uma receita pelo id
const selecByIdReceita = async function(id){
    
    try {
        let sql = `select * from tbl_receita where id = ${id}`

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

const selectLastInsertId = async function(){
    try {
        let sql = `select id from tbl_receita order by id desc limit 1`

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
    insertReceita,
    updateReceita,
    deleteReceita,
    selectAllReceita,
    selecByIdReceita,
    selectLastInsertId
}




