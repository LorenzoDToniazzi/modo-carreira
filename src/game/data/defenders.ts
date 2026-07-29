import { createPool, type RawPlayer } from "./create-pool";

// Ordem: VEL, FÍS, FOR, PAS, AÉR, DES, INT, TEM, MAR, CNC, REC, CON.
const rawDefenders: RawPlayer[] = [
  // Lendas
  ["maldini", "Paolo Maldini", "Itália", "1989–2003", "legend", [84, 87, 83, 85, 87, 91, 91, 96, 93, 93, 91, 87], "Tempo de bola e marcação quase sem falhas em qualquer zona defensiva."],
  ["beckenbauer", "Franz Beckenbauer", "Alemanha", "1966–1974", "legend", [73, 82, 72, 86, 82, 82, 86, 86, 82, 86, 82, 86], "Antecipação e passe transformaram o zagueiro em primeiro organizador."],
  ["baresi", "Franco Baresi", "Itália", "1988–1994", "legend", [75, 84, 72, 84, 80, 89, 94, 91, 91, 91, 89, 84], "Leitura da linha e antecipação compensavam qualquer desvantagem física."],
  ["domingos", "Domingos da Guia", "Brasil", "1934–1945", "legend", [71, 83, 80, 83, 82, 88, 88, 88, 88, 83, 83, 88], "Elegância para desarmar e sair jogando muito antes de isso virar padrão."],
  ["thiago-silva", "Thiago Silva", "Brasil", "2011–2021", "legend", [82, 86, 80, 88, 88, 92, 94, 95, 94, 96, 90, 90], "Posicionamento, liderança e correção técnica mantiveram elite por muitos anos."],

  // Épicos
  ["nesta", "Alessandro Nesta", "Itália", "1999–2006", "epic", [75, 83, 76, 80, 82, 88, 88, 88, 88, 88, 83, 82], "Desarme preciso e controle do duelo sem depender de contato excessivo."],
  ["cannavaro", "Fabio Cannavaro", "Itália", "2002–2006", "epic", [78, 89, 81, 76, 84, 89, 89, 89, 89, 89, 89, 79], "Impulsão e tempo defensivo eliminaram a desvantagem de altura."],
  ["sergio-ramos", "Sergio Ramos", "Espanha", "2012–2018", "epic", [80, 87, 88, 80, 93, 87, 84, 88, 89, 82, 84, 82], "Agressividade, jogo aéreo e capacidade de decidir nas duas áreas."],
  ["lucio", "Lúcio", "Brasil", "2002–2010", "epic", [86, 90, 92, 78, 88, 86, 82, 84, 84, 80, 88, 82], "Força e condução vertical em um zagueiro de potência rara."],
  ["aldair", "Aldair", "Brasil", "1990–1998", "epic", [76, 84, 78, 86, 87, 89, 91, 92, 91, 92, 86, 89], "Serenidade e técnica para antecipar e iniciar o ataque."],
  ["puyol", "Carles Puyol", "Espanha", "2005–2011", "epic", [78, 92, 84, 70, 87, 91, 90, 92, 94, 96, 90, 72], "Concentração, coragem e correção em cobertura."],
  ["van-dijk", "Virgil van Dijk", "Países Baixos", "2018–2022", "epic", [81, 84, 88, 82, 90, 84, 87, 88, 90, 89, 85, 84], "Força, velocidade controlada e domínio aéreo para defender grandes espaços."],

  // Raros
  ["rio-ferdinand", "Rio Ferdinand", "Inglaterra", "2006–2011", "rare", [80, 76, 74, 82, 75, 80, 82, 84, 82, 84, 86, 84], "Velocidade de cobertura e saída limpa em uma defesa dominante."],
  ["vidic", "Nemanja Vidić", "Sérvia", "2007–2011", "rare", [53, 74, 74, 62, 74, 74, 74, 74, 74, 74, 72, 62], "Contato, cabeceio e defesa da área em nível de imposição."],
  ["terry", "John Terry", "Inglaterra", "2004–2010", "rare", [49, 75, 75, 67, 75, 75, 75, 75, 75, 75, 70, 67], "Leitura, bloqueio e comando da linha dentro da própria área."],
  ["pepe", "Pepe", "Portugal", "2012–2021", "rare", [80, 84, 84, 70, 81, 86, 82, 84, 87, 78, 84, 72], "Agressividade e velocidade para dominar o duelo direto."],
  ["juan", "Juan", "Brasil", "2005–2011", "rare", [65, 79, 74, 76, 79, 79, 79, 79, 79, 79, 78, 76], "Regularidade e leitura defensiva com boa técnica de saída."],
  ["miranda", "Miranda", "Brasil", "2013–2018", "rare", [65, 78, 73, 74, 76, 78, 78, 78, 78, 78, 76, 75], "Marcação limpa e concentração em bloco compacto."],
  ["marquinhos", "Marquinhos", "Brasil", "2018–2024", "rare", [73, 78, 67, 80, 77, 80, 80, 80, 80, 80, 80, 80], "Velocidade de cobertura e passe permitem defender longe da área."],
  ["david-luiz", "David Luiz", "Brasil", "2012–2017", "rare", [65, 78, 76, 78, 75, 75, 74, 76, 73, 70, 76, 76], "Passe longo e agressividade com risco maior de erro posicional."],
  ["alex-costa", "Alex Costa", "Brasil", "2007–2012", "rare", [53, 77, 77, 72, 77, 76, 74, 77, 77, 77, 72, 73], "Força, jogo aéreo e chute de bola parada em um zagueiro dominante."],
  ["bellini", "Bellini", "Brasil", "1958–1962", "rare", [55, 76, 76, 66, 76, 76, 76, 76, 76, 76, 72, 67], "Comando, concentração e força no centro da defesa campeã mundial."],

  // Incomuns
  ["militao", "Éder Militão", "Brasil", "2021–2024", "uncommon", [86, 74, 72, 66, 78, 76, 73, 77, 73, 68, 88, 70], "Velocidade de recuperação e agressividade em campo aberto."],
  ["luizao", "Luisão", "Brasil", "2009–2015", "uncommon", [39, 70, 70, 57, 70, 67, 67, 70, 70, 70, 61, 58], "Altura, liderança e domínio da própria área."],
  ["dede", "Dedé", "Brasil", "2011–2018", "uncommon", [56, 73, 73, 61, 73, 71, 69, 73, 71, 69, 69, 62], "Potência física e aérea, com auge afetado por lesões."],
  ["rever", "Réver", "Brasil", "2010–2021", "uncommon", [41, 71, 70, 59, 71, 67, 68, 71, 71, 71, 63, 62], "Jogo aéreo e liderança em uma carreira nacional muito vencedora."],
  ["geromel", "Pedro Geromel", "Brasil", "2016–2019", "uncommon", [51, 71, 62, 67, 69, 73, 73, 73, 73, 73, 71, 69], "Antecipação e regularidade deram segurança ao Grêmio campeão."],
  ["ricardo-rocha", "Ricardo Rocha", "Brasil", "1989–1994", "uncommon", [51, 73, 71, 64, 72, 73, 73, 73, 73, 73, 70, 66], "Marcação firme e liderança em defesas de alto nível."],
  ["mozer", "Mozer", "Brasil", "1987–1992", "uncommon", [55, 74, 74, 66, 74, 72, 72, 74, 74, 72, 71, 66], "Força e imposição, com boa capacidade para sair jogando."],
  ["gustavo-gomez", "Gustavo Gómez", "Paraguai", "2019–2024", "uncommon", [57, 75, 75, 66, 75, 75, 75, 75, 75, 81, 72, 67], "Liderança, concentração e bola aérea no Palmeiras multicampeão."],
  ["kannemann", "Walter Kannemann", "Argentina", "2016–2021", "uncommon", [48, 70, 66, 53, 66, 70, 69, 70, 70, 70, 66, 55], "Marcação agressiva e entrega, com pouca contribuição construtiva."],
  ["godin", "Diego Godín", "Uruguai", "2013–2018", "uncommon", [45, 72, 71, 61, 72, 72, 72, 72, 72, 72, 66, 61], "Posicionamento, liderança e jogo aéreo no bloco do Atlético."],
  ["kompany", "Vincent Kompany", "Bélgica", "2011–2018", "uncommon", [61, 75, 75, 71, 75, 75, 74, 75, 75, 75, 71, 73], "Força, liderança e passe em uma defesa de linha alta."],
  ["varane", "Raphaël Varane", "França", "2017–2021", "uncommon", [82, 72, 70, 68, 76, 74, 78, 80, 76, 74, 84, 69], "Velocidade de cobertura e tranquilidade em grandes jogos."],
  ["chiellini", "Giorgio Chiellini", "Itália", "2012–2018", "uncommon", [50, 72, 72, 56, 72, 72, 72, 72, 72, 72, 67, 55], "Marcação de contato e defesa da área acima da saída técnica."],
  ["hummels", "Mats Hummels", "Alemanha", "2012–2017", "uncommon", [39, 67, 62, 71, 69, 69, 71, 71, 71, 70, 61, 71], "Antecipação e passe quebram linhas, apesar da recuperação lenta."],

  // Comuns
  ["leo-pereira", "Léo Pereira", "Brasil", "2022–2025", "common", [53, 65, 62, 65, 66, 66, 66, 65, 65, 66, 65, 66], "Boa saída pela esquerda e evolução na defesa individual."],
  ["fabricio-bruno", "Fabrício Bruno", "Brasil", "2022–2025", "common", [84, 70, 72, 55, 65, 65, 63, 65, 65, 64, 84, 55], "Velocidade e força para perseguir atacantes em campo aberto."],
  ["nino", "Nino", "Brasil", "2021–2024", "common", [51, 64, 59, 64, 64, 64, 67, 66, 66, 67, 64, 66], "Leitura e passe para comandar uma saída apoiada."],
  ["murilo", "Murilo", "Brasil", "2022–2025", "common", [53, 67, 63, 58, 67, 64, 64, 65, 65, 65, 64, 60], "Equilíbrio, força aérea e consistência em bloco alto."],
  ["rodrigo-caio", "Rodrigo Caio", "Brasil", "2019–2021", "common", [53, 68, 59, 67, 66, 70, 71, 70, 70, 67, 68, 68], "Antecipação e técnica excelentes quando fisicamente disponível."],
  ["gil", "Gil", "Brasil", "2013–2021", "common", [49, 70, 67, 57, 68, 67, 67, 70, 70, 71, 64, 59], "Regularidade, liderança e segurança no jogo aéreo."],
  ["jemerson", "Jemerson", "Brasil", "2015–2023", "common", [72, 66, 66, 58, 68, 65, 62, 65, 64, 57, 76, 60], "Atletismo e antecipação com oscilações de concentração."],
  ["balbuena", "Fabián Balbuena", "Paraguai", "2017–2022", "common", [41, 68, 65, 53, 67, 64, 64, 67, 68, 69, 60, 53], "Força e bola aérea muito reconhecidas no Corinthians."],
  ["arboleda", "Robert Arboleda", "Equador", "2019–2024", "common", [57, 72, 68, 57, 70, 66, 68, 68, 69, 68, 68, 58], "Potência no duelo e jogo aéreo em ambas as áreas."],
  ["manoel", "Manoel", "Brasil", "2013–2022", "common", [39, 66, 65, 53, 66, 65, 65, 65, 66, 68, 58, 53], "Zagueiro de área forte e confiável no jogo aéreo."],
  ["bruno-alves", "Bruno Alves", "Brasil", "2018–2022", "common", [40, 65, 63, 52, 65, 63, 65, 63, 66, 67, 58, 54], "Regularidade e força aérea em bloco mais baixo."],
  ["gustavo-henrique", "Gustavo Henrique", "Brasil", "2019–2023", "common", [35, 66, 64, 52, 68, 62, 62, 63, 63, 63, 54, 55], "Altura e bola aérea, com dificuldade em recuperação longa."],
  ["gum", "Gum", "Brasil", "2009–2014", "common", [35, 66, 63, 47, 66, 62, 63, 63, 66, 69, 53, 50], "Entrega, concentração e jogo aéreo compensavam limitações técnicas."],
  ["paulo-andre", "Paulo André", "Brasil", "2011–2015", "common", [37, 64, 58, 56, 63, 62, 64, 63, 63, 67, 58, 58], "Posicionamento e liderança em uma defesa muito organizada."],
];

export const DEFENDERS = createPool("ZAG", rawDefenders);
