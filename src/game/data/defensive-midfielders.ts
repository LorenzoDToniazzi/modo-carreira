import { createPool, type RawPlayer } from "./create-pool";

// Ordem: VEL, FÍS, FOR, PAS, MOV, DES, INT, FÔL, VIS, PLG, PRE, CON.
const rawDefensiveMidfielders: RawPlayer[] = [
  // Lendas
  ["busquets", "Sergio Busquets", "Espanha", "2009–2015", "legend", [48, 81, 73, 90, 86, 86, 95, 86, 90, 86, 93, 90], "Posicionamento e saída sob pressão faziam o jogo parecer mais lento ao seu redor."],
  ["matthaus", "Lothar Matthäus", "Alemanha", "1986–1991", "legend", [86, 89, 84, 89, 93, 89, 89, 96, 89, 89, 89, 89], "Intensidade, cobertura e condução davam influência de área a área."],
  ["falcao", "Falcão", "Brasil", "1979–1983", "legend", [72, 86, 72, 92, 87, 85, 87, 92, 97, 92, 92, 92], "Técnica e leitura para organizar o meio sem abandonar a chegada ofensiva."],
  ["pirlo", "Andrea Pirlo", "Itália", "2003–2012", "legend", [51, 73, 59, 95, 83, 75, 86, 86, 95, 95, 93, 93], "Passe longo e visão históricos, protegidos por controle e posicionamento."],
  ["redondo", "Fernando Redondo", "Argentina", "1994–2000", "legend", [70, 84, 73, 86, 86, 86, 91, 86, 91, 86, 93, 91], "Desarme limpo e resistência à pressão combinados com elegância técnica."],

  // Épicos
  ["kante", "N'Golo Kanté", "França", "2015–2021", "epic", [83, 90, 72, 78, 90, 90, 90, 90, 78, 72, 83, 83], "Cobertura, fôlego e recuperação de bola em volume excepcional."],
  ["casemiro", "Casemiro", "Brasil", "2016–2022", "epic", [61, 81, 81, 74, 77, 86, 86, 81, 74, 79, 74, 73], "Proteção central, desarme e imposição física em jogos grandes."],
  ["vieira", "Patrick Vieira", "França", "1998–2004", "epic", [84, 92, 90, 82, 88, 91, 90, 94, 82, 80, 86, 84], "Alcance físico e técnico para roubar e carregar a bola."],
  ["makelele", "Claude Makélélé", "França", "2000–2006", "epic", [72, 85, 76, 82, 84, 90, 90, 85, 81, 76, 84, 83], "Equilíbrio posicional e proteção da defesa definiram uma função."],
  ["dunga", "Dunga", "Brasil", "1989–1994", "epic", [59, 82, 74, 80, 80, 82, 82, 82, 81, 81, 80, 80], "Liderança, combate e passe vertical sustentaram o meio campeão."],
  ["gilberto-silva", "Gilberto Silva", "Brasil", "2002–2008", "epic", [63, 83, 81, 78, 81, 83, 88, 88, 78, 76, 79, 78], "Cobertura silenciosa, disciplina e força para liberar os criadores."],
  ["xabi-alonso", "Xabi Alonso", "Espanha", "2008–2014", "epic", [54, 78, 71, 89, 83, 82, 84, 82, 89, 89, 84, 84], "Passe longo e controle de ritmo desde a base da jogada."],

  // Raros
  ["rodri", "Rodri", "Espanha", "2022–2025", "rare", [54, 81, 77, 81, 81, 80, 81, 81, 81, 81, 86, 81], "Controle sob pressão e posicionamento sustentam posse e proteção."],
  ["yaya-toure", "Yaya Touré", "Costa do Marfim", "2011–2014", "rare", [78, 84, 88, 82, 86, 74, 72, 80, 84, 82, 87, 85], "Força e condução capazes de atravessar o meio por conta própria."],
  ["essien", "Michael Essien", "Gana", "2005–2010", "rare", [82, 86, 84, 74, 84, 82, 80, 89, 72, 76, 78, 74], "Explosão física, cobertura e chute para jogar em todo o meio."],
  ["gattuso", "Gennaro Gattuso", "Itália", "2003–2008", "rare", [57, 78, 74, 66, 77, 78, 78, 78, 64, 59, 66, 66], "Pressão, entrega e desarme acima da qualidade construtiva."],
  ["mascherano", "Javier Mascherano", "Argentina", "2007–2014", "rare", [64, 78, 65, 73, 78, 78, 78, 78, 71, 69, 75, 74], "Antecipação e agressividade controlada para proteger grandes espaços."],
  ["fernandinho", "Fernandinho", "Brasil", "2013–2019", "rare", [65, 79, 65, 77, 79, 79, 79, 79, 76, 75, 77, 77], "Leitura tática, pressão e passe seguro na base do Manchester City."],
  ["ramires", "Ramires", "Brasil", "2010–2014", "rare", [78, 78, 60, 69, 78, 75, 76, 78, 68, 65, 73, 69], "Fôlego e velocidade para cobrir o campo inteiro e atacar espaços."],
  ["paulinho", "Paulinho", "Brasil", "2012–2018", "rare", [65, 77, 72, 68, 77, 73, 73, 77, 67, 66, 70, 67], "Chegada à área e força de área a área como diferenciais."],
  ["cerezo", "Toninho Cerezo", "Brasil", "1978–1985", "rare", [65, 79, 69, 80, 80, 79, 80, 80, 80, 80, 80, 80], "Passe, mobilidade e leitura fizeram um volante muito completo."],
  ["clodoaldo", "Clodoaldo", "Brasil", "1969–1974", "rare", [62, 76, 65, 76, 77, 77, 79, 79, 76, 74, 76, 77], "Equilíbrio defensivo e qualidade técnica no time de 1970."],

  // Incomuns
  ["fabinho", "Fabinho", "Brasil", "2018–2022", "uncommon", [57, 77, 71, 73, 75, 77, 78, 75, 71, 73, 75, 73], "Cobertura, envergadura e passe vertical como primeiro volante."],
  ["bruno-guimaraes", "Bruno Guimarães", "Brasil", "2022–2026", "uncommon", [59, 73, 57, 73, 74, 73, 73, 76, 74, 74, 77, 76], "Resistência à pressão e passe progressivo com boa intensidade defensiva."],
  ["joao-gomes", "João Gomes", "Brasil", "2022–2026", "uncommon", [66, 76, 61, 63, 75, 75, 74, 82, 62, 60, 67, 65], "Pressão e fôlego de elite, com construção ainda mais simples."],
  ["gerson", "Gerson", "Brasil", "2019–2025", "uncommon", [57, 75, 72, 73, 73, 70, 72, 75, 73, 73, 77, 76], "Força para proteger a bola e qualidade para conduzir a saída."],
  ["mineiro", "Mineiro", "Brasil", "2005–2008", "uncommon", [59, 72, 53, 63, 72, 72, 73, 75, 60, 60, 68, 64], "Mobilidade e bote limpo no meio campeão mundial pelo São Paulo."],
  ["josue", "Josué", "Brasil", "2007–2013", "uncommon", [52, 71, 54, 64, 71, 71, 73, 73, 61, 60, 69, 65], "Disciplina tática e cobertura de espaços com pouca firula."],
  ["felipe-melo", "Felipe Melo", "Brasil", "2008–2018", "uncommon", [50, 77, 76, 68, 71, 76, 73, 73, 67, 73, 65, 67], "Força, combate e passe longo alternados com risco disciplinar."],
  ["sandro", "Sandro", "Brasil", "2010–2014", "uncommon", [56, 74, 73, 62, 70, 73, 71, 73, 61, 61, 65, 64], "Atletismo e desarme foram o centro de um auge abreviado por lesões."],
  ["lucas-leiva", "Lucas Leiva", "Brasil", "2010–2018", "uncommon", [49, 73, 60, 68, 71, 71, 74, 73, 66, 64, 71, 69], "Posicionamento e simplicidade para dar estabilidade ao meio."],
  ["hernanes", "Hernanes", "Brasil", "2010–2015", "uncommon", [55, 72, 61, 75, 74, 75, 68, 74, 74, 75, 74, 73], "Ambidestria, chute e passe longo em um volante de vocação ofensiva."],
  ["danilo", "Danilo Barbosa", "Brasil", "2017–2021", "uncommon", [51, 70, 65, 62, 68, 69, 70, 71, 60, 62, 65, 64], "Volante físico e funcional na circulação curta."],
  ["alllan", "Allan", "Brasil", "2017–2021", "uncommon", [60, 75, 56, 67, 72, 73, 73, 76, 63, 60, 73, 68], "Pressão e recuperação com boa capacidade de sair curto."],
  ["pierre", "Pierre", "Brasil", "2009–2013", "uncommon", [49, 74, 64, 58, 73, 75, 74, 77, 53, 51, 62, 58], "Marcador incansável e disciplinado, pouco envolvido na criação."],
  ["arouca", "Arouca", "Brasil", "2010–2015", "uncommon", [63, 74, 52, 71, 76, 74, 75, 78, 68, 66, 74, 72], "Mobilidade, condução e passe para conectar as duas áreas."],

  // Comuns
  ["ramiro", "Ramiro", "Brasil", "2016–2020", "common", [59, 71, 50, 60, 72, 69, 71, 75, 55, 53, 60, 60], "Fôlego e disciplina tática muito acima do brilho técnico."],
  ["willians", "Willians", "Brasil", "2009–2013", "common", [54, 71, 58, 49, 69, 69, 68, 73, 46, 42, 54, 49], "Recuperação de bola e intensidade, com passe bastante limitado."],
  ["marcio-araujo", "Márcio Araújo", "Brasil", "2011–2017", "common", [53, 68, 49, 56, 68, 67, 69, 71, 53, 50, 60, 57], "Ocupação de espaço e regularidade para cumprir função simples."],
  ["elias", "Elias", "Brasil", "2009–2015", "common", [62, 73, 58, 65, 74, 66, 67, 74, 63, 62, 67, 63], "Chegada à área e mobilidade como segundo volante."],
  ["jucilei", "Jucilei", "Brasil", "2010–2017", "common", [48, 72, 72, 62, 65, 68, 69, 66, 61, 60, 65, 62], "Força e proteção de bola, com menor raio de ação."],
  ["richarlyson", "Richarlyson", "Brasil", "2007–2011", "common", [61, 73, 55, 62, 73, 72, 72, 77, 59, 58, 63, 62], "Versatilidade e fôlego para ocupar várias funções defensivas."],
  ["nilton", "Nilton", "Brasil", "2013–2017", "common", [40, 69, 66, 58, 59, 66, 66, 62, 54, 59, 57, 57], "Força, jogo aéreo e chute ocasional de fora da área."],
  ["wellington", "Wellington", "Brasil", "2012–2016", "common", [50, 67, 54, 52, 66, 69, 67, 69, 48, 46, 57, 51], "Combate e entrega em uma função de baixa criação."],
  ["jair", "Jair", "Brasil", "2018–2022", "common", [47, 70, 61, 58, 68, 66, 68, 70, 58, 60, 61, 58], "Força e chegada equilibradas em um volante funcional."],
  ["otavio", "Otávio", "Brasil", "2020–2024", "common", [51, 72, 55, 63, 71, 71, 71, 72, 62, 60, 68, 63], "Posicionamento e circulação segura na frente da defesa."],
  ["thiago-maia", "Thiago Maia", "Brasil", "2016–2022", "common", [54, 70, 52, 62, 70, 67, 70, 70, 61, 59, 66, 62], "Volante móvel e seguro, sem uma característica dominante."],
  ["gregore", "Gregore", "Brasil", "2018–2025", "common", [50, 71, 58, 58, 70, 70, 68, 74, 52, 51, 59, 58], "Combate e volume defensivo como motor do meio."],
  ["ze-rafael", "Zé Rafael", "Brasil", "2019–2023", "common", [51, 72, 64, 66, 70, 70, 70, 72, 65, 64, 72, 69], "Proteção de bola e intensidade em função híbrida."],
  ["dourado", "Rodrigo Dourado", "Brasil", "2016–2020", "common", [44, 68, 58, 58, 64, 67, 70, 67, 56, 59, 62, 58], "Leitura defensiva e passe simples à frente da zaga."],
];

export const DEFENSIVE_MIDFIELDERS = createPool("VOL", rawDefensiveMidfielders);
