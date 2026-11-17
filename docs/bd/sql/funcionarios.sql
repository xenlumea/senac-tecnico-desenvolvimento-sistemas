-- Atividade 1: tabela Funcionario - página 15
-- 1) Exiba o nome e o salário dos funcionários solteiros;
SELECT
  nome,
  vsalario
FROM
  funcionario
WHERE
  estadocivil = "S";

-- ===========================
-- 2) Quais os funcionários recebem mais de 2500 reais, que nasceram em março?
SELECT
  nome,
  vsalario,
  dtnascimento
FROM
  funcionario
WHERE
  vsalario > 2500
  AND strftime ("%m", dtnascimento) = "03";

-- ===========================
-- 3) Quem possui o sobrenome SANTOS?
SELECT
  nome
FROM
  funcionario
WHERE
  nome LIKE "% SANTOS%";

-- ===========================
-- 4) Quais os funcionários cujo nome inicia com MA e recebem menos de 5000 reais?
SELECT
  nome,
  vsalario
FROM
  funcionario
WHERE
  vsalario < 5000
  AND nome LIKE "MA%";

-- ===========================
-- 5) Quais são os funcionários solteiros que recebem salário entre 4900 e 7000, inclusive?
SELECT
  nome,
  vsalario,
  estadocivil
FROM
  funcionario
WHERE
  (estadocivil = "S")
  AND (vsalario BETWEEN 4900 AND 7000);

-- ===========================
-- 6)Exiba o nome e a metade do salário dos funcionários; altere o nome da segunda coluna para Adiantamento.
SELECT
  nome,
  vsalario,
  vsalario / 2 AS adiantamento
FROM
  funcionario;

-- ===========================
-- 7)Exiba o nome, o estado civil e o salário com um aumento de 5%. Mude o nome desta coluna para NovoSalario.
SELECT
  nome,
  vsalario,
  vsalario * 1.05 AS novosalario,
  estadocivil
FROM
  funcionario;

-- ===========================
-- 8)Exiba o nome, o salário, o valor de 8,5% do salário (com o nome INSS)
-- e o salário com desconto de 8,5% (com o nome Liquido) só para solteiros.
SELECT
  nome,
  vsalario,
  vsalario * (8.5 / 100) AS inss,
  vsalario * (1 - 8.5 / 100) AS liquido,
  estadocivil
FROM
  funcionario
WHERE
  estadocivil = "S";

-- ===========================
-- 9)Exiba o nome, o ano de nascimento (com o nome Nascimento) e o salário somado a 45 reais
-- (com o nome MaisBonus) para quem nasceu antes de 1975.
SELECT
  nome,
  strftime ("%Y", dtnascimento) AS nascimento,
  vsalario + 45 AS maisbonus
FROM
  funcionario
WHERE
  nascimento < "1975";

-- ======================================
-- 10)Exiba o nome,o dia e o mês de nascimento (cada um em uma coluna)
-- e um terço do salário (com o nome da coluna Pensao) para quem é estado civil casado.
SELECT
  nome,
  strftime ("%d", dtnascimento) AS dia_nasc,
  strftime ("%m", dtnascimento) AS mes_nasc,
  vsalario / 3 AS pensao,
  estadocivil
FROM
  funcionario
WHERE
  estadocivil = "C";

-- ============== Com group by:=======
-- 11) Exiba o nome da cidade e a quantidade de funcionários por cidade.
SELECT
  COUNT(*) AS numero_funcionarios,
  c.nome AS cidade
FROM
  funcionario f
  INNER JOIN cidade c ON c.id = f.idcidade
GROUP BY
  c.id;

-- ===================
-- 12) Exiba o nome do estado e a média do salário por estado.
SELECT
  AVG(f.vsalario) AS media_estadual,
  e.nome AS estado
FROM
  funcionario f
  INNER JOIN cidade c ON c.id = f.idcidade
  INNER JOIN estado e ON c.idestado = e.id
GROUP BY
  e.id;

-- ===================
-- 13) Na tabela cargo tem o campo nivel. Exiba o nome do nível, a soma e a média dos salários por nível.
SELECT
  SUM(f.vsalario) AS soma,
  AVG(f.vsalario) AS media,
  c.nivel
FROM
  funcionario f
  INNER JOIN cargo c ON f.idcargo = c.id
GROUP BY
  c.nivel;

-- ===================
-- 14) Exiba o nome da região, o nome da cidade e a quantidade de funcionários.
SELECT
  COUNT(*) AS qtd_funcionarios,
  c.nome AS cidade,
  r.nome AS regiao
FROM
  funcionario f
  INNER JOIN cidade c ON f.idcidade = c.id
  INNER JOIN regiao r ON c.idregiao = r.id
GROUP BY
  cidade,
  regiao;

/* SELECT
COUNT(*) AS qtd_funcionarios,
c.nome AS cidade,
r.nome AS regiao
FROM
funcionario f
INNER JOIN cidade c ON f.idcidade = c.id
INNER JOIN regiao r ON c.idregiao = r.id
GROUP BY
c.id; */
-- ===================
-- 15) Acrescente na resposta do 14 para contar somente os funcionários que recebem menos de 10.000;
SELECT
  COUNT(*) AS qtd_funcionarios,
  c.nome AS cidade,
  r.nome AS regiao
FROM
  funcionario f
  INNER JOIN cidade c ON f.idcidade = c.id
  INNER JOIN regiao r ON c.idregiao = r.id
WHERE
  f.vsalario < 10000
GROUP BY
  cidade,
  regiao;

-- ===================
-- 16) Quantas cidades existem por uf? exiba em ordem de quantidade decrescente
SELECT
  COUNT(*) AS qtd_cidades,
  e.nome
FROM
  cidade c
  INNER JOIN estado e ON c.idestado = e.id
GROUP BY
  e.id
ORDER BY
  qtd_cidades;

-- ===================
-- 17) Quantas cidades existem por região? exiba em ordem alfabética da região
SELECT
  COUNT(*) AS qtd_cidades,
  r.nome AS regiao
FROM
  cidade f
  INNER JOIN regiao r ON c.idregiao = r.id
GROUP BY
  r.id
ORDER BY
  regiao;
