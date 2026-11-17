-- 01. Exiba as cidades com população maior que 500000 habitantes
SELECT
  *
FROM
  cidade
WHERE
  populacao > 500000;

-- =======================
-- 02. Exiba as cidades do estado 4
SELECT
  *
FROM
  cidade
WHERE
  idestado = 4;

-- =======================
-- 03. Exiba as cidades que começam com a letra V
SELECT
  *
FROM
  cidade
WHERE
  nome LIKE 'V%';

-- =======================
-- 04. Quais são as cidades que possuem população de 200000 a 550000 pessoas
SELECT
  *
FROM
  cidade
WHERE
  populacao BETWEEN 200000 AND 550000;

-- =======================
-- 05. Quais são as cidades que possuem LA em qualquer parte do nome
SELECT
  *
FROM
  cidade
WHERE
  nome LIKE "%LA%";

-- =======================
-- 06. Exiba as cidades em ordem alfabética
SELECT
  id,
  nome,
  idestado
FROM
  cidade
ORDER BY
  2;

-- =======================
-- 07. Exiba as cidades em ordem de estado e população
SELECT
  *
FROM
  cidade
ORDER BY
  idestado,
  populacao;

-- =======================
-- 08. Exiba as cidades em ordem decrescente de estado e alfabética
SELECT
  *
FROM
  cidade
ORDER BY
  idestado DESC,
  nome;

-- =======================
-- 09. Exiba o nome e a população das cidades em ordem decrescente de população
SELECT
  nome,
  populacao
FROM
  cidade
ORDER BY
  populacao DESC;
