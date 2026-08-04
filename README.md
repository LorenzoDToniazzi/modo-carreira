# Modo Carreira

Jogo de carreira de futebol focado em criar um atleta único a partir de jogadores históricos e atuais sorteados, desenvolver esse atleta desde os 16 anos e construir uma trajetória rápida, clara e divertida.

## Estado do projeto

O **Criador de Atleta v0.7** já permite criar jogadores nas sete posições.
Jogadores de linha usam seis atributos globais e três específicos da posição;
goleiros possuem oito atributos inteiramente próprios.

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
como teto natural. Uma boa carreira pode superá-la parcialmente e um
desenvolvimento excepcional libera no máximo 2–5 pontos adicionais, conforme a
distância até 100, sempre respeitando o limite técnico de 99. Assim, somente uma
herança que já era excepcional pode terminar acima de 90. Essa regra é universal:
vale igualmente para todas as posições, raridades e variantes improvisadas.

## Princípios do banco de jogadores

- Notas próprias, sem copiar ratings de outros jogos.
- Todo atleta é avaliado no auge.
- Raridades: Rei, Lenda, Épico, Raro, Incomum e Comum.
- A raridade representa relevância histórica, não excelência em todos os atributos.
- Não existe cota de raridade por posição: a quantidade de nomes em cada grupo
  não altera os pesos do sorteio.
- Jogadores comuns podem ser especialistas excepcionais.
- Pelé é uma exceção deliberada: é o único Rei, possui o melhor conjunto
  ponderado do banco e uma chance de sorteio separada de apenas 0,1%.
- Cada atributo deve afetar ações específicas da simulação.
- A qualidade do atleta depende da posição, função e combinação de características, não apenas de um overall geral.
- O banco prioriza nomes reconhecíveis para o público brasileiro sem transformar
  popularidade em nota.
- Jogadores do futebol brasileiro aparecem em todas as raridades e posições.
- Bola parada é um atributo específico de MEI; chute e passe continuam
  influenciando as cobranças dos demais jogadores na futura simulação.
- Para atletas cujo auge aconteceu no Brasil, cartas de FIFA/EA FC não servem
  como régua principal. A avaliação prioriza registros do período, números,
  partidas, características reconhecidas e fontes oficiais de clubes e da CBF.
- A ausência de uma boa carta internacional não reduz a nota nem a raridade de
  um ídolo brasileiro.

## Banco v0.7

- 675 perfis naturais
- 164 variantes improvisadas aprovadas individualmente por histórico e atributos
- 839 cartas jogáveis considerando a função
- 662 nomes distintos; homônimos e perfis posicionais não são confundidos com
  uma contagem de atletas únicos
- 178 opções para ATA, 106 para PON e 138 para MEI
- 105 opções para VOL, 97 para LAT e 124 para ZAG
- 91 goleiros, sem improvisação
- 448 cartas brasileiras considerando as variantes
- pools reforçados de Épicos, Raros e Incomuns em todas as posições
- sorteio por raridade: 0,1% Rei, 5,3% Lenda, 4,5% Épico, 25% Raro,
  40% Incomum e 25,1% Comum
- origem da carta: 85% natural, 10% improvisação principal e 5% alternativa,
  quando houver atleta realmente compatível no tier sorteado
- improvisações exigem tanto compatibilidade histórica quanto notas mínimas
  nos atributos relevantes para a posição de destino
- os seis atributos globais são copiados sem alteração da ficha de origem; os
  três específicos da nova função são avaliados e justificados nominalmente
- não existe conversão automática de atributos e laterais não podem ser
  improvisados como pontas
- auditoria automática de inflação, profundidade por tier, representação por
  posição e raridades históricas obrigatórias
- metodologia completa em [`docs/ratings-methodology-v0.7.md`](docs/ratings-methodology-v0.7.md)

## Próximo marco

Testar a variedade do sorteio nas sete posições e começar a ligar a ficha criada
às ações da simulação de partidas.
