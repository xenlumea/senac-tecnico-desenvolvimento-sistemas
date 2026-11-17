-- 1) Selecione todos os alunos e todos os campos (Select * from aluno).
SELECT *
  FROM aluno;
-- ===============================
-- 2) Quais são os alunos da cidade 1?

SELECT *
  FROM aluno
 WHERE idcidade = 1;
-- ===============================
-- 3) Quais são os alunos em débito, que possuem menos de 500 reais devedores?

SELECT *
  FROM aluno
 WHERE valordebito > 0 AND
       valordebito < 500;
-- ===============================
-- 4) Quais são os alunos do turno Vespertino?

SELECT *
  FROM aluno
 WHERE turno = "V";
-- ===============================
-- 5) Quais são os alunos das cidades 1 ou 4?

SELECT *
  FROM aluno
 WHERE idcidade IN (1, 4);
-- ===============================
-- 6) Quais são os alunos onde o nome começa com E?

SELECT *
  FROM aluno
 WHERE nome LIKE "E%";
-- ===============================
-- 7) Selecione somente o nome dos alunos do sexo feminino.

SELECT nome
  FROM aluno
 WHERE sexo = "F";
-- ===============================
-- 8) Quais são os alunos da cidade 1 que estudam à noite?

SELECT *
  FROM aluno
 WHERE idcidade = 1 AND
       turno = "N";
-- ===============================
-- 9) Qual é o nome, a cidade, o débito
-- e o sexo dos alunos do turno matutino (valor 'M')?

SELECT a.nome,
       c.nome AS cidade,
       a.valordebito,
       a.sexo
  FROM aluno a
       INNER JOIN
       cidade c ON c.id = a.idcidade
 WHERE turno = "M";
-- ===============================
-- 10) Quais são as alunas(sexo feminino) que nasceram em Outubro ?

SELECT nome,
       sexo,
       datanascimento
  FROM aluno
 WHERE sexo = "F" AND
       strftime("%m", datanascimento) = "10";
-- ===============================
-- 11) Quem nasceu antes de 2005?

SELECT *
  FROM aluno
 WHERE strftime("%Y", datanascimento) < "2005";
-- ===============================
-- 12) Quantos alunos estão cadastrados na tabela?

SELECT COUNT( * ) AS num_alunos
  FROM aluno;
-- ====================================
-- 13)Qual é a média do valor de débitos dos alunos,
-- apenas para os alunos que devem alguma coisa?

SELECT AVG(valordebito) AS media_debito
  FROM aluno
 WHERE valordebito > 0;
-- ====================================
-- 14) Qual é a média do valor de débitos das mulheres, só pra quem deve?

SELECT AVG(valordebito) AS media_debito
  FROM aluno
 WHERE sexo = "F" AND
       valordebito > 0;
-- ====================================
-- 15) Qual é o valor do maior e do menor débito, sem contar os alunos que não devem nada?

SELECT MAX(valordebito) AS maior,
       MIN(valordebito) AS menor
  FROM aluno
 WHERE valordebito > 0;
-- ====================================
-- 16) Qual é a quantidade de alunos por cidade?

SELECT COUNT( * ) AS qtd_alunos,
       c.nome AS cidade
  FROM aluno a
       INNER JOIN
       cidade c ON a.idcidade = c.id
 GROUP BY idcidade;
-- ====================================
-- 17) Qual é a quantidade de alunos por sexo?

SELECT COUNT( * ) AS qtd_alunos,
       sexo
  FROM aluno
 GROUP BY sexo;
-- ====================================
-- 18) Quantas mulheres estão estudando por turno?

SELECT COUNT( * ) AS qtd_alunos,
       sexo,
       turno
  FROM aluno
 GROUP BY sexo,
          turno;
-- ====================================
-- 19) Qual é a soma de débitos dos alunos por cidade?

SELECT SUM(a.valordebito) AS valor_debito,
       c.nome AS cidade
  FROM aluno a
       INNER JOIN
       cidade c ON a.idcidade = c.id
 GROUP BY idcidade;
-- ====================================
-- 20) Qual é a soma de débitos dos alunos por turno?

SELECT SUM(valordebito) AS valor_debito,
       turno
  FROM aluno
 GROUP BY turno;
-- ====================================
-- 21) Quantos alunos, por sexo e turno, possuem o nome com a 2° letra igual a "A"?

SELECT COUNT( * ) AS qtd_alunos,
       sexo,
       turno
  FROM aluno
 WHERE nome LIKE "_A%"
 GROUP BY sexo,
          turno;
-- ====================================
-- 22) Qual é a soma de débitos por turno apenas dos alunos nascidos em maio?

SELECT SUM(valordebito) AS total_por_turno,
       turno
  FROM aluno
 WHERE strftime("%m", datanascimento) = "05"
 GROUP BY turno;
-- ====================================
-- 23) Qual é o maior débito de alunos por cidade?

SELECT MAX(a.valordebito) AS maior,
       c.nome AS cidade
  FROM aluno a
       INNER JOIN
       cidade c ON c.id = a.idcidade
 GROUP BY c.id;
-- ====================================
-- 24) Qual é o menor débito, o maior débito e a média dos débitos
-- dos alunos por cidade, onde o débito está entre R$200,00 e R$850,00? */

SELECT MIN(a.valordebito) AS menor,
       MAX(a.valordebito) AS maior,
       AVG(a.valordebito) AS media,
       c.nome AS cidade
  FROM aluno a
       INNER JOIN
       cidade c ON c.id = a.idcidade
 WHERE a.valordebito BETWEEN 200 AND 850
 GROUP BY c.id;
