programa
{
	/*
	
	51) Faça um programa que exiba “Curso Técnico - SENAC”

	52) Complemente o programa acima:
	Leia o código da turma e crie a frase:
	“Informática - Turma número: “ + o código da turma lido.

	53) Complemente o programa: 
	Leia quantos alunos são presenciais e online. Calcule a soma das duas quantidades e exiba:
	“Total de Alunos: “ + a soma das quantidades.
	 
	 */
	
	funcao inicio()
	{	
		inteiro codigo_turma, qtd_alunos_presenciais, qtd_alunos_online, total_alunos

		escreva("Curso Técnico - SENAC \n")
		
		escreva("Digite o código da turma: ")
		leia(codigo_turma)
		
		escreva("Informática - Turma número: ", codigo_turma, "\n")

		escreva("Infome o número de alunos na modalidade presencial: ")
		leia(qtd_alunos_presenciais)
		
		escreva("Infome o número de alunos na modalidade online: ")
		leia(qtd_alunos_online)

		total_alunos = qtd_alunos_online + qtd_alunos_presenciais
		escreva("O total de alunos é igual a ", total_alunos)
		
		 
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 964; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */