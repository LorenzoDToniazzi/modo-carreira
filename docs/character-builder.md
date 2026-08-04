# Criador de atleta — especificação v0.6

> **Documento histórico.** A estrutura de atributos, raridades e improvisações
> desta versão foi substituída pela especificação v0.7 do
> [README](../README.md) e pela
> [metodologia de notas v0.7](ratings-methodology-v0.7.md). Não use as regras
> abaixo para alterar o banco atual.

## Objetivo

O criador deve ser o primeiro contato com o jogo e o principal gerador de variedade. A identidade é preenchida rapidamente; a parte estratégica é decidir qual atributo copiar de cada jogador sorteado sem conhecer os próximos nomes.

## Fluxo confirmado

1. Uma única tela reúne nome, nacionalidade, posição, pé dominante e clube do coração.
2. A idade inicial é fixa em 16 anos.
3. Um clube formador de divisão inferior é sorteado conforme a nacionalidade.
4. Todos os atributos começam vazios.
5. Um jogador elegível para a posição é sorteado.
6. O usuário escolhe um atributo ainda vazio para copiar.
7. O atributo é bloqueado definitivamente.
8. Outro jogador é sorteado e o processo continua até preencher todos os atributos.
9. Há três rerolls globais por criação.
10. Os objetivos de transferência não pertencem à criação. Eles serão pedidos ao empresário durante a carreira.

## Progressão

O atleta de 16 anos começa com uma assimilação entre 65% e 70% da herança:

```text
assimilação_inicial = sorteio entre 0,65 e 0,70
valor_atual = arredondar(nota_fonte × assimilação_inicial)
```

Cada atributo possui três referências de evolução:

```text
teto_natural = nota_fonte
teto_base = arredondar(nota_fonte × 1,10)
teto_absoluto = arredondar(nota_fonte × 1,15), limitado a 99
```

O teto natural é a qualidade herdada e deve ser relativamente mais rápida de
alcançar. A carreira começa com o teto base de +10% acessível. Escolhas de treino,
minutos, comissão, foco e desempenho podem liberar gradualmente até +15%.
Ultrapassar a nota-fonte é muito mais lento e cada ponto próximo do teto
absoluto exige mais desenvolvimento. Um teto 99 não significa que o jogador
chegará a 99.

## Raridade

- Lenda
- Épico
- Raro
- Incomum
- Comum

A raridade mede relevância histórica e controla frequência de aparição. Ela não adiciona bônus à nota. Um jogador comum pode ter uma característica de elite; uma lenda não precisa ser excelente em tudo.

Não há cota de raridade por posição. O sorteio escolhe primeiro a raridade pelos
pesos abaixo e só depois um nome, então a composição numérica do banco não
justifica rebaixar um ídolo.

Probabilidades independentes por sorteio:

| Raridade | Chance |
|---|---:|
| Lenda | 4% |
| Épico | 5% |
| Raro | 25% |
| Incomum | 40% |
| Comum | 26% |

Não existe proteção contra azar, lenda garantida ou baralho equilibrado. O
único bloqueio é não repetir na mesma criação um jogador já utilizado.

## Blocos e improvisações

As sete posições continuam sendo escolhidas normalmente. Os blocos servem para
definir fontes vizinhas que podem aparecer com frequência reduzida:

| Posição criada | Fonte natural | Improvisação principal | Alternativa |
|---|---|---|---|
| ATA | centroavantes | pontas | meias-atacantes |
| PON | pontas | laterais/alas | atacantes móveis |
| MEI | meias-atacantes | volantes construtores | pontas criadores |
| VOL | volantes | meias centrais | zagueiros técnicos |
| LAT | laterais | pontas de recomposição | zagueiros de lado |
| ZAG | zagueiros | volantes defensivos | laterais defensivos |
| GOL | goleiros | — | — |

O sorteio mantém a raridade global e, dentro daquele tier, tenta usar 85% de
fontes naturais, 10% da improvisação principal e 5% da alternativa. Quando não
existe jogador realmente compatível naquele tier, o peso volta para os grupos
válidos; ninguém é improvisado somente para fechar uma porcentagem.

Cada elegibilidade é individual. A variante recebe os 12 atributos exigidos
pela nova função e mostra a posição de origem na carta. Neymar, Ronaldinho e
Jairzinho podem aparecer em ATA; Garrincha permanece exclusivamente em PON.

A lista individual é apenas a primeira trava. A variante também precisa passar
por requisitos relativos à sua raridade:

- ATA exige finalização e movimentação de atacante;
- PON exige velocidade e finalização;
- MEI exige passe/visão e movimentação/controle;
- VOL exige capacidade defensiva acompanhada de passe, visão ou resistência à
  pressão;
- LAT exige velocidade, capacidade de recomposição e participação pelo lado;
- ZAG exige desarme, interceptação e imposição defensiva.

Isso impede que um lateral vire ponta apenas por ocupar o mesmo corredor. Entre
os laterais ofensivos elegíveis para PON ficam Roberto Carlos, Marcelo, Dani
Alves, Maicon, Hakimi, Theo Hernández, Frimpong, Alex Telles e Yago Pikachu.

## Atributos por posição

Cada posição possui exatamente 12 escolhas. Atributos de mesmo nome continuam
representando a mesma capacidade; os pesos do overall mudam conforme a função.

| Posição | Foco dos atributos específicos |
|---|---|
| GOL | reflexo, posicionamento, encaixe, área, reposição, um contra um e saídas |
| ZAG | jogo aéreo, desarme, interceptação, tempo de bola, marcação e recuperação |
| LAT | desarme, cruzamento, bola parada, fôlego, recomposição, apoio e um contra um defensivo |
| VOL | desarme, interceptação, fôlego, visão, passe longo e saída sob pressão |
| MEI | visão, passe longo, controle, drible, chute colocado e bola parada |
| PON | aceleração, drible, cruzamento, bola parada, agilidade, chute colocado e um contra um |
| ATA | chute colocado, potência, bola parada, jogo aéreo, drible, controle e posicionamento |

## Avaliação por função

O overall é apenas um resumo de interface. Cada posição terá pesos próprios e a simulação consultará atributos específicos para cada ação.

Exemplos:

- cabeceio ofensivo: jogo aéreo, movimentação, força e posicionamento;
- proteção de bola: força, físico e controle;
- ataque à última linha: velocidade, movimentação e posicionamento;
- finalização colocada: chute, finalização colocada, controle e pressão contextual;
- falta direta: bola parada, chute colocado, força do chute e pé dominante;
- escanteio e falta lateral: bola parada, cruzamento, passe e pé dominante;
- pivô e associação: controle, força, passe e movimentação.

Um eventual jogador atuando fora de posição deve receber outra avaliação, não perder artificialmente suas características.

## Banco de dados

Cada atleta é avaliado no auge e contém:

- identificador estável;
- nome;
- país;
- intervalo aproximado do auge;
- posições elegíveis;
- raridade;
- todas as notas da posição;
- justificativa curta de perfil.

As notas são autorais. As melhores cartas de FIFA/EA FC podem ser usadas como
referência comparativa de perfil, ao lado de estatísticas e análise de jogo, mas
não são copiadas automaticamente. Cartas promocionais também sofrem influência
de balanceamento e podem inflar características que não representam o auge real.

## Fontes de calibração inicial

- FIFA, retrospectiva dos vencedores brasileiros: https://www.fifa.com/en/the-best-fifa-football-awards/2024/articles/brazil-awards-list
- São Paulo FC, trajetória e recordes de Rogério Ceni: https://www.saopaulofc.net/sao-paulo-e-rogerio-ceni-a-historia-do-m1to/
- Palmeiras, perfil histórico de Marcos: https://www.palmeiras.com.br/craques/marcos/
- Corinthians, despedida e dimensão histórica de Cássio: https://www.corinthians.com.br/noticias/obrigadogigante-despede-se-do-corinthians-um-dos-maiores-idolos-alvinegros
- CBF, acervo de jogadores imortais: https://www.cbf.com.br/selecao-brasileira/torcedor/jogadores-imortais
- UEFA, recordes de Cristiano Ronaldo: https://www.uefa.com/uefachampionsleague/news/0253-0d820b46805f-b78ccae2c451-1000--what-uefa-records-does-cristiano-ronaldo-hold/
- UEFA, tipos de gols internacionais de Cristiano Ronaldo: https://www.uefa.com/european-qualifiers/news/0257-0e001aafb4e9-7c6ad3889ce0-1000--cristiano-ronaldo-s-146-international-goals-opposition-w/
- UEFA, marcos de gols na Champions League: https://www.uefa.com/uefachampionsleague/news/027d-170b3182d9ed-587169daf860-1000--champions-league-goalscoring-milestones-kylian-mbappe-youn/
- UEFA, rankings históricos: https://www.uefa.com/uefachampionsleague/history/rankings/
- EA SPORTS FC, Harry Kane: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/harry-kane/202126
- EA SPORTS FC, Erling Haaland: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/erling-haaland/239085
- EA SPORTS FC, Olivier Giroud: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/olivier-giroud/178509
- EA SPORTS FC, Romelu Lukaku: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/romelu-lukaku/192505
- EA SPORTS FC, Edin Džeko: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/edin-dzeko/180930
- EA SPORTS FC, Wout Weghorst: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/wout-weghorst/223689
- EA SPORTS FC, Luuk de Jong: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/luuk-de-jong/189805
- EA SPORTS FC, Chris Wood: https://www.ea.com/games/ea-sports-fc/ratings/player-ratings/chris-wood/192123
- FUTBIN, histórico e atributos de cartas: https://www.futbin.com/
- FUT.GG, banco comparativo de cartas: https://www.fut.gg/

As fontes verificam produção e características documentadas. FIFA/EA FC funciona
como segunda opinião de scouting e ajuda a encontrar diferenças internas como
aceleração, força de chute, cabeceio e drible. A nota final continua sendo uma
decisão de design comparativa e deve ser revisada por posição.

## Limites da v0.6

- As sete posições estão liberadas.
- O banco contém 671 perfis naturais, 203 variantes funcionais e 657 atletas
  únicos.
- As opções jogáveis variam de 90 em GOL a 175 em ATA.
- Épicos e Lendas aparecem menos, mas a progressão de potencial continua
  permitindo que uma criação sem cartas históricas alcance nível de craque.
- Brasil, Argentina e Portugal possuem clubes formadores provisórios.
- A carreira ainda não começa depois da criação.
- Fotos e escudos não são utilizados nesta fase.

## Próximos passos

1. Testar se 12 escolhas mantêm ritmo e clareza em todas as posições.
2. Revisar pesos e atributos que produzam arquétipos muito parecidos.
3. Revisar casos individuais do banco com partidas de teste.
4. Pesquisar e versionar clubes formadores por nacionalidade e temporada.
