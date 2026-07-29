# Régua de atributos v0.2

Régua aprovada inicialmente para ATA e mantida na revisão v0.5 para todas as
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
| Raro | 72–79 | 82 | até 4 notas 90+, 3 notas 94+ e 1 nota 97 |
| Incomum | 65–73 | 78 | até 2 notas 85+ e 1 nota 97 |
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

O valor atual continua em 70% da fonte enquanto testamos o ritmo:

```text
atual = arredondar(fonte × 0,70)
```

O bônus de potencial deixa de ser +10 fixo e passa a diminuir no topo:

| Fonte | Bônus máximo |
|---|---:|
| até 69 | +12 |
| 70–79 | +10 |
| 80–87 | +8 |
| 88–92 | +5 |
| 93–95 | +3 |
| 96 | +2 |
| 97 | +2, podendo chegar a 99 |

Somente uma nota-fonte 97 permite potencial 99. Os pontos 96–99 também exigirão
treino, estrutura, fase e marcos de carreira excepcionais.

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

- 2% Lendas
- 5% Épicos
- 25% Raros
- 40% Incomuns
- 28% Comuns

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

## Auditoria geral v0.5

| Posição | Perfis | Brasileiros |
|---|---:|---:|
| ATA | 131 | 46 |
| PON | 90 | 55 |
| MEI | 90 | 51 |
| VOL | 90 | 53 |
| LAT | 90 | 53 |
| ZAG | 90 | 52 |
| GOL | 90 | 51 |

Resultado consolidado:

- 671 perfis de posição;
- 657 jogadores únicos;
- 8.052 notas auditadas;
- 7,61% em 90 ou mais;
- 1,79% em 94 ou mais;
- 0,14% em 97;
- nenhuma nota-fonte 98 ou 99.

| Raridade | Média após a revisão |
|---|---:|
| Lenda | 86,08 |
| Épico | 83,50 |
| Raro | 78,85 |
| Incomum | 72,67 |
| Comum | 62,76 |

O comando `npm run audit:ratings` verifica inflação global, médias, limites
individuais, profundidade mínima de Épicos, Raros e Incomuns em cada posição e
um conjunto de classificações históricas obrigatórias. Entre as travas estão
Rogério Ceni e Marcos como Lendas; Cássio e Leão como Épicos; Jairzinho,
Rivellino, Sócrates, Zito, Djalma Santos e Bellini em suas prateleiras
históricas corretas.

A quantidade de atletas por raridade não controla a chance de aparição. O jogo
primeiro sorteia a raridade pelos pesos fixos e depois sorteia um atleta daquela
raridade. Não se rebaixa um ídolo para cumprir uma proporção artificial.

## Simulação de criação v0.5

Foram simuladas 5.000 criações por posição, totalizando 35.000 carreiras. Em
cada rodada, o teste escolheu o melhor atributo ainda vazio da carta recebida,
sem utilizar os três rerolls.

| Posição | Potencial p10 | Potencial mediano | Potencial p90 |
|---|---:|---:|---:|
| ATA | 84 | 87 | 89 |
| PON | 84 | 86 | 89 |
| MEI | 83 | 86 | 88 |
| VOL | 83 | 86 | 88 |
| LAT | 83 | 86 | 89 |
| ZAG | 83 | 86 | 88 |
| GOL | 84 | 87 | 89 |

Com 12 sorteios, a chance de receber ao menos uma Lenda é aproximadamente
21,5%. Épico ou Lenda aparece em aproximadamente 58,1% das criações. Em média,
cada ficha recebe 3 cartas Raras, 4,8 Incomuns e 3,4 Comuns.

Para medir repetição, também foram feitos 1.000 grupos de quatro saves por
posição. Entre as 48 cartas vistas nesses quatro saves, apareceram em média de
36 a 41 jogadores diferentes. Assim, quatro carreiras ainda revelam menos da
metade dos pools de 90 e cerca de um terço do pool de ATA.
