/* EXERCICIOS FUNCIONÁRIO BUSCA Banco de Dados Funcionarios - Facin kinem doce de leite com queijo.
   https://app.curtaaulacurta.com.br/sql/index.html */
-- 1. Exiba todos os dados dos funcionarios.
SELECT *
  FROM Funcionarios;
-- ===================
-- 2. Exiba o nome, a data de nascimento, o estado civil e o salário do funcionário.

SELECT nome,
       dtNascimento,
       EstadoCivil,
       vsalario
  FROM Funcionarios;
-- ===================
-- 3. Exiba o nome e o salário do funcionário em ordem alfabética.

SELECT nome,
       vsalario
  FROM Funcionarios
 ORDER BY nome;
-- ===================
-- 4. Exiba os funcionários casados.

SELECT nome,
       EstadoCivil
  FROM Funcionarios
 WHERE EstadoCivil = 'C';
-- ===================
-- 5. Exiba os funcionários casados que recebem mais de 20 mil reais.

SELECT nome,
       EstadoCivil,
       vSalario
  FROM Funcionarios
 WHERE EstadoCivil = 'C' AND
       vSalario > 20000;
-- ===================
-- 6. Exiba os funcionários casados que recebem mais de 20 mil reais que nasceram antes de 1980.

SELECT nome,
       EstadoCivil,
       vSalario,
       dtNascimento
  FROM Funcionarios
 WHERE EstadoCivil = 'C' AND
       vSalario > 20000 AND
       strftime("%Y", dtNascimento) < "1980";
-- ===================
-- 7. Exiba os funcionários que possuem SANTOS em algum lugar no nome.

SELECT nome
  FROM Funcionarios
 WHERE NOME LIKE "%SANTOS%";
-- ===================
-- 8. Exiba os funcionários com o cargo ADI ou OPI.

SELECT fUNCIONARIOS.nome,
       CARGOS.CodCargo
  FROM Funcionarios
       INNER JOIN
       CARGOS ON FUNCIONARIOS.IDCARGO = CARGOS.CodCargo
 WHERE CARGOS.CodCargo IN ("ADI", "OPI");
-- ===================
-- 9. Exiba os funcionários com salário de 20 mil a 25 mil.

SELECT nome,
       vSalario
  FROM Funcionarios
 WHERE vSalario BETWEEN 20000 AND 25000;
-- ===================
/* 10.Exiba o nome, data de nascimento, salário e cargo dos funcionários nascidos no primeiro semestre, 
   recebem menos de 15 mil reais e o cargo começa com AD. */

SELECT Funcionarios.nome,
       Funcionarios.dtNascimento,
       Funcionarios.vSalario,
       CARGOS.CodCargo
  FROM Funcionarios
       INNER JOIN
       CARGOS ON FUNCIONARIOS.IDCARGO = CARGOS.CodCargo
 WHERE strftime("%m", dtNascimento) < "07" AND
       vSalario < 15000 AND
       idcargo LIKE "AD%";
-- ===================
