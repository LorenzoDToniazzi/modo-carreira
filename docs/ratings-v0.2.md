# Régua de atributos v0.2

Régua aprovada e aplicada ao primeiro banco amplo de ATA.

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
alguns históricos e fraquezas reais. Jogadores comuns e incomuns podem possuir
uma especialidade entre 85 e 93.

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

## Exemplos recalibrados

### ATA

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Ronaldo Nazário | Lenda | velocidade 97, drible 96, chute 95, movimentação 95 | jogo aéreo 77, passe 78 |
| Cristiano Ronaldo | Lenda | força de chute 97, jogo aéreo 97, posicionamento 97, chute 96 | passe 83, controle 89 |
| Didier Drogba | Épico | força 96, jogo aéreo 96, força de chute 96 | drible 72, passe 75 |
| Olivier Giroud | Incomum | jogo aéreo 94, força 92 | velocidade 55, drible 65 |
| Choupo-Moting | Comum | jogo aéreo 83, força 82, controle 78 | chute 73, movimentação 77 |

### PON

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Lionel Messi | Lenda | drible 97, controle 97, um contra um 97, passe 96 | força 66, jogo aéreo 55 |
| Arjen Robben | Épico | aceleração 96, chute colocado 96, velocidade 95 | força 70, jogo aéreo 62 |
| Ricardo Quaresma | Incomum | cruzamento 96, drible 91, um contra um 91 | físico 72, movimentação 81 |
| Adama Traoré | Comum | velocidade 97, aceleração 96, um contra um 88 | chute colocado 61, passe 67 |

### MEI

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Diego Maradona | Lenda | visão 97, drible 97, controle 97, passe 95 | força 67, jogo aéreo 55 |
| Zinedine Zidane | Lenda | controle 97, visão 96, passe longo 96 | velocidade 82, fôlego 84 |
| Kevin De Bruyne | Épico | visão 97, passe longo 97, passe 96 | drible 88, força 78 |
| Juninho Pernambucano | Raro | bola parada 97, chute 93, passe longo 90 | velocidade 72, força 70 |
| Paulo Henrique Ganso | Incomum | visão 90, controle 89, passe 88 | velocidade 55, físico 65 |

### VOL

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Sergio Busquets | Lenda | posicionamento 97, resistência à pressão 97, interceptação 96 | velocidade 56, força 82 |
| N'Golo Kanté | Épico | interceptação 97, fôlego 97, desarme 96 | passe longo 78, força 78 |
| Casemiro | Épico | desarme 95, posicionamento 95, força 93 | velocidade 72, drible 72 |
| Marouane Fellaini | Incomum | jogo aéreo 96, força 93, físico 90 | velocidade 59, passe 74 |

### LAT

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Cafu | Lenda | fôlego 97, apoio 97, recomposição 96 | chute 75, força 82 |
| Roberto Carlos | Lenda | velocidade 97, apoio 96, recomposição 95, cruzamento 93 | jogo aéreo 70, marcação 84 |
| Trent Alexander-Arnold | Raro | cruzamento 97, passe 94, apoio 93 | um contra um defensivo 75, força 72 |
| Marcos Alonso | Incomum | cruzamento 88, chute 84, jogo aéreo 87 | velocidade 68, recomposição 74 |

### ZAG

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Paolo Maldini | Lenda | tempo de bola 97, marcação 97, desarme 96 | chute 58, força 87 |
| Franz Beckenbauer | Lenda | passe 96, interceptação 96, concentração 96 | força 82, jogo aéreo 91 |
| Virgil van Dijk | Épico | força 96, jogo aéreo 96, tempo de bola 95 | chute 60, aceleração 78 |
| Per Mertesacker | Incomum | jogo aéreo 91, força 89, marcação 88 | velocidade 42, recuperação 58 |
| Harry Maguire | Comum | jogo aéreo 93, força 91, passe 82 | velocidade 57, recuperação 66 |

### GOL

Goleiros usam um esquema próprio; os atributos universais de linha não são
forçados sobre eles.

| Jogador | Raridade | Destaques | Limitações |
|---|---|---|---|
| Lev Yashin | Lenda | reflexo 97, posicionamento 97, concentração 97 | passe longo 78, jogo com os pés 72 |
| Gianluigi Buffon | Lenda | posicionamento 97, um contra um 97, concentração 97 | passe longo 83, saída rasteira 88 |
| Manuel Neuer | Lenda | um contra um 97, saída rasteira 97, jogo com os pés 97 | encaixe 93, reflexo 95 |
| Ederson | Épico | passe longo 97, passe curto 97, jogo com os pés 96 | encaixe 86, jogo aéreo 86 |
| Guillermo Ochoa | Incomum | reflexo 94, mergulho 91, um contra um 90 | jogo aéreo 72, encaixe 80 |

## Resultado da auditoria ATA v0.2

| Medida | Resultado | Limite |
|---|---:|---:|
| Jogadores | 100 | mínimo 100 |
| Notas auditadas | 1.200 | 12 por jogador |
| Notas 90+ | 95 (7,92%) | abaixo de 8% |
| Notas 94+ | 22 (1,83%) | abaixo de 2% |
| Notas 97 | 4 (0,33%) | abaixo de 0,4% |
| Fontes 98–99 | 0 | zero |

O comando `npm run audit:ratings` impede que uma alteração futura ultrapasse
esses limites sem ser percebida.
