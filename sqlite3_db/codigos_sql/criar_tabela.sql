CREATE TABLE produto (
    id INTEGER PRIMARY key autoincrement,
    nome VARCHAR(100),
    preco DECIMAL(10, 2),
    precopro DECIMAL(10, 2),
    datavalidade DATE,
    grupo VARCHAR(30),
    estoque INTEGER
);
