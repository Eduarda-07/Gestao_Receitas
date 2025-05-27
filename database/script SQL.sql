show databases;
CREATE database gestao_receitasDS2ab;
use gestaoDeReceitasDS2ab;


CREATE TABLE tbl_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha text NOT NULL,
	palavra_chave text NOT NULL,
    foto_perfil VARCHAR(255)
);