programa
{
	 /*
		14)  Faça um algoritmo que leia a sigla do estado. 
		Se for igual a “MG”, “RJ” ou “SP” exiba “Sudeste”. 
		Se for “BA” ou “PE” exiba “Nordeste” senão exiba “Outra Região”.
	 */
	
	funcao inicio()
	{
		cadeia sigla
		
		escreva("Digite a sigla de um estado brasieiro.\n")
		escreva("SUDESTE: MG, RJ, SP.\n")
		escreva("NORDESTE: BA, PE.\n")
		escreva("Digite a sigla: ")

		leia(sigla)
			
		logico sudeste = sigla == "MG" ou sigla == "RJ" ou sigla == "SP"
		logico nordeste = sigla == "BA" ou sigla == "PE"

		se(sudeste){
			escreva("Sudeste")
		}senao se(nordeste){
			escreva("Nordeste")
		}senao{
			escreva("Outra Região")
		}
		
		escreva("\n")
	}
}
/* $$$ Portugol Studio $$$ 
 * 
 * Esta seção do arquivo guarda informações do Portugol Studio.
 * Você pode apagá-la se estiver utilizando outro editor.
 * 
 * @POSICAO-CURSOR = 532; 
 * @PONTOS-DE-PARADA = ;
 * @SIMBOLOS-INSPECIONADOS = ;
 * @FILTRO-ARVORE-TIPOS-DE-DADO = inteiro, real, logico, cadeia, caracter, vazio;
 * @FILTRO-ARVORE-TIPOS-DE-SIMBOLO = variavel, vetor, matriz, funcao;
 */