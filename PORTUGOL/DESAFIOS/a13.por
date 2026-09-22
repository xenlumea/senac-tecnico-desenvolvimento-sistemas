programa
{
	 /*
	 13)  Faça um algoritmo que leia dois números. 
	 Calcule a média dos dois números e exiba “Menor que 6” se a média for menor que 6; 
	 exiba “Maior que 6” se a média for maior que 6; 
	 exiba “Igual a 6” se a média for igual a 6.
	 */
	
	funcao inicio()
	{
		real  numero1, numero2, media

		escreva("Informe um número: ")
		leia(numero1) 
		escreva("Informe outro número: ")
		leia(numero2) 

		media = (numero1 + numero2) / 2

		se ( media < 6){
			escreva("Menor que 6")
		} senao {
			se ( media > 6){
				escreva("Maior que 6")
			}senao{
				escreva("Igual a 6")
			}
		}
	}
}

/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 601; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */