# Modo Carreira

Jogo de carreira de futebol focado em criar um atleta único a partir de jogadores históricos e atuais sorteados, desenvolver esse atleta desde os 16 anos e construir uma trajetória rápida, clara e divertida.

## Estado do projeto

O **Criador de Atleta v0.3** já permite criar jogadores nas sete posições. Cada
posição possui 12 atributos, pesos, arquétipos e um banco de fontes próprios.

## Fluxo inicial

1. Escolher nome, nacionalidade, posição, pé dominante e clube do coração em uma única tela.
2. Começar aos 16 anos em um clube formador de divisão inferior da nacionalidade escolhida.
3. Sortear um jogador elegível para a posição.
4. Copiar um atributo ainda vazio desse jogador, considerando o atleta sorteado no auge.
5. Bloquear definitivamente o atributo escolhido.
6. Repetir até completar todos os atributos.
7. Permitir até três novos sorteios durante toda a criação.
8. Iniciar a carreira com valores atuais reduzidos e limites de evolução derivados dos atributos copiados.

## Princípios do banco de jogadores

- Notas próprias, sem copiar ratings de outros jogos.
- Todo atleta é avaliado no auge.
- Raridades: Lenda, Épico, Raro, Incomum e Comum.
- A raridade representa relevância histórica, não excelência em todos os atributos.
- Jogadores comuns podem ser especialistas excepcionais.
- Cada atributo deve afetar ações específicas da simulação.
- A qualidade do atleta depende da posição, função e combinação de características, não apenas de um overall geral.
- O banco prioriza nomes reconhecíveis para o público brasileiro sem transformar
  popularidade em nota.
- Jogadores do futebol brasileiro aparecem em todas as raridades e posições.
- Para atletas cujo auge aconteceu no Brasil, cartas de FIFA/EA FC não servem
  como régua principal. A avaliação prioriza registros do período, números,
  partidas, características reconhecidas e fontes oficiais de clubes e da CBF.
- A ausência de uma boa carta internacional não reduz a nota nem a raridade de
  um ídolo brasileiro.

## Banco v0.3

- 418 perfis de posição
- 411 jogadores únicos
- 117 atacantes
- 51 pontas
- 50 opções em cada uma das outras cinco posições
- 235 perfis brasileiros
- auditoria automática de inflação e representação por posição

## Próximo marco

Testar o sorteio nas sete posições, revisar notas discutíveis e começar a ligar a
ficha criada às ações da simulação de partidas.
