/* EXERCICIOS FUNCIONÁRIO BUSCA Banco de Dados Funcionarios - Facin kinem doce de leite com queijo.
https://app.curtaaulacurta.com.br/sql/index.html */
-- 1. Exiba todos os dados dos funcionarios.
SELECT
  *
FROM
  funcionarios;

-- ===================
-- 2. Exiba o nome, a data de nascimento, o estado civil e o salário do funcionário.
SELECT
  nome,
  dtnascimento,
  estadocivil,
  vsalario
FROM
  funcionarios;

-- ===================
-- 3. Exiba o nome e o salário do funcionário em ordem alfabética.
SELECT
  nome,
  vsalario
FROM
  funcionarios
ORDER BY
  nome;

-- ===================
-- 4. Exiba os funcionários casados.
SELECT
  nome,
  estadocivil
FROM
  funcionarios
WHERE
  estadocivil = 'C';

-- ===================
-- 5. Exiba os funcionários casados que recebem mais de 20 mil reais.
SELECT
  nome,
  estadocivil,
  vsalario
FROM
  funcionarios
WHERE
  estadocivil = 'C'
  AND vsalario > 20000;

-- ===================
-- 6. Exiba os funcionários casados que recebem mais de 20 mil reais que nasceram antes de 1980.
SELECT
  nome,
  estadocivil,
  vsalario,
  dtnascimento
FROM
  funcionarios
WHERE
  estadocivil = 'C'
  AND vsalario > 20000
  AND strftime ("%Y", dtnascimento) < "1980";

-- ===================
-- 7. Exiba os funcionários que possuem SANTOS em algum lugar no nome.
SELECT
  nome
FROM
  funcionarios
WHERE
  nome LIKE "%SANTOS%";

-- ===================
-- 8. Exiba os funcionários com o cargo ADI ou OPI.
SELECT
  funcionarios.nome,
  cargos.codcargo
FROM
  funcionarios
  INNER JOIN cargos ON funcionarios.idcargo = cargos.codcargo
WHERE
  cargos.codcargo IN ("ADI", "OPI");

-- ===================
-- 9. Exiba os funcionários com salário de 20 mil a 25 mil.
SELECT
  nome,
  vsalario
FROM
  funcionarios
WHERE
  vsalario BETWEEN 20000 AND 25000;

-- ===================
/* 10.Exiba o nome, data de nascimento, salário e cargo dos funcionários nascidos no primeiro semestre,
recebem menos de 15 mil reais e o cargo começa com AD. */
SELECT
  funcionarios.nome,
  funcionarios.dtnascimento,
  funcionarios.vsalario,
  cargos.codcargo
FROM
  funcionarios
  INNER JOIN cargos ON funcionarios.idcargo = cargos.codcargo
WHERE
  strftime ("%m", dtnascimento) < "07"
  AND vsalario < 15000
  AND idcargo LIKE "AD%";

-- ===================
