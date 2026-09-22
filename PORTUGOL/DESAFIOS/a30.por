programa
{
	/*
	30) Faça um algoritmo que leia o valor unitário de 10 produtos. Calcule e exiba:
	a-  O preço médio dos produtos;
	*/
	funcao inicio()
	{
		
		real soma = 0.0 , media, valor, maior, menor
		inteiro i = 1


		escreva("Informe o valor do produto ", i,": ")
		leia(valor)
		soma = soma + valor
		
		maior = valor
		menor = valor


		para( i = 2; i <= 10; i = i + 1){

			escreva("Informe o valor do produto ", i,": ")
			leia(valor)
			soma = soma + valor
	
			se(menor > valor){
				menor = valor
			}
			
			se(maior < valor){
				maior = valor
			}
		}
					
		
		media = soma / 10

		escreva("Soma = ", soma,  "\n")
		escreva("A média de valor dos produtos é igual a ", media,  "\n")
		escreva("Menor = ", menor,  "\n")
		escreva("Maior = ", maior,  "\n")


	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 629; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */