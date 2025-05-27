show databases;
CREATE database gestaoDeReceitasDS2ab;
use gestaoDeReceitasDS2ab;


CREATE TABLE tbl_usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(60) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(100) NOT NULL,
	palavra_chave VARCHAR(10) NOT NULL,
    foto_perfil VARCHAR(200)
);