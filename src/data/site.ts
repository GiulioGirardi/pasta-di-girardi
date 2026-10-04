/**
 * Conteúdo da página — único arquivo a trocar para adaptar o projeto a outro cliente.
 *
 * Tudo aqui é FICTÍCIO: nomes, endereço, telefones, preços e depoimentos foram
 * inventados para um projeto de demonstração. Este arquivo não importa nada além
 * de tipos, para que o vite.config.ts possa lê-lo e gerar SEO e JSON-LD no build.
 */
import type {
  BuilderStep,
  DayHours,
  DeliveryApp,
  FaqItem,
  GalleryPhoto,
  Highlight,
  ImageCredit,
  MenuCategory,
  NavLink,
  Photo,
  ReservationField,
  TakeawayProduct,
  Testimonial,
} from '../types.ts';

export const business = {
  name: 'La Pasta di Girardi',
  tagline: 'Massas artesanais',
  city: 'Porto Alegre',
  state: 'RS',
  foundedYear: 2012,
  /** Endereço público do deploy. Troque pelo domínio do cliente. */
  url: 'https://pasta-di-girardi.vercel.app',
  address: {
    street: 'Rua dos Girassóis, 000',
    district: 'Bairro Exemplo',
    postalCode: '90000-000',
    /** Coordenadas ilustrativas (região central de Porto Alegre), usadas só no mapa. */
    lat: -30.0392,
    lng: -51.2195,
  },
  phone: { display: '(51) 0000-0000', e164: '+555100000000' },
  /** Número fictício: ao trocar de cliente, coloque o número real com DDI e DDD, só dígitos. */
  whatsapp: { display: '(51) 90000-0000', number: '5551900000000' },
  email: 'contato@exemplo.com.br',
  instagram: { handle: '@lapastadigirardi.exemplo', href: 'https://example.com/instagram' },
  priceRange: 'R$ 50 – R$ 90',
  timeZone: 'America/Sao_Paulo',
} as const;

export const seo = {
  title: 'La Pasta di Girardi · Massas artesanais em Porto Alegre',
  description:
    'Massa fresca feita todos os dias na nossa cozinha. Massas longas, recheadas e de forno, reservas pelo WhatsApp e massa por quilo para levar. (Projeto de demonstração.)',
  ogImage: '/og-image.jpg',
  ogImageAlt: 'Prato de espaguete à bolonhesa com parmesão ralado sobre mesa de madeira',
  locale: 'pt_BR',
  themeColor: '#B5532F',
} as const;

export const nav: NavLink[] = [
  { href: '#cardapio', label: 'Cardápio' },
  { href: '#monte-sua-massa', label: 'Monte sua massa' },
  { href: '#feita-na-casa', label: 'A casa' },
  { href: '#galeria', label: 'Galeria' },
  { href: '#para-levar', label: 'Para levar' },
  { href: '#duvidas', label: 'Dúvidas' },
];

/**
 * Horários de funcionamento do salão. A ordem do array é a ordem de exibição.
 * Também usados para o selo "aberto agora", para os horários do formulário de reserva
 * e para o openingHoursSpecification do schema.org.
 */
export const hours: DayHours[] = [
  { day: 1, label: 'Segunda', ranges: [] },
  { day: 2, label: 'Terça', ranges: [{ open: '11:30', close: '14:30' }, { open: '19:00', close: '23:00' }] },
  { day: 3, label: 'Quarta', ranges: [{ open: '11:30', close: '14:30' }, { open: '19:00', close: '23:00' }] },
  { day: 4, label: 'Quinta', ranges: [{ open: '11:30', close: '14:30' }, { open: '19:00', close: '23:00' }] },
  { day: 5, label: 'Sexta', ranges: [{ open: '11:30', close: '14:30' }, { open: '19:00', close: '23:30' }] },
  { day: 6, label: 'Sábado', ranges: [{ open: '11:30', close: '15:30' }, { open: '19:00', close: '23:30' }] },
  { day: 0, label: 'Domingo', ranges: [{ open: '11:30', close: '16:00' }] },
];

export const hero = {
  eyebrow: 'Porto Alegre · desde 2012',
  title: 'Massa fresca, feita aqui todas as manhãs',
  subtitle:
    'Farinha, ovos e paciência. Abrimos a massa cedo, cortamos à mão e servimos no mesmo dia, com molhos que cozinham devagar.',
  primaryCta: { label: 'Ver o cardápio', href: '#cardapio' },
  secondaryCta: { label: 'Reservar mesa', href: '#reserva' },
  photo: {
    image: 'hero-talharim',
    alt: 'Prato de espaguete à bolonhesa com parmesão ralado e salsinha, sobre mesa de madeira',
    position: '65% 50%',
  } satisfies Photo,
  todayCard: {
    label: 'Feitas toda manhã',
    text: 'Talharim, pappardelle e tortéi de abóbora',
  },
  facts: [
    { value: '7h', label: 'a massa começa a ser aberta' },
    { value: '19', label: 'massas no cardápio' },
    { value: '6h', label: 'de ragu no fogo' },
  ],
};

export const highlights = {
  eyebrow: 'Os mais pedidos',
  title: 'O que sai mais da cozinha',
  intro: 'Quatro pratos que estão no cardápio desde o primeiro ano e que a gente não tira de jeito nenhum.',
  items: [
    {
      name: 'Talharim à bolonhesa',
      description: 'Talharim de ovos com ragu de carne cozido por seis horas e parmesão.',
      price: 72,
      image: 'talharim-bolonhesa',
      alt: 'Talharim ao ragu em prato fundo branco, com lasca de parmesão e folhas de manjericão',
    },
    {
      name: 'Ravióli de quatro queijos',
      description: 'Recheio de ricota, gorgonzola, parmesão e muçarela, na manteiga com sálvia.',
      price: 76,
      tags: ['vegetariano'],
      image: 'raviolis-quatro-queijos',
      alt: 'Raviólis quadrados em molho branco cremoso com folhas verdes por cima',
    },
    {
      name: 'Lasanha da casa',
      description: 'Camadas finas de massa fresca, bolonhesa, ricota com espinafre e gratinado.',
      price: 78,
      image: 'lasanha',
      alt: 'Fatia de lasanha mostrando as camadas de massa, molho de tomate e ricota com espinafre',
    },
    {
      name: 'Nhoque ao sugo',
      description: 'Nhoque de batata leve, feito na hora, com molho de tomate italiano e manjericão.',
      price: 62,
      tags: ['vegetariano'],
      image: 'nhoque-sugo',
      alt: 'Prato branco com nhoques cobertos por molho de tomate vermelho',
    },
  ] satisfies Highlight[],
};

export const menu = {
  eyebrow: 'Cardápio',
  title: 'Para escolher sem pressa',
  intro:
    'Todas as massas são feitas na casa. Os preços são por prato individual; a maioria das massas serve bem uma pessoa com fome.',
  note: 'Preços fictícios, em reais. Pratos marcados como sem glúten usam massa de arroz e milho, preparada em outro horário — mesmo assim, avise a equipe em caso de doença celíaca.',
  categories: [
    {
      id: 'longas',
      label: 'Massas longas',
      intro: 'Espaguete, talharim e fettuccine cortados na manhã do serviço.',
      items: [
        { name: 'Espaguete ao pomodoro', description: 'Tomate italiano, alho, azeite e manjericão fresco.', price: 58, tags: ['vegano'] },
        { name: 'Espaguete alho, óleo e pimenta', description: 'Alho dourado no azeite, pimenta calabresa e salsinha.', price: 52, tags: ['vegano'] },
        { name: 'Talharim à bolonhesa', description: 'Ragu de carne bovina e suína cozido por seis horas.', price: 72 },
        { name: 'Talharim ao limão e camarão', description: 'Camarões salteados, raspas de limão-siciliano e manteiga.', price: 89 },
        { name: 'Fettuccine Alfredo', description: 'Manteiga, creme de leite fresco e parmesão curado.', price: 64, tags: ['vegetariano'] },
        { name: 'Fettuccine ao funghi', description: 'Mix de cogumelos frescos e funghi seco, com creme leve.', price: 74, tags: ['vegetariano'] },
        { name: 'Talharim sem glúten ao sugo', description: 'Massa de arroz e milho com molho de tomate da casa.', price: 62, tags: ['vegano', 'sem-gluten'] },
      ],
    },
    {
      id: 'recheadas',
      label: 'Massas recheadas',
      intro: 'Fechadas uma a uma, à mão. O tortéi de abóbora é receita da família, da Serra Gaúcha.',
      items: [
        { name: 'Ravióli de quatro queijos', description: 'Ricota, gorgonzola, parmesão e muçarela, na manteiga com sálvia.', price: 76, tags: ['vegetariano'] },
        { name: 'Ravióli de abóbora assada', description: 'Abóbora cabotiá, noz-moscada e molho de tomate fresco.', price: 74, tags: ['vegetariano'] },
        { name: 'Ravióli de cogumelos', description: 'Massa sem ovos, recheio de cogumelos com tofu defumado e azeite de ervas.', price: 72, tags: ['vegano'] },
        { name: 'Capeletti in brodo', description: 'Capeletti de carne no caldo de galinha caipira, com parmesão.', price: 58 },
        { name: 'Capeletti ao molho rosé', description: 'Recheio de carne e molho de tomate com creme.', price: 72 },
        { name: 'Tortéi de abóbora', description: 'Na manteiga dourada com sálvia e queijo serrano ralado.', price: 68, tags: ['vegetariano'] },
      ],
    },
    {
      id: 'forno',
      label: 'Massas de forno',
      intro: 'Montadas na hora e gratinadas em travessa individual. Contam 20 minutos de forno.',
      items: [
        { name: 'Lasanha da casa', description: 'Bolonhesa, ricota com espinafre, bechamel e parmesão.', price: 78 },
        { name: 'Lasanha de berinjela', description: 'Berinjela grelhada, ricota, molho de tomate e muçarela.', price: 72, tags: ['vegetariano'] },
        { name: 'Canelone de ricota e espinafre', description: 'Ao sugo, com gratinado de parmesão.', price: 68, tags: ['vegetariano'] },
        { name: 'Canelone de frango', description: 'Frango desfiado com requeijão, molho branco e gratinado.', price: 70 },
        { name: 'Nhoque gratinado quatro queijos', description: 'Nhoque de batata em molho de queijos, gratinado no forno.', price: 66, tags: ['vegetariano'] },
        { name: 'Nhoque gratinado à bolonhesa', description: 'Com ragu da casa e muçarela gratinada.', price: 72 },
      ],
    },
    {
      id: 'entradas',
      label: 'Entradas',
      items: [
        { name: 'Pão da casa', description: 'Fermentação natural, servido com manteiga de ervas.', price: 22, tags: ['vegetariano'] },
        { name: 'Bruschetta de tomate', description: 'Três fatias com tomate, alho, manjericão e azeite.', price: 32, tags: ['vegano'] },
        { name: 'Burrata com tomates assados', description: 'Burrata fresca, tomates-cereja assados e pesto.', price: 58, tags: ['vegetariano', 'sem-gluten'] },
        { name: 'Polenta frita', description: 'Palitos crocantes com parmesão. Frita em óleo separado.', price: 34, tags: ['vegetariano', 'sem-gluten'] },
        { name: 'Carpaccio de abobrinha', description: 'Lâminas finas, limão, hortelã e castanhas tostadas.', price: 36, tags: ['vegano', 'sem-gluten'] },
      ],
    },
    {
      id: 'sobremesas',
      label: 'Sobremesas',
      items: [
        { name: 'Tiramisù', description: 'Biscoito embebido em café, creme de mascarpone e cacau.', price: 32, tags: ['vegetariano'] },
        { name: 'Panna cotta com goiaba', description: 'Creme cozido de baunilha com calda de goiaba.', price: 28, tags: ['vegetariano', 'sem-gluten'] },
        { name: 'Sagu de vinho com creme', description: 'O clássico gaúcho, com vinho tinto da Serra e creme de baunilha.', price: 24, tags: ['vegetariano', 'sem-gluten'] },
        { name: 'Cannoli de ricota', description: 'Casquinha crocante recheada na hora, com laranja cristalizada.', price: 26, tags: ['vegetariano'] },
        { name: 'Sorbet de limão', description: 'Feito na casa, leve, para fechar a refeição.', price: 22, tags: ['vegano', 'sem-gluten'] },
      ],
    },
    {
      id: 'bebidas',
      label: 'Bebidas',
      items: [
        { name: 'Suco de uva integral', description: 'Da Serra Gaúcha, garrafa de 300 ml.', price: 14 },
        { name: 'Limonada siciliana', description: 'Feita na hora, com ou sem açúcar.', price: 14 },
        { name: 'Água mineral', description: 'Com ou sem gás, 500 ml.', price: 7 },
        { name: 'Refrigerante', description: 'Lata de 350 ml.', price: 8 },
        { name: 'Vinho da casa', description: 'Tinto ou branco, taça de 150 ml.', price: 26 },
        { name: 'Cerveja artesanal', description: 'Rótulos de cervejarias de Porto Alegre, 500 ml.', price: 24 },
        { name: 'Café espresso', description: 'Grãos torrados por um torrefador local.', price: 8 },
      ],
    },
  ] satisfies MenuCategory[],
};

const MAX_EXTRAS = 4;

export const builder = {
  eyebrow: 'Monte sua massa',
  title: 'Do seu jeito, em três passos',
  intro:
    'Escolha a massa, o molho e os adicionais. O preço aparece na hora e o pedido segue pronto pelo WhatsApp, para retirar ou receber em casa.',
  maxExtras: MAX_EXTRAS,
  steps: [
    {
      id: 'massa',
      title: 'Massa',
      hint: 'Escolha uma',
      legend: 'Escolha a massa',
      options: [
        { id: 'espaguete', name: 'Espaguete', description: 'Sêmola de grano duro, sem ovos', price: 38, tags: ['vegano'] },
        { id: 'talharim', name: 'Talharim', description: 'Massa de ovos, fita fina', price: 40, tags: ['vegetariano'] },
        { id: 'fettuccine', name: 'Fettuccine', description: 'Massa de ovos, fita média', price: 40, tags: ['vegetariano'] },
        { id: 'pappardelle', name: 'Pappardelle', description: 'Massa de ovos, fita larga', price: 42, tags: ['vegetariano'] },
        { id: 'nhoque', name: 'Nhoque de batata', description: 'Leve, feito no dia', price: 42, tags: ['vegetariano'] },
        { id: 'ravioli', name: 'Ravióli de ricota', description: 'Recheado à mão', price: 48, tags: ['vegetariano'] },
        { id: 'sem-gluten', name: 'Talharim sem glúten', description: 'Farinha de arroz e milho', price: 46, tags: ['vegano', 'sem-gluten'] },
      ],
    },
    {
      id: 'molho',
      title: 'Molho',
      hint: 'Escolha um',
      legend: 'Escolha o molho',
      options: [
        { id: 'pomodoro', name: 'Pomodoro', description: 'Tomate italiano e manjericão', price: 0, tags: ['vegano', 'sem-gluten'] },
        { id: 'alho-oleo', name: 'Alho e óleo', description: 'Azeite, alho dourado e salsinha', price: 0, tags: ['vegano', 'sem-gluten'] },
        { id: 'manteiga-salvia', name: 'Manteiga e sálvia', description: 'Simples e perfumado', price: 6, tags: ['vegetariano', 'sem-gluten'] },
        { id: 'quatro-queijos', name: 'Quatro queijos', description: 'Gorgonzola, parmesão, muçarela e ricota', price: 10, tags: ['vegetariano', 'sem-gluten'] },
        { id: 'pesto', name: 'Pesto de manjericão', description: 'Com castanha-do-pará e parmesão', price: 10, tags: ['vegetariano', 'sem-gluten'] },
        { id: 'bolonhesa', name: 'Bolonhesa', description: 'Ragu de carne, seis horas no fogo', price: 12, tags: ['sem-gluten'] },
        { id: 'funghi', name: 'Funghi', description: 'Cogumelos e creme de leite', price: 14, tags: ['vegetariano', 'sem-gluten'] },
      ],
    },
    {
      id: 'adicionais',
      title: 'Adicionais',
      hint: 'Opcional',
      legend: `Adicionais (até ${MAX_EXTRAS})`,
      options: [
        { id: 'parmesao', name: 'Parmesão extra', price: 6, tags: ['vegetariano', 'sem-gluten'] },
        { id: 'tomate-confit', name: 'Tomate-cereja confitado', price: 6, tags: ['vegano', 'sem-gluten'] },
        { id: 'rucula', name: 'Rúcula fresca', price: 4, tags: ['vegano', 'sem-gluten'] },
        { id: 'cogumelos', name: 'Cogumelos salteados', price: 9, tags: ['vegano', 'sem-gluten'] },
        { id: 'burrata', name: 'Burrata', price: 18, tags: ['vegetariano', 'sem-gluten'] },
        { id: 'bacon', name: 'Bacon crocante', price: 9, tags: ['sem-gluten'] },
        { id: 'frango', name: 'Frango desfiado', price: 10, tags: ['sem-gluten'] },
        { id: 'camarao', name: 'Camarões salteados', price: 22, tags: ['sem-gluten'] },
      ],
    },
  ] satisfies BuilderStep[],
};

export const madeInHouse = {
  eyebrow: 'Feita na casa',
  title: 'A massa começa às sete da manhã',
  paragraphs: [
    'La Pasta di Girardi nasceu em 2012, numa casa antiga de pé-direito alto, com a cozinha virada para a rua. A ideia era simples: fazer em Porto Alegre a massa que a nonna da família fazia aos domingos em Antônio Prado, na Serra.',
    'Até hoje a cozinha abre antes do salão. Cada lote de massa é sovado, descansado e aberto no mesmo dia em que vai para o prato. O que sobra no fim da noite vira massa para funcionários — nada fica para o dia seguinte.',
  ],
  steps: [
    { title: 'Farinha e ovos', text: 'Farinha de trigo tipo 00 e ovos caipiras de um produtor de Viamão, misturados à mão.' },
    { title: 'Descanso', text: 'A massa descansa uma hora coberta, para ficar elástica e fácil de abrir.' },
    { title: 'Abrir e cortar', text: 'Abrimos em lâminas finas e cortamos talharim, fettuccine e pappardelle na hora.' },
    { title: 'Rechear e fechar', text: 'Raviólis, capeletti e tortéi são recheados e fechados um a um, à mão.' },
  ],
  photos: [
    { image: 'farinha-e-ovos', alt: 'Ovos sendo misturados com garfo no centro de um monte de farinha' },
    { image: 'ninho-de-massa', alt: 'Ninho de talharim fresco polvilhado com farinha, com dois ovos ao fundo' },
    { image: 'bola-de-massa', alt: 'Bola de massa lisa descansando sobre bancada escura salpicada de farinha' },
  ] satisfies Photo[],
  chef: {
    name: 'Teresa Girardi',
    role: 'Chef e sócia',
    bio: 'Neta de imigrantes vênetos, aprendeu a abrir massa com a avó antes de aprender a ler receita. Passou por cozinhas de hotel antes de abrir a casa com o irmão, Davi, que cuida do salão.',
    quote: 'Massa boa não tem segredo. Tem rotina: todo dia, cedo, do mesmo jeito.',
  },
};

export const gallery = {
  eyebrow: 'Galeria',
  title: 'Pratos, cozinha e salão',
  intro: 'Um pouco do que acontece por aqui entre a primeira fornada de massa e o último café.',
  photos: [
    { image: 'talharim-trufado', alt: 'Talharim com lascas finas de trufa em prato fundo branco', caption: 'Talharim com trufa, prato sazonal', shape: 'square' },
    { image: 'massa-secando', alt: 'Bandeja com ninhos de talharim fresco polvilhados de farinha, sobre bancada de madeira', caption: 'Talharim descansando antes do serviço', shape: 'wide' },
    { image: 'salao-abobadado', alt: 'Salão com teto abobadado, paredes de madeira, luminárias e mesas com toalhas claras', caption: 'O salão principal', shape: 'square' },
    { image: 'capeletti-fresco', alt: 'Capeletti frescos e crus, bem próximos, com a dobra característica', caption: 'Capeletti fechados à mão', shape: 'square' },
    { image: 'maquina-de-massa', alt: 'Fitas de talharim fresco saindo do cortador da máquina, apoiadas na mão', caption: 'Talharim saindo do cortador', shape: 'wide' },
    { image: 'lamina-de-massa', alt: 'Mãos separando os fios de massa recém-cortados ao lado da máquina, sobre bancada enfarinhada', caption: 'Separando os fios na bancada', shape: 'tall' },
    { image: 'tiramisu', alt: 'Fatia de tiramisù com camadas de creme e cacau polvilhado em prato branco', caption: 'Tiramisù da casa', shape: 'square' },
    { image: 'cozinha-forno-lenha', alt: 'Forno a lenha de tijolos com o fogo aceso', caption: 'O forno a lenha dos gratinados', shape: 'wide' },
    { image: 'nhoque-cru', alt: 'Nhoques crus com as ranhuras do garfo, amontoados sobre tábua enfarinhada', caption: 'Nhoque recém-cortado', shape: 'wide' },
    { image: 'salao-toalhas-vermelhas', alt: 'Salão com mesas compridas e banquetas de madeira, teto de vigas e luz amarela', caption: 'Sala dos fundos, para grupos', shape: 'wide' },
  ] satisfies GalleryPhoto[],
};

export const testimonials = {
  eyebrow: 'Quem já veio',
  title: 'O que dizem da casa',
  disclaimer: 'Exemplos ilustrativos: depoimentos fictícios criados para esta demonstração.',
  items: [
    { quote: 'O tortéi de abóbora tem gosto de almoço de domingo na casa da minha vó em Caxias. Voltei na semana seguinte com a família toda.', author: 'Mariana S.', context: 'Exemplo ilustrativo' },
    { quote: 'Sou celíaca e fui bem atendida: explicaram como a massa sem glúten é feita e o que eu podia pedir com segurança.', author: 'Patrícia L.', context: 'Exemplo ilustrativo' },
    { quote: 'Compro o talharim por quilo toda sexta. Cozinha em dois minutos e o molho bolonhesa no pote resolve o jantar.', author: 'Rodrigo F.', context: 'Exemplo ilustrativo' },
  ] satisfies Testimonial[],
};

export const reservation = {
  eyebrow: 'Reservas',
  title: 'Reserve sua mesa',
  intro:
    'Preencha os dados e confirme pelo WhatsApp. Respondemos em até uma hora durante o expediente. Para grupos acima de 12 pessoas, fale com a gente direto.',
  maxPeople: 12,
  /** Intervalo entre horários sugeridos, em minutos. */
  slotStep: 30,
  /** Último horário de reserva antes do fechamento de cada turno, em minutos. */
  lastSlotBeforeClose: 60,
  /** Quantos dias à frente a reserva pode ser feita. */
  maxDaysAhead: 60,
  hoursTitle: 'Reservas por turno',
  callPrompt: 'Prefere ligar?',
  requiredNote: 'Todos os campos são obrigatórios.',
  labels: {
    name: 'Nome',
    phone: 'Telefone com DDD',
    date: 'Data',
    time: 'Horário',
    people: 'Número de pessoas',
  } satisfies Record<ReservationField, string>,
  phonePlaceholder: '(51) 99999-9999',
  submitLabel: 'Confirmar pelo WhatsApp',
  submitHelp: 'O WhatsApp abre numa nova aba, com a mensagem pronta para enviar.',
  success: {
    title: 'Mensagem pronta!',
    text: 'Envie no WhatsApp para confirmar a reserva. Se a conversa não abriu,',
    linkLabel: 'clique aqui',
  },
};

export const takeaway = {
  eyebrow: 'Para levar',
  title: 'A mesma massa, na sua cozinha',
  intro:
    'Vendemos massa fresca e molhos por peso no balcão, no horário do salão. Vai embalada com instruções de cozimento e dura três dias na geladeira.',
  pastaTitle: 'Massas frescas',
  pasta: [
    { name: 'Talharim', description: 'Massa de ovos', price: 48, unit: 'kg', tags: ['vegetariano'] },
    { name: 'Espaguete', description: 'Sêmola, sem ovos', price: 44, unit: 'kg', tags: ['vegano'] },
    { name: 'Nhoque de batata', description: 'Cozinha em 2 minutos', price: 46, unit: 'kg', tags: ['vegetariano'] },
    { name: 'Ravióli de quatro queijos', description: 'Bandeja com 24 unidades', price: 88, unit: 'kg', tags: ['vegetariano'] },
    { name: 'Capeletti de carne', description: 'Ótimo para sopa', price: 92, unit: 'kg' },
    { name: 'Tortéi de abóbora', description: 'Receita da família', price: 84, unit: 'kg', tags: ['vegetariano'] },
    { name: 'Lâminas de lasanha', description: 'Prontas para montar', price: 52, unit: 'kg', tags: ['vegetariano'] },
  ] satisfies TakeawayProduct[],
  saucesTitle: 'Molhos',
  sauces: [
    { name: 'Pomodoro', description: 'Pote de 500 ml', price: 28, unit: 'pote', tags: ['vegano', 'sem-gluten'] },
    { name: 'Bolonhesa', description: 'Pote de 500 ml', price: 42, unit: 'pote', tags: ['sem-gluten'] },
    { name: 'Quatro queijos', description: 'Pote de 500 ml', price: 38, unit: 'pote', tags: ['vegetariano', 'sem-gluten'] },
    { name: 'Pesto de manjericão', description: 'Pote de 200 g', price: 36, unit: 'pote', tags: ['vegetariano', 'sem-gluten'] },
  ] satisfies TakeawayProduct[],
  photo: { image: 'ninhos-frescos', alt: 'Vários ninhos de talharim fresco lado a lado' } satisfies Photo,
  deliveryTitle: 'Delivery',
  deliveryText:
    'Entregamos pratos prontos e massa por peso num raio de 5 km. Peça pelo WhatsApp ou pelos aplicativos abaixo.',
  deliveryApps: [
    { name: 'App de entrega 1', href: 'https://example.com/app-de-entrega-1' },
    { name: 'App de entrega 2', href: 'https://example.com/app-de-entrega-2' },
  ] satisfies DeliveryApp[],
  deliveryAppsNote: 'Links de exemplo para demonstração.',
  cookingTip: {
    title: 'Como cozinhar a massa fresca',
    text: 'Água fervente com sal, 2 a 3 minutos para as longas e 4 a 5 para as recheadas. Prove antes de escorrer.',
  },
};

export const faq = {
  eyebrow: 'Dúvidas',
  title: 'Perguntas frequentes',
  cta: {
    text: 'Não achou o que procurava? Mande uma mensagem que a gente responde.',
    label: 'Perguntar pelo WhatsApp',
  },
  items: [
    {
      question: 'Vocês têm opções sem glúten?',
      answer:
        'Sim. Fazemos talharim de farinha de arroz e milho em horário separado da massa de trigo, e vários molhos, entradas e sobremesas não levam glúten (estão marcados no cardápio). Como a cozinha também trabalha com trigo, não garantimos ausência total de traços. Se você tem doença celíaca, avise ao fazer o pedido.',
    },
    {
      question: 'Tem estacionamento?',
      answer:
        'Não temos estacionamento próprio. Há um estacionamento conveniado a meia quadra, com desconto mediante o ticket carimbado no caixa. Também há vagas de rua com área azul.',
    },
    {
      question: 'Posso levar meu pet?',
      answer:
        'Pets são bem-vindos na varanda da frente, que é coberta. Levamos um pote com água. No salão interno, só cães de assistência.',
    },
    {
      question: 'Vocês fazem eventos e reservas para grupos?',
      answer:
        'Sim. A sala dos fundos recebe até 40 pessoas sentadas e pode ser reservada para aniversários e confraternizações, com menu fechado. Fale com a gente pelo WhatsApp com pelo menos uma semana de antecedência.',
    },
    {
      question: 'Quais formas de pagamento vocês aceitam?',
      answer:
        'Pix, cartões de crédito e débito das principais bandeiras e vale-refeição. Não aceitamos cheque.',
    },
    {
      question: 'Preciso reservar?',
      answer:
        'Não é obrigatório, mas às sextas, sábados e no almoço de domingo a casa costuma encher. Com reserva, a mesa fica garantida por 15 minutos após o horário marcado.',
    },
  ] satisfies FaqItem[],
};

export const footer = {
  about:
    'Casa de massas artesanais em Porto Alegre. Massa fresca feita todos os dias, para comer aqui ou levar para casa.',
  hoursNote: 'A cozinha fecha 30 minutos antes do salão. O balcão de massas segue o mesmo horário.',
  mapNote: 'Localização ilustrativa: endereço e mapa são fictícios.',
  demoNotice:
    'Projeto de demonstração para portfólio. La Pasta di Girardi, seus dados, preços e depoimentos são fictícios.',
};

/** Mensagens prontas enviadas pelo WhatsApp. */
export const whatsappMessages = {
  general: `Olá! Vim pelo site da ${business.name}.`,
  question: `Olá, ${business.name}! Tenho uma dúvida:`,
  delivery: `Olá, ${business.name}! Quero fazer um pedido para entrega.`,
  order: {
    intro: `Olá, ${business.name}! Quero fazer um pedido montado pelo site:`,
    extras: 'Adicionais',
    total: 'Total estimado',
    note: 'Observações',
    closing: 'Pode me confirmar o tempo de preparo?',
  },
  reservation: {
    intro: `Olá, ${business.name}! Gostaria de reservar uma mesa:`,
    labels: { name: 'Nome', phone: 'Telefone', date: 'Data', time: 'Horário', people: 'Pessoas' } satisfies Record<ReservationField, string>,
    closing: 'Aguardo a confirmação. Obrigado!',
  },
};

/** Créditos das fotos (Wikimedia Commons, Unsplash e Pexels). Também listados no README. */
export const imageCredits: ImageCredit[] = [
  { image: 'hero-talharim', title: 'Delicious spaghetti bolognese with sauce and cheese on a table', author: 'BONNNI C', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/lmM2hqNzrfw', provider: 'Unsplash' },
  { image: 'talharim-bolonhesa', title: 'Pasta dish on white ceramic plate', author: 'Farhad Ibrahimzade', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/BhEXW19sW1M', provider: 'Unsplash' },
  { image: 'raviolis-quatro-queijos', title: 'Four cheese ravioli with cream sauce', author: 'HaJunkiyada', license: 'CC BY-SA 4.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/4.0/', source: 'https://commons.wikimedia.org/wiki/File:Liat_Portal_for_Foodie_Disorder_-_Four_cheese_ravioli_with_cream_sauce.jpg', provider: 'Wikimedia Commons' },
  { image: 'lasanha', title: 'Lasagna (1)', author: 'jeffreyw', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Lasagna_(1).jpg', provider: 'Wikimedia Commons' },
  { image: 'nhoque-sugo', title: 'Gnocchi al pomodoro', author: 'Ivan Vighetto', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:Gnocchi_al_pomodoro.JPG', provider: 'Wikimedia Commons' },
  { image: 'talharim-trufado', title: 'Tagliatelle al tartufo', author: 'GastRomagna', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', source: 'https://commons.wikimedia.org/wiki/File:Tagliatelle_al_tartufo.jpg', provider: 'Wikimedia Commons' },
  { image: 'farinha-e-ovos', title: 'Making a better homemade pasta', author: 'Joy', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Making_a_better_homemade_pasta_-_16508591810.jpg', provider: 'Wikimedia Commons' },
  { image: 'ninho-de-massa', title: 'Tagliatelle!', author: 'Sebastian Mary', license: 'CC BY-SA 2.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Tagliatelle!_(378171165).jpg', provider: 'Wikimedia Commons' },
  { image: 'maquina-de-massa', title: 'A person holding a yellow container with yellow cables', author: 'Andrés Giménez', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/7loCcIB4v3o', provider: 'Unsplash' },
  { image: 'lamina-de-massa', title: 'A person is using a pasta machine to make pasta', author: 'Vincent Dörig', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/mciRIMaxiAM', provider: 'Unsplash' },
  { image: 'massa-secando', title: 'A tray of pasta', author: 'Marketa Wranova', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/KimM85EfmJs', provider: 'Unsplash' },
  { image: 'ninhos-frescos', title: 'Tagliatelles bulk', author: 'Popo le Chien', license: 'CC0', licenseUrl: 'https://creativecommons.org/publicdomain/zero/1.0/', source: 'https://commons.wikimedia.org/wiki/File:Tagliatelles_bulk.jpg', provider: 'Wikimedia Commons' },
  { image: 'capeletti-fresco', title: 'Fresh tortellini', author: 'scott feldstein', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Fresh_tortellini.jpg', provider: 'Wikimedia Commons' },
  { image: 'nhoque-cru', title: 'Brown cookies on brown wooden table', author: 'Gábor Molnár', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/5300Q8dOY18', provider: 'Unsplash' },
  { image: 'cozinha-forno-lenha', title: 'A brick oven with fire burning inside of it', author: 'Jay Gajjar', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/GnXQ0x-abPE', provider: 'Unsplash' },
  { image: 'salao-abobadado', title: "L'eau Vive restaurant, Rome", author: 'Wknight94', license: 'CC BY-SA 3.0', licenseUrl: 'https://creativecommons.org/licenses/by-sa/3.0/', source: 'https://commons.wikimedia.org/wiki/File:L%27eau_Vive_restaurant,_Rome.jpg', provider: 'Wikimedia Commons' },
  { image: 'salao-toalhas-vermelhas', title: 'Brown wooden table and chairs', author: 'Brands&People', license: 'Unsplash License', licenseUrl: 'https://unsplash.com/license', source: 'https://unsplash.com/photos/iFyLBKmCrmQ', provider: 'Unsplash' },
  { image: 'tiramisu', title: 'Tiramisu', author: 'Raffaele Diomede', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Tiramisu_-_Raffaele_Diomede.jpg', provider: 'Wikimedia Commons' },
  { image: 'bola-de-massa', title: 'Making a better homemade pasta', author: 'Joy', license: 'CC BY 2.0', licenseUrl: 'https://creativecommons.org/licenses/by/2.0/', source: 'https://commons.wikimedia.org/wiki/File:Making_a_better_homemade_pasta_-_16694677671.jpg', provider: 'Wikimedia Commons' },
];
