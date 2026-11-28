export const filters = [
    'Toute la gamme',
    'Moteur véhicules légers',
    'Moteur poids lourds & engins',
    'Hydrauliques',
    'Transmission',
    'AdBlue',
];

type ProductPhoto = [file: string, caption: string];
const illustration = 'Bidon de 5 L · visuel d’illustration';

const productPhotos = {
    SAE40: [
        ['sae40-5l-recto', '5 L · recto'],
        ['sae40-5l-verso', '5 L · verso'],
        ['sae40-1l', '1 L'],
        ['sae40-20l', '20 L'],
    ],
    SAE50: [
        ['sae50-5l-recto', '5 L · recto'],
        ['sae50-5l-verso', '5 L · verso'],
        ['sae50-1l', '1 L'],
        ['sae50-20l', '20 L'],
    ],
    '5W40': [['5w40-5l', illustration]],
    '5W50': [['5w50-5l', illustration]],
    '10W40': [['10w40-5l', illustration]],
    '15W40': [['15w40-5l', illustration]],
    '15W40 E7': [['15w40-e7-5l', illustration]],
    '15W50': [['15w50-5l', illustration]],
    '20W50': [['20w50-5l', illustration]],
    '68HM': [
        ['hm68-5l-illustration', illustration],
        ['hm68-5l', '5 L'],
        ['hm68-5l-etiquette', '5 L · autre étiquette'],
        ['hm68-1l', '1 L'],
        ['hm68-20l', '20 L'],
    ],
    '68HV': [['hv68-5l', illustration]],
    '80W90': [['80w90-5l', illustration]],
    SAE90: [
        ['sae90-5l-illustration', illustration],
        ['sae90-5l', '5 L'],
        ['sae90-1l', '1 L'],
        ['sae90-20l', '20 L'],
    ],
    'ATF III': [
        ['atf-iii-5l-illustration', illustration],
        ['atf-iii-5l', '5 L'],
        ['atf-iii-5l-etiquette', '5 L · autre étiquette'],
        ['atf-iii-1l', '1 L'],
        ['atf-iii-20l', '20 L'],
    ],
    'CVT VERTE': [['cvt-verte-5l', illustration]],
    'AD BLUE': [['ad-blue-5l', illustration]],
} satisfies Record<string, [ProductPhoto, ...ProductPhoto[]]>;

type ProductData = [
    grade: string,
    label: string,
    name: keyof typeof productPhotos,
    description: string,
    specs: string,
    protection: number,
    extraSpecs?: number,
];

const engineGrades = [
    'SAE 40',
    'SAE 50',
    '5W40',
    '5W50',
    '10W40',
    '15W40',
    '15W50',
    '20W50',
];
const gradeOrder = new Map(engineGrades.map((grade, index) => [grade, index]));

const references: ProductData[] = [
    [
        'SAE 40',
        'Minérale',
        'SAE40',
        'Huile minérale pour moteurs des voitures particulières.',
        'API SF/CC|API SL/CF|ALLISON C3',
        1,
    ],
    [
        'SAE 50',
        'Minérale',
        'SAE50',
        'Huile minérale pour moteurs des voitures particulières.',
        'API SG/CF|API SF/CF|ACEA E2|ALLISON C3',
        2,
    ],
    [
        '15W40',
        'Minérale|HU0002',
        '15W40',
        'Huile minérale pour moteurs essence et diesel, voitures particulières et utilitaires légers.',
        'API SL/CF|API SF/CC|ACEA A3/B4',
        2,
    ],
    [
        '15W50',
        'Minérale',
        '15W50',
        'Huile minérale pour moteurs essence et diesel, voitures particulières et utilitaires légers.',
        'API SL/CF|ACEA A3/B4',
        2,
    ],
    [
        '20W50',
        'Minérale|HU0003',
        '20W50',
        'Huile minérale pour moteurs essence et diesel des voitures particulières.',
        'API SF/CD|API SN/CF|ACEA A3/B4',
        3,
    ],
    [
        '10W40',
        'Semi-synthétique|HU0082',
        '10W40',
        'Huile semi-synthétique pour moteurs des voitures particulières.',
        'ACEA A2/B2|API SL/CF',
        3,
    ],
    [
        '10W40',
        'Semi-synthétique|HU0085',
        '10W40',
        'Adaptée aux moteurs essence, diesel et diesel à injection directe, sans système de post-traitement des gaz d’échappement.',
        'ACEA A3/B4|API SL|MB 229.1',
        3,
    ],
    [
        '5W40',
        'Synthétique',
        '5W40',
        'Huile synthétique pour moteurs des voitures particulières récentes.',
        'ACEA A3/B4|ACEA C3|API SN/CF',
        4,
    ],
    [
        '5W50',
        'Synthétique',
        '5W50',
        'Huile synthétique pour moteurs des voitures particulières récentes.',
        'ACEA A3/B4|API SN/CF',
        5,
    ],
    [
        '15W40',
        'Minérale|HU0002',
        '15W40',
        'Huile minérale pour moteurs essence et diesel.',
        'API SL/CF|API SF/CC|ACEA A3/B4',
        2,
    ],
    [
        '15W40',
        'Minérale|HU0055',
        '15W40 E7',
        'Poids lourds et engins de travaux publics. Anti-usure et détergence optimale pour un moteur propre et durable. Idéale lorsque ACEA E7 ou API CI-4 est recommandé.',
        'ACEA E7|API CI-4/SL|ALLISON C4|MB 228.3',
        4,
        5,
    ],
    [
        '20W50',
        'Minérale|HU0003',
        '20W50',
        'Huile minérale pour moteurs essence et diesel.',
        'ACEA A3/B4/E7|API CI-4/SL|ALLISON C4',
        3,
    ],
    [
        '5W40',
        'Semi-synthétique',
        '5W40',
        'Additifs anti-usure et anticorrosion de haute qualité, meilleure résistance au vieillissement et aux températures extrêmes.',
        'ACEA E7/E9|API CJ-4/SM',
        4,
    ],
    [
        '15W50',
        'Semi-synthétique',
        '15W50',
        'Huiles de base hautement raffinées, résistance accrue aux hautes températures et au vieillissement.',
        'ACEA A3/B4, E7|API CI-4/SL',
        4,
    ],
    [
        '10W40',
        'Synthétique',
        '10W40',
        'Pour moteurs diesel fortement suralimentés de poids lourds. Recommandée pour les grands espacements de vidange.',
        'ACEA E4/E6/E7/E9|API CJ-4',
        5,
    ],
    [
        'ISO 68',
        'Hydraulique HM|HU0504',
        '68HM',
        'Lubrification des systèmes hydrauliques : très bonnes propriétés anti-usure, antioxydant et anticorrosion.',
        'DIN 51524-2|AFNOR NF E 48603 HM|EATON E-FDGN-TB002-E|PARKER DENISON HF-0/1/2',
        3,
        2,
    ],
    [
        'ISO 68',
        'Hydraulique HV|HU0205',
        '68HV',
        'Huile hydraulique anti-usure et antioxydante à indice de viscosité élevé, de couleur naturelle jaune.',
        'DIN 51524-3|AFNOR NF E 48603 HV|EATON E-FDGN-TB002-E|PARKER DENISON HF-0/1/2',
        4,
        2,
    ],
    [
        '80W90',
        'Engrenages GL-5|HU0107',
        '80W90',
        'Ponts hypoïdes et engrenages soumis à des températures variables, à de fortes variations de charge ou à un couple élevé.',
        'API GL-5|MIL-L-2105D|MAN 342 M-2|ZF-TE-ML',
        4,
        2,
    ],
    [
        'SAE 90',
        'Minérale GL-4',
        'SAE90',
        'Boîtes de vitesses et ponts hypoïdes sous charges et vitesses normales. Recommandée pour certains Mercedes anciens.',
        'API GL-4',
        2,
    ],
    [
        'ATF',
        'Semi-synthétique|HU0202',
        'ATF III',
        'Transmissions automatiques, convertisseurs de couple, directions assistées. Idéale lorsque Dexron IIIH est recommandé.',
        'DEXRON IIIH',
        3,
    ],
    [
        'CVT',
        'Synthétique|HU0421',
        'CVT VERTE',
        'Fluide vert haut de gamme pour transmissions à variation continue (CVT), adapté à la majorité des constructeurs.',
        'Performances constructeurs sur demande',
        5,
    ],
    [
        'AdBlue',
        'Urée 32,5 %',
        'AD BLUE',
        'Solution pour moteurs SCR : réduit les oxydes d’azote. Eau déminéralisée 67,5 % et urée 32,5 %.',
        'ISO 22241-1|ISO 22241-2|ISO 22241-3|ISO 22241-4',
        1,
    ],
];

const productsByCategory = references.map(
    (
        [grade, label, name, description, specs, protection, extraSpecs],
        index,
    ) => {
        const [type, code] = label.split('|');
        const category =
            index < 9
                ? 1
                : index < 15
                  ? 2
                  : index < 17
                    ? 3
                    : index < 21
                      ? 4
                      : 5;
        return {
            id: index + 1,
            grade,
            type,
            code,
            name: `METEORE ${name}`,
            description,
            specs: specs.split('|'),
            protection,
            extraSpecs,
            category,
            photos: productPhotos[name],
            sizes: category === 5 ? [5, 20, 210] : [1, 5, 20, 210],
        };
    },
);

export const products = productsByCategory.sort(
    (first, second) =>
        (gradeOrder.get(first.grade) ?? engineGrades.length) -
        (gradeOrder.get(second.grade) ?? engineGrades.length),
);

export type Product = (typeof products)[number];
