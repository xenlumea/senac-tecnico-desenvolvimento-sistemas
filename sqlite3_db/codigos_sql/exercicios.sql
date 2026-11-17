-- Atividade 1: tabela Funcionario - página 15
-- 1) Exiba o nome e o salário dos funcionários solteiros;
SELECT
  nome,
  vsalario
FROM
  funcionario
WHERE
  estadocivil = "S";
