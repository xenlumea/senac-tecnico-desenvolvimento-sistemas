-- COMANDO Select Simples (uma tabela)
-- 1) Selecione todos os alunos e todos os campos (Select * from aluno).
SELECT *
  FROM aluno;
-- ==============================
-- 2) Quais são os alunos da cidade 1?

SELECT a.nome aluno,
       c.nome cidade
  FROM aluno a
       INNER JOIN
       cidade c ON c.id = a.idcidade
 WHERE a.idcidade = 1;
-- ==============================
-- 3) Quais são os alunos em débito, que possuem menos de 500 reais devedores?

SELECT *
  FROM aluno
 WHERE valordebito > 0 AND
       valordebito < 500;
-- ==============================
-- 4) Quais são os alunos do turno Vespertino?

SELECT *
  FROM aluno
 WHERE turno = "V";
-- ==============================
-- 5) Quais são os alunos das cidades 1 ou 4?

SELECT a.nome,
       c.nome cidade
  FROM aluno a
       INNER JOIN
       cidade c ON a.idcidade = c.id
 WHERE idcidade IN (1, 4);
-- ================
-- 6) Quais são os alunos onde o nome começa com E?

SELECT *
  FROM aluno
 WHERE nome LIKE "E%";
-- ================
-- 7) Selecione somente o nome dos alunos do sexo feminino.

SELECT *
  FROM aluno
 WHERE sexo = 'F';
-- ================
-- 8) Quais são os alunos da cidade 1 que estudam à noite?

SELECT a.nome aluno,
       c.nome cidade,
       a.turno
  FROM aluno a
       INNER JOIN
       cidade c ON a.idcidade = c.id
 WHERE c.id = 1 AND
       a.turno = "N";
-- ================
-- 9) Qual é o nome, a cidade, o débito e o sexo dos alunos do turno matutino (valor 'M')?

SELECT a.nome aluno,
       c.nome cidade,
       a.valordebito,
       a.sexo,
       a.turno
  FROM aluno a
       INNER JOIN
       cidade c
 WHERE turno = "M";
-- ================
-- 10) Quais são as alunas(sexo feminino) que nasceram em Outubro ?

SELECT nome,
       datanascimento,
       sexo
  FROM aluno
 WHERE sexo = "F" AND
       strftime("%m", datanascimento) = "10";
-- ================
-- 11) Quem nasceu antes de 2005?

SELECT nome,
       datanascimento,
       sexo
  FROM aluno
 WHERE strftime("%Y", datanascimento) < "2005";
