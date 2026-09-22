programa
{
	 /*
	18)  Faça um algoritmo que leia o salário do funcionário. 
	Se o salário é menor que 1000 reais, aumente 10% neste salário, 
	senão se é de 1000 a 2000 reais calcule quanto é 15% deste salário 
	senão calcule o salário líquido descontando 8% de INSS.
	Exiba o salário calculado no final. Use SE...FIM-SE. Depois desenvolva com SE...SENÃO...FIM-SE.
	 */
	
	funcao inicio()
	{	
		real salario, valor15, liquido
		
		leia (salario)
		
		 se(salario < 1000){
		 	salario *= 1.1
		 	escreva("Salário + 10% = ", salario)
		 } senao{	
		 	se (salario <= 2000){
		 		valor15 = salario * 0.15
		 		escreva("15% o salario = ", valor15)
		 	}senao{
		 		liquido = salario * 0.92
		 		escreva("Salário líquido = ", liquido)
		 	}
		}
			
		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 687; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */