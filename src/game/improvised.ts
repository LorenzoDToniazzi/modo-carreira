import { POSITION_CONFIGS } from "./constants";
import {
  POSITIONS,
  type AttributeKey,
  type Position,
  type SourcePlayer,
  type SourceRole,
} from "./types";

export const SOURCE_ROLE_WEIGHTS: Record<SourceRole, number> = {
  natural: 0.85,
  primary: 0.1,
  alternative: 0.05,
};

export interface PlayerDrawGroups {
  natural: SourcePlayer[];
  primary: SourcePlayer[];
  alternative: SourcePlayer[];
}

type NaturalPools = Record<Position, SourcePlayer[]>;
type ImprovisedRole = Exclude<SourceRole, "natural">;

type RawImprovisedVariant = [
  sourcePosition: Position,
  sourcePlayerId: string,
  role: ImprovisedRole,
  specificValues: number[],
  roleNote: string,
];

const GLOBAL_KEYS: AttributeKey[] = [
  "speed",
  "shooting",
  "passing",
  "dribbling",
  "defending",
  "physical",
];

// Os valores abaixo são explícitos e seguem a ordem dos três atributos
// específicos da posição de destino. Nenhuma nota é derivada por fórmula.
const RAW_IMPROVISED_VARIANTS: Record<Position, RawImprovisedVariant[]> = {
  ATA: [
    ["PON", "pon-ronaldinho", "primary", [62, 84, 96], "Atuou centralizado e como falso 9, preservando a criação e a finta, mas sem presença aérea de centroavante."],
    ["PON", "pon-neymar", "primary", [55, 88, 94], "Jogou como falso 9 e atacante central; a mobilidade e a finta sustentam a função, não o jogo aéreo."],
    ["PON", "pon-jairzinho", "primary", [82, 90, 89], "Atacava a área como um segundo atacante potente e foi finalizador constante mesmo partindo do lado."],
    ["PON", "pon-salah", "primary", [72, 93, 89], "A produção por dentro e os movimentos de área permitem tratá-lo como atacante móvel."],
    ["PON", "pon-bale", "primary", [89, 88, 88], "Foi usado por dentro e como referência móvel, somando potência, impulsão e chegada à área."],
    ["PON", "pon-mane", "primary", [78, 91, 88], "Exerceu a função de centroavante móvel no Liverpool com pressão, ruptura e boa presença de área."],
    ["PON", "pon-stoichkov", "primary", [78, 90, 89], "Atuava como atacante e segundo atacante, com diagonal agressiva e conclusão de elite."],
    ["PON", "pon-renato-gaucho", "primary", [75, 84, 93], "Também jogava por dentro como atacante móvel, usando finta e imposição técnica."],
    ["PON", "pon-vini-jr", "primary", [72, 87, 93], "Pode ocupar o centro em ataques móveis, com ruptura e finta muito acima do jogo aéreo."],
    ["PON", "pon-alexis", "primary", [77, 89, 88], "Foi centroavante móvel e segundo atacante em diferentes fases, atacando a área com intensidade."],
    ["PON", "pon-muller", "primary", [78, 88, 88], "Atuou como atacante de mobilidade e profundidade, não apenas como ponta aberto."],
    ["PON", "pon-son", "primary", [72, 91, 85], "Jogou como centroavante móvel no Tottenham, compensando o aéreo apenas funcional com ruptura e conclusão."],
    ["PON", "pon-rodrygo", "primary", [65, 85, 89], "Foi utilizado como falso 9 e atacante central, com controle e movimentação mais fortes que o contato físico."],
    ["PON", "pon-edilson", "primary", [72, 86, 93], "Atuava também como segundo atacante, aproximando finta curta e presença em zona de conclusão."],
    ["PON", "pon-amarildo", "primary", [75, 89, 87], "Era atacante de origem e assumiu papel central de gols no bicampeonato mundial."],
    ["PON", "pon-dagoberto", "primary", [68, 84, 89], "Jogou como segundo atacante e avançado móvel, atacando intervalos a partir da condução."],
    ["PON", "pon-lucas-moura", "primary", [75, 85, 89], "Foi escalado como atacante central no Tottenham e oferecia ruptura, pressão e condução."],
    ["PON", "pon-paulinho-atletico", "primary", [72, 88, 86], "Alternou ponta e atacante no Atlético, com produção de área sustentada por movimentos de profundidade."],
    ["PON", "pon-martinelli", "primary", [74, 88, 87], "Também atuou como centroavante móvel, pressionando e atacando a última linha."],
    ["PON", "pon-chiesa", "primary", [75, 85, 87], "Pode jogar como segundo atacante, usando aceleração e condução para chegar à zona de finalização."],
    ["PON", "pon-ferran-torres", "primary", [68, 88, 84], "Foi utilizado repetidamente como 9 móvel, com posicionamento superior ao duelo aéreo."],
    ["PON", "pon-jorge-henrique", "primary", [76, 81, 78], "Atuava em toda a frente e podia fechar como segundo atacante pela intensidade e leitura coletiva."],
    ["PON", "pon-romero", "primary", [75, 82, 73], "Jogou como segundo atacante e homem de área móvel, embora sem grande refinamento na finta."],
    ["PON", "pon-vitinho", "primary", [67, 79, 85], "Foi usado como atacante móvel em momentos da carreira, com técnica maior que presença física."],

    ["MEI", "mei-maradona", "alternative", [55, 88, 96], "Atuou como segundo atacante e falso 9, com leitura e finta históricas, mas pouca imposição aérea."],
    ["MEI", "mei-cruyff", "alternative", [72, 91, 96], "Foi referência móvel e falso 9 no futebol total, organizando e finalizando a partir do centro."],
    ["MEI", "mei-zico", "alternative", [65, 91, 91], "Jogou adiantado e como segundo atacante, com chegada, posicionamento e conclusão de elite."],
    ["MEI", "mei-socrates", "alternative", [83, 85, 84], "A altura, a chegada tardia e o jogo associativo permitiam ocupar a frente sem ser um centroavante clássico."],
    ["MEI", "mei-rivaldo", "alternative", [78, 89, 89], "Atuou como segundo atacante e avançado central, combinando chute, técnica e boa chegada aérea."],
    ["MEI", "mei-kaka", "alternative", [75, 88, 88], "Podia jogar como segundo atacante de ruptura, atacando espaços desde uma posição central."],
    ["MEI", "mei-tostao", "alternative", [70, 91, 88], "Foi centroavante móvel e articulador no ataque, com leitura de área muito acima da força física."],
    ["MEI", "mei-gullit", "alternative", [91, 88, 87], "Atuou na frente e tinha físico, jogo aéreo e técnica para ser uma referência completa."],
    ["MEI", "mei-rai", "alternative", [86, 87, 84], "Jogava adiantado, atacava a área e oferecia presença aérea incomum para um meia."],
    ["MEI", "mei-alex", "alternative", [78, 83, 85], "Podia atuar próximo ao 9 como segundo atacante técnico e finalizador de média distância."],
    ["MEI", "mei-djalminha", "alternative", [58, 78, 93], "Aparecia como segundo atacante técnico; a variante depende da finta, não de jogo aéreo ou ocupação constante da área."],
    ["MEI", "mei-coutinho", "alternative", [50, 81, 89], "Foi usado como falso 9 e atacante interior, com mobilidade e chute, mas quase nenhuma presença aérea."],
    ["MEI", "mei-pedro-rocha", "alternative", [76, 86, 87], "Também era atacante e segundo atacante, com chegada, drible e boa capacidade de conclusão."],
    ["MEI", "mei-juan-mata", "alternative", [49, 82, 86], "Ocupou posições de segundo atacante e falso 9, apoiado por técnica e leitura entre linhas."],
    ["MEI", "mei-talisca", "alternative", [89, 86, 82], "Atuou como segundo atacante e 9 de apoio, usando altura, chute e chegada à área."],
    ["MEI", "mei-luan", "alternative", [64, 86, 88], "Seu auge no Grêmio incluiu a função de falso 9, conectando meio e ataque com mobilidade."],
    ["MEI", "mei-giovanni", "alternative", [72, 85, 89], "Jogava como meia-atacante e segundo atacante, com técnica para receber e decidir perto da área."],
    ["MEI", "mei-arrascaeta", "alternative", [63, 84, 88], "Foi usado como falso 9 e atacante de apoio, chegando à área a partir da leitura e do controle."],
    ["MEI", "mei-paqueta", "alternative", [82, 81, 85], "Pode ser falso 9 e atacante de apoio, somando físico, jogo aéreo e associação curta."],
    ["MEI", "mei-carlos-alberto", "alternative", [74, 80, 85], "Atuava também como segundo atacante, usando condução e chegada frontal."],
    ["MEI", "mei-maicosuel", "alternative", [58, 79, 88], "Podia formar dupla de ataque como avançado móvel, dependente de aceleração e finta."],
    ["MEI", "mei-cazares", "alternative", [56, 78, 86], "Apareceu como segundo atacante e falso 9, com técnica superior à presença de área."],
    ["MEI", "mei-carlos-eduardo", "alternative", [64, 80, 87], "Alternou meia, ponta e segundo atacante, sustentado por mobilidade e condução."],
  ],

  PON: [
    ["ATA", "ata-pele", "alternative", [97, 89, 96], "Atuou como atacante interior e tinha controle, mobilidade e finta suficientes para partir de uma faixa lateral."],
    ["ATA", "ata-ronaldo", "alternative", [92, 82, 95], "No auge saía do centro e atacava em condução como um avançado aberto, sem depender de cruzamentos."],
    ["ATA", "ata-eusebio", "alternative", [85, 91, 89], "Era um atacante interior explosivo, capaz de começar aberto e romper em diagonal."],
    ["ATA", "ata-henry", "alternative", [91, 87, 90], "Jogou como ponta pela esquerda e manteve condução, controle e repetição de sprints em alto nível."],
    ["ATA", "ata-eto", "alternative", [84, 90, 84], "Foi escalado aberto em grandes jogos e tinha velocidade e fôlego para atacar o corredor."],
    ["ATA", "ata-rooney", "alternative", [85, 93, 87], "Atuou pelos lados no Manchester United, contribuindo com intensidade e associação além do chute."],
    ["ATA", "ata-tevez", "alternative", [85, 93, 89], "Jogou aberto e como segundo atacante, pressionando e conduzindo por dentro com enorme intensidade."],
    ["ATA", "ata-villa", "alternative", [86, 86, 88], "Foi ponta esquerda no Barcelona e atacava diagonais com ótimo controle e conclusão."],
    ["ATA", "ata-aubameyang", "alternative", [80, 89, 82], "Atuou pela esquerda em ataques de transição, com profundidade e fôlego maiores que a finta curta."],
    ["ATA", "ata-hulk", "alternative", [84, 88, 87], "Jogou grande parte do auge como ponta direita, usando potência, condução e chute para dentro."],
    ["ATA", "ata-van-persie", "alternative", [90, 82, 91], "Começou como ponta e atacante aberto, com domínio técnico e finta superiores à repetição física."],
    ["ATA", "ata-gabriel-jesus", "alternative", [87, 91, 89], "Atuou muitas vezes pelos lados, pressionando, conduzindo e atacando a área em diagonal."],
    ["ATA", "ata-richarlison", "alternative", [80, 90, 82], "Tem experiência real nas duas pontas, sustentada por força, velocidade e trabalho sem bola."],
    ["ATA", "ata-alexandre-pato", "alternative", [86, 83, 90], "Foi utilizado aberto pela direita e esquerda, com aceleração e técnica para diagonais."],
    ["ATA", "ata-arnautovic", "alternative", [84, 86, 84], "Passou boa parte da carreira como ponta físico antes de se fixar no centro."],
    ["ATA", "ata-podolski", "alternative", [80, 87, 80], "Atuou pela esquerda em clubes e seleção, com chute e corrida direta maiores que a finta."],
  ],

  MEI: [
    ["VOL", "vol-pirlo", "primary", [97, 78, 96], "Como organizador avançado, oferecia visão e bola parada históricas, ainda que com mobilidade limitada."],
    ["VOL", "vol-falcao", "primary", [93, 89, 87], "Tinha condução, chegada e leitura para atuar como meia criador e área a área."],
    ["VOL", "vol-matthaus", "primary", [89, 91, 90], "Foi meia completo antes de recuar, com chegada, chute e liderança na organização."],
    ["VOL", "vol-redondo", "primary", [93, 83, 78], "A visão e a condução sob pressão permitem avançá-lo como meia construtor, sem inflar bola parada."],
    ["VOL", "vol-busquets", "primary", [93, 80, 70], "A variante representa um organizador central de visão histórica, não um meia de aceleração ou bola parada."],
    ["VOL", "vol-seedorf", "primary", [91, 89, 88], "Atuou em faixas mais adiantadas e reunia criação, condução e chute para ser meia completo."],
    ["VOL", "vol-xabi-alonso", "primary", [94, 80, 91], "O passe longo, a leitura e a bola parada sustentam a função de organizador mais adiantado."],
    ["VOL", "vol-yaya-toure", "primary", [90, 91, 88], "No Manchester City avançava como meia dominante, conduzindo, criando e chegando para marcar."],
    ["VOL", "vol-cerezo", "primary", [92, 86, 83], "Era um meio-campista técnico e progressivo, capaz de construir além da primeira linha."],
    ["VOL", "vol-rodri", "primary", [91, 85, 86], "A leitura e a chegada recente permitem um meia central construtor, sem transformá-lo em camisa 10."],
    ["VOL", "vol-rijkaard", "primary", [87, 86, 79], "Podia avançar como meio-campista completo, combinando condução, passe e força."],
    ["VOL", "vol-hernanes", "primary", [89, 86, 92], "Jogou como meia e tinha ambidestria, chute e bola parada para produzir no terço final."],
    ["VOL", "vol-schweinsteiger", "primary", [88, 88, 88], "Atuou aberto e adiantado antes de recuar, mantendo passe, chegada e bola parada fortes."],
    ["VOL", "vol-toni-kroos", "primary", [95, 83, 91], "A visão, o passe e a bola parada permitem atuar como meia organizador de ritmo."],
    ["VOL", "vol-thiago-alcantara", "primary", [93, 87, 82], "Controle sob pressão e visão sustentam uma função criativa mais alta."],
    ["VOL", "vol-valverde", "primary", [85, 93, 80], "A movimentação e a chegada permitem jogar como meia vertical, ainda sem visão de camisa 10."],
    ["VOL", "vol-paulinho", "primary", [79, 93, 76], "Sua principal adaptação é a chegada sem bola e o ataque à área, não a criação refinada."],
    ["VOL", "vol-jorginho", "primary", [91, 82, 80], "Pode organizar mais à frente por passe e leitura, mas continua sem grande bola parada ou ruptura."],
    ["VOL", "vol-mazinho", "primary", [87, 87, 75], "Jogou em diferentes funções de meio, com técnica e circulação para avançar alguns metros."],
    ["VOL", "vol-bruno-guimaraes", "primary", [90, 87, 82], "Tem visão e resistência à pressão para atuar como meia central de construção."],
    ["VOL", "vol-gerson", "primary", [88, 88, 80], "Condução, proteção e passe permitem jogar como meia de apoio e criação."],
    ["VOL", "vol-ze-rafael", "primary", [82, 85, 80], "Já atuou mais adiantado e oferece condução e chegada funcionais como meia."],
    ["VOL", "vol-elias", "primary", [80, 89, 75], "A chegada agressiva à área sustenta a variante, com criação apenas boa."],
    ["VOL", "vol-nainggolan", "primary", [82, 92, 83], "Atuou como meia vertical e pressionador, com chute e chegada acima da visão pura."],
    ["VOL", "vol-guarin", "primary", [79, 89, 87], "Jogou mais adiantado pela potência, condução e chute de média distância."],
    ["VOL", "vol-fred-vol", "primary", [82, 88, 78], "Pode ser meia de pressão e circulação, com movimentação melhor que bola parada."],
    ["VOL", "vol-ramiro", "primary", [74, 85, 68], "Apareceu em funções avançadas pela intensidade e chegada, não por visão ou bola parada."],
    ["VOL", "vol-richarlyson", "primary", [78, 84, 74], "A versatilidade e a movimentação permitem uma função de apoio, sem perfil de camisa 10."],
    ["VOL", "vol-thiago-maia", "primary", [78, 82, 75], "A variante é de meia de circulação e apoio, com criação limitada em relação aos especialistas."],
    ["VOL", "vol-otavio", "primary", [80, 82, 74], "Pode avançar como meio-campista de pressão e chegada, sem receber visão artificialmente alta."],

    ["PON", "pon-messi", "alternative", [97, 96, 97], "Atuou como 10 e organizador central, reunindo visão, movimento e bola parada em nível histórico."],
    ["PON", "pon-neymar", "alternative", [94, 92, 94], "Jogou como camisa 10 e criador central por clubes e seleção, além de partir do lado."],
    ["PON", "pon-figo", "alternative", [91, 88, 89], "Podia organizar por dentro com passe e leitura, sem depender apenas do duelo no corredor."],
    ["PON", "pon-ribery", "alternative", [89, 90, 80], "A criação interior e a combinação curta permitem uma versão de meia condutor."],
    ["PON", "pon-di-maria", "alternative", [93, 91, 91], "Foi meia central no Real Madrid e manteve visão, chegada e bola parada de elite."],
    ["PON", "pon-hazard", "alternative", [89, 91, 78], "Atuou como 10 e meia livre, com condução e criação superiores à bola parada."],
    ["PON", "pon-paulo-cezar-caju", "alternative", [90, 87, 85], "Tinha técnica e versatilidade real para organizar tanto aberto quanto pelo centro."],
    ["PON", "pon-zinho", "alternative", [84, 89, 78], "Jogou como meio-campista e oferecia circulação, leitura e ocupação equilibrada de espaços."],
    ["PON", "pon-willian", "alternative", [86, 88, 84], "Foi utilizado por dentro e como meia de apoio, com condução segura e bom passe."],
    ["PON", "pon-mahrez", "alternative", [90, 87, 85], "A visão e o controle permitem jogar como meia criador partindo do meio-espaço."],
    ["PON", "pon-saka", "alternative", [86, 89, 80], "Já atuou centralizado e tem leitura e passe para uma função de meia móvel."],
    ["PON", "pon-bernard", "alternative", [83, 86, 75], "Jogou por dentro como meia leve, com associação e movimentação acima da bola parada."],
    ["PON", "pon-tayson", "alternative", [83, 85, 77], "Atuou como meia-atacante e condutor central em parte relevante da carreira."],
    ["PON", "pon-soteldo", "alternative", [85, 84, 73], "Pode centralizar para criar pelo controle curto, mas não recebe bola parada de especialista."],
    ["PON", "pon-grealish", "alternative", [89, 88, 77], "Foi o principal criador central do Aston Villa e pode atuar como meia condutor."],
    ["PON", "pon-malcom", "alternative", [82, 85, 79], "A condução para dentro e o passe permitem um meia-atacante funcional."],
    ["PON", "pon-marlos", "alternative", [85, 86, 80], "Jogou como meia-atacante e ponta interior, apoiado por técnica e visão."],
    ["PON", "pon-vitinho", "alternative", [82, 82, 79], "Pode atuar centralizado como meia-atacante, embora sem leitura de elite."],
  ],

  VOL: [
    ["MEI", "mei-modric", "primary", [76, 82, 96], "Atuou recuado e controla pressão e ritmo; o desarme é bom, não de especialista defensivo."],
    ["MEI", "mei-gullit", "primary", [84, 82, 92], "O físico, a versatilidade e a técnica permitem uma função de volante área a área."],
    ["MEI", "mei-gerrard", "primary", [86, 84, 88], "Jogou como meio-campista central e volante, com desarme, passe e condução vertical."],
    ["MEI", "mei-lampard", "primary", [75, 82, 87], "Podia recuar como meio-campista central, compensando o desarme apenas bom com leitura e passe."],
    ["MEI", "mei-ze-roberto", "primary", [82, 84, 90], "Terminou a carreira por dentro e tinha técnica, fôlego e disciplina para ser volante."],
    ["MEI", "mei-paqueta", "primary", [78, 80, 89], "Já atuou como meio-campista recuado, usando pressão, físico e saída sob marcação."],

    ["ZAG", "zag-beckenbauer", "alternative", [88, 92, 96], "Foi líbero e meio-campista, com leitura e condução históricas para organizar desde a base."],
    ["ZAG", "zag-desailly", "alternative", [93, 91, 82], "Atuou como volante de elite antes e durante o auge, impondo força e recuperação."],
    ["ZAG", "zag-koeman", "alternative", [85, 88, 89], "Podia avançar como meio-campista pela distribuição, chute e leitura defensiva."],
    ["ZAG", "zag-mauro-galvao", "alternative", [86, 89, 85], "Exerceu funções de líbero e volante, com técnica e antecipação para sair jogando."],
    ["ZAG", "zag-marquinhos", "alternative", [88, 91, 88], "Foi utilizado como volante no PSG e na seleção, com mobilidade e passe seguros."],
    ["ZAG", "zag-david-luiz", "alternative", [86, 86, 87], "Jogou oficialmente como volante no Chelsea, usando passe vertical, força e chute."],
    ["ZAG", "zag-edinho", "alternative", [88, 90, 84], "Atuou como volante e zagueiro, destacando proteção, antecipação e disciplina."],
    ["ZAG", "zag-rodrigo-caio", "alternative", [84, 85, 82], "Começou e também atuou como volante, com passe funcional e boa leitura defensiva."],
    ["ZAG", "zag-lisandro-martinez", "alternative", [88, 91, 90], "Tem experiência como volante e qualidade técnica para receber sob pressão."],
  ],

  LAT: [
    ["PON", "pon-bale", "primary", [89, 91, 78], "Começou profissionalmente como lateral esquerdo; a versão privilegia corrida e cruzamento, com recomposição apenas boa."],
    ["PON", "pon-saka", "primary", [85, 91, 79], "Foi lateral e ala esquerdo no início do Arsenal, com apoio e fôlego maiores que a defesa individual."],

    ["ZAG", "zag-sergio-ramos", "alternative", [84, 88, 89], "Foi lateral direito de alto nível antes de se consolidar no centro da defesa."],
    ["ZAG", "zag-puyol", "alternative", [72, 89, 90], "Jogou como lateral em Barcelona e seleção, com marcação e recomposição acima do cruzamento."],
    ["ZAG", "zag-marquinhos", "alternative", [79, 86, 88], "Foi utilizado na lateral direita e tem mobilidade e leitura para cobrir o corredor."],
    ["ZAG", "zag-militao", "alternative", [80, 89, 91], "Atuou como lateral no São Paulo e no Porto antes de se fixar como zagueiro."],
    ["ZAG", "zag-lisandro-martinez", "alternative", [78, 86, 88], "Tem experiência como lateral esquerdo e qualidade para apoiar sem perder agressividade defensiva."],
  ],

  ZAG: [
    ["VOL", "vol-busquets", "primary", [76, 88, 95], "Jogou entre zagueiros e como defensor central, compensando o aéreo apenas bom com leitura histórica."],
    ["VOL", "vol-matthaus", "primary", [84, 91, 96], "Terminou o auge como líbero, antecipando e iniciando a construção desde trás."],
    ["VOL", "vol-rijkaard", "primary", [89, 93, 93], "Atuou como zagueiro e volante de elite, unindo físico, técnica e leitura."],
    ["VOL", "vol-casemiro", "primary", [89, 93, 90], "Pode baixar para a zaga pela força, proteção de área e domínio aéreo, sem ser zagueiro de cobertura."],
    ["VOL", "vol-gilberto-silva", "primary", [86, 92, 92], "Jogou como zagueiro e volante, com posicionamento e disciplina acima da saída agressiva."],
    ["VOL", "vol-dunga", "primary", [82, 90, 92], "Tinha leitura e imposição para atuar como defensor central, embora sem jogo aéreo dominante."],
    ["VOL", "vol-mascherano", "primary", [74, 92, 94], "Consolidou-se como zagueiro no Barcelona, compensando altura com antecipação e tempo de bola."],
    ["VOL", "vol-fernandinho", "primary", [78, 88, 91], "Foi zagueiro em diferentes momentos no City, usando velocidade e leitura para cobrir espaço."],
    ["VOL", "vol-felipe-melo", "primary", [86, 90, 87], "Atuou como zagueiro no fim da carreira, apoiado por físico e agressividade defensiva."],
    ["VOL", "vol-de-rossi", "primary", [86, 91, 93], "Jogou como zagueiro e líbero ocasional, com leitura, passe e imposição."],
    ["VOL", "vol-edmilson", "primary", [88, 91, 92], "Foi campeão mundial como zagueiro e também volante, com técnica e equilíbrio defensivo."],
    ["VOL", "vol-fabinho", "primary", [87, 90, 89], "Tem experiência como zagueiro e lateral, sustentada por tamanho e leitura defensiva."],
    ["VOL", "vol-matic", "primary", [87, 91, 89], "Pode formar a última linha pela altura, proteção e passe, ainda com mobilidade limitada."],
    ["VOL", "vol-danilo", "primary", [84, 86, 84], "Atuou como zagueiro e volante, com físico e saída suficientes para a adaptação."],
    ["VOL", "vol-jucilei", "primary", [86, 88, 84], "Jogou recuado e tinha porte e imposição para atuar no centro da defesa."],
    ["VOL", "vol-richarlyson", "primary", [80, 86, 86], "Foi utilizado como zagueiro e lateral, com mobilidade e leitura para cobertura."],
    ["VOL", "vol-nilton", "primary", [85, 88, 85], "Atuou como zagueiro e volante, apoiado por força e combate aéreo."],

    ["LAT", "lat-nilton-santos", "alternative", [84, 93, 96], "Também era defensor central e tinha leitura histórica para fechar por dentro."],
    ["LAT", "lat-carlos-alberto", "alternative", [87, 92, 94], "Podia atuar como zagueiro pela liderança, técnica e força defensiva."],
    ["LAT", "lat-djalma-santos", "alternative", [88, 95, 95], "Seu perfil defensivo e o domínio do duelo permitem uma versão central de alto nível."],
    ["LAT", "lat-thuram", "alternative", [89, 94, 92], "Foi zagueiro e lateral em nível mundial, com físico e marcação para qualquer lado da linha."],
    ["LAT", "lat-ruud-krol", "alternative", [86, 93, 96], "Atuou como líbero e zagueiro, destacando leitura, passe e antecipação."],
    ["LAT", "lat-filipe-luis", "alternative", [78, 87, 91], "Pode fechar como zagueiro pela esquerda em linha de três, com leitura superior ao jogo aéreo."],
    ["LAT", "lat-abidal", "alternative", [89, 93, 90], "Jogou regularmente como zagueiro, usando alcance, físico e disciplina."],
    ["LAT", "lat-azpilicueta", "alternative", [82, 91, 92], "Foi zagueiro pela direita em linha de três durante seu auge no Chelsea."],
    ["LAT", "lat-ivanovic", "alternative", [91, 92, 88], "Atuou como zagueiro e lateral, com imposição física e aérea muito fortes."],
    ["LAT", "lat-walker", "alternative", [86, 90, 91], "Foi zagueiro de cobertura em linha de três, explorando velocidade e força."],
    ["LAT", "lat-danilo", "alternative", [86, 91, 92], "Atua como zagueiro e lateral, com leitura e versatilidade para construir por dentro."],
    ["LAT", "lat-alex-sandro", "alternative", [85, 89, 90], "Tem experiência como zagueiro pela esquerda em linha de três."],
    ["LAT", "lat-darmian", "alternative", [80, 88, 89], "Jogou como zagueiro lateralizado, priorizando leitura e disciplina."],
    ["LAT", "lat-emerson-royal", "alternative", [84, 86, 84], "Foi utilizado como zagueiro pela direita, com físico e velocidade para duelos de cobertura."],
  ],

  GOL: [],
};

const TARGET_FLOORS = {
  ATA: { shooting: 66, positioning: 76 },
  PON: { speed: 72, dribbling: 68, control: 70, feint: 70 },
  MEI: { passing: 70, vision: 72, movement: 72 },
  VOL: { defending: 66, defensiveAction: 70, pressResistance: 70 },
  LAT: { speed: 68, defending: 55, flank: 68 },
  ZAG: { defending: 70, physical: 68, centralDefense: 70 },
} as const;

function attributeValue(player: SourcePlayer, key: AttributeKey): number {
  return player.attributes[key] ?? 0;
}

function meetsTargetCriteria(
  player: SourcePlayer,
  targetPosition: Position,
): boolean {
  switch (targetPosition) {
    case "ATA":
      return (
        attributeValue(player, "shooting") >= TARGET_FLOORS.ATA.shooting &&
        attributeValue(player, "boxPositioning") >=
          TARGET_FLOORS.ATA.positioning
      );
    case "PON":
      return (
        attributeValue(player, "speed") >= TARGET_FLOORS.PON.speed &&
        attributeValue(player, "dribbling") >= TARGET_FLOORS.PON.dribbling &&
        attributeValue(player, "ballControl") >= TARGET_FLOORS.PON.control &&
        attributeValue(player, "feint") >= TARGET_FLOORS.PON.feint
      );
    case "MEI":
      return (
        attributeValue(player, "passing") >= TARGET_FLOORS.MEI.passing &&
        attributeValue(player, "vision") >= TARGET_FLOORS.MEI.vision &&
        attributeValue(player, "movement") >= TARGET_FLOORS.MEI.movement
      );
    case "VOL":
      return (
        attributeValue(player, "defending") >= TARGET_FLOORS.VOL.defending &&
        Math.max(
          attributeValue(player, "tackling"),
          attributeValue(player, "interceptions"),
        ) >= TARGET_FLOORS.VOL.defensiveAction &&
        attributeValue(player, "pressResistance") >=
          TARGET_FLOORS.VOL.pressResistance
      );
    case "LAT":
      return (
        attributeValue(player, "speed") >= TARGET_FLOORS.LAT.speed &&
        attributeValue(player, "defending") >= TARGET_FLOORS.LAT.defending &&
        Math.max(
          attributeValue(player, "crossing"),
          attributeValue(player, "recovery"),
        ) >= TARGET_FLOORS.LAT.flank
      );
    case "ZAG":
      return (
        attributeValue(player, "defending") >= TARGET_FLOORS.ZAG.defending &&
        attributeValue(player, "physical") >= TARGET_FLOORS.ZAG.physical &&
        Math.max(
          attributeValue(player, "aerial"),
          attributeValue(player, "marking"),
          attributeValue(player, "timing"),
        ) >= TARGET_FLOORS.ZAG.centralDefense
      );
    case "GOL":
      return false;
  }
}

function specificKeys(position: Position): AttributeKey[] {
  return POSITION_CONFIGS[position].attributes
    .map(({ key }) => key)
    .filter((key) => !GLOBAL_KEYS.includes(key));
}

function adaptPlayer(
  naturalPools: NaturalPools,
  targetPosition: Position,
  rawVariant: RawImprovisedVariant,
): SourcePlayer {
  const [sourcePosition, sourcePlayerId, role, specificValues, roleNote] =
    rawVariant;
  const player = naturalPools[sourcePosition].find(
    (candidate) => candidate.id === sourcePlayerId,
  );
  if (!player) {
    throw new Error(
      `Fonte improvisada ${sourcePlayerId} não existe em ${sourcePosition}.`,
    );
  }

  const positionSpecificKeys = specificKeys(targetPosition);
  if (specificValues.length !== positionSpecificKeys.length) {
    throw new Error(
      `${player.name} (${targetPosition}) possui ${specificValues.length} notas específicas; esperado: ${positionSpecificKeys.length}.`,
    );
  }

  const globals = Object.fromEntries(
    GLOBAL_KEYS.map((key) => {
      const value = player.attributes[key];
      if (value === undefined) {
        throw new Error(`${player.name} não possui o atributo global ${key}.`);
      }
      return [key, value];
    }),
  );
  const specifics = Object.fromEntries(
    positionSpecificKeys.map((key, index) => [key, specificValues[index]]),
  );
  const adapted: SourcePlayer = {
    ...player,
    id: `${targetPosition.toLowerCase()}-from-${player.id}`,
    positions: [targetPosition, sourcePosition],
    sourcePosition,
    sourceRole: role,
    attributes: { ...globals, ...specifics },
    note: `${player.note} ${roleNote}`,
  };

  if (!meetsTargetCriteria(adapted, targetPosition)) {
    throw new Error(
      `${player.name} não alcança os mínimos explícitos para ${targetPosition}.`,
    );
  }

  return adapted;
}

export function createPlayerDrawGroups(
  naturalPools: NaturalPools,
): Record<Position, PlayerDrawGroups> {
  const groups = Object.fromEntries(
    POSITIONS.map((position) => {
      const natural = naturalPools[position];
      const occupiedNames = new Set(natural.map((player) => player.name));
      const adapted = RAW_IMPROVISED_VARIANTS[position].map((rawVariant) =>
        adaptPlayer(naturalPools, position, rawVariant),
      );

      const repeated = adapted.find((player) => occupiedNames.has(player.name));
      if (repeated) {
        throw new Error(
          `${repeated.name} já possui perfil natural em ${position}; a variante improvisada é redundante.`,
        );
      }
      if (new Set(adapted.map((player) => player.name)).size !== adapted.length) {
        throw new Error(`Há jogador improvisado duplicado em ${position}.`);
      }

      return [
        position,
        {
          natural,
          primary: adapted.filter(({ sourceRole }) => sourceRole === "primary"),
          alternative: adapted.filter(
            ({ sourceRole }) => sourceRole === "alternative",
          ),
        },
      ];
    }),
  ) as Record<Position, PlayerDrawGroups>;

  const weightTotal = Object.values(SOURCE_ROLE_WEIGHTS).reduce(
    (total, weight) => total + weight,
    0,
  );
  if (Math.abs(weightTotal - 1) > Number.EPSILON) {
    throw new Error(`Pesos de origem somam ${weightTotal}; esperado: 1.`);
  }

  const adapted = POSITIONS.flatMap((position) => [
    ...groups[position].primary,
    ...groups[position].alternative,
  ]);
  const adaptedValues = adapted.flatMap((player) =>
    Object.values(player.attributes),
  );
  const rateAtLeast = (minimum: number) =>
    adaptedValues.filter((value) => value >= minimum).length /
    adaptedValues.length;

  if (
    adapted.some(
      (player) =>
        Object.keys(player.attributes).length !==
        POSITION_CONFIGS[player.positions[0]].attributes.length,
    )
  ) {
    throw new Error(
      "Há variante improvisada com quantidade incorreta de atributos.",
    );
  }
  if (
    adaptedValues.some(
      (value) => !Number.isInteger(value) || value < 35 || value > 97,
    )
  ) {
    throw new Error("Há nota improvisada fora do intervalo inteiro 35–97.");
  }
  const rate90 = rateAtLeast(90);
  const rate94 = rateAtLeast(94);
  // O conjunto improvisado é uma amostra curada e naturalmente mais forte que
  // o banco completo. Além disso, os seis globais repetem a ficha natural já
  // auditada. Estes limites detectam inflação grosseira sem rebaixar uma
  // variante apenas para obedecer à distribuição do pool natural.
  if (rate90 >= 0.18 || rate94 >= 0.05) {
    throw new Error(
      `As variantes improvisadas ultrapassaram a régua de notas: 90+ ${(rate90 * 100).toFixed(2)}%; 94+ ${(rate94 * 100).toFixed(2)}%.`,
    );
  }

  return groups;
}
