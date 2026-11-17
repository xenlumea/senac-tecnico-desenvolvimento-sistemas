UPDATE funcionarios
SET
  idcargos = cargos.id
FROM
  cargos
WHERE
  funcionarios.codcargo = cargos.codcargo;

SELECT
  funcionarios.id,
  funcionarios.nome,
  funcionarios.codcargo AS f_codcargo,
  funcionarios.idcargos,
  cargos.codcargo,
  cargos.id AS c_codcargos
FROM
  funcionarios
  INNER JOIN cargos ON cargos.codcargo = funcionarios.codcargo
ORDER BY
  cargos.id
