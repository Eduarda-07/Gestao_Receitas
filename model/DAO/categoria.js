/************************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para fazer o CRUD de categoria
 * data: 03/06/25
 * autor: Eduarda Silva
 * versão: 1.1
 ************************************************************************************************/

// import da biblioteca do prisma client para executar os scripts SQL
const { PrismaClient } = require('@prisma/client')

// instancia a biblioteca do prisma/client
const prisma = new PrismaClient()

// função para inserir uma nova categoria
const insertCategoria = async function(categoria) {
    try {
        let sql = `INSERT INTO tbl_categorias (
                       categoria
                   )
                   VALUES (
                       '${categoria.categoria}'
                   )`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// função para atualizar uma categoria existente
const updateCategoria = async function(categoria) {
    try {
        let sql = `UPDATE tbl_categorias 
                   SET categoria = '${categoria.categoria}'
                   WHERE id = ${categoria.id}`

        let result = await prisma.$executeRawUnsafe(sql)

        if (result)
            return true
        else
            return false

    } catch (error) {
        console.log(error)
        return false
    }
}

// função para deletar uma categoria existente
const deleteCategoria = async function(id) {
    try {
        let sql = `DELETE FROM tbl_categorias WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return true
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// função para retornar todas as categorias
const selectAllCategorias = async function() {
    try {
        let sql = 'SELECT * FROM tbl_categorias ORDER BY id DESC'

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// função para buscar uma categoria pelo id
const selectCategoriaById = async function(id) {
    try {
        let sql = `SELECT * FROM tbl_categorias WHERE id = ${id}`

        let result = await prisma.$queryRawUnsafe(sql)

        if (result)
            return result
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

// exporta as funções para uso externo
module.exports = {
    insertCategoria,
    updateCategoria,
    deleteCategoria,
    selectAllCategorias,
    selectCategoriaById
}
