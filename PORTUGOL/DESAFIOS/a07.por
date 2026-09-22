programa
{
	 /*
	  7) Faça um algoritmo que leia o tipo de pagamento (informar a letra “v” ou “p”): 
	  se for igual a “v” exiba “A Vista”, 
	  senão exiba “A Prazo”.
	  */
	
	funcao inicio()
	{
		caracter opcao_digitada
		
		escreva("Digite a forma de pagamento\n")
		escreva("V para à vista\n")
		escreva("P para à prazo\n")
		escreva("Opção (V ou P): ")

		leia(opcao_digitada)
 
		se(opcao_digitada == 'V' ){
			escreva("Opção à vista selecionada.")
		}

		se(opcao_digitada == 'v' ){
			escreva("Opção à vista selecionada.")
		}

		se(opcao_digitada == 'P' ){
			escreva("Opção à prazo selecionada.")
		}
	
		se(opcao_digitada == 'p' ){
			escreva("Opção à prazo selecionada.")
		}

		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 534; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */