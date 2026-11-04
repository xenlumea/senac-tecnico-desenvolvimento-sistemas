UPDATE Funcionarios
   SET idcargos = cargos.id
  FROM cargos
 WHERE Funcionarios.codcargo = Cargos.CodCargo;

SELECT Funcionarios.id, funcionarios.Nome,
       Funcionarios.codcargo AS f_codcargo,
       Funcionarios.idcargos,
       Cargos.CodCargo,
       cargos.id AS c_codcargos
  FROM Funcionarios
       INNER JOIN
       Cargos ON cargos.CodCargo = Funcionarios.codcargo order by cargos.id 
