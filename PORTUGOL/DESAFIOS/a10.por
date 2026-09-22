programa
{
	 /*
	10)  Faça um algoritmo que leia dois números. 
	Calcule o maior dos números lidos e o exiba na tela. 
	Exiba “Maior número é maior que 5” se o maior número for maior que 5.

	 */
	
	funcao inicio()
	{
		inteiro numero1, numero2, maior
		
		escreva("Digite um número: ")
		leia(numero1)

		maior = numero1 
		
		escreva("Digite outro número: ")
		leia(numero2)

		se(numero1 > numero2){
			maior = numero1
		}

		se(numero1 < numero2){
			maior = numero2
		}

		escreva("O maior número = ", maior, "\n")

		se(maior > 5 ){
			escreva("Maior número é maior que 5")
		}
	 
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 516; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */