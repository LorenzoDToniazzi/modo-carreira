# Modo Carreira

Jogo de carreira de futebol focado em criar um atleta único a partir de jogadores históricos e atuais sorteados, desenvolver esse atleta desde os 16 anos e construir uma trajetória rápida, clara e divertida.

## Estado do projeto

O **Criador de Atleta v0.6** já permite criar jogadores nas sete posições. Cada
posição possui 12 atributos, pesos, arquétipos e um banco de fontes próprios.

## Fluxo inicial

1. Escolher nome, nacionalidade, posição, pé dominante e clube do coração em uma única tela.
2. Começar aos 16 anos em um clube formador de divisão inferior da nacionalidade escolhida.
3. Sortear um jogador natural ou individualmente elegível como improvisado.
4. Copiar um atributo ainda vazio desse jogador, considerando o atleta sorteado no auge.
5. Bloquear definitivamente o atributo escolhido.
6. Repetir até completar todos os atributos.
7. Permitir até três novos sorteios durante toda a criação.
8. Iniciar a carreira com valores atuais reduzidos e limites de evolução derivados dos atributos copiados.

Cada atributo começa entre 65% e 70% da nota-fonte. A própria fonte funciona
como teto natural; uma boa carreira libera cerca de 10% adicionais, enquanto
treino e decisões excepcionais podem abrir até 15%, com limite técnico em 99.

## Princípios do banco de jogadores

- Notas próprias, sem copiar ratings de outros jogos.
- Todo atleta é avaliado no auge.
- Raridades: Lenda, Épico, Raro, Incomum e Comum.
- A raridade representa relevância histórica, não excelência em todos os atributos.
- Não existe cota de raridade por posição: a quantidade de nomes em cada grupo
  não altera os pesos do sorteio.
- Jogadores comuns podem ser especialistas excepcionais.
- Pelé é uma exceção deliberada: possui o melhor conjunto do banco e peso
  individual menor no sorteio, aparecendo menos que as demais Lendas.
- Cada atributo deve afetar ações específicas da simulação.
- A qualidade do atleta depende da posição, função e combinação de características, não apenas de um overall geral.
- O banco prioriza nomes reconhecíveis para o público brasileiro sem transformar
  popularidade em nota.
- Jogadores do futebol brasileiro aparecem em todas as raridades e posições.
- Bola parada possui peso alto para MEI e peso médio para ATA, PON e LAT.
- Para atletas cujo auge aconteceu no Brasil, cartas de FIFA/EA FC não servem
  como régua principal. A avaliação prioriza registros do período, números,
  partidas, características reconhecidas e fontes oficiais de clubes e da CBF.
- A ausência de uma boa carta internacional não reduz a nota nem a raridade de
  um ídolo brasileiro.

## Banco v0.6

- 671 perfis naturais
- 249 variantes improvisadas
- 920 cartas jogáveis considerando a função
- 657 jogadores únicos
- 178 opções para ATA, 140 para PON e 141 para MEI
- 134 opções para VOL, 115 para LAT e 122 para ZAG
- 90 goleiros, sem improvisação
- 508 cartas brasileiras considerando as variantes
- pools reforçados de Épicos, Raros e Incomuns em todas as posições
- sorteio por raridade: 3% Lenda, 5% Épico, 25% Raro, 40% Incomum e 27% Comum
- origem da carta: 85% natural, 10% improvisação principal e 5% alternativa,
  quando houver atleta realmente compatível no tier sorteado
- auditoria automática de inflação, profundidade por tier, representação por
  posição e raridades históricas obrigatórias

## Próximo marco

Testar a variedade do sorteio nas sete posições e começar a ligar a ficha criada
às ações da simulação de partidas.
