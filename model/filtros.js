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

const selectReceitasByFiltro = async function (idCategoria) {
    try {

        // Usando o Prisma para buscar receitas que estão associadas a um id_categoria específico
        // A consulta vai na tabela de junção e então inclui os detalhes da receita
        const receitas = await prisma.tbl_receita_categoria.findMany({
            where: {
                id_categoria: idCategoria // Filtra pela categoria desejada
            },
            select: { // Seleciona apenas os dados da receita associada
                receita: {
                    select: {
                        id: true,
                        titulo: true,
                        descricao: true,
                        modo_de_preparo: true,
                        imagem_receita: true,
                        ingredientes: true,
                        tempo_preparo: true,
                        porcoes: true,
                        id_usuarios: true,
                        id_nivel_dificuldade: true,
                        // Você pode incluir outras informações da receita aqui
                    }
                }
            }
        });

        // O resultado de `findMany` em `tbl_receita_categoria` com `select: { receita: ... }`
        // virá como um array de objetos como `{ receita: { ...dados_da_receita... } }`.
        // Precisamos extrair apenas os objetos de receita.
        const receitasFiltradas = receitas.map(item => item.receita);

        if (receitasFiltradas.length > 0) {
            console.log(`DAO: ${receitasFiltradas.length} receitas encontradas para a categoria ${idCategoria}.`);
            return receitasFiltradas;
        } else {
            console.log(`DAO: Nenhuma receita encontrada para a categoria ${idCategoria}.`);
            return []; // Retorna um array vazio se nenhuma receita for encontrada
        }

    } catch (error) {
        console.error("DAO ERROR: Falha ao buscar receitas por categoria. Detalhes do erro:", error);
        // Em caso de erro, você pode querer retornar false ou lançar o erro para o controller
        return false;
    }
}

const selectRecceitaFiltro = async function(categoria, dificuldade){
    try{
        let sqlBase = `SELECT tbl_receita.*, tbl_categorias.categoria, tbl_nivel_dificuldade.dificuldade   
                   FROM tbl_receita 
                   INNER JOIN tbl_receita_categoria  
                   ON  tbl_receita.id = tbl_receita_categoria.id_receita 
                   INNER JOIN tbl_categorias
                   ON tbl_receita_categoria.id_categoria = tbl_categorias.id
                   INNER JOIN tbl_nivel_dificuldade 
                   ON tbl_receita.id_nivel_dificuldade = tbl_nivel_dificuldade.id
                   `


        if (categoria) {
            sqlBase = ` SELECT tbl_receita.*, tbl_categorias.categoria, tbl_nivel_dificuldade.dificuldade   
                        FROM tbl_receita 
                        INNER JOIN tbl_receita_categoria  
                        ON  tbl_receita.id = tbl_receita_categoria.id_receita 
                        INNER JOIN tbl_categorias
                        ON tbl_receita_categoria.id_categoria = tbl_categorias.id
                        INNER JOIN tbl_nivel_dificuldade 
                        ON tbl_receita.id_nivel_dificuldade = tbl_nivel_dificuldade.id
                        WHERE tbl_categorias.id = ${categoria} 
                  ` 

            //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
            let result = await prisma.$queryRawUnsafe(sqlBase)

            if(result)
                return result
            else
                return false
    
    
        }else if (dificuldade) {
            sqlBase =  `SELECT tbl_receita.*, tbl_categorias.categoria, tbl_nivel_dificuldade.dificuldade   
                        FROM tbl_receita 
                        INNER JOIN tbl_receita_categoria  
                        ON  tbl_receita.id = tbl_receita_categoria.id_receita 
                        INNER JOIN tbl_categorias
                        ON tbl_receita_categoria.id_categoria = tbl_categorias.id
                        INNER JOIN tbl_nivel_dificuldade 
                        ON tbl_receita.id_nivel_dificuldade = tbl_nivel_dificuldade.id
                        WHERE tbl_receita.id_nivel_dificuldade = ${dificuldade}`
                    
            let result = await prisma.$queryRawUnsafe(sqlBase)

            if(result)
                return result
            else
                return false
    
        }
        //executa o scriptSQL no banco de dados e aguarda o retorno dos dados 
        
    

       
    }catch(error){
        return false
    }
}

