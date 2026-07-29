import { createPool, type RawPlayer } from "./create-pool";

// Ordem: REF, POS, ENC, AÉR, REP, 1X1, PÉS, CNC, AGI, POT, PÊN, SAÍ.
const rawGoalkeepers: RawPlayer[] = [
  // Lendas
  ["yashin", "Lev Yashin", "União Soviética", "1958–1966", "legend", [93, 91, 89, 84, 80, 89, 65, 91, 89, 83, 89, 84], "Reflexo, comando e leitura estabeleceram a referência histórica da posição."],
  ["buffon", "Gianluigi Buffon", "Itália", "2002–2012", "legend", [90, 92, 90, 90, 84, 92, 77, 92, 85, 85, 85, 85], "Posicionamento e consistência quase sem fraquezas durante o auge."],
  ["neuer", "Manuel Neuer", "Alemanha", "2013–2020", "legend", [88, 90, 84, 87, 94, 88, 97, 90, 86, 94, 80, 97], "Saída rasteira e jogo com os pés redefiniram o alcance do goleiro."],
  ["casillas", "Iker Casillas", "Espanha", "2007–2012", "legend", [87, 87, 83, 79, 80, 87, 74, 87, 87, 82, 83, 87], "Reflexos e um contra um excepcionais em espaço curto."],
  ["taffarel", "Cláudio Taffarel", "Brasil", "1989–1998", "legend", [91, 94, 90, 88, 78, 92, 70, 95, 88, 78, 96, 88], "Frieza, posicionamento e pênaltis marcaram a seleção campeã."],

  // Épicos
  ["dida", "Dida", "Brasil", "2002–2007", "epic", [86, 81, 80, 81, 72, 86, 68, 81, 78, 80, 86, 78], "Envergadura e defesa de pênaltis em grandes decisões."],
  ["schmeichel", "Peter Schmeichel", "Dinamarca", "1992–1999", "epic", [88, 88, 83, 83, 81, 83, 70, 83, 82, 83, 83, 83], "Presença física e fechamento agressivo de ângulo."],
  ["kahn", "Oliver Kahn", "Alemanha", "1999–2003", "epic", [79, 79, 79, 79, 73, 79, 63, 79, 79, 79, 79, 79], "Explosão, concentração e imposição em partidas de enorme pressão."],
  ["cech", "Petr Čech", "Tchéquia", "2004–2012", "epic", [86, 90, 92, 90, 80, 88, 70, 91, 83, 84, 87, 83], "Posicionamento e encaixe deram consistência histórica na Premier League."],
  ["van-der-sar", "Edwin van der Sar", "Países Baixos", "1995–2009", "epic", [84, 88, 87, 90, 88, 86, 92, 90, 78, 87, 82, 86], "Altura, calma e jogo com os pés anteciparam o goleiro moderno."],
  ["julio-cesar", "Júlio César", "Brasil", "2008–2011", "epic", [93, 90, 86, 84, 78, 94, 74, 92, 92, 86, 93, 91], "Reflexo e um contra um foram centrais no auge da Inter."],
  ["alisson", "Alisson", "Brasil", "2018–2024", "epic", [86, 90, 83, 85, 86, 92, 89, 89, 83, 87, 79, 91], "Posicionamento e um contra um reduzem a necessidade de defesas espalhafatosas."],

  // Raros
  ["marcos", "Marcos", "Brasil", "1999–2005", "rare", [74, 74, 72, 72, 64, 74, 57, 74, 74, 71, 74, 74], "Reflexo, decisões e pênaltis fizeram um goleiro de jogos grandes."],
  ["cassio", "Cássio", "Brasil", "2012–2022", "rare", [86, 84, 80, 83, 70, 87, 65, 90, 78, 78, 91, 82], "Envergadura, concentração e defesa de pênaltis em decisões construíram sua identidade."],
  ["rogerio-ceni", "Rogério Ceni", "Brasil", "2000–2008", "rare", [74, 78, 76, 74, 90, 78, 92, 90, 70, 89, 87, 80], "Reposição, liderança e bola parada sem deixar de ser goleiro seguro."],
  ["courtois", "Thibaut Courtois", "Bélgica", "2017–2024", "rare", [88, 87, 82, 89, 70, 91, 61, 86, 74, 84, 78, 80], "Alcance e fechamento de ângulo potencializados por enorme estatura."],
  ["oblak", "Jan Oblak", "Eslovênia", "2016–2021", "rare", [76, 76, 76, 76, 68, 76, 62, 76, 73, 73, 76, 74], "Posicionamento e encaixe com baixíssima taxa de erro."],
  ["ederson", "Ederson", "Brasil", "2018–2024", "rare", [72, 78, 66, 76, 94, 78, 96, 82, 74, 95, 69, 92], "Passe e reposição transformam o goleiro em primeiro construtor."],
  ["zoff", "Dino Zoff", "Itália", "1973–1982", "rare", [73, 75, 75, 75, 70, 75, 62, 75, 70, 73, 73, 72], "Posicionamento e concentração sustentaram longevidade incomum."],
  ["chilavert", "José Luis Chilavert", "Paraguai", "1995–2001", "rare", [77, 79, 75, 81, 89, 77, 85, 87, 71, 91, 87, 75], "Personalidade, pênaltis e reposição potente marcaram época."],
  ["higuita", "René Higuita", "Colômbia", "1989–1995", "rare", [73, 65, 60, 68, 73, 73, 73, 63, 73, 72, 71, 73], "Jogo fora da área e técnica extraordinários acompanhados de risco constante."],
  ["emiliano-martinez", "Emiliano Martínez", "Argentina", "2021–2024", "rare", [81, 80, 74, 80, 68, 84, 64, 88, 79, 78, 92, 82], "Concentração e pênaltis cresceram sob a maior pressão."],

  // Incomuns
  ["fabio", "Fábio", "Brasil", "2010–2023", "uncommon", [78, 80, 79, 74, 70, 78, 72, 84, 75, 74, 82, 76], "Regularidade e longevidade com excelente posicionamento."],
  ["victor", "Victor", "Brasil", "2012–2015", "uncommon", [70, 68, 67, 66, 57, 70, 50, 70, 67, 65, 70, 66], "Reflexos e pênaltis foram decisivos na Libertadores do Atlético."],
  ["weverton", "Weverton", "Brasil", "2019–2024", "uncommon", [76, 78, 76, 76, 73, 77, 72, 82, 73, 76, 82, 75], "Segurança, jogo com os pés e constância em time dominante."],
  ["jefferson", "Jefferson", "Brasil", "2011–2015", "uncommon", [70, 68, 66, 66, 58, 70, 53, 70, 70, 66, 70, 70], "Reflexo e agilidade sustentaram grandes atuações mesmo sob pressão."],
  ["diego-alves", "Diego Alves", "Brasil", "2010–2018", "uncommon", [69, 68, 66, 66, 61, 70, 56, 69, 66, 68, 77, 66], "Especialista em pênaltis, com bons reflexos em curta distância."],
  ["grohe", "Marcelo Grohe", "Brasil", "2015–2018", "uncommon", [70, 69, 68, 68, 60, 70, 55, 70, 70, 67, 70, 70], "Reflexo e um contra um produziram defesas decisivas na Libertadores."],
  ["keylor-navas", "Keylor Navas", "Costa Rica", "2014–2020", "uncommon", [72, 72, 70, 67, 63, 72, 58, 72, 72, 70, 72, 72], "Agilidade e decisões sustentaram três Champions consecutivas."],
  ["ochoa", "Guillermo Ochoa", "México", "2014–2022", "uncommon", [72, 68, 58, 49, 60, 68, 54, 69, 69, 65, 69, 67], "Reflexo em torneios grandes acima do domínio aéreo e encaixe."],
  ["de-gea", "David de Gea", "Espanha", "2015–2018", "uncommon", [69, 66, 63, 58, 55, 69, 54, 68, 69, 66, 69, 69], "Reflexos e defesas com os pés compensavam menor controle da área."],
  ["lloris", "Hugo Lloris", "França", "2012–2018", "uncommon", [73, 72, 70, 69, 68, 73, 61, 73, 73, 69, 70, 73], "Agilidade e saída rápida para controlar profundidade."],
  ["donnarumma", "Gianluigi Donnarumma", "Itália", "2021–2025", "uncommon", [71, 71, 68, 71, 63, 71, 55, 68, 68, 70, 71, 68], "Envergadura, reflexo e pênaltis com alguma oscilação técnica."],
  ["bento", "Bento", "Brasil", "2023–2025", "uncommon", [74, 70, 71, 72, 69, 76, 66, 72, 74, 71, 78, 76], "Reflexo e segurança em ascensão no auge recente."],
  ["everson", "Everson", "Brasil", "2021–2025", "uncommon", [70, 72, 66, 72, 82, 71, 84, 78, 67, 84, 74, 77], "Jogo com os pés e reposição fortes sem abandonar a defesa do gol."],
  ["santos", "Santos", "Brasil", "2019–2022", "uncommon", [76, 72, 72, 70, 64, 77, 59, 80, 75, 70, 84, 78], "Reflexo e pênaltis marcaram o auge no Athletico."],

  // Comuns
  ["danrlei", "Danrlei", "Brasil", "1995–2001", "common", [67, 64, 64, 63, 53, 68, 47, 69, 65, 61, 68, 64], "Personalidade e reflexos fizeram um goleiro copeiro no Grêmio."],
  ["joao-paulo", "João Paulo", "Brasil", "2020–2024", "common", [71, 66, 62, 58, 57, 71, 54, 68, 68, 64, 65, 66], "Reflexo e volume de defesas sob muita exposição."],
  ["hugo-souza", "Hugo Souza", "Brasil", "2024–2026", "common", [72, 66, 61, 68, 55, 70, 53, 66, 66, 68, 74, 68], "Envergadura e pênaltis, ainda com oscilações de segurança."],
  ["muralha", "Alex Muralha", "Brasil", "2015–2017", "common", [66, 59, 53, 54, 51, 64, 46, 54, 64, 59, 65, 61], "Bom reflexo no auge, mas concentração e domínio aéreo vulneráveis."],
  ["tiago-volpi", "Tiago Volpi", "Brasil", "2019–2024", "common", [70, 64, 62, 61, 72, 68, 66, 61, 69, 74, 78, 66], "Reposição e pênaltis convivem com fases de instabilidade."],
  ["rafael-cabral", "Rafael Cabral", "Brasil", "2011–2022", "common", [66, 65, 63, 65, 59, 65, 55, 66, 63, 65, 67, 65], "Goleiro equilibrado e experiente, sem atributo singular."],
  ["vanderlei", "Vanderlei", "Brasil", "2016–2019", "common", [68, 64, 64, 61, 53, 66, 49, 69, 65, 61, 65, 64], "Reflexo e regularidade no auge pelo Santos."],
  ["fernando-prass", "Fernando Prass", "Brasil", "2013–2017", "common", [67, 68, 67, 67, 59, 70, 58, 75, 67, 67, 72, 67], "Liderança, segurança e pênaltis em anos decisivos do Palmeiras."],
  ["diego-cavalieri", "Diego Cavalieri", "Brasil", "2011–2014", "common", [68, 66, 66, 66, 56, 68, 54, 71, 67, 64, 67, 66], "Posicionamento e reflexo no Fluminense campeão."],
  ["renan-ribeiro", "Renan Ribeiro", "Brasil", "2016–2020", "common", [62, 61, 56, 58, 55, 63, 51, 59, 62, 61, 63, 62], "Agilidade e um contra um acima da concentração."],
  ["clemer", "Clemer", "Brasil", "2006–2009", "common", [62, 64, 63, 64, 52, 63, 44, 68, 59, 60, 68, 62], "Experiência, concentração e pênaltis no Internacional campeão."],
  ["harlei", "Harlei", "Brasil", "2005–2012", "common", [63, 65, 65, 63, 54, 63, 44, 69, 61, 61, 67, 63], "Longevidade e segurança como símbolo do Goiás."],
  ["sidney", "Sidão", "Brasil", "2016–2018", "common", [62, 57, 54, 55, 57, 64, 54, 49, 61, 62, 70, 59], "Pênaltis foram seu pico claro, mas erros de concentração pesaram."],
  ["mailson", "Maílson", "Brasil", "2018–2021", "common", [64, 60, 57, 58, 53, 62, 50, 62, 64, 61, 65, 64], "Reflexo e pênaltis em bom nível nacional."],
];

export const GOALKEEPERS = createPool("GOL", rawGoalkeepers);
