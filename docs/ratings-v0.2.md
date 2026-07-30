# Régua de atributos v0.2

Régua aprovada inicialmente para ATA e mantida na revisão v0.6 para todas as
posições.

## Escala das notas-fonte

| Faixa | Significado |
|---|---|
| 35–49 | limitação evidente para o futebol profissional |
| 50–59 | fraco para a função |
| 60–69 | comum/funcional |
| 70–79 | bom |
| 80–84 | muito bom |
| 85–89 | elite |
| 90–93 | nível mundial no atributo |
| 94–96 | referência histórica |
| 97 | nível singular entre os maiores da história |
| 98–99 | não usado como nota-fonte |

Uma lenda não recebe 90+ em tudo. Ela pode ter vários atributos muito bons,
alguns históricos e fraquezas reais. Um atleta comum ou incomum pode ter uma
especialidade forte, mas não recebe um conjunto de notas de elite só por ser
conhecido.

## Controle por raridade

A raridade continua representando relevância histórica, não um bônus aplicado
às notas. Os limites abaixo são controles de inflação do banco: permitem
especialistas fora das raridades altas, mas impedem perfis inteiros
superestimados.

| Raridade | Média do grupo | Média máxima individual | Limite individual de notas altas |
|---|---:|---:|---|
| Lenda | 82–89 | 90 | até 8 notas 90+, 5 notas 94+ e 2 notas 97 |
| Épico | 78–85 | 89 | até 7 notas 90+, 3 notas 94+ e 1 nota 97 |
| Raro | 72–79 | 83,5 | até 4 notas 90+, 3 notas 94+ e 1 nota 97 |
| Incomum | 65–73 | 79,5 | até 2 notas 85+ e 1 nota 97 |
| Comum | 59–69 | 70 | somente 1 especialidade de elite, que pode chegar a 97 |

Esses limites não obrigam um jogador de determinada raridade a alcançar a
média máxima. A nota continua vindo do perfil observado no auge.

Uma nota 97 isolada pode pertencer a qualquer raridade quando representa uma
especialidade realmente singular. A raridade mede tamanho histórico e cultural;
não é um atalho para ordenar jogadores por média.

### Exceção Pelé

Pelé é deliberadamente o melhor e mais raro perfil do banco. Ele continua
dentro do teto de nota-fonte 97, mas pode ultrapassar os limites individuais
normais de uma Lenda por representar o jogador máximo da experiência.

Dentro do sorteio de Lendas de ATA, cada nome possui peso 1 e Pelé possui peso
0,15. Isso o torna aproximadamente 6,7 vezes mais difícil de aparecer que cada
outra Lenda, sem criar proteção, garantia ou sistema de compensação.

## Fontes para jogadores do futebol brasileiro

O FIFA/EA FC é somente uma referência comparativa e nunca uma autoridade final.
Para jogadores cujo auge ocorreu no Brasil, a ordem de preferência é:

1. registros e descrições do período de auge;
2. estatísticas e partidas;
3. fontes oficiais de clubes, CBF e competições;
4. consenso sobre estilo e especialidades;
5. cartas normais do FIFA/EA FC, apenas quando representarem aquele auge.

Cartas promocionais podem sugerir um perfil, mas não definem notas. A falta de
uma carta relevante também não penaliza ídolos nacionais.

## Valor inicial e teto

O valor inicial varia entre 65% e 70% da fonte:

```text
atual = arredondar(fonte × sorteio(0,65; 0,70))
```

A nota-fonte vira o teto natural. A carreira pode desenvolver mais 10% com uma
trajetória normal bem-sucedida e liberar até 15% por meio das melhores escolhas:

```text
teto_natural = fonte
teto_base = arredondar(fonte × 1,10)
teto_absoluto = mínimo(99; arredondar(fonte × 1,15))
```

Uma fonte 89, por exemplo, começa entre 58 e 62, possui teto natural 89, teto
base 98 e teto absoluto 99. O 99 é um limite técnico, não uma projeção. A
velocidade de evolução é maior até a nota-fonte; depois dela, o ganho diminui
progressivamente e depende de treino, minutos, comissão, foco, desempenho e
decisões de carreira.

## Bola parada

Bola parada possui peso alto para MEI e peso médio para ATA, PON e LAT. Para
manter exatamente 12 escolhas, ela substitui redundâncias:

- ATA deixa de sortear Físico, mantendo Força;
- PON deixa de sortear Força, mantendo Físico;
- LAT deixa de sortear Força, mantendo Físico;
- MEI já possuía Bola parada.

A nota considera faltas diretas, escanteios, faltas laterais e pênaltis conforme
o repertório real do atleta. Potência de chute isolada não transforma alguém
automaticamente em bom cobrador.

## Composição mínima

O banco não usa uma proporção obrigatória de nomes por raridade. A primeira
camada revisada mantém variedade mínima por posição:

| Pool | Opções mínimas |
|---|---:|
| ATA | 100 |
| PON | 60 |
| MEI | 60 |
| VOL | 60 |
| LAT | 60 |
| ZAG | 60 |
| GOL | 70 |

Probabilidade por sorteio:

- 4% Lendas
- 5% Épicos
- 25% Raros
- 40% Incomuns
- 26% Comuns

As chances são independentes e não existe proteção contra azar. O sistema
primeiro sorteia a raridade e depois um jogador daquele grupo. Por isso, ter
mais Lendas cadastradas em GOL não aumenta a chance de uma Lenda aparecer.
Pesos individuais são exceções explícitas, como Pelé.

## Exemplos após a revisão integral

| Posição | Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|---|
| ATA | Ronaldo Nazário | Lenda | velocidade 96, drible 95, chute 93 | passe 74, jogo aéreo 73 |
| ATA | Hulk | Raro | potência 93, força 88, velocidade 84 | passe 73, jogo aéreo 73 |
| ATA | Deyverson | Comum | jogo aéreo 79, posicionamento 78, físico 76 | passe 55, drible 57 |
| PON | Lionel Messi | Lenda | drible 97, agilidade 96, aceleração 93 | força 62, físico 71 |
| PON | Everton Cebolinha | Incomum | aceleração 85, agilidade 84, drible 82 | força 55, passe 67 |
| MEI | Zico | Lenda | bola parada 94, passe 90, visão 90 | força 62, físico 76 |
| MEI | Paulo Henrique Ganso | Incomum | visão 86, controle 82, passe 80 | velocidade 42, físico 55 |
| VOL | Casemiro | Épico | desarme 86, interceptação 86, força 81 | velocidade 61, controle 73 |
| VOL | Márcio Araújo | Comum | fôlego 71, interceptação 69 | força 49, passe longo 50 |
| LAT | Cafu | Lenda | fôlego 97, apoio 95, recomposição 93 | força 79 |
| LAT | Rodinei | Incomum | apoio 81, fôlego 80, velocidade 78 | um contra um defensivo 60 |
| ZAG | Thiago Silva | Lenda | concentração 96, tempo 95, interceptação 94 | força 80 |
| ZAG | Fabrício Bruno | Comum | velocidade 84, recuperação 84 | passe e controle 55 |
| GOL | Ederson | Raro | jogo com os pés 96, força da reposição 95, reposição 94 | encaixe 66 |
| GOL | Cássio | Épico | pênaltis 96, concentração 94, um contra um 92 | jogo com os pés 70 |
| GOL | Rogério Ceni | Lenda | jogo com os pés 97, reposição 95, concentração 95 | agilidade 78 |
| GOL | Marcos | Lenda | pênaltis 96, um contra um 95, reflexo 93 | jogo com os pés 67 |

## Auditoria geral v0.6

| Posição | Naturais | Jogáveis | Brasileiros jogáveis |
|---|---:|---:|---:|
| ATA | 131 | 175 | 75 |
| PON | 90 | 126 | 73 |
| MEI | 90 | 127 | 64 |
| VOL | 90 | 128 | 76 |
| LAT | 90 | 107 | 63 |
| ZAG | 90 | 121 | 70 |
| GOL | 90 | 90 | 51 |

Banco natural:

- 671 perfis de posição;
- 657 jogadores únicos;
- 8.052 notas auditadas;
- 7,96% em 90 ou mais;
- 1,90% em 94 ou mais;
- 0,16% em 97;
- nenhuma nota-fonte 98 ou 99.

| Raridade | Média após a revisão |
|---|---:|
| Lenda | 86,29 |
| Épico | 83,68 |
| Raro | 78,95 |
| Incomum | 72,54 |
| Comum | 62,33 |

As 203 variantes improvisadas adicionam 2.436 notas funcionais. Delas, 7,06%
estão em 90 ou mais, 1,89% em 94 ou mais e cinco recebem 97. As médias das
variantes continuam separadas por raridade: 84,34 para Lenda, 81,81 para Épico,
78,05 para Raro, 72,97 para Incomum e 61,81 para Comum.

O comando `npm run audit:ratings` verifica inflação global, médias, limites
individuais, profundidade mínima de Épicos, Raros e Incomuns em cada posição e
um conjunto de classificações históricas obrigatórias. Entre as travas estão
Rogério Ceni e Marcos como Lendas; Cássio e Leão como Épicos; Jairzinho,
Rivellino, Sócrates, Zito, Djalma Santos e Bellini em suas prateleiras
históricas corretas.

A quantidade de atletas por raridade não controla a chance de aparição. O jogo
primeiro sorteia a raridade pelos pesos fixos e depois sorteia um atleta daquela
raridade. Não se rebaixa um ídolo para cumprir uma proporção artificial.

## Simulação de criação v0.6

Foram simuladas 5.000 criações por posição, totalizando 35.000 carreiras. Em
cada rodada, o teste escolheu o melhor atributo ainda vazio da carta recebida,
sem utilizar os três rerolls.

| Posição | Inicial mediano | Herança natural mediana | Teto base mediano | Teto absoluto p10–med–p90 |
|---|---:|---:|---:|---:|
| ATA | 50 | 75 | 82 | 81–85–90 |
| PON | 53 | 78 | 86 | 86–89–92 |
| MEI | 52 | 77 | 85 | 84–88–91 |
| VOL | 52 | 77 | 85 | 84–88–92 |
| LAT | 53 | 78 | 86 | 85–89–93 |
| ZAG | 52 | 77 | 85 | 84–88–91 |
| GOL | 53 | 78 | 86 | 85–89–93 |

O teto base representa um desenvolvimento bom e acessível. O teto absoluto
depende de liberar os cinco pontos percentuais adicionais por decisões e
desempenho na carreira; ele não é uma previsão do overall final.

Com 12 sorteios, a chance de receber ao menos uma Lenda é aproximadamente
38,73%. Épico ou Lenda aparece em aproximadamente 67,75% das criações. Em
média, cada ficha recebe 3 cartas Raras, 4,8 Incomuns e 3,1 Comuns.

Na simulação, a frequência observada de ao menos uma Lenda ficou entre 37,98%
e 39,16% conforme a posição.

| Posição | Natural | Improvisação principal | Alternativa | Save com alguma improvisação |
|---|---:|---:|---:|---:|
| ATA | 85,40% | 9,57% | 5,04% | 84,92% |
| PON | 85,42% | 9,65% | 4,93% | 86,04% |
| MEI | 87,87% | 7,33% | 4,80% | 79,76% |
| VOL | 86,44% | 9,94% | 3,62% | 81,56% |
| LAT | 87,06% | 9,37% | 3,57% | 81,92% |
| ZAG | 86,34% | 9,90% | 3,76% | 83,68% |
| GOL | 100% | 0% | 0% | 0% |

Os percentuais de improvisação diminuem quando um tier não possui candidatos
que passem simultaneamente pela análise histórica e pelos atributos mínimos.
Num lote separado com três rerolls estratégicos, 4 de 10 atacantes receberam
Lenda. Nas 40 carreiras das sete posições, 16 tiveram ao menos uma Lenda,
somando 23 aparições; 48 das 480 escolhas vieram de variantes improvisadas.

Para medir repetição, também foram feitos 1.000 grupos de quatro saves por
posição. Entre as 48 cartas vistas nesses quatro saves, apareceram em média de
36,6 a 42,1 jogadores diferentes. As variantes reduziram a repetição nas seis
posições de linha sem alterar GOL.
