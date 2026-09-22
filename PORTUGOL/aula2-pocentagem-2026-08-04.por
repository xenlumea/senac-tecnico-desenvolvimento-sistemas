programa
{
	
	funcao inicio()
	{
	
		real valor_do_produto, porcentagem_de_desconto, valor_a_pagar, valor_desconto
				
		escreva("Digite o valor do produto: ")
		leia(valor_do_produto)
		
		escreva("Digite o valor da porcentagem de desconto: ")
		leia(porcentagem_de_desconto)

		// valor_a_pagar = valor_do_produto * (1 - porcentagem_de_desconto/100)

		valor_desconto = valor_do_produto * porcentagem_de_desconto/100
		escreva("O valor do desconto é R$ ", valor_desconto , "\n")
		
		valor_a_pagar = valor_do_produto  - valor_desconto
		escreva("O valor final à pagar é igual a R$ ", valor_a_pagar, "\n")
		
		
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 301; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */