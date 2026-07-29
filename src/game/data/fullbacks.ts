import { createPool, type RawPlayer } from "./create-pool";

// Ordem: VEL, FÍS, FOR, PAS, MOV, DES, CRU, FÔL, REC, APO, 1X1 DEF, CON.
const rawFullbacks: RawPlayer[] = [
  // Lendas
  ["cafu", "Cafu", "Brasil", "1994–2002", "legend", [88, 88, 79, 87, 88, 88, 88, 97, 93, 95, 88, 88], "Fôlego, apoio e recomposição fizeram o corredor direito parecer infinito."],
  ["roberto-carlos", "Roberto Carlos", "Brasil", "1997–2003", "legend", [96, 91, 83, 82, 87, 82, 87, 91, 91, 91, 80, 86], "Velocidade, potência e profundidade ofensiva em escala histórica."],
  ["carlos-alberto", "Carlos Alberto Torres", "Brasil", "1968–1974", "legend", [86, 86, 84, 90, 90, 91, 88, 92, 93, 89, 92, 90], "Lateral completo, técnico e dominante nos dois lados da jogada."],
  ["nilton-santos", "Nilton Santos", "Brasil", "1954–1962", "legend", [74, 82, 73, 82, 82, 87, 82, 87, 87, 82, 87, 82], "Antecipou o lateral moderno sem perder excelência defensiva."],
  ["lahm", "Philipp Lahm", "Alemanha", "2008–2014", "legend", [78, 84, 61, 90, 90, 90, 84, 90, 92, 85, 92, 92], "Posicionamento e tomada de decisão quase sem erros em ambos os lados."],
  ["djalma-santos", "Djalma Santos", "Brasil", "1958–1964", "legend", [78, 88, 82, 86, 88, 94, 85, 92, 92, 86, 95, 90], "Um contra um defensivo e segurança técnica fizeram dele referência mundial da posição."],
  ["zanetti", "Javier Zanetti", "Argentina", "1997–2006", "legend", [86, 92, 84, 86, 90, 90, 82, 96, 94, 86, 92, 88], "Regularidade física e defensiva extraordinária por quase duas décadas."],

  // Épicos
  ["marcelo", "Marcelo", "Brasil", "2012–2018", "epic", [84, 82, 70, 89, 91, 78, 90, 85, 82, 94, 76, 94], "Controle, drible e criação de meia atuando desde o corredor esquerdo."],
  ["ashley-cole", "Ashley Cole", "Inglaterra", "2004–2010", "epic", [81, 82, 65, 77, 82, 87, 77, 87, 87, 80, 87, 80], "Especialista em neutralizar pontas sem abrir mão do apoio."],
  ["dani-alves", "Dani Alves", "Brasil", "2008–2016", "epic", [85, 87, 70, 92, 92, 84, 89, 92, 87, 91, 83, 91], "Criação, combinação curta e presença ofensiva de altíssimo volume."],
  ["junior", "Júnior", "Brasil", "1981–1986", "epic", [78, 84, 70, 88, 87, 84, 88, 87, 86, 87, 84, 89], "Qualidade de meio-campista com leitura para jogar como lateral."],
  ["maldini", "Paolo Maldini", "Itália", "1989–1995", "epic", [84, 86, 84, 82, 80, 94, 76, 86, 95, 78, 96, 88], "Tempo defensivo e recomposição quase perfeitos pelo lado esquerdo."],
  ["maicon", "Maicon", "Brasil", "2008–2011", "epic", [90, 86, 88, 82, 89, 80, 90, 88, 83, 93, 79, 86], "Potência física e ofensiva para dominar sozinho o corredor."],
  ["filipe-luis", "Filipe Luís", "Brasil", "2013–2019", "epic", [76, 82, 68, 84, 86, 87, 83, 86, 90, 82, 90, 88], "Leitura tática e construção por dentro com muita segurança."],
  ["branco", "Branco", "Brasil", "1986–1994", "epic", [75, 82, 80, 82, 84, 80, 91, 84, 82, 87, 78, 82], "Canhota potente, cruzamento e bola parada decisivos na Seleção."],
  ["leandro", "Leandro", "Brasil", "1981–1986", "epic", [84, 84, 70, 88, 88, 88, 86, 88, 89, 88, 90, 90], "Técnica e equilíbrio fizeram um lateral completo em seu auge."],
  ["jorginho", "Jorginho", "Brasil", "1989–1994", "epic", [82, 84, 68, 87, 88, 88, 91, 89, 90, 87, 90, 89], "Cruzamento, leitura e equilíbrio nas duas fases marcaram o lateral do tetra."],
  ["marinho-chagas", "Marinho Chagas", "Brasil", "1973–1977", "epic", [87, 83, 72, 85, 88, 78, 91, 86, 82, 92, 74, 84], "Personalidade e apoio revolucionário renderam ao lateral um papel de protagonista."],

  // Raros
  ["jordi-alba", "Jordi Alba", "Espanha", "2012–2019", "rare", [75, 73, 46, 74, 75, 70, 74, 75, 75, 75, 69, 73], "Ataque ao espaço e combinação curta pelo lado esquerdo."],
  ["walker", "Kyle Walker", "Inglaterra", "2017–2023", "rare", [92, 84, 88, 68, 80, 80, 66, 84, 94, 76, 87, 72], "Velocidade de recuperação e força para defender grandes espaços."],
  ["hakimi", "Achraf Hakimi", "Marrocos", "2020–2025", "rare", [76, 75, 62, 72, 76, 68, 75, 76, 73, 76, 67, 72], "Profundidade constante e velocidade de atacante pelo corredor."],
  ["trent", "Trent Alexander-Arnold", "Inglaterra", "2018–2024", "rare", [63, 69, 55, 77, 77, 63, 83, 75, 67, 77, 59, 75], "Cruzamento e passe transformam o lateral em organizador."],
  ["carvajal", "Dani Carvajal", "Espanha", "2016–2024", "rare", [71, 78, 62, 77, 78, 78, 77, 78, 78, 77, 78, 76], "Competitividade e equilíbrio nas duas fases em jogos grandes."],
  ["zambrotta", "Gianluca Zambrotta", "Itália", "2002–2008", "rare", [82, 80, 76, 78, 82, 81, 79, 86, 84, 81, 82, 78], "Ambidestria, força e consistência em qualquer lado."],
  ["leo-moura", "Léo Moura", "Brasil", "2007–2013", "rare", [72, 76, 58, 79, 81, 72, 82, 81, 76, 85, 69, 80], "Técnica e presença ofensiva marcaram uma longa passagem como ídolo do Flamengo."],
  ["fagner", "Fagner", "Brasil", "2017–2021", "rare", [72, 80, 69, 74, 78, 81, 76, 82, 80, 78, 84, 76], "Contato físico e defesa individual fortes, com papel marcante no Corinthians."],
  ["cancelo", "João Cancelo", "Portugal", "2019–2023", "rare", [82, 74, 54, 86, 87, 70, 84, 84, 78, 87, 66, 86], "Construção interior e técnica de meia, com menor consistência defensiva."],
  ["theo", "Theo Hernández", "França", "2020–2025", "rare", [92, 84, 78, 73, 84, 70, 76, 84, 80, 88, 68, 76], "Condução longa e potência para romper o campo inteiro."],
  ["evra", "Patrice Evra", "França", "2007–2012", "rare", [82, 83, 67, 76, 82, 82, 75, 85, 86, 80, 84, 79], "Intensidade e equilíbrio defensivo em alto nível."],
  ["nelinho", "Nelinho", "Brasil", "1975–1982", "rare", [78, 80, 73, 79, 83, 74, 91, 84, 77, 88, 72, 80], "Chute, trivela e cruzamento fizeram um lateral ofensivo de assinatura única."],
  ["leonardo", "Leonardo", "Brasil", "1993–2001", "rare", [80, 79, 62, 86, 85, 79, 84, 83, 82, 85, 77, 86], "Técnica e versatilidade para construir como lateral ou meio-campista."],
  ["everaldo", "Everaldo", "Brasil", "1967–1972", "rare", [80, 84, 72, 78, 80, 87, 77, 86, 89, 78, 89, 82], "Segurança defensiva e regularidade marcaram o lateral do tricampeonato."],
  ["arce", "Francisco Arce", "Paraguai", "1995–2002", "rare", [75, 78, 67, 83, 84, 76, 91, 82, 76, 87, 73, 82], "Cruzamento e bola parada fizeram um ídolo continental no Grêmio e no Palmeiras."],
  ["sorin", "Juan Pablo Sorín", "Argentina", "1996–2006", "rare", [80, 82, 66, 76, 84, 75, 79, 92, 83, 88, 73, 80], "Fôlego, liderança e presença ofensiva constante marcaram o ídolo do Cruzeiro."],
  ["josimar", "Josimar", "Brasil", "1986–1988", "rare", [87, 80, 68, 76, 84, 79, 86, 83, 83, 89, 76, 82], "Explosão e gols memoráveis deram brilho a um auge curto na Seleção."],

  // Incomuns
  ["rodinei", "Rodinei", "Brasil", "2022–2025", "uncommon", [78, 72, 65, 67, 75, 62, 76, 80, 67, 81, 60, 69], "Apoio agressivo, potência e carisma, com defesa individual mais vulnerável."],
  ["rafinha", "Rafinha", "Brasil", "2012–2019", "uncommon", [61, 73, 60, 73, 72, 72, 70, 74, 73, 72, 73, 72], "Técnica e leitura para jogar por fora ou fechar como terceiro defensor."],
  ["danilo", "Danilo", "Brasil", "2019–2024", "uncommon", [61, 74, 69, 72, 73, 74, 65, 72, 74, 69, 74, 72], "Versatilidade e segurança defensiva acima da profundidade."],
  ["alex-sandro", "Alex Sandro", "Brasil", "2016–2020", "uncommon", [69, 76, 68, 72, 73, 74, 72, 76, 76, 74, 74, 73], "Força e condução equilibradas com boa defesa do corredor."],
  ["arana", "Guilherme Arana", "Brasil", "2020–2024", "uncommon", [69, 71, 56, 68, 74, 65, 72, 74, 69, 74, 63, 69], "Apoio e infiltração agressivos pelo lado esquerdo."],
  ["marcos-rocha", "Marcos Rocha", "Brasil", "2012–2021", "uncommon", [55, 69, 55, 65, 69, 63, 69, 69, 65, 70, 60, 67], "Cruzamento e apoio consistente, especialmente por fora."],
  ["mariano", "Mariano", "Brasil", "2011–2017", "uncommon", [66, 70, 50, 65, 69, 61, 70, 71, 66, 72, 58, 67], "Velocidade e cruzamento deram grande peso ofensivo."],
  ["reinaldo", "Reinaldo", "Brasil", "2018–2022", "uncommon", [58, 68, 58, 64, 68, 58, 70, 70, 63, 70, 57, 64], "Canhota de cruzamento e bola parada, com defesa mais irregular."],
  ["ayrton-lucas", "Ayrton Lucas", "Brasil", "2022–2025", "uncommon", [73, 70, 57, 61, 73, 59, 63, 73, 68, 73, 59, 64], "Explosão e profundidade de ala, ainda vulnerável na decisão defensiva."],
  ["maxwell", "Maxwell", "Brasil", "2007–2015", "uncommon", [74, 76, 58, 79, 80, 77, 78, 80, 80, 79, 78, 81], "Técnica e leitura deram regularidade silenciosa em grandes equipes europeias."],
  ["cicinho", "Cicinho", "Brasil", "2004–2006", "uncommon", [82, 72, 56, 72, 78, 65, 82, 76, 70, 85, 62, 74], "Arranque e apoio agressivo marcaram um pico curto e muito reconhecível."],
  ["mayke", "Mayke", "Brasil", "2018–2024", "uncommon", [72, 76, 58, 69, 76, 72, 74, 79, 76, 78, 70, 73], "Equilíbrio e apoio eficiente em um ciclo multicampeão."],

  // Comuns
  ["para", "Pará", "Brasil", "2015–2020", "common", [50, 66, 44, 55, 63, 59, 55, 66, 63, 62, 59, 55], "Regularidade e disciplina para cumprir os dois lados do corredor."],
  ["cortez", "Bruno Cortez", "Brasil", "2017–2021", "common", [54, 68, 49, 57, 66, 62, 58, 69, 66, 65, 62, 60], "Fôlego e simplicidade fizeram um lateral confiável no Grêmio."],
  ["egidio", "Egídio", "Brasil", "2013–2019", "common", [55, 63, 41, 57, 67, 55, 64, 67, 57, 67, 52, 60], "Apoio e cruzamento acima da defesa individual."],
  ["samuel-xavier", "Samuel Xavier", "Brasil", "2022–2024", "common", [54, 68, 49, 65, 69, 65, 64, 69, 69, 69, 65, 66], "Leitura para construir por dentro no sistema do Fluminense."],
  ["wesley", "Wesley França", "Brasil", "2024–2026", "common", [70, 67, 48, 58, 70, 58, 61, 73, 65, 73, 59, 62], "Velocidade e apoio vertical com desenvolvimento defensivo em curso."],
  ["vanderson", "Vanderson", "Brasil", "2022–2026", "common", [69, 71, 53, 64, 71, 64, 68, 74, 69, 72, 63, 65], "Atletismo e cruzamento equilibram as duas fases."],
  ["dodo", "Dodô", "Brasil", "2019–2024", "common", [65, 64, 45, 63, 69, 57, 67, 68, 63, 69, 57, 65], "Lateral técnico e ofensivo de boa condução."],
  ["wendell", "Wendell", "Brasil", "2017–2024", "common", [61, 69, 54, 62, 69, 65, 63, 70, 68, 70, 65, 63], "Perfil equilibrado, físico e seguro no corredor esquerdo."],
  ["pikachu", "Yago Pikachu", "Brasil", "2018–2022", "common", [58, 66, 46, 59, 70, 55, 64, 71, 58, 70, 52, 60], "Produção ofensiva e chegada para gol acima da defesa."],
  ["patric", "Patric", "Brasil", "2015–2020", "common", [60, 68, 50, 54, 67, 56, 57, 68, 61, 68, 56, 56], "Energia e profundidade em um lateral de execução simples."],
  ["madson", "Madson", "Brasil", "2018–2024", "common", [69, 68, 49, 57, 69, 58, 59, 72, 62, 70, 55, 58], "Velocidade e chegada ao fundo são suas armas claras."],
  ["guga", "Guga", "Brasil", "2019–2024", "common", [55, 62, 42, 58, 66, 57, 62, 66, 62, 67, 55, 61], "Lateral de apoio técnico e perfil equilibrado."],
  ["juninho-capixaba", "Juninho Capixaba", "Brasil", "2022–2025", "common", [65, 69, 52, 63, 72, 60, 68, 75, 64, 75, 59, 65], "Apoio agressivo e cruzamento em um lateral de perfil mais ofensivo."],
];

export const FULLBACKS = createPool("LAT", rawFullbacks);
