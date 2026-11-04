SELECT e.uf,
       e.nome estado,
       c.nome cidade
  FROM cidade c
       INNER JOIN
       estado e ON c.idestado = e.id;
-- ===================================

SELECT f.nome AS nome,
       c.nome AS cidade
  FROM funcionario f
       INNER JOIN
       cidade c ON f.idcidade = c.id;
-- ===================================

SELECT e.nome estado,
       c.nome cidade,
       r.nome regiao
  FROM estado e
       INNER JOIN
       cidade c ON e.id = c.idestado
       INNER JOIN
       regiao r ON r.id = c.idregiao;
-- ===================================

SELECT f.nome AS nome,
       f.dtnascimento AS data_nascimento,
       c.Area,
       c.Nivel
  FROM funcionario f
       INNER JOIN
       cargo c ON c.id = f.idcargo;
-- ===================================

SELECT f.nome AS nome,
       c.nome AS cidade,
       e.nome AS estado
  FROM funcionario f
       INNER JOIN
       cidade c ON f.idcidade = c.id
       INNER JOIN
       estado e ON c.idestado = e.id;
