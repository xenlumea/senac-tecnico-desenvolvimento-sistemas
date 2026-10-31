SELECT
  * -- 01. Exiba as cidades com população maior que 500000 habitantes
FROM
  cidade
WHERE
  populacao > 500000;


-- =======================
-- =======================
SELECT
  * -- 02. Exiba as cidades do estado 4
FROM
  cidade
WHERE
  idestado = 4;


-- =======================
-- =======================
SELECT
  * -- 03. Exiba as cidades que começam com a letra V
FROM
  cidade
WHERE
  nome LIKE 'V%';


-- =======================
-- =======================
SELECT
  * -- 04. Quais são as cidades que possuem população de 200000 a 550000 pessoas
FROM
  cidade
WHERE
  POPULACAO BETWEEN 200000 AND 550000;


-- =======================
-- =======================
SELECT
  * -- 05. Quais são as cidades que possuem LA em qualquer parte do nome
FROM
  cidade
WHERE
  NOME LIKE "%LA%";


-- =======================
-- =======================
SELECT
  id,
  nome,
  idestado -- 06. Exiba as cidades em ordem alfabética
FROM
  cidade
ORDER BY
  2;


-- =======================
-- =======================
SELECT
  * -- 07. Exiba as cidades em ordem de estado e população
FROM
  cidade
ORDER BY
  idestado,
  populacao;


-- =======================
-- =======================
SELECT
  * -- 08. Exiba as cidades em ordem decrescente de estado e alfabética
FROM
  cidade
ORDER BY
  idestado DESC,
  nome;


-- =======================
-- =======================
SELECT
  nome,
  populacao -- 09. Exiba o nome e a população das cidades em ordem decrescente de população
FROM
  cidade
ORDER BY
  populacao DESC;
