import { createPool, type RawPlayer } from "./create-pool";

// Ordem: VEL, FÍS, FOR, CHU, PAS, MOV, VIS, PLG, CON, DRI, COL, BPR.
const rawMidfielders: RawPlayer[] = [
  // Lendas
  ["maradona", "Diego Maradona", "Argentina", "1985–1990", "legend", [83, 77, 62, 87, 91, 87, 96, 87, 92, 91, 87, 87], "Visão e condução permitiam criar superioridade sem depender de estrutura."],
  ["zico", "Zico", "Brasil", "1979–1983", "legend", [77, 76, 62, 85, 90, 85, 90, 85, 85, 85, 90, 94], "Camisa 10 completo, decisivo tanto no passe quanto na finalização."],
  ["zidane", "Zinedine Zidane", "França", "1998–2003", "legend", [79, 83, 79, 85, 92, 88, 92, 92, 95, 88, 87, 88], "Controle orientado e leitura para dominar partidas sob pressão máxima."],
  ["cruyff", "Johan Cruyff", "Países Baixos", "1971–1974", "legend", [89, 82, 71, 89, 94, 94, 94, 89, 94, 94, 89, 88], "Movimentação e inteligência para reorganizar o ataque ao seu redor."],
  ["didi", "Didi", "Brasil", "1957–1962", "legend", [69, 75, 65, 82, 89, 84, 89, 91, 84, 82, 84, 89], "Ritmo, passe longo e folha seca definiram o cérebro bicampeão mundial."],
  ["ronaldinho", "Ronaldinho Gaúcho", "Brasil", "2004–2006", "legend", [84, 77, 71, 84, 86, 84, 91, 85, 91, 91, 86, 91], "Improviso, passe sem preparação, drible e bola parada de referência histórica."],

  // Épicos
  ["socrates", "Sócrates", "Brasil", "1981–1986", "epic", [66, 75, 75, 81, 83, 81, 87, 83, 83, 80, 81, 80], "Visão vertical e técnica de primeira em um meia fisicamente incomum."],
  ["kaka", "Kaká", "Brasil", "2006–2009", "epic", [85, 81, 73, 82, 82, 89, 85, 82, 83, 83, 85, 77], "Condução longa e chegada à área com ritmo de atacante."],
  ["iniesta", "Andrés Iniesta", "Espanha", "2009–2015", "epic", [74, 74, 56, 68, 86, 82, 86, 80, 86, 86, 74, 68], "Controle sob pressão e passe para romper a última linha."],
  ["modric", "Luka Modrić", "Croácia", "2014–2022", "epic", [72, 79, 54, 72, 86, 81, 86, 86, 86, 81, 75, 80], "Domínio do ritmo e resistência para influenciar todas as fases."],
  ["de-bruyne", "Kevin De Bruyne", "Bélgica", "2017–2023", "epic", [73, 79, 72, 83, 90, 85, 93, 93, 84, 82, 84, 85], "Passe vertical e cruzado criam chances que poucos enxergam."],
  ["rivaldo", "Rivaldo", "Brasil", "1998–2002", "epic", [77, 78, 69, 84, 83, 83, 84, 81, 84, 83, 84, 84], "Canhota decisiva e capacidade de marcar de praticamente qualquer zona."],

  // Raros
  ["riquelme", "Juan Román Riquelme", "Argentina", "2000–2007", "rare", [44, 61, 54, 71, 79, 75, 79, 79, 79, 78, 76, 79], "Controle de ritmo, passe e bola parada compensavam a baixa velocidade."],
  ["ozil", "Mesut Özil", "Alemanha", "2010–2016", "rare", [66, 60, 43, 65, 79, 78, 79, 78, 79, 76, 69, 69], "Último passe e ocupação inteligente entre as linhas."],
  ["juninho", "Juninho Pernambucano", "Brasil", "2001–2008", "rare", [60, 71, 58, 81, 80, 78, 80, 79, 79, 73, 80, 88], "Bola parada singular e passe longo de altíssima qualidade."],
  ["rai", "Raí", "Brasil", "1991–1994", "rare", [63, 78, 75, 81, 82, 81, 83, 82, 82, 77, 82, 81], "Liderança técnica, chegada à área e execução de último passe."],
  ["alex", "Alex de Souza", "Brasil", "2001–2009", "rare", [55, 70, 61, 81, 83, 79, 83, 81, 83, 80, 83, 83], "Canhota refinada para passe, controle e conclusão colocada."],
  ["djalminha", "Djalminha", "Brasil", "1997–2002", "rare", [68, 71, 58, 81, 83, 77, 83, 80, 83, 83, 82, 83], "Talento de improviso e drible curto em volume de produção irregular."],
  ["rivelino", "Rivellino", "Brasil", "1970–1978", "rare", [71, 78, 70, 83, 83, 81, 83, 81, 83, 83, 83, 83], "Canhota poderosa, elástico e construção ofensiva por dentro."],
  ["james", "James Rodríguez", "Colômbia", "2014–2018", "rare", [58, 66, 53, 78, 79, 76, 79, 79, 79, 74, 79, 79], "Passe e chute de esquerda em um auge de grande impacto."],
  ["aimar", "Pablo Aimar", "Argentina", "2000–2006", "rare", [71, 63, 43, 68, 80, 77, 80, 77, 80, 80, 72, 76], "Agilidade mental e física para receber e criar entre linhas."],
  ["coutinho", "Philippe Coutinho", "Brasil", "2016–2018", "rare", [70, 67, 48, 79, 79, 78, 79, 77, 79, 78, 80, 79], "Condução interior e chute colocado da entrada da área."],

  // Incomuns
  ["ganso", "Paulo Henrique Ganso", "Brasil", "2010–2016", "uncommon", [42, 55, 58, 68, 80, 60, 86, 80, 82, 75, 74, 79], "Visão e controle acima da mobilidade e intensidade."],
  ["everton-ribeiro", "Everton Ribeiro", "Brasil", "2013–2022", "uncommon", [60, 61, 43, 64, 73, 72, 73, 69, 72, 73, 68, 66], "Associação, condução curta e constância em alto nível nacional."],
  ["arrascaeta", "Giorgian de Arrascaeta", "Uruguai", "2019–2024", "uncommon", [65, 66, 50, 76, 76, 76, 79, 75, 78, 76, 79, 78], "Último passe e chegada decisiva em jogos grandes no Brasil."],
  ["renato-augusto", "Renato Augusto", "Brasil", "2015–2022", "uncommon", [57, 70, 63, 70, 76, 74, 76, 76, 75, 70, 74, 69], "Controle sob pressão e passe vertical com boa presença física."],
  ["oscar", "Oscar", "Brasil", "2012–2016", "uncommon", [68, 73, 54, 71, 76, 78, 77, 72, 76, 75, 73, 67], "Mobilidade e intensidade para criar sem abandonar a pressão."],
  ["jadson", "Jadson", "Brasil", "2011–2017", "uncommon", [48, 60, 42, 66, 73, 69, 73, 70, 73, 66, 72, 73], "Passe curto, bola parada e ocupação inteligente do espaço central."],
  ["thiago-neves", "Thiago Neves", "Brasil", "2007–2017", "uncommon", [54, 63, 51, 72, 72, 70, 75, 71, 73, 68, 73, 75], "Canhota de chute forte e boa leitura para aparecer na área."],
  ["petkovic", "Dejan Petković", "Sérvia", "1999–2009", "uncommon", [48, 58, 49, 71, 74, 66, 74, 74, 72, 68, 72, 76], "Bola parada e passe que marcaram época no futebol brasileiro."],
  ["conca", "Darío Conca", "Argentina", "2008–2013", "uncommon", [58, 69, 43, 67, 74, 76, 77, 73, 76, 76, 71, 76], "Volume criativo e resistência para comandar o meio durante toda a partida."],
  ["valdivia", "Jorge Valdivia", "Chile", "2007–2017", "uncommon", [46, 56, 43, 60, 72, 67, 76, 71, 75, 72, 66, 72], "Passe imprevisível e controle entre linhas, limitado pela disponibilidade física."],
  ["veiga", "Raphael Veiga", "Brasil", "2021–2024", "uncommon", [61, 69, 58, 75, 75, 78, 78, 72, 75, 70, 78, 80], "Chute colocado, bola parada e chegada recorrente na área."],
  ["alan-patrick", "Alan Patrick", "Brasil", "2022–2025", "uncommon", [49, 62, 51, 70, 74, 70, 77, 74, 77, 74, 74, 75], "Ritmo próprio, controle e passe vertical como centro do time."],
  ["scarpa", "Gustavo Scarpa", "Brasil", "2021–2024", "uncommon", [60, 69, 51, 69, 75, 76, 76, 75, 73, 67, 72, 79], "Volume de jogo, cruzamento e bola parada com grande regularidade."],
  ["nenê", "Nenê", "Brasil", "2010–2017", "uncommon", [51, 61, 48, 70, 73, 68, 74, 70, 74, 68, 74, 77], "Canhota técnica para bater parado, finalizar e encontrar o último passe."],

  // Comuns
  ["luan", "Luan", "Brasil", "2016–2018", "common", [60, 61, 46, 65, 69, 71, 72, 65, 72, 69, 71, 65], "Movimentação e associação foram decisivas no auge pelo Grêmio."],
  ["douglas", "Douglas", "Brasil", "2015–2017", "common", [35, 49, 45, 60, 69, 56, 69, 68, 69, 60, 68, 69], "Passe e controle privilegiados em contraste com mobilidade muito baixa."],
  ["diego", "Diego Ribas", "Brasil", "2006–2019", "common", [51, 62, 50, 63, 70, 66, 71, 69, 71, 66, 67, 71], "Técnica, liderança e controle de ritmo em diferentes fases da carreira."],
  ["carlos-alberto", "Carlos Alberto", "Brasil", "2004–2010", "common", [58, 63, 55, 60, 62, 63, 66, 60, 67, 66, 64, 62], "Condução e chegada fortes, com auge curto e irregular."],
  ["marlone", "Marlone", "Brasil", "2015–2017", "common", [54, 57, 40, 58, 59, 59, 62, 57, 62, 62, 63, 62], "Boa técnica de média distância e momentos de criação por dentro."],
  ["matheus-pereira", "Matheus Pereira", "Brasil", "2023–2026", "common", [52, 60, 42, 61, 68, 65, 71, 67, 71, 68, 67, 71], "Canhota criativa para controlar posse e acelerar com passe."],
  ["payet", "Dimitri Payet", "França", "2015–2023", "common", [49, 57, 54, 69, 71, 64, 72, 71, 72, 69, 72, 76], "Técnica e bola parada sobreviveram à queda de mobilidade."],
  ["giovanni", "Giovanni", "Brasil", "1995–2001", "common", [53, 61, 47, 68, 72, 68, 76, 69, 74, 72, 73, 72], "Controle elegante, passe e chegada à área marcaram o ídolo santista."],
  ["lucas-lima", "Lucas Lima", "Brasil", "2015–2017", "common", [52, 58, 37, 58, 67, 64, 70, 63, 68, 66, 60, 66], "Passe entre linhas e condução curta em seu melhor período."],
  ["ze-roberto", "Zé Roberto", "Brasil", "1998–2012", "common", [62, 72, 48, 60, 67, 71, 68, 66, 70, 67, 62, 59], "Versatilidade, fôlego e segurança técnica por muitos anos."],
  ["ricardinho", "Ricardinho", "Brasil", "2000–2006", "common", [47, 57, 40, 57, 66, 62, 68, 64, 67, 60, 63, 70], "Passe e bola parada como organizador do meio."],
  ["marcelinho-carioca", "Marcelinho Carioca", "Brasil", "1994–1999", "common", [48, 54, 38, 67, 65, 61, 68, 65, 65, 60, 69, 76], "Especialista em bola parada com bom passe e chute de média distância."],
  ["maicosuel", "Maicosuel", "Brasil", "2009–2012", "common", [65, 58, 39, 58, 60, 64, 62, 58, 64, 68, 60, 57], "Arranque e condução eram superiores à constância de decisão."],
  ["montillo", "Walter Montillo", "Argentina", "2010–2014", "common", [57, 61, 38, 61, 68, 69, 69, 64, 69, 68, 65, 66], "Volume criativo e condução vertical bem conhecidos no Brasil."],
];

export const MIDFIELDERS = createPool("MEI", rawMidfielders);
