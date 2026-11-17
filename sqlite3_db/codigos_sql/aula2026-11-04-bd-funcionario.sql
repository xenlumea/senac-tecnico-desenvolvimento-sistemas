SELECT
  *
FROM
  funcionario;

-- ==============================
SELECT
  c.nome cidade,
  e.nome estado,
  e.uf sigla
FROM
  cidade c
  INNER JOIN estado e ON e.id = c.idestado;

-- ==============================
SELECT
  f.nome funcionario,
  c.nome cidade,
  ca.area area
FROM
  funcionario f
  INNER JOIN cidade c ON c.id = f.idcidade
  INNER JOIN cargo ca ON ca.id = f.idcargo;

-- ==============================
SELECT
  e.nome estado,
  c.nome cidade,
  r.nome regiao
FROM
  estado e
  INNER JOIN cidade c ON e.id = c.idestado
  INNER JOIN regiao r ON r.id = c.idregiao;

-- =============================
SELECT
  COUNT(*),
  SUM(vsalario),
  AVG(vsalario),
  MAX(vsalario),
  MIN(vsalario)
FROM
  funcionario
WHERE
  estadocivil = "C";

-- =============================
SELECT
  COUNT(*),
  SUM(vsalario),
  AVG(vsalario),
  MAX(vsalario),
  MIN(vsalario)
FROM
  funcionario
WHERE
  estadocivil = "S";

-- =============================
SELECT
  COUNT(*),
  estadocivil
FROM
  funcionario
GROUP BY
  estadocivil;

-- ============================
SELECT
  COUNT(c.idestado) AS qtd_cidades,
  uf
FROM
  cidade c
GROUP BY
  c.idestado;

-- ============================
SELECT
  SUM(vsalario) AS soma_dos_salarios,
  codcargo
FROM
  funcionario
GROUP BY
  codcargo;

-- ===================
SELECT
  COUNT(*) AS qtd_funcionarios,
  c.nome cidade
FROM
  funcionario f
  INNER JOIN cidade c ON f.idcidade = c.id
GROUP BY
  c.id;

-- ===================
SELECT
  strftime ("%m", dtnascimento) AS mes,
  SUM(vsalario)
FROM
  funcionario
GROUP BY
  1;
