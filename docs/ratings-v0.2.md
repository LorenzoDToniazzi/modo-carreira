# Régua de atributos v0.2

Régua aprovada inicialmente para ATA e mantida na expansão v0.3 para todas as
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
| Épico | 78–85 | 89 | até 7 notas 90+ e 3 notas 94+ |
| Raro | 72–79 | 82 | até 4 notas 90+ e 3 notas 94+ |
| Incomum | 65–73 | 78 | até 2 notas 85+ e somente 1 nota 90+ |
| Comum | 59–69 | 70 | somente 1 nota 85+ e nenhuma nota 90+ |

Esses limites não obrigam um jogador de determinada raridade a alcançar a
média máxima. A nota continua vindo do perfil observado no auge.

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

## Composição pretendida

Meta da primeira base ampla: aproximadamente 350 jogadores únicos, com
atletas multiposição alimentando mais de um conjunto.

| Pool | Opções mínimas |
|---|---:|
| ATA | 100 |
| PON | 90 |
| MEI | 110 |
| VOL | 90 |
| LAT | 80 |
| ZAG | 100 |
| GOL | 70 |

Probabilidade por sorteio:

- 5% Lendas
- 10% Épicos
- 20% Raros
- 30% Incomuns
- 35% Comuns

As chances são independentes e não existe proteção contra azar. Dentro da
raridade sorteada, qualquer jogador disponível tem a mesma chance.

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
| GOL | Cássio | Raro | pênaltis 91, concentração 90, um contra um 87 | jogo com os pés 65 |

## Auditoria geral v0.3

| Posição | Perfis | Brasileiros |
|---|---:|---:|
| ATA | 117 | 31 |
| PON | 51 | 36 |
| MEI | 50 | 34 |
| VOL | 50 | 37 |
| LAT | 50 | 37 |
| ZAG | 50 | 29 |
| GOL | 50 | 31 |

Resultado consolidado:

- 418 perfis de posição;
- 411 jogadores únicos;
- 5.016 notas auditadas;
- 5,00% em 90 ou mais;
- 1,32% em 94 ou mais;
- 0,10% em 97;
- nenhuma nota-fonte 98 ou 99.

| Raridade | Média após a revisão |
|---|---:|
| Lenda | 85,83 |
| Épico | 82,03 |
| Raro | 75,47 |
| Incomum | 68,87 |
| Comum | 62,61 |

O comando `npm run audit:ratings` agora verifica tanto a inflação global quanto
as médias e os limites individuais por raridade. Assim, uma nova nota 87 em um
jogador comum precisa ser sua única especialidade de elite; um perfil inteiro
nessa faixa reprova automaticamente.

A quantidade de atletas por raridade não controla a chance de aparição. O jogo
primeiro sorteia a raridade pelos pesos fixos e depois sorteia um atleta daquela
raridade. Assim, ampliar comuns e incomuns aumenta a variedade sem alterar a
probabilidade aprovada.
