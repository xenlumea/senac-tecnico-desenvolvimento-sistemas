const atividades = {
    perguntas: {
        1: '1) Exiba o nome e o salário dos funcionários solteiros',
        2: '2) Quais os funcionários recebem mais de 2500 reais, que nasceram em março?',
        3: '3) Quem possui o sobrenome SANTOS?',
        4: '4) Quais os funcionários cujo nome inicia com MA e recebem menos de 5000 reais?',
        5: '5) Quais são os funcionários solteiros que recebem salário entre 4900 e 7000, inclusive?',
        6: '6) Exiba o nome e a metade do salário dos funcionários; altere o nome da segunda coluna para Adiantamento.',
        7: '7) Exiba o nome, o estado civil e o salário com um aumento de 5%. Mude o nome desta coluna para NovoSalario.',
        8: '8) Exiba o nome, o salário, o valor de 8,5% do salário (com o nome INSS) e o salário com desconto de 8,5% (com o nome Liquido) só para solteiros.',
        9: '9) Exiba o nome, o ano de nascimento (com o nome Nascimento) e o salário somado a 45 reais (com o nome MaisBonus) para quem nasceu antes de 1975.',
        10: '10) Exiba o nome,o dia e o mês de nascimento (cada um em uma coluna) e um terço do salário (com o nome da coluna Pensao) para quem é estado civil casado.',
        11: '11) Exiba o nome da cidade e a quantidade de funcionários por cidade.',
        12: '12) Exiba o nome do estado e a média do salário por estado.',
        13: '13) Na tabela cargo tem o campo nivel. Exiba o nome do nível, a soma e a média dos salários por nível. ',
        14: '14) Exiba o nome da região, o nome da cidade e a quantidade de funcionários.',
        15: '15) Acrescente na resposta do 14 para contar somente os funcionários que recebem menos de 10.000;',
        16: '16) Quantas cidades existem por uf? exiba em ordem de quantidade decrescente',
        17: '17) Quantas cidades existem por região? exiba em ordem alfabética da região'
    },
    solucoes: {
        1: 'SELECT nome, vsalario FROM funcionario WHERE EstadoCivil = "S";',
        2: 'SELECT nome, vsalario, dtNascimento FROM funcionario WHERE vSalario > 2500 AND strftime("%m", dtNascimento) = "03";',
        3: 'SELECT nome FROM funcionario WHERE nome LIKE "% SANTOS%";',
        4: 'SELECT nome, vSalario FROM funcionario WHERE vSalario < 5000 AND nome LIKE "MA%";',
        5: 'SELECT nome, vSalario, EstadoCivil  FROM funcionario WHERE (EstadoCivil = "S") AND (vSalario BETWEEN 4900 AND 7000);',
        6: 'SELECT nome, vSalario, vSalario / 2 AS Adiantamento FROM funcionario;',
        7: 'SELECT nome, vSalario, vSalario * 1.05 AS NovoSalario, EstadoCivil FROM funcionario;',
        8: 'SELECT nome, vSalario, vSalario * (8.5 / 100) AS INSS, vSalario * (1 - 8.5 / 100) AS LIQUIDO, EstadoCivil FROM funcionario WHERE EstadoCivil = "S";',
        9: 'SELECT nome, strftime("%Y", dtNascimento) AS Nascimento, vSalario + 45 AS MaisBonus FROM funcionario WHERE Nascimento < "1975";',
        10: 'SELECT nome, strftime("%d", dtNascimento) AS dia_nasc, strftime("%m", dtNascimento) AS mes_nasc, vSalario / 3 AS Pensao, EstadoCivil FROM funcionario WHERE EstadoCivil = "C";',
        11: 'SELECT COUNT( * ) AS numero_funcionarios, c.Nome AS cidade FROM funcionario f INNER JOIN cidade c ON c.id = f.idcidade GROUP BY c.id;',
        12: 'SELECT AVG(f.vSalario) AS media_estadual, e.nome AS estado  FROM funcionario f INNER JOIN cidade c ON c.id = f.idcidade INNER JOIN estado e ON c.idestado = e.id GROUP BY e.id;',
        13: 'SELECT SUM(f.vSalario) AS soma, AVG(f.vSalario) AS media, c.Nivel FROM funcionario f INNER JOIN cargo c ON f.idcargo = c.id GROUP BY c.Nivel;',
        14: 'SELECT COUNT( * ) AS qtd_funcionarios, c.nome AS cidade, r.nome AS regiao  FROM funcionario f INNER JOIN cidade c ON f.idcidade = c.id INNER JOIN regiao r ON c.idregiao = r.id GROUP BY cidade, regiao;',
        15: 'SELECT COUNT( * ) AS qtd_funcionarios, c.nome AS cidade, r.nome AS regiao FROM funcionario f INNER JOIN cidade c ON f.idcidade = c.id INNER JOIN regiao r ON c.idregiao = r.id WHERE f.vsalario < 10000 GROUP BY cidade, regiao; ',
        16: 'SELECT COUNT( * ) AS qtd_cidades, e.Nome  FROM cidade c INNER JOIN estado e ON c.idestado = e.id GROUP BY e.id ORDER BY qtd_cidades;',
        17: 'SELECT COUNT( * ) AS qtd_cidades, r.nome AS regiao FROM cidade c INNER JOIN regiao r ON c.idregiao = r.id GROUP BY r.id ORDER BY regiao;'
    }
};

const atividadeElemento = document.getElementById('atividade');
const atividadeContainer = document.getElementById('atividades-container');

function insereAtividadesNaPagina() {
    const documentFragment = document.createDocumentFragment();

    for (let i = 1; i <= 17; i++) {
        const clone = atividadeElemento.cloneNode(true);
        clone.id = 'atividade' + i;

        const clonePerguntaElemento = clone.querySelector('#pergunta');
        const cloneSolucaoElemento = clone.querySelector('#solucao');

        clonePerguntaElemento.id = 'pergunta' + i;
        cloneSolucaoElemento.id = 'solucao' + i;

        clonePerguntaElemento.textContent = atividades.perguntas[i];
        cloneSolucaoElemento.textContent = atividades.solucoes[i];

        documentFragment.appendChild(clone);
    }

    atividadeContainer.appendChild(documentFragment);
}

insereAtividadesNaPagina();
