-- 17. Exiba quantos clientes por cidade estão cadastrados. Exiba o nome da cidade
SELECT
  COUNT(*) numero_de_clientes,
  idcidade
FROM
  cliente
GROUP BY
  idcidade;


-- 18. Exiba quantos clientes por estado. Exiba a sigla
SELECT
  COUNT(*) AS total_clientes,
  estado.sigla
FROM
  cliente
  INNER JOIN cidade ON cliente.idcidade = cidade.id
  INNER JOIN estado ON cidade.idestado = estado.id
GROUP BY
  estado.sigla
ORDER BY
  total_clientes;


-- 19. Exiba os aniversariantes de fevereiro e março
SELECT
  *,
  strftime ("%m", dtnascimento) AS mes
FROM
  cliente
WHERE
  strftime ("%m", dtnascimento) IN ("02", "03")
ORDER BY
  mes;


-- 20. Exiba os aniversariantes de abril, agosto ou novembro
SELECT
  *,
  strftime ("%m", dtnascimento) AS mes
FROM
  cliente
WHERE
  strftime ("%m", dtnascimento) IN ("04", "08", "11")
ORDER BY
  mes;


-- 21. Qual é a soma do valor a pagar dos recebimentos vendidos em janeiro de 2021?
SELECT
  SUM(valorpagar) AS total_janeiro
FROM
  recebimento
WHERE
  strftime ("%Y-%m", DTVENDA) = "2021-01";


-- 22. Qual é média do valor a pagar e quantos recebimentos gerados com venda em março e abril de 2021?
SELECT
  COUNT(*) AS quantidade,
  AVG(valorpagar) AS media
FROM
  recebimento
WHERE
  strftime ("%Y-%m", DTVENDA) = "2021-03"
  OR strftime ("%Y-%m", DTVENDA) = "2021-04";


-- 23. Qual é a soma dos recebimentos em DINHEIRO, CARTAO DE CREDITO e DUPLICATA em abril e maio de 2021?
SELECT
  SUM(recebimento.VALORPAGAR) AS soma_recebimentos,
  tipopagto.nome
FROM
  recebimento
  INNER JOIN tipopagto ON RECEBIMENTO.IDTIPOPAGTO = tipopagto.id
WHERE
  (RECEBIMENTO.IDTIPOPAGTO IN (1, 4, 6))
  AND (
    strftime ("%Y-%m", DTVENDA) = "2021-04"
    OR strftime ("%Y-%m", DTVENDA) = "2021-05"
  )
GROUP BY
  tipopagto.id;


-- 24. Qual é o nome dos clientes e a soma a pagar dos devedores na segunda quinzena de agosto de 2021?
SELECT
  cliente.nome,
  SUM(recebimento.VALORPAGAR)
FROM
  cliente
  INNER JOIN recebimento ON cliente.id = recebimento.IDCLIENTE
WHERE
  strftime ("%Y-%m", DTVENDA) = "2021-08"
  AND strftime ("%d", DTVENDA) >= "15"
GROUP BY
  recebimento.idcliente;
