import { createPool, type RawPlayer } from "./create-pool";

// Ordem: VEL, FÍS, FOR, CHU, PAS, MOV, ACE, DRI, CRU, AGI, COL, 1X1.
const rawWingers: RawPlayer[] = [
  // Lendas
  ["garrincha", "Garrincha", "Brasil", "1958–1962", "legend", [90, 72, 63, 81, 82, 87, 94, 94, 87, 94, 85, 96], "Mudança de direção e improviso fizeram do um contra um sua assinatura histórica."],
  ["messi", "Lionel Messi", "Argentina", "2009–2019", "legend", [89, 71, 62, 89, 89, 89, 93, 97, 85, 96, 93, 93], "Condução curta, aceleração e precisão combinadas em nível singular."],
  ["ronaldinho", "Ronaldinho Gaúcho", "Brasil", "2004–2006", "legend", [83, 76, 71, 83, 85, 84, 85, 90, 85, 85, 85, 90], "Drible criativo e capacidade de fabricar a jogada que não parecia existir."],
  ["neymar", "Neymar", "Brasil", "2015–2020", "legend", [84, 71, 59, 82, 84, 84, 89, 89, 81, 89, 84, 89], "Desequilíbrio individual, agilidade e criação partindo do lado esquerdo."],
  ["cristiano", "Cristiano Ronaldo", "Portugal", "2007–2013", "legend", [90, 88, 85, 90, 81, 90, 95, 90, 89, 90, 90, 90], "No auge como ponta, combinava explosão, drible vertical e conclusão pesada."],

  // Épicos
  ["jairzinho", "Jairzinho", "Brasil", "1970–1974", "epic", [90, 86, 82, 84, 78, 91, 92, 88, 80, 86, 84, 90], "Potência em velocidade e presença ofensiva constante saindo da ponta."],
  ["figo", "Luís Figo", "Portugal", "1999–2002", "epic", [77, 74, 66, 74, 82, 79, 79, 82, 86, 80, 78, 82], "Controle do corredor, cruzamento e leitura para decidir no um contra um."],
  ["robben", "Arjen Robben", "Países Baixos", "2009–2015", "epic", [89, 73, 61, 82, 77, 84, 89, 84, 77, 84, 89, 84], "Aceleração e corte para dentro culminando no chute colocado."],
  ["ribery", "Franck Ribéry", "França", "2007–2013", "epic", [85, 78, 66, 78, 83, 85, 85, 85, 84, 90, 81, 90], "Condução agressiva, associação curta e enorme volume criativo."],
  ["salah", "Mohamed Salah", "Egito", "2017–2022", "epic", [81, 72, 58, 80, 74, 81, 86, 80, 68, 81, 81, 81], "Ataque diagonal, velocidade e finalização de ponta que produz como atacante."],
  ["mbappe", "Kylian Mbappé", "França", "2018–2026", "epic", [88, 72, 67, 80, 73, 83, 88, 83, 71, 83, 82, 88], "Aceleração devastadora e domínio do duelo em campo aberto."],
  ["bale", "Gareth Bale", "País de Gales", "2012–2018", "epic", [92, 84, 80, 84, 80, 86, 92, 84, 87, 82, 86, 86], "Potência, corrida longa e cruzamento com grande ameaça de chute."],
  ["renato-gaucho", "Renato Gaúcho", "Brasil", "1982–1987", "epic", [88, 78, 72, 82, 80, 87, 89, 90, 82, 87, 80, 91], "Drible vertical, irreverência e decisão do herói brasileiro no Mundial de 1983."],

  // Raros
  ["vini-jr", "Vini Jr.", "Brasil", "2022–2026", "rare", [85, 70, 53, 72, 72, 80, 85, 80, 70, 80, 76, 85], "Arranque repetido e coragem para atacar o defensor durante todo o jogo."],
  ["denilson", "Denílson", "Brasil", "1997–2002", "rare", [78, 64, 48, 56, 68, 71, 78, 83, 70, 83, 60, 84], "Drible e provocação no corredor muito acima da produção de chute."],
  ["di-maria", "Ángel Di María", "Argentina", "2013–2021", "rare", [79, 71, 56, 76, 79, 81, 81, 79, 81, 81, 78, 81], "Condução, passe final e cruzamento de canhota em múltiplas funções."],
  ["hazard", "Eden Hazard", "Bélgica", "2014–2019", "rare", [82, 76, 67, 77, 81, 82, 83, 83, 76, 88, 82, 83], "Centro de gravidade baixo e domínio do um contra um em espaço curto."],
  ["mane", "Sadio Mané", "Senegal", "2017–2022", "rare", [78, 75, 64, 74, 65, 78, 78, 77, 63, 77, 75, 77], "Profundidade, intensidade sem bola e chegada frequente para finalizar."],
  ["alexis", "Alexis Sánchez", "Chile", "2013–2017", "rare", [80, 78, 65, 78, 75, 82, 82, 80, 72, 82, 79, 82], "Agressividade na condução e participação intensa por dentro e por fora."],
  ["raphinha", "Raphinha", "Brasil", "2024–2026", "rare", [81, 78, 61, 79, 79, 83, 83, 81, 81, 80, 80, 80], "Pressão, profundidade e decisão crescente sem depender apenas do drible."],
  ["quaresma", "Ricardo Quaresma", "Portugal", "2005–2012", "rare", [72, 61, 51, 67, 73, 68, 75, 77, 83, 76, 72, 77], "Cruzamento de três dedos e repertório técnico fora do padrão."],
  ["douglas-costa", "Douglas Costa", "Brasil", "2015–2018", "rare", [79, 68, 56, 69, 73, 74, 84, 79, 78, 84, 71, 79], "Explosão curta e drible de ruptura, com produção final menos constante."],
  ["willian", "Willian", "Brasil", "2015–2020", "rare", [75, 71, 55, 67, 75, 76, 76, 76, 75, 77, 71, 76], "Condução segura, recomposição e criação consistente pelo lado."],

  // Incomuns
  ["cebolinha", "Everton Cebolinha", "Brasil", "2018–2020", "uncommon", [82, 66, 55, 68, 67, 73, 85, 82, 70, 84, 74, 82], "Aceleração e corte curto para dentro marcaram seu auge no Grêmio."],
  ["bruno-henrique", "Bruno Henrique", "Brasil", "2019–2021", "uncommon", [88, 76, 70, 75, 62, 82, 87, 76, 72, 79, 73, 80], "Velocidade, força e ataque às costas da defesa em jogos grandes."],
  ["dudu", "Dudu", "Brasil", "2016–2022", "uncommon", [75, 71, 55, 68, 73, 77, 75, 75, 73, 78, 71, 77], "Regularidade, drible e associação como protagonista no futebol brasileiro."],
  ["savio", "Sávio", "Brasil", "2024–2026", "uncommon", [77, 64, 49, 63, 68, 73, 79, 76, 72, 79, 66, 77], "Ponta de aceleração leve, drible aberto e criação pelo corredor."],
  ["antony", "Antony", "Brasil", "2021–2023", "uncommon", [72, 64, 49, 60, 64, 67, 72, 72, 62, 72, 67, 73], "Canhota técnica e mudança curta, com produção ofensiva irregular."],
  ["malcom", "Malcom", "Brasil", "2017–2024", "uncommon", [75, 63, 50, 66, 66, 69, 75, 72, 64, 75, 71, 73], "Condução para dentro e chute colocado partindo da direita."],
  ["pepe", "Pepê", "Brasil", "2020–2024", "uncommon", [77, 70, 56, 64, 70, 75, 77, 75, 69, 75, 66, 77], "Mobilidade e condução que permitem atuar por fora ou por dentro."],
  ["michael", "Michael", "Brasil", "2019–2024", "uncommon", [75, 60, 41, 60, 59, 68, 76, 72, 55, 76, 62, 73], "Arranque e improviso em sequência, apesar da decisão oscilante."],
  ["marinho", "Marinho", "Brasil", "2019–2021", "uncommon", [71, 69, 56, 69, 64, 70, 74, 73, 66, 75, 73, 74], "Chute de esquerda, intensidade e jogadas individuais no Santos."],
  ["keno", "Keno", "Brasil", "2020–2023", "uncommon", [74, 66, 51, 63, 61, 70, 74, 74, 63, 74, 65, 73], "Drible em velocidade e ataque direto ao lateral."],
  ["lucas-moura", "Lucas Moura", "Brasil", "2012–2019", "uncommon", [79, 72, 59, 68, 65, 75, 79, 77, 61, 79, 69, 77], "Aceleração com bola e condução vertical em campo aberto."],
  ["bernard", "Bernard", "Brasil", "2012–2014", "uncommon", [72, 59, 36, 58, 65, 70, 75, 72, 66, 76, 62, 74], "Leveza, agilidade e jogo associativo no Atlético campeão continental."],
  ["tayson", "Taison", "Brasil", "2017–2020", "uncommon", [75, 65, 52, 64, 66, 71, 78, 74, 65, 75, 66, 75], "Velocidade e condução por dentro ou por fora."],
  ["soteldo", "Yeferson Soteldo", "Venezuela", "2019–2023", "uncommon", [71, 57, 35, 57, 64, 67, 73, 74, 64, 80, 61, 75], "Baixo centro de gravidade e drible curto muito reconhecíveis no Brasil."],

  // Comuns
  ["rony", "Rony", "Brasil", "2020–2022", "common", [82, 76, 60, 64, 52, 83, 76, 63, 53, 67, 61, 66], "Profundidade e pressão incessantes, mesmo sem refinamento no último gesto."],
  ["ferreira", "Ferreirinha", "Brasil", "2020–2024", "common", [71, 59, 39, 57, 54, 62, 71, 69, 54, 71, 59, 71], "Arranque e drible curto como principais armas."],
  ["wesley", "Wesley Gassova", "Brasil", "2024–2026", "common", [72, 64, 46, 57, 57, 67, 75, 69, 58, 72, 61, 72], "Ponta vertical de boa aceleração e confronto individual."],
  ["ademir", "Ademir", "Brasil", "2021–2024", "common", [72, 62, 45, 58, 48, 67, 74, 62, 50, 68, 59, 64], "Velocidade para transição e ataque direto ao espaço."],
  ["erick-pulga", "Erick Pulga", "Brasil", "2024–2026", "common", [73, 62, 43, 59, 54, 64, 73, 68, 55, 73, 60, 71], "Condução agressiva pelo lado e boa chegada para finalizar."],
  ["artur", "Artur", "Brasil", "2021–2023", "common", [71, 63, 44, 61, 63, 67, 74, 69, 65, 74, 63, 71], "Canhota técnica para criar ou finalizar partindo da direita."],
  ["osvaldo", "Osvaldo", "Brasil", "2012–2014", "common", [69, 58, 38, 51, 51, 60, 70, 61, 54, 68, 53, 62], "Velocidade e condução direta marcaram sua passagem pelo São Paulo."],
  ["jorge-henrique", "Jorge Henrique", "Brasil", "2009–2012", "common", [64, 71, 49, 56, 59, 72, 67, 60, 60, 68, 59, 63], "Intensidade, pressão e disciplina tática em jogos decisivos."],
  ["dagoberto", "Dagoberto", "Brasil", "2007–2011", "common", [72, 63, 49, 64, 61, 68, 75, 71, 59, 73, 68, 73], "Arranque, drible e chute colocado em transições curtas."],
  ["vitinho", "Vitinho", "Brasil", "2018–2021", "common", [65, 62, 50, 62, 62, 61, 68, 66, 60, 69, 68, 68], "Boa técnica e chute, mas impacto menos constante durante as partidas."],
  ["romero", "Ángel Romero", "Paraguai", "2015–2024", "common", [60, 67, 46, 57, 55, 69, 61, 57, 55, 61, 59, 57], "Entrega sem bola e aparições oportunas na área."],
  ["rossi", "Léo Rossi", "Brasil", "2017–2021", "common", [66, 60, 46, 52, 52, 63, 68, 62, 56, 67, 55, 64], "Aceleração e trabalho de corredor como virtudes principais."],
  ["marlos", "Marlos", "Brasil/Ucrânia", "2016–2020", "common", [64, 63, 47, 62, 64, 66, 68, 71, 62, 74, 66, 72], "Canhota habilidosa e jogo interior partindo do lado."],
  ["geuvanio", "Geuvânio", "Brasil", "2014–2016", "common", [68, 58, 41, 57, 52, 61, 71, 65, 53, 69, 58, 68], "Drible e aceleração deram desequilíbrio ao ataque do Santos."],
];

export const WINGERS = createPool("PON", rawWingers);
