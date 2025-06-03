/*******************************************************************************************************
 * Objetivo:  criar a comunicação com o banco de dados, para fazer o CROUD de receitaCategoria
 * Data: 03/06/2025
 * Autor: Eduara
 * Versão: 1.0
 ******************************************************************************************************/
//import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

//Instancia (criar uma receitaCategoriar utilizado) a biblioteca do prisma/client
const prisma = new PrismaClient()

//Função para inserir uma nova ReceitaCategoria
const insertReceitaCategoria = async function(receitaCategoria){
  try {

      let sql = `insert into tbl_receita_categoria  ( 
                                          id_receita,
                                          id_categoria
                                        ) 
                                          values 
                                        (
                                          ${receitaCategoria.id_receita},
                                          ${receitaCategoria.id_categoria}
                                        )`
                                
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
          return true
      else
          return false
  } catch (error) {
      
      return false
  }
}

//Função para atualizar uma receitaCategoria existente
const updateReceitaCategoria = async function(receitaCategoria){
  try {
      let sql = `update tbl_receita_categoria set id_receita  = '${receitaCategoria.id_receita}',
                                             id_categoria = '${receitaCategoria.id_categoria}'
                                        
                            where id = ${receitaCategoria.id}                
                            `
      let result = await prisma.$executeRawUnsafe(sql)

      if(result)
        return true
      else
        return false
  } catch (error) {
    return false
  }
}
  
//Função para excluir uma receitaCategoria existente
const deleteByReceita = async function(id_receita){
  try {
    let sql = `delete from tbl_receita_categoria where id_receita = ${id_receita}`

    let result = await prisma.$executeRawUnsafe(sql)

    if (result)
      return true
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar todas as receitasCategoria existentes
const selectAllReceitaCategoria = async function(){

    try {
      //ScriptSQL para retornar todos os dados
      let sql = 'select * from tbl_receita_categoria order by id desc'

      //Executa o scriptSQL no BD e aguarda o retorno dos dados
      let result = await prisma.$queryRawUnsafe(sql)

      if(result)
        return result
      else
        return false

    } catch (error) {
      return false
    }
}

//Função para buscar uma receitaCategoria pelo ID
const selectByIdReceitaCategoria = async function(id){
  try {
    let sql = `select * from tbl_receita_categoria where id = ${id}`

    let result = await prisma.$queryRawUnsafe(sql)

    if (result)
      return result
    else 
      return false
  } catch (error) {
    return false
  }
}

//Função para retornar as receitas pela categoria
const selectReceitaByIdCategoria = async function(id_categoria){
  try {
      let sql = `select * from tbl_receita 
                                            inner join tbl_receita_categoria
                                              on tbl_usuarios.id = tbl_receita_categoria.id_receita
                                            inner join tbl_categoria
                                              on tbl_categoria.id = tbl_receita_categoria.id_categoria
                  where tbl_receita_categoria.id_categoria = ${id_categoria}`

       let result = await prisma.$queryRawUnsafe(sql)
     
    if (result){
      return result
    }else {
      
      return false
    }
  } catch (error) {
    
      return false
  }
}

//Função para retornar as categorias pela receita
const selectCategoriaByIdReceita = async function(id_receita){
 try {
      let sql = `select tbl_categorias.* from tbl_receita_categoria
                                inner join tbl_categorias
                                  on tbl_categorias.id = tbl_receita_categoria.id_categoria
                  where tbl_receita_categoria.id_receita = ${id_receita}`
                  
      let result = await prisma.$queryRawUnsafe(sql)
    if (result && result.length > 0)
        return result
    else 
        return false
  } catch (error) {
      return false
  }
}



module.exports = {
    insertReceitaCategoria,
    updateReceitaCategoria,
    deleteByReceita,
    selectAllReceitaCategoria,
    selectByIdReceitaCategoria,
    selectReceitaByIdCategoria,
    selectCategoriaByIdReceita
}