-- 10. Exiba todos os clientes
SELECT
  *
FROM
  cliente;


-- 11. Exiba todos os clientes em ordem alfabética
SELECT
  *
FROM
  cliente
ORDER BY
  nome;


-- 12. Exiba todos os clientes em ordem de cidade e depois alfabética
SELECT
  *
FROM
  cliente
ORDER BY
  idcidade,
  nome;


-- 13. Exiba os clientes com saldo maior que 20 mil
SELECT
  *
FROM
  cliente
WHERE
  saldo > 20000;


-- 14. Exiba os clientes com saldo de 15000 a 20000
SELECT
  *
FROM
  cliente
WHERE
  saldo BETWEEN 15000 AND 20000;


-- 15. Exiba os clientes com saldo de 15000 a 20000 com nome que começa com ANA
SELECT
  *
FROM
  cliente
WHERE
  (saldo BETWEEN 15000 AND 20000)
  AND (nome LIKE "ANA%");


-- 16. Exiba o nome do cliente e o nome das cidades 1, 4 ou 6
SELECT
  cliente.nome,
  cliente.idcidade,
  cidade.nome
FROM
  cliente
  INNER JOIN cidade ON cidade.id = cliente.idcidade
WHERE
  cliente.idcidade IN (1, 4, 6);


-- ===================
