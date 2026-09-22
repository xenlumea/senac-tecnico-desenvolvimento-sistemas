programa
{
	 /*
	 9) Faça um algoritmo que leia dois números. Calcule e exiba a soma dos números. 
	 Exiba “Maior que 10” se este número for maior que 10.
	 */
	
	funcao inicio()
	{
		inteiro numero1, numero2, soma
		
		escreva("Digite um número: ")
		leia(numero1)

		escreva("Digite outro número: ")
		leia(numero2)

		soma = numero1 + numero2
		escreva("Soma dos números = ", soma, "\n")

		se(soma > 10){
			escreva("Maior a 10.\n")
		}
	 
	}
}

/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 449; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */