show databases;
CREATE database gestao_receitasDS2ab;
use gestao_receitasDS2ab;


CREATE TABLE tbl_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha text NOT NULL,
	palavra_chave text NOT NULL,
    foto_perfil VARCHAR(255)
);

CREATE TABLE tbl_nivel_dificuldade (
    id INT PRIMARY KEY AUTO_INCREMENT,
    dificuldade VARCHAR (10)  NOT NULL
);

CREATE TABLE tbl_receita (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(70) NOT NULL,
    descricao VARCHAR(100) NOT NULL,
    modo_de_preparo TEXT NOT NULL,
    imagem_receita VARCHAR(255) NOT NULL,
    ingredientes TEXT NOT NULL,
    tempo_preparo VARCHAR(20) NOT NULL,
    porcoes VARCHAR(20) NOT NULL,
    id_usuarios INT NOT NULL,
    id_nivel_dificuldade INT NOT NULL,
    FOREIGN KEY (id_usuarios) REFERENCES tbl_usuarios(id),
    FOREIGN KEY (id_nivel_dificuldade) REFERENCES tbl_nivel_dificuldade(id)
);

CREATE TABLE tbl_categorias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    categoria VARCHAR(80) NOT NULL
);

CREATE TABLE tbl_receita_categoria (
    id INT  primary key AUTO_INCREMENT,
    id_receita INT NOT NULL,
    id_categoria INT NOT NULL,
    FOREIGN KEY (id_receita) REFERENCES tbl_receita(id),
    FOREIGN KEY (id_categoria) REFERENCES tbl_categorias(id)
);
