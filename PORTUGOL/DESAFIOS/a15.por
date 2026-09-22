programa
{
	 /*
		15)  Faça um algoritmo que leia a temperatura da água.
		Se a temperatura estiver menor que 0º exiba “sólido”, senão se for de 0º a 46º exiba “líquido” senão exiba “gasoso”.

	 */
	
	funcao inicio()
	{	
		real temperatura
		escreva("Digite a temperatura da água: ")
		leia(temperatura)

		se(temperatura < 0){
			escreva("Sólido")
		}senao se (temperatura < 46){
			escreva("Líquido")
		}senao{
			escreva("Gasoso")
		}
		
		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 303; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */