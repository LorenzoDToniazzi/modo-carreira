# Metodologia de notas v0.7

Esta versão abandona qualquer conversão automática das fichas antigas. Cada
perfil foi relido no auge indicado na própria linha do banco, com uma
justificativa nominal. A auditoria não cria notas: ela apenas rejeita inflação,
campos incompletos e incoerências estruturais.

## Estrutura dos atributos

Todos os jogadores de linha possuem seis atributos globais:

- Velocidade
- Chute
- Passe
- Drible
- Defesa
- Físico

Cada posição acrescenta três atributos:

| Posição | Atributos específicos |
| --- | --- |
| ATA | Jogo aéreo ofensivo, posicionamento e finta |
| PON | Controle de bola, fôlego e finta |
| MEI | Visão, movimentação e bola parada |
| VOL | Desarme, interceptação e saída sob pressão |
| LAT | Cruzamento, fôlego e recomposição |
| ZAG | Jogo aéreo, marcação e tempo de bola |

Goleiros usam uma régua inteiramente própria: reflexos, jogo com os pés,
impulsão, jogo aéreo, defesa de pênaltis, saída de bola, posicionamento e
altura. Altura existe como característica, mas tem apenas 5% do peso do overall;
ela não transforma automaticamente um goleiro alto em um grande goleiro.

## Significado da escala

| Nota | Leitura |
| ---: | --- |
| 35–49 | Limitação evidente |
| 50–59 | Fraco para a função |
| 60–69 | Funcional |
| 70–79 | Bom |
| 80–84 | Muito bom |
| 85–89 | Elite |
| 90–93 | Nível mundial naquele atributo |
| 94–96 | Referência histórica ou especialidade extraordinária |
| 97 | Caso singular entre os maiores |
| 98–99 | Não existe como nota-base |

Raridade representa importância e reconhecimento histórico, não um bônus
oculto. Um jogador comum pode conservar uma especialidade extraordinária, como
jogo aéreo, velocidade, potência ou bola parada, sem receber notas semelhantes
nos atributos vizinhos.

## Processo de avaliação individual

Para cada entrada:

1. Define-se o intervalo real do auge ou do momento icônico.
2. Identifica-se a função exercida, e não apenas a posição nominal.
3. Separam-se as especialidades das características apenas boas.
4. Registram-se também limitações reais; grandeza histórica não significa 90 em
   tudo.
5. Compara-se o jogador com referências da mesma função e época.
6. Só depois a ficha é comparada com o restante do banco.

Exemplos de separação:

- Potência de chute não concede automaticamente posicionamento.
- Jogo aéreo de um zagueiro não concede automaticamente tempo de bola.
- Bola parada de um meia não concede automaticamente passe e visão históricos.
- Altura de um goleiro não concede automaticamente reflexos ou posicionamento.

## Fontes e prioridade

As notas são autorais e usam as fontes como evidência comparativa:

1. Registros históricos e perfis de FIFA, CBF, clubes e federações.
2. Estatísticas de competições, carreira e período de auge.
3. Reconhecimento histórico e análises da função exercida.
4. Ratings oficiais da EA e bases de cartas como referência de perfil relativo.

Para brasileiros cujo auge aconteceu principalmente no Brasil, uma carta fraca
ou tardia de FIFA/EA não reduz a avaliação. Nesses casos, o histórico nacional,
as competições, a Seleção, os registros dos clubes e a memória técnica do auge
possuem prioridade.

Referências gerais usadas na calibração:

- FIFA, Pelé e seus três títulos mundiais:
  https://www.fifa.com/en/tournaments/mens/worldcup/articles/pele-three-world-cup-titles-only-player
- CBF, legado e produção de Pelé:
  https://www.cbf.com.br/selecao-brasileira/noticias/detalhes/selecao-masculina/2-anos-sem-pele-o-rei-do-futebol
- RSSSF, rankings históricos:
  https://www.rsssf.org/miscellaneous/iffhs-century.html
- FIFA, perfil de Cafu:
  https://inside.fifa.com/news/behind-the-world-cup-record-cafu-2878937
- FIFA, Franz Beckenbauer:
  https://inside.fifa.com/organisation/news/a-tribute-to-franz-beckenbauer-1945-2024
- FIFA, Franco Baresi:
  https://inside.fifa.com/en/news/milan-and-italy-s-imperial-sweeper
- FIFA, Lev Yashin:
  https://www.fifa.com/en/tournaments/mens/worldcup/articles/lev-yashin-soviet-union-goalkeeper
- FIFA, José Luis Chilavert:
  https://inside.fifa.com/news/chilavert-goes-for-goal-in-jeju-2925877
- FUTBIN, carta histórica de Pelé usada apenas como comparação:
  https://www.futbin.com/22/player/62/pele

## Pelé e a categoria Rei

Pelé é o único jogador da categoria `Rei`. A chance da categoria é separada da
chance de Lenda, e nenhum outro perfil pode recebê-la. Sua ficha de ATA é a
melhor do banco pelo overall ponderado da posição, sem exigir que todos os seus
atributos sejam 97.

## Improvisações

Uma improvisação não é uma conversão matemática da ficha natural. Cada uma das
164 variantes atuais foi cadastrada nominalmente e precisa cumprir quatro
condições:

1. O atleta exerceu a função ou apresentou um perfil histórico realmente
   compatível com ela.
2. Os seis atributos globais são copiados sem qualquer alteração da ficha de
   origem.
3. Os três atributos específicos da posição de destino possuem valores
   explícitos e uma justificativa própria.
4. A ficha completa supera os mínimos funcionais da posição de destino.

Se faltar uma avaliação específica, o carregamento do banco falha. Não há
fallback, média de atributos vizinhos ou penalização automática por função.
Também não existe a rota `LAT → PON`; um lateral só aparece como ponta caso seja
cadastrado futuramente como perfil posicional próprio, com auge e ficha
completos.

Exemplos:

- Neymar pode aparecer como ATA ou MEI porque atuou centralizado e como camisa
  10, com específicos avaliados para cada função.
- Harry Kane não aparece como PON: chute e passe não compensam a ausência do
  perfil de velocidade, controle repetido e finta exigido pelo corredor.
- Gareth Bale pode aparecer como LAT pelo período real em que exerceu a função,
  mas sua nota defensiva global não é inflada na variante.
- David Luiz pode aparecer como VOL porque atuou oficialmente na posição; não
  basta ser um zagueiro técnico para receber essa variante.

## Controles de inflação

O banco é rejeitado automaticamente se:

- 8,1% ou mais das notas forem 90+;
- 2,1% ou mais das notas forem 94+;
- 0,45% ou mais das notas forem 97;
- existir nota-base 98 ou 99;
- um perfil não tiver auge e justificativa individual;
- Pelé deixar de ser o único Rei ou o melhor perfil ponderado.

Na revisão v0.7, os 675 perfis naturais possuem 5.984 notas:

- 480 notas 90+ (8,02%);
- 120 notas 94+ (2,01%);
- 24 notas 97 (0,40%).

As tolerâncias ficam ligeiramente acima dos percentuais observados para que a
auditoria detecte inflação futura sem obrigar perfis posicionais do mesmo
atleta e auge a divergirem em atributos compartilhados.

## Desenvolvimento do atleta criado

O atributo começa entre 65% e 70% da nota copiada. A faixa de potencial inicial
vai de 10% a 15% acima da fonte, limitada a 99. A carreira futura decidirá a
velocidade do treino e a dificuldade de ultrapassar o limite natural; este
documento não transforma potencial em evolução automática.
