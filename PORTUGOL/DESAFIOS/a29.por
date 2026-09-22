programa
{
	/*
	 29) Faça um algoritmo que leia o salário de 10 pessoas. Calcule e exiba a soma dos salários destas pessoas.
  	*/
	
	funcao inicio()
	{

		real soma = 0.0 , salario = 0.0
		inteiro i

		para( i = 1; i <= 10; i = i + 1){
			escreva("Informe o salário da pessoa ", i,": ")
			leia(salario)
			soma = soma + salario
		}

		escreva("A soma dos salários é igual a R$ ", soma, "\n")

	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 406; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */