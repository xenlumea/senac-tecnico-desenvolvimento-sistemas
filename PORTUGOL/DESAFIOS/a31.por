programa
{
	/*
	31) Faça um algoritmo que leia o salário de 10 pessoas. Calcule e exiba: 
		a- a média do salário das pessoas; 
		b- Quantas pessoas recebem menos de 1000 reais; 
		c- A soma do salário das 5 primeiras pessoas.
	*/
	funcao inicio()
	{
		
		  
		 real salario_informado = 0.0, soma_5_primeiros = 0.0, soma_total = 0.0, media
		 inteiro qtd_menor_que_mil = 0

		para(inteiro i = 1; i <= 10; i++){
			escreva("Informe o salario da pessoa ", i,": ")
			leia(salario_informado)

			soma_total += salario_informado

			se(salario_informado < 1000){
				qtd_menor_que_mil = qtd_menor_que_mil + 1
			}

			se (i<=5){
				soma_5_primeiros += salario_informado
			}
		
		}

		
			media = soma_total / 10

			escreva("\n")
			escreva("Soma total = ", soma_total , "\n")
			escreva("Soma 5 primeiros = ", soma_5_primeiros , "\n")
			escreva("Média = ", media , "\n")
			escreva("Quantidade de pessoas que recebem menos que R$1000 = ", qtd_menor_que_mil, "\n")

	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 679; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */