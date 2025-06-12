/*******************************************************************************************
 * objetivo: criar a comunicação com o banco de dados, para filtrar as receitas 
 * data: 10/06/25
 * autor: Eduarda Silva
 * versão: 1.0
 *******************************************************************************************/


// import da biblioteca do prisma client para executar os scripts SQL
const{PrismaClient } = require('@prisma/client')

// instancia (criar um objeto a ser utilizado) a bliblioteca do prisma/client
const prisma = new PrismaClient()

const selectReceitaFiltro = async function(categoria, dificuldade){
    try{
        let sqlBase = `
                   SELECT tbl_receita.*, tbl_categorias.categoria, tbl_nivel_dificuldade.dificuldade   
                   FROM tbl_receita 
                   INNER JOIN tbl_receita_categoria  
                   ON  tbl_receita.id = tbl_receita_categoria.id_receita 
                   INNER JOIN tbl_categorias
                   ON tbl_receita_categoria.id_categoria = tbl_categorias.id
                   INNER JOIN tbl_nivel_dificuldade 
                   ON tbl_receita.id_nivel_dificuldade = tbl_nivel_dificuldade.id
                   `

        let params = []
        let where = []
           
         // Adiciona a condição de categoria se ela for verdadeira
        if (categoria) {
            // adiciona a continuação da sintase mySQL para categoria
            // ? é o valor que do id mandado que foi inserido na lista de params
            where.push(`tbl_categorias.id = ?`);
            params.push(Number(categoria));
        }
           
        // Adiciona a condição de dificuldade se ela for verdadeira
        if (dificuldade) {
            // adiciona a continuação da sintase mySQL para dificuldade
            // ? é o valor que do id mandado que foi inserido na lista de params
            where.push(`tbl_receita.id_nivel_dificuldade = ?`);
            params.push(Number(dificuldade));
        }
               
        if (where.length > 0) {
            sqlBase += ` WHERE ` + where.join(' or ')
        }
      
        // ...params é o prisma o valor da lista para ? 
        const result = await prisma.$queryRawUnsafe(sqlBase, ...params);

    

        if(result){
            return result
        } else{
            return false
        }
        
    }catch(error){
        console.log(error);
        return false
    }
}

module.exports = {
    selectReceitaFiltro
}

