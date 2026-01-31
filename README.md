# Gestão de receitas

---

## Índice

- [Visão Geral](#visao-geral)
- [URL base](#url-base)
- [Respostas comuns](#respostas-comuns)
- [Usuários](#usuarios)
- [Receitas](#receitas)
- [Filtros](#filtros)
- [Login](#login)
- [Nova senha](#senha)
- [Categoria](#categoria)
- [Nível de dificuldade](#dificuldade)

---

<a name="visao-geral"></a>
## Visão Geral

Esta API tem como objetivo realizar o **gerenciamento de receitas em um site**, permitindo que usuários cadastrados cadastrem suas receitas e vejam as receitas já cadastradas por outros usuários.

---

<a name="url-base"></a>
## URL base
https://localhost:8080/v1/controle-receitas

---

<a name="respostas-comuns"></a>
## Respostas comuns

| Status | Status code | Mesnsagem |
|--------|-------------|-----------|
|  True  |     201     |Item criado com sucesso!!|
| False  |     400     |Não foi possível realizar a requisição, pois existem campos obrigatórios que não foram preenchidos ou não atendem a quantidade de caracteres!!!|
| False  |     404     |Não foram encontrados itens de retorno!!!|
| False  |     415     |Não foi possível processar a requisição, pois o tipo de dados encaminhado não é processado pelo servidor. Favor encaminhar dados apenas no formato JSON!!!|
| False  |     500     |Devido a erros internos no servidor da model, não foi possível processar a requisição!!!|

---

<a name="usuarios"></a>
## Usuários

### Método: `POST`
### Caminho: /usuario
### Descrição: Inserir novo usuário

---

### Exemplo de Body

```json
{
    "nome": "Eduarda Silva",
    "email": "exemplo@gmail.com",
    "senha": "1234",
    "palavra_chave": "recuperação"
}
```
### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!",
    "usuario": {
        "id": 14,
        "nome": "Eduarda Silva",
        "email": "exemplo@gmail.com",
        "senha": "$2b$10$PBmdAm.zz1amCMQt3j3ITO.xETiu6dy8qwss.ALGF7K/5pROOXxJG",
        "palavra_chave":  "$2b$10$cWRNGigIZBcOX1VZWGhcxe.8KUGQOR4gdLMJTBCpewBe757nokKAK"
    }
}
```

### Método: `GET`
### Caminho: /usuario/${id da usuario}
### Descrição: Bucar um usuário pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "usuario": [
        {
            "id": 14,
            "nome": "Eduarda Silva",
            "email": "exemplo@gmail.com",
            "senha": "$2b$10$PBmdAm.zz1amCMQt3j3ITO.xETiu6dy8qwss.ALGF7K/5pROOXxJG",
            "palavra_chave": "$2b$10$cWRNGigIZBcOX1VZWGhcxe.8KUGQOR4gdLMJTBCpewBe757nokKAK",
            "foto_perfil": null
        }
    ]
}
```

### Método: `PUT`
### Caminho: /usuario/${id da usuario}
### Descrição: Atualizar um usuário pelo id 

---

### Exemplo de Body

```json
{
    "nome": "Eduarda",
    "email": "exemplo@gmail.com",
    "senha": "1234",
    "palavra_chave": "recuperação",
    "foto_perfil": "foto"
}
```
Observação: O frontend é responsável por mandar todos os atributos preenchidos (o atributo foto é opcional), mesmo que não tenham sofrido alterações.

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /usuario
### Descrição: Listar todos os usuários

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 10,
    "usuarios": [
        {
            "id": 14,
            "nome": "Eduarda",
            "email": "exemplo@gmail.com",
            "senha": "$2b$10$tE6dSYNWWIx3/F.EPjXOyuitQxbYkKjeyRq00iOvPOrSFft5ekeay",
            "palavra_chave": "$2b$10$gsjDLrTuoid3DqqBGc.2DOLyZak5qGQjr6eVDan8nnmy5xW0v.QzO",
            "foto_perfil": "foto"
        },
        ...
     ]
} 
```

### Método: `DELETE`
### Caminho: /usuario/${id do usuário}
### Descrição: Deletar um usuário

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

---

<a name="receitas"></a>
## Receitas

### Método: `POST`
### Descrição: Inserir nova receita
### Caminho: /receita

---

### Exemplo de Body

```json
{
   "titulo": "Bolo de cenoura",
   "descricao": "Delicioso bolo de cenoura",
   "modo_de_preparo": "Preparo do Bolo:\n\nPré-aqueça o Forno: Preaqueça o forno a 180°C. Unte e enfarinhe uma forma com furo central (tipo pudim) de aproximadamente 24 cm de diâmetro.\nBata os Líquidos: No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata muito bem até obter uma mistura homogênea e sem pedacinhos de cenoura. Isso é crucial para a textura do bolo.\nMisture os Secos: Em uma tigela grande, coloque o açúcar e a farinha de trigo.\nIncorpore as Misturas: Despeje a mistura líquida do liquidificador sobre os ingredientes secos na tigela. Misture delicadamente com um fouet ou espátula até incorporar bem. Não bata demais para não desenvolver o glúten da farinha.\nAdicione o Fermento: Por último, adicione o fermento em pó e misture suavemente, apenas até que ele se incorpore à massa.\nAsse o Bolo: Despeje a massa na forma untada e enfarinhada. Leve ao forno preaquecido por cerca de 35 a 45 minutos, ou até que, ao espetar um palito, ele saia limpo. O tempo de cozimento pode variar dependendo do seu forno.\nDesenforme: Retire o bolo do forno e espere amornar antes de desenformar.\nPreparo da Cobertura de Chocolate:\n\nCombine os Ingredientes: Em uma panela, junte o leite, o açúcar, o chocolate em pó e a margarina (ou manteiga).\nCozinhe a Cobertura: Leve ao fogo médio, mexendo sempre, até a mistura começar a ferver e engrossar levemente. Ela deve ter a consistência de um creme ralo. Não deixe muito grossa, pois ela vai endurecer um pouco ao esfriar.\nCubra o Bolo: Despeje a cobertura ainda quente sobre o bolo já desenformado e frio ou morno.",
   "imagem_receita": "foto.png",
   "ingredientes": "Para o Bolo:\n\n3 cenouras médias picadas (cerca de 250g)\n4 ovos grandes\n1 xícara (240ml) de óleo vegetal (milho, girassol ou canola)\n2 xícaras (360g) de açúcar\n2 xícaras (280g) de farinha de trigo\n1 colher de sopa (15g) de fermento em pó\nPara a Cobertura de Chocolate:\n\n1 xícara (240ml) de leite\n1 xícara (160g) de açúcar\n4 colheres de sopa (40g) de chocolate em pó 50% ou 100% cacau (não achocolatado)\n2 colheres de sopa (20g) de margarina ou manteiga",
   "tempo_preparo": "2 horas",
   "porcoes": "8 porções",
   "id_usuarios": 1,
   "id_nivel_dificuldade": 1,
   "categoria": [
     {"id": 3},
     {"id": 1},
{"id": 2}
   ]
}
```
### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `GET`
### Caminho: /receita
### Descrição: Listar todas as receitas

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 2,
    "receitas": [
        {
            "id": 8,
            "titulo": "Bolo de cenoura",
            "descricao": "Delicioso bolo de cenoura",
            "modo_de_preparo": "Preparo do Bolo:\n\nPré-aqueça o Forno: Preaqueça o forno a 180°C. Unte e enfarinhe uma forma com furo central (tipo pudim) de aproximadamente 24 cm de diâmetro.\nBata os Líquidos: No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata muito bem até obter uma mistura homogênea e sem pedacinhos de cenoura. Isso é crucial para a textura do bolo.\nMisture os Secos: Em uma tigela grande, coloque o açúcar e a farinha de trigo.\nIncorpore as Misturas: Despeje a mistura líquida do liquidificador sobre os ingredientes secos na tigela. Misture delicadamente com um fouet ou espátula até incorporar bem. Não bata demais para não desenvolver o glúten da farinha.\nAdicione o Fermento: Por último, adicione o fermento em pó e misture suavemente, apenas até que ele se incorpore à massa.\nAsse o Bolo: Despeje a massa na forma untada e enfarinhada. Leve ao forno preaquecido por cerca de 35 a 45 minutos, ou até que, ao espetar um palito, ele saia limpo. O tempo de cozimento pode variar dependendo do seu forno.\nDesenforme: Retire o bolo do forno e espere amornar antes de desenformar.\nPreparo da Cobertura de Chocolate:\n\nCombine os Ingredientes: Em uma panela, junte o leite, o açúcar, o chocolate em pó e a margarina (ou manteiga).\nCozinhe a Cobertura: Leve ao fogo médio, mexendo sempre, até a mistura começar a ferver e engrossar levemente. Ela deve ter a consistência de um creme ralo. Não deixe muito grossa, pois ela vai endurecer um pouco ao esfriar.\nCubra o Bolo: Despeje a cobertura ainda quente sobre o bolo já desenformado e frio ou morno.",
            "imagem_receita": "foto.png",
            "ingredientes": "Para o Bolo:\n\n3 cenouras médias picadas (cerca de 250g)\n4 ovos grandes\n1 xícara (240ml) de óleo vegetal (milho, girassol ou canola)\n2 xícaras (360g) de açúcar\n2 xícaras (280g) de farinha de trigo\n1 colher de sopa (15g) de fermento em pó\nPara a Cobertura de Chocolate:\n\n1 xícara (240ml) de leite\n1 xícara (160g) de açúcar\n4 colheres de sopa (40g) de chocolate em pó 50% ou 100% cacau (não achocolatado)\n2 colheres de sopa (20g) de margarina ou manteiga",
            "tempo_preparo": "2 horas",
            "porcoes": "8 porções",
            "dificuldade": [
                {
                    "id": 1,
                    "dificuldade": "Dificil"
                }
            ],
            "categoria": [
                {
                    "id": 1,
                    "categoria": "Salgados"
                },
                {
                    "id": 2,
                    "categoria": "Salgados"
                }
            ]
        },
       ...
    ]
}
```

### Método: `GET`
### Caminho: /receita/${id da receita}
### Descrição: Bucar uma receita pelo id 

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "receita": [
        {
            "id": 8,
            "titulo": "Bolo de cenoura",
            "descricao": "Delicioso bolo de cenoura",
            "modo_de_preparo": "Preparo do Bolo:\n\nPré-aqueça o Forno: Preaqueça o forno a 180°C. Unte e enfarinhe uma forma com furo central (tipo pudim) de aproximadamente 24 cm de diâmetro.\nBata os Líquidos: No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata muito bem até obter uma mistura homogênea e sem pedacinhos de cenoura. Isso é crucial para a textura do bolo.\nMisture os Secos: Em uma tigela grande, coloque o açúcar e a farinha de trigo.\nIncorpore as Misturas: Despeje a mistura líquida do liquidificador sobre os ingredientes secos na tigela. Misture delicadamente com um fouet ou espátula até incorporar bem. Não bata demais para não desenvolver o glúten da farinha.\nAdicione o Fermento: Por último, adicione o fermento em pó e misture suavemente, apenas até que ele se incorpore à massa.\nAsse o Bolo: Despeje a massa na forma untada e enfarinhada. Leve ao forno preaquecido por cerca de 35 a 45 minutos, ou até que, ao espetar um palito, ele saia limpo. O tempo de cozimento pode variar dependendo do seu forno.\nDesenforme: Retire o bolo do forno e espere amornar antes de desenformar.\nPreparo da Cobertura de Chocolate:\n\nCombine os Ingredientes: Em uma panela, junte o leite, o açúcar, o chocolate em pó e a margarina (ou manteiga).\nCozinhe a Cobertura: Leve ao fogo médio, mexendo sempre, até a mistura começar a ferver e engrossar levemente. Ela deve ter a consistência de um creme ralo. Não deixe muito grossa, pois ela vai endurecer um pouco ao esfriar.\nCubra o Bolo: Despeje a cobertura ainda quente sobre o bolo já desenformado e frio ou morno.",
            "imagem_receita": "foto.png",
            "ingredientes": "Para o Bolo:\n\n3 cenouras médias picadas (cerca de 250g)\n4 ovos grandes\n1 xícara (240ml) de óleo vegetal (milho, girassol ou canola)\n2 xícaras (360g) de açúcar\n2 xícaras (280g) de farinha de trigo\n1 colher de sopa (15g) de fermento em pó\nPara a Cobertura de Chocolate:\n\n1 xícara (240ml) de leite\n1 xícara (160g) de açúcar\n4 colheres de sopa (40g) de chocolate em pó 50% ou 100% cacau (não achocolatado)\n2 colheres de sopa (20g) de margarina ou manteiga",
            "tempo_preparo": "2 horas",
            "porcoes": "8 porções",
            "dificuldade": [
                {
                    "id": 1,
                    "dificuldade": "Dificil"
                }
            ],
            "categoria": [
                {
                    "id": 1,
                    "categoria": "Salgados"
                },
                {
                    "id": 2,
                    "categoria": "Salgados"
                }
            ]
        }
    ]
}
```

### Método: `DELETE`
### Caminho: /receita/${id da receita}
### Descrição: Deletar uma receita

---

### Exemplo de Retorno (200)
```json
 {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
}
```

---

<a name="filtros"></a>
## Filtros

### Método: `GET`
### Descrição: buscar alimentos filtrando pela categoria ou pelo nível de dificuldade

---

### Filtrar por categoria:
#### Caminho: /filtros/id/?categoria= ${id da categoria}
Observação: enviar os dados por query

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 9,
    "receita": [
        {
            "id": 3,
            "titulo": "Bolo de cenoura",
            "descricao": "Delicioso bolo de cenoura",
            "modo_de_preparo": "Preparo do Bolo:\n\nPré-aqueça o Forno: Preaqueça o forno a 180°C. Unte e enfarinhe uma forma com furo central (tipo pudim) de aproximadamente 24 cm de diâmetro.\nBata os Líquidos: No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata muito bem até obter uma mistura homogênea e sem pedacinhos de cenoura. Isso é crucial para a textura do bolo.\nMisture os Secos: Em uma tigela grande, coloque o açúcar e a farinha de trigo.\nIncorpore as Misturas: Despeje a mistura líquida do liquidificador sobre os ingredientes secos na tigela. Misture delicadamente com um fouet ou espátula até incorporar bem. Não bata demais para não desenvolver o glúten da farinha.\nAdicione o Fermento: Por último, adicione o fermento em pó e misture suavemente, apenas até que ele se incorpore à massa.\nAsse o Bolo: Despeje a massa na forma untada e enfarinhada. Leve ao forno preaquecido por cerca de 35 a 45 minutos, ou até que, ao espetar um palito, ele saia limpo. O tempo de cozimento pode variar dependendo do seu forno.\nDesenforme: Retire o bolo do forno e espere amornar antes de desenformar.\nPreparo da Cobertura de Chocolate:\n\nCombine os Ingredientes: Em uma panela, junte o leite, o açúcar, o chocolate em pó e a margarina (ou manteiga).\nCozinhe a Cobertura: Leve ao fogo médio, mexendo sempre, até a mistura começar a ferver e engrossar levemente. Ela deve ter a consistência de um creme ralo. Não deixe muito grossa, pois ela vai endurecer um pouco ao esfriar.\nCubra o Bolo: Despeje a cobertura ainda quente sobre o bolo já desenformado e frio ou morno.",
            "imagem_receita": "foto.png",
            "ingredientes": "Para o Bolo:\n\n3 cenouras médias picadas (cerca de 250g)\n4 ovos grandes\n1 xícara (240ml) de óleo vegetal (milho, girassol ou canola)\n2 xícaras (360g) de açúcar\n2 xícaras (280g) de farinha de trigo\n1 colher de sopa (15g) de fermento em pó\nPara a Cobertura de Chocolate:\n\n1 xícara (240ml) de leite\n1 xícara (160g) de açúcar\n4 colheres de sopa (40g) de chocolate em pó 50% ou 100% cacau (não achocolatado)\n2 colheres de sopa (20g) de margarina ou manteiga",
            "tempo_preparo": "20 min.",
            "porcoes": "8 porções",
            "categoria": [
                {
                    "id": 1,
                    "categoria": "Salgados"
                },
                {
                    "id": 2,
                    "categoria": "Salgados"
                }
             ]  
            "dificuldade": [
                {
                    "id": 1,
                    "dificuldade": "Dificil"
                }
            ]
        }
       ...
     ]
   }
```

### Filtrar por nível de dificuldade:
#### Caminho: /filtros/id/?dificuldade= ${id do nível de dificuldade}
Observação: enviar os dados por query

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 9,
    "receita": [
        {
            "id": 3,
            "titulo": "Bolo de cenoura",
            "descricao": "Delicioso bolo de cenoura",
            "modo_de_preparo": "Preparo do Bolo:\n\nPré-aqueça o Forno: Preaqueça o forno a 180°C. Unte e enfarinhe uma forma com furo central (tipo pudim) de aproximadamente 24 cm de diâmetro.\nBata os Líquidos: No liquidificador, adicione as cenouras picadas, os ovos e o óleo. Bata muito bem até obter uma mistura homogênea e sem pedacinhos de cenoura. Isso é crucial para a textura do bolo.\nMisture os Secos: Em uma tigela grande, coloque o açúcar e a farinha de trigo.\nIncorpore as Misturas: Despeje a mistura líquida do liquidificador sobre os ingredientes secos na tigela. Misture delicadamente com um fouet ou espátula até incorporar bem. Não bata demais para não desenvolver o glúten da farinha.\nAdicione o Fermento: Por último, adicione o fermento em pó e misture suavemente, apenas até que ele se incorpore à massa.\nAsse o Bolo: Despeje a massa na forma untada e enfarinhada. Leve ao forno preaquecido por cerca de 35 a 45 minutos, ou até que, ao espetar um palito, ele saia limpo. O tempo de cozimento pode variar dependendo do seu forno.\nDesenforme: Retire o bolo do forno e espere amornar antes de desenformar.\nPreparo da Cobertura de Chocolate:\n\nCombine os Ingredientes: Em uma panela, junte o leite, o açúcar, o chocolate em pó e a margarina (ou manteiga).\nCozinhe a Cobertura: Leve ao fogo médio, mexendo sempre, até a mistura começar a ferver e engrossar levemente. Ela deve ter a consistência de um creme ralo. Não deixe muito grossa, pois ela vai endurecer um pouco ao esfriar.\nCubra o Bolo: Despeje a cobertura ainda quente sobre o bolo já desenformado e frio ou morno.",
            "imagem_receita": "foto.png",
            "ingredientes": "Para o Bolo:\n\n3 cenouras médias picadas (cerca de 250g)\n4 ovos grandes\n1 xícara (240ml) de óleo vegetal (milho, girassol ou canola)\n2 xícaras (360g) de açúcar\n2 xícaras (280g) de farinha de trigo\n1 colher de sopa (15g) de fermento em pó\nPara a Cobertura de Chocolate:\n\n1 xícara (240ml) de leite\n1 xícara (160g) de açúcar\n4 colheres de sopa (40g) de chocolate em pó 50% ou 100% cacau (não achocolatado)\n2 colheres de sopa (20g) de margarina ou manteiga",
            "tempo_preparo": "20 min.",
            "porcoes": "8 porções",
            "categoria": [
                {
                    "id": 1,
                    "categoria": "Salgados"
                },
                {
                    "id": 2,
                    "categoria": "Salgados"
                }
             ]  
            "dificuldade": [
                {
                    "id": 1,
                    "dificuldade": "Dificil"
                }
            ]
        }
       ...
     ]
   }
```
Observação: é possível fazer os dois filtros ao mesmo tempo com a mesma url

<a name="login"></a>
## Login

### Método: `POST`
### Caminho: /login
### Descrição: Logar na aplicação

---

### Exemplo de Body

```json
{
   "email": "exemplo@gmail.com",
   "senha": "1234"
}
```
### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "usuario": {
        "id": 14,
        "nome": "Eduarda",
        "email": "exemplo@gmail.com",
        "foto_perfil": "foto"
    }
}
```

---

<a name="senha"></a>
## Nova senha

### Método: `PUT`
### Caminho: /usuario/recuperar-senha/${id do usuário}
### Descrição: Atualizar ou recuperar senha 

---

### Exemplo de Body

```json
{
   "email": "exemplo@gmail.com",
   "palavra_chave": "recuperação",
   "nova_senha": "12"
}
```

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "message": "Item atualizado com sucesso!!"
}
```

---

<a name="categoria"></a>
## Categoria

### Método: `POST`
### Caminho: /categoria
### Descrição: Inserir nova categoria

---

### Exemplo de Body

```json
{
    "categoria": "Doce"
}
```
### Exemplo de Retorno (201)
```json
{
  "status": true,
  "status_code": 201,
  "message": "Item criado com sucesso!!"
}
}
```

### Método: `DELETE`
### Caminho: /categoria/{id da categoria}
### Descrição: Deletar categoria

---

### Exemplo de Retorno (200)
```json
  {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
  }
```

### Método: `GET`
### Caminho: /categoria
### Descrição: Listar categorias

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 3
    "categorias": [
        {
            "id": 3,
            "nome": "Doce"
        }
        ...
  }
```

### Método: `GET`
### Caminho: /categoria/{id da categoria}
### Descrição: Buscar categoria pelo id

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "categorias": [
        {
            "id": 1,
            "nome": "Salgados"
        }
        ...
  }
```

### Método: `PUT`
### Caminho: /categoria/${id da categoria}
### Descrição: Atualizar uma categoria pelo id 

---

### Exemplo de Body

```json
{
    "categoria": "Prato principal"
}
```

### Exemplo de Retorno (200)
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item atualizado com sucesso!!"
}
```

---

<a name="difiduldade"></a>
## Nível de dificuldade

### Método: `POST`
### Caminho: /nivelDificuldade
### Descrição: Inserir novo nível de dificuldade

---

### Exemplo de Body

```json
{
    "dificuldade": "Médio"
}
```
### Exemplo de Retorno (201)
```json
{
    "status": true,
    "status_code": 201,
    "message": "Item criado com sucesso!!"
}
```

### Método: `DELETE`
### Caminho: /nivelDificuldade/{id do nível de dificuldade}
### Descrição: Deletar nível de dificuldade

---

### Exemplo de Retorno (200)
```json
  {
    "status": true,
    "status_code": 200,
    "message": "Item deletado com sucesso!!"
  }
```

### Método: `GET`
### Caminho: /nivelDificuldade
### Descrição: Listar todos os níveis de dificuldade

---

### Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "itens": 1,
    "nivel": [
        {
            "id": 1,
            "dificuldade": "Dificil"
        }
    ]
}
```

### Método: `GET`
### Caminho: /nivelDificuldade/{id do nível de dificuldade}
### Descrição: Buscar nível de dificuldade pelo id

---

### 📤 Exemplo de Retorno (200)
```json
{
    "status": true,
    "status_code": 200,
    "nivel": [
        {
            "id": 1,
            "dificuldade": "Dificil"
        }
    ]
}
```

### Método: `PUT`
### Caminho: /nivelDificuldade/${id do nível de dificuldade}
### Descrição: Atualizar um nível de dificuldade pelo id 

---

### Exemplo de Body

```json
{
    "dificuldade": "Médio"
   
}
```

### Exemplo de Retorno (200)
```json
{
  "status": true,
  "status_code": 200,
  "message": "Item atualizado com sucesso!!"
}
```











