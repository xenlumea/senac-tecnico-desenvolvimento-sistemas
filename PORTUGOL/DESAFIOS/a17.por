programa
{
	 /*
	17)  Faça um algoritmo que leia o valor do computador e o tipo (“D” para desktop e “N” para Notebook). 
	Se o tipo de computador é Notebook exiba “Produto Caro”, calcule e exiba o valor do computador em 3 parcelas.
	Se o tipo de computador é desktop divida o valor em 6 parcelas e exiba o valor da parcela.

	 */
	
	funcao inicio()
	{	
		caracter tipo_computador
		real preco_computador, valor_parcela = 0.0

		escreva("Digite o valor do computador: ")
		leia(preco_computador)

		escreva("Digite o tipo de compuador. N para NOTEBOOK ou D para DESKTOP: ")
		leia(tipo_computador)

		se(tipo_computador == 'D' ou tipo_computador == 'd'){
			valor_parcela = preco_computador / 6.0
			escreva("Desktop. ")
		} senao se(tipo_computador == 'n' ou tipo_computador == 'N'){
			valor_parcela = preco_computador / 3.0
			escreva("Produto caro. ")
		}
		escreva("Valor da parcela R$ ", valor_parcela)
		
		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 929; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */