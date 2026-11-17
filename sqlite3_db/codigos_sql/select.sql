SELECT
  *
FROM
  cliente
WHERE
  valorcredito BETWEEN 3000 AND 3500;

-- ORDER BY VALORCREDITO ASC;
SELECT
  *
FROM
  cliente
WHERE
  idcidade = 3
  OR idcidade = 19;

SELECT
  *
FROM
  cliente
ORDER BY
  idcidade ASC,
  valorcredito DESC;

SELECT
  *
FROM
  cliente
WHERE
  strftime ("%m", datanascimento) = "07";

SELECT
  *
FROM
  cliente
WHERE
  strftime ("%Y", datanascimento) BETWEEN "1980" AND "1989"
ORDER BY
  datanascimento;

SELECT
  nome,
  datanascimento,
  valorcredito / 2 AS metade
FROM
  cliente
WHERE
  strftime ("%Y", datanascimento) BETWEEN "1980" AND "1989"
ORDER BY
  2;
