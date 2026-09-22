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

		logico a_vista = opcao_digitada == 'V' ou opcao_digitada == 'v'
		logico a_prazo = opcao_digitada == 'P' ou opcao_digitada == 'p'

		se((a_vista ou a_prazo) == falso){
			escreva("Opção invaliada")
		} senao {
			se (a_vista == verdadeiro){
			escreva("Opção à vista selecionada.")
			} senao {
			escreva("Opção à prazo selecionada.")
			}
		}
		



	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 451; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */