programa
{
	 /*
		16)  Faça um algoritmo que leia o salário de um funcionário. 
		Exiba 8% se o salário for menor que 500 reais, exiba 9% se o salário é de 500 reais a 1000 reais;
		exiba 10% se o salário for maior que 1000 reais.

	 */
	
	funcao inicio()
	{	
		real salario, valor
		escreva("Digite o salário: " )
		leia(salario)
		
		se(salario < 500){
			escreva("8%")
			valor = salario * 0.08
		} senao se( salario <= 1000 ){
			escreva("9%")
			valor = salario * 0.09
		}senao{
			escreva("10%")
			valor = salario * 0.10
		}

		escreva("Valor = ", valor)
		
		
		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 527; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */