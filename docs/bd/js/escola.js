const atividades = {
    perguntas: {
        1: '1) Selecione todos os alunos e todos os campos (Select * from aluno).',
        2: '2) Quais são os alunos da cidade 1?',
        3: '3) Quais são os alunos em débito, que possuem menos de 500 reais devedores?',
        4: '4) Quais são os alunos do turno Vespertino?',
        5: '5) Quais são os alunos das cidades 1 ou 4?',
        6: '6) Quais são os alunos onde o nome começa com E?',
        7: '7) Selecione somente o nome dos alunos do sexo feminino.',
        8: '8) Quais são os alunos da cidade 1 que estudam à noite?',
        9: "9) Qual é o nome, a cidade, o débito e o sexo dos alunos do turno matutino (valor 'M')?",
        10: '10) Quais são as alunas(sexo feminino) que nasceram em Outubro ?',
        11: '11) Quem nasceu antes de 2005?',
        12: '12) Quantos alunos estão cadastrados na tabela?',
        13: '13)Qual é a média do valor de débitos dos alunos, apenas para os alunos que devem alguma coisa?',
        14: '14) Qual é a média do valor de débitos das mulheres, só pra quem deve?',
        15: '15) Qual é o valor do maior e do menor débito, sem contar os alunos que não devem nada?',
        16: '16) Qual é a quantidade de alunos por cidade?',
        17: '17) Qual é a quantidade de alunos por sexo?',
        18: '18) Quantas mulheres estão estudando por turno?',
        19: '19) Qual é a soma de débitos dos alunos por cidade?',
        20: '20) Qual é a soma de débitos dos alunos por turno?',
        21: '21) Quantos alunos, por sexo e turno, possuem o nome com a 2° letra igual a "A"?',
        22: '22) Qual é a soma de débitos por turno apenas dos alunos nascidos em maio?',
        23: '23) Qual é o maior débito de alunos por cidade?',
        24: '24) Qual é o menor débito, o maior débito e a média dos débitos dos alunos por cidade, onde o débito está entre R$200,00 e R$850,00?'
    },
    solucoes: {
        1: 'SELECT * FROM aluno;',
        2: 'SELECT * FROM aluno WHERE idcidade = 1;',
        3: 'SELECT * FROM aluno WHERE valordebito > 0 AND valordebito < 500;',
        4: 'SELECT * FROM aluno WHERE turno = "V";',
        5: 'SELECT * FROM aluno WHERE idcidade IN (1, 4);',
        6: 'SELECT * FROM aluno WHERE nome LIKE "E%";',
        7: 'SELECT nome FROM aluno WHERE sexo = "F";',
        8: 'SELECT * FROM aluno WHERE idcidade = 1 AND turno = "N";',
        9: 'SELECT a.nome, c.nome AS cidade, a.valordebito, a.sexo FROM aluno a INNER JOIN cidade c ON c.id = a.idcidade WHERE turno = "M";',
        10: 'SELECT nome, sexo, datanascimento FROM aluno WHERE sexo = "F" AND strftime("%m", datanascimento) = "10";',
        11: 'SELECT *  FROM aluno WHERE strftime("%Y", datanascimento) < "2005";',
        12: 'SELECT COUNT( * ) AS num_alunos FROM aluno;',
        13: 'SELECT AVG(valordebito) AS media_debito FROM aluno WHERE valordebito > 0;',
        14: 'SELECT AVG(valordebito) AS media_debito FROM aluno WHERE sexo = "F" AND valordebito > 0;',
        15: 'SELECT MAX(valordebito) AS maior, MIN(valordebito) AS menor  FROM aluno WHERE valordebito > 0;',
        16: 'SELECT COUNT( * ) AS qtd_alunos, c.nome AS cidade  FROM aluno a INNER JOIN cidade c ON a.idcidade = c.id GROUP BY idcidade;',
        17: 'SELECT COUNT( * ) AS qtd_alunos, sexo  FROM aluno GROUP BY sexo;',
        18: 'SELECT COUNT( * ) AS qtd_alunos, sexo, turno  FROM aluno GROUP BY sexo, turno;',
        19: 'SELECT SUM(a.valordebito) AS valor_debito, c.nome AS cidade FROM aluno a INNER JOIN cidade c ON a.idcidade = c.id GROUP BY idcidade;',
        20: 'SELECT SUM(valordebito) AS valor_debito, turno FROM aluno GROUP BY turno;',
        21: 'SELECT COUNT( * ) AS qtd_alunos, sexo, turno  FROM aluno WHERE nome LIKE "_A%" GROUP BY sexo, turno;',
        22: 'SELECT SUM(valordebito) AS total_por_turno, turno FROM aluno WHERE strftime("%m", datanascimento) = "05" GROUP BY turno;',
        23: 'SELECT MAX(a.valordebito) AS maior, c.nome AS cidade  FROM aluno a INNER JOIN cidade c ON c.id = a.idcidade GROUP BY c.id;',
        24: 'SELECT MIN(a.valordebito) AS menor, MAX(a.valordebito) AS maior, AVG(a.valordebito) AS media, c.nome AS cidade  FROM aluno a INNER JOIN cidade c ON c.id = a.idcidade WHERE a.valordebito BETWEEN 200 AND 850 GROUP BY c.id;'
    }
};

const atividadeElemento = document.getElementById('atividade');
const atividadeContainer = document.getElementById('atividades-container');

function insereAtividadesNaPagina() {
    const documentFragment = document.createDocumentFragment();

    for (let i = 1; i <= 24; i++) {
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
