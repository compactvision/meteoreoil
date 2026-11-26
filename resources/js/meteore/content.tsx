import {
    ArrowRight,
    BadgeCheck,
    Car,
    Check,
    Droplets,
    Earth,
    Factory,
    Flame,
    Fuel,
    Gauge,
    LifeBuoy,
    Mail,
    Phone,
    ShieldCheck,
    Timer,
    Truck,
    Wrench,
} from 'lucide-react';

export const presentationLinks = [
    ['la-marque', 'La Marque', 'La Marque'],
    ['philosophie', 'Philosophie', 'Notre Philosophie'],
    ['solutions', 'Gamme de solutions', 'Notre gamme de solutions'],
    ['pourquoi', 'Pourquoi MÉTÉORE', 'Pourquoi choisir MÉTÉORE'],
    ['livraison', 'Livraison', 'Où pouvons-nous livrer'],
    ['entreprise', 'Notre entreprise', 'Notre entreprise'],
];

export const menu = [
    ['/#actualites', 'Actualités'],
    ['/#gamme', 'Produits MÉTÉORE'],
    ['/allo-moteur', 'Allo Moteur'],
    ['/#contact', 'Nous contacter'],
];

const benefits = [
    [
        'Conception température-résistante',
        'Des formules uniques qui ne subissent pas de cisaillement thermique.',
    ],
    [
        'Fiabilité absolue',
        'Évaporation et usure drastiquement réduites, même au pic de l’été.',
    ],
    [
        'Longévité accrue',
        'Vidanges espacées et protection contre la corrosion, la poussière et l’air chaud.',
    ],
    [
        'Adaptation climatique réelle',
        'Testés en conditions réelles dans les zones les plus chaudes du globe.',
    ],
    [
        'Économie de carburant',
        'Moins de frictions à haute température : moins de consommation, moins de pannes.',
    ],
    [
        'Normes internationales',
        'Conformes aux spécifications ACEA, API et constructeurs.',
    ],
];

const solutions = [
    [
        'Auto & Moto',
        'Pour une conduite fluide et un moteur préservé du stress thermique quotidien.',
        'Véhicules légers',
    ],
    [
        'Heavy Duty',
        'Lubrifiants haute performance pour camions, engins de chantier et machines agricoles soumis à de lourdes charges sous le soleil.',
        'Poids lourds & engins',
    ],
    [
        'Industriel',
        'Des huiles industrielles de pointe pour garantir la continuité de vos opérations sans surchauffe.',
        'Hydrauliques & transmission',
    ],
];

const heavyVehiclesImage = '/meteore/poids-lourds.jpg';

const news = [
    [
        '16 novembre 2026',
        'La gamme MÉTÉORE arrive sur le marché',
        'Vingt références de lubrifiants moteur, hydrauliques, transmission et AdBlue, formulées pour les climats extrêmes et disponibles sous tous les conditionnements.',
        '/meteore/range.png',
    ],
    [
        '2 novembre 2026',
        'PROTECT MOTEUR : le moteur assuré',
        'Le lubrifiant, deux filtres, la main-d’œuvre et le remplacement du moteur : une offre unique pour les flottes et les artisans.',
        '/meteore/range.png',
    ],
    [
        '12 octobre 2026',
        'Distribution en Afrique et en Europe',
        'OBCITO Énergies étend son réseau de distribution entre Kinshasa et Paris, avec livraison de 500 ml à 1000 L.',
        heavyVehiclesImage,
    ],
];

const offices = [
    [
        'RD Congo',
        '+243 855 70 89 94',
        '+243855708994',
        '55/61 Avenue Madrandele, C/Limete, Kinshasa',
    ],
    [
        'International',
        '+33 749 97 31 57',
        '+33749973157',
        '3 Rue de l’arrivée, 75015 Paris, France',
    ],
];

export function Footer() {
    return (
        <footer className="site-footer" id="contact">
            <div className="site-width">
                <div className="footer-top">
                    <p>
                        L’innovation et l’expertise pour des moteurs performants
                    </p>
                    <img
                        src="/meteore/logo.png"
                        alt="Logo MÉTÉORE"
                        width="112"
                        height="44"
                    />
                </div>
                <div className="footer-menu">
                    <nav aria-label="Menu de pied de page">
                        <p className="eyebrow">Menu</p>
                        {menu.map(([href, label]) => (
                            <a key={href} href={href}>
                                {label}
                            </a>
                        ))}
                    </nav>
                    <nav aria-label="Sommaire de présentation">
                        <a className="eyebrow" href="/presentation">
                            Présentation
                        </a>
                        {presentationLinks.map(([id, , label]) => (
                            <a key={id} href={`/presentation#${id}`}>
                                {label}
                            </a>
                        ))}
                    </nav>
                </div>
                <div className="footer-bottom">
                    <span>
                        © 2024 MÉTÉORE Lubrifiants. Tous droits réservés.
                    </span>
                    <span>By OBCITO Énergies</span>
                </div>
            </div>
        </footer>
    );
}

function Solutions() {
    const icons = [Car, Truck, Factory];
    return (
        <section id="solutions" className="section-band dark-band">
            <div className="site-width">
                <p className="eyebrow">03 — Notre gamme de solutions</p>
                <h2>Une solution fluide pour chaque usage</h2>
                <p className="section-intro">
                    Que vous soyez un professionnel de l’industrie, un
                    transporteur ou un particulier, MÉTÉORE a développé la
                    solution adaptée à vos exigences.
                </p>
                <div className="tile-grid three">
                    {solutions.map(([title, copy, label], index) => {
                        const Icon = icons[index];
                        return (
                            <a
                                key={title}
                                href="/#gamme"
                                className="tile solution-tile"
                            >
                                <div className="solution-marker">
                                    <Icon
                                        size={24}
                                        strokeWidth={1.5}
                                        aria-hidden
                                    />
                                    <span className="solution-number">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3>{title}</h3>
                                <p>{copy}</p>
                                <span className="action-text">
                                    {label} <ArrowRight size={14} aria-hidden />
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

function BenefitGrid({
    entries,
    firstIcon = 0,
}: {
    entries: string[][];
    firstIcon?: number;
}) {
    const icons = [Flame, ShieldCheck, Timer, Earth, Fuel, BadgeCheck];
    return (
        <div className="tile-grid three">
            {entries.map(([title, copy], index) => {
                const Icon = icons[index + firstIcon];
                return (
                    <article key={title} className="tile">
                        <Icon size={28} strokeWidth={1.5} aria-hidden />
                        <h3>{title}</h3>
                        <p>{copy}</p>
                    </article>
                );
            })}
        </div>
    );
}

function ThermalStatement() {
    return (
        <p className="thermal-statement">
            Ne laissez pas la chaleur dicter les limites de vos machines.{' '}
            <strong>Passez à la vitesse MÉTÉORE.</strong>
        </p>
    );
}

export function HomeSections() {
    return (
        <>
            <section className="section-band" id="presentation">
                <div className="site-width split brand-section">
                    <div>
                        <p className="eyebrow">La marque</p>
                        <h2>MÉTÉORE Lubrifiants</h2>
                        <a className="button secondary" href="#gamme">
                            En savoir plus
                        </a>
                    </div>
                    <div className="prose">
                        <p>
                            Le catalogue MÉTÉORE propose des lubrifiants sous
                            différents conditionnements, mais également des
                            liquides destinés à la maintenance, l’entretien et
                            le nettoyage des véhicules : voitures avec
                            différents types de carburants, camions et poids
                            lourds de construction, tracteurs et machines
                            agricoles, engins miniers. Profitez d’un catalogue
                            complet de plus de{' '}
                            <a href="#gamme">20 huiles moteur, lubrifiants</a>{' '}
                            et fluides pour véhicules, conçus pour les climats
                            extrêmes par OBCITO Énergies.
                        </p>
                        <p>
                            Nous ne fabriquons pas seulement des lubrifiants :
                            nous concevons des boucliers thermiques. Notre
                            politique de recherche et développement est
                            entièrement tournée vers l’adaptation locale aux
                            pays à fort taux d’ensoleillement et à chaleurs
                            soutenues.
                        </p>
                    </div>
                </div>
            </section>
            <section className="section-band shaded" id="technique">
                <div className="site-width">
                    <p className="eyebrow">Infos techniques</p>
                    <h2>
                        Pourquoi choisir <em>MÉTÉORE</em> ?
                    </h2>
                    <BenefitGrid entries={benefits} />
                    <ThermalStatement />
                </div>
            </section>
            <Solutions />
            <section
                id="garantie"
                className="section-band shaded guarantee-section"
            >
                <img
                    className="guarantee-photo"
                    src={heavyVehiclesImage}
                    alt=""
                    loading="lazy"
                />
                <div className="site-width guarantee">
                    <p className="eyebrow">04 — Garantie casse moteur</p>
                    <h2>
                        MÉTÉORE <em>Protect Moteur</em>
                    </h2>
                    <p className="section-intro">
                        La première offre de lubrification haute performance qui
                        assure votre moteur. De la moto-taxi aux excavatrices
                        minières, une protection fiable pour votre moteur et une
                        sécurité pour votre emploi.
                    </p>
                    <ul>
                        {[
                            'Le lubrifiant MÉTÉORE',
                            'Deux filtres',
                            'La main-d’œuvre en garage agréé',
                            'Remplacement du moteur en cas de panne causée par nos lubrifiants',
                        ].map((item) => (
                            <li key={item}>
                                <Check size={17} aria-hidden />
                                {item}
                            </li>
                        ))}
                    </ul>
                    <a className="button primary" href="#contact">
                        Souscrire à la garantie
                    </a>
                </div>
            </section>
            <section className="section-band" id="actualites">
                <div className="site-width">
                    <div className="section-heading">
                        <div>
                            <p className="eyebrow">05 — Actualités</p>
                            <h2>Nos actualités</h2>
                        </div>
                        <a className="button secondary" href="#contact">
                            Nous écrire
                        </a>
                    </div>
                    <div className="news-grid">
                        {news.map(([date, title, copy, image]) => (
                            <article key={title}>
                                <div className="news-image">
                                    <img
                                        className={
                                            image === heavyVehiclesImage
                                                ? 'news-photo'
                                                : undefined
                                        }
                                        src={image}
                                        alt={
                                            image === heavyVehiclesImage
                                                ? 'Rangée de camions poids lourds'
                                                : title
                                        }
                                        loading="lazy"
                                    />
                                </div>
                                <p className="eyebrow">{date}</p>
                                <h3>{title}</h3>
                                <p>{copy}</p>
                                <a className="action-text" href="#contact">
                                    Lire la suite{' '}
                                    <ArrowRight size={12} aria-hidden />
                                </a>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
}

function Offices({ action }: { action: string }) {
    return (
        <>
            <div className="tile-grid two">
                {offices.map(([region, phone, href, address]) => (
                    <article className="tile office" key={region}>
                        <p className="eyebrow">{region}</p>
                        <a href={`tel:${href}`}>{phone}</a>
                        <p>{address}</p>
                    </article>
                ))}
            </div>
            <a className="button primary" href="/#contact">
                {action}
            </a>
        </>
    );
}

export function Presentation() {
    return (
        <main className="inner-page">
            <section className="inner-hero shaded">
                <div className="site-width">
                    <p className="eyebrow accent">Présentation</p>
                    <h1>
                        Des lubrifiants conçus pour défier{' '}
                        <em>les climats les plus extrêmes</em>
                    </h1>
                    <nav
                        aria-label="Sections de présentation"
                        className="jump-links"
                    >
                        {presentationLinks.map(([id, title]) => (
                            <a
                                className="button secondary"
                                href={`#${id}`}
                                key={id}
                            >
                                {title}
                            </a>
                        ))}
                    </nav>
                </div>
            </section>
            <section className="section-band" id="la-marque">
                <div className="site-width">
                    <p className="eyebrow">Section A</p>
                    <h2>La Marque</h2>
                    <div className="split prose">
                        <div>
                            <p>
                                MÉTÉORE est une marque de lubrifiants de
                                nouvelle génération, spécialement conçue et
                                élaborée pour défier les différents types de
                                climats dont les plus extrêmes et les zones à
                                fortes températures.
                            </p>
                            <p>
                                Là où les lubrifiants ordinaires faiblissent
                                sous l’effet de la chaleur, notre technologie
                                exclusive maintient une protection absolue et
                                une viscosité optimale pour libérer toute la
                                puissance de vos moteurs.
                            </p>
                        </div>
                        <div>
                            <p>
                                MÉTÉORE met en place une politique de
                                partenariat avec les clients institutionnels,
                                mais aussi son réseau de distribution. Nos
                                équipes commerciales apportent leur expertise et
                                réactivité, dans les quatre coins du monde.
                            </p>
                            <p>
                                Prendre soin de vos moteurs, équipements et
                                machines est au centre de nos priorités et de
                                nos préoccupations. Avec la gamme MÉTÉORE la
                                qualité, la fiabilité et l’efficacité sont au
                                rendez-vous.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="section-band shaded" id="philosophie">
                <div className="site-width">
                    <p className="eyebrow">Section B</p>
                    <h2>Notre Philosophie : L’Excellence Thermique</h2>
                    <div className="prose">
                        <p>
                            Chez MÉTÉORE, nous ne nous contentons pas de
                            fabriquer des lubrifiants : nous concevons des
                            boucliers thermiques.
                        </p>
                        <p>
                            Notre politique de recherche et développement est
                            entièrement tournée vers l’adaptation locale aux
                            pays à fort taux d’ensoleillement et à chaleurs
                            soutenues.
                        </p>
                    </div>
                    <BenefitGrid entries={benefits.slice(0, 3)} />
                </div>
            </section>
            <Solutions />
            <section className="section-band shaded" id="pourquoi">
                <div className="site-width">
                    <p className="eyebrow">Section D</p>
                    <h2>Pourquoi choisir MÉTÉORE ?</h2>
                    <BenefitGrid entries={benefits.slice(3)} firstIcon={3} />
                    <ThermalStatement />
                </div>
            </section>
            <section className="section-band" id="livraison">
                <div className="site-width">
                    <p className="eyebrow">Section E</p>
                    <h2>Où pouvons-nous livrer ?</h2>
                    <p className="section-intro">
                        Nos deux hubs logistiques couvrent la RD Congo et
                        l’international. Chaque demande est étudiée selon la
                        destination, les volumes et le conditionnement souhaité.
                    </p>
                    <Offices action="Demander une livraison" />
                </div>
            </section>
            <section className="section-band shaded" id="entreprise">
                <div className="site-width">
                    <p className="eyebrow">Section F</p>
                    <h2>Notre entreprise</h2>
                    <div className="split prose">
                        <div>
                            <p>
                                MÉTÉORE est la marque de lubrifiants d’OBCITO
                                Énergies, négociant en produits pétroliers :
                                distribution, transport et affrètement. Nos
                                équipes accompagnent particuliers, transporteurs
                                et industriels dans le choix et
                                l’approvisionnement de leurs fluides.
                            </p>
                            <p>
                                Qualité, fiabilité et efficacité : nos gammes
                                sont certifiées ISO 9001 et ISO 14001.
                            </p>
                        </div>
                        <div>
                            <p className="eyebrow">Nous écrire</p>
                            <p>
                                <a href="mailto:info@obcito-energies.com">
                                    info@obcito-energies.com
                                </a>
                            </p>
                            <a href="https://www.obcitoenergies.com">
                                www.obcitoenergies.com
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export function AlloMoteur() {
    const serviceIcons = [Gauge, Droplets, Wrench, LifeBuoy];
    const services = [
        [
            'Diagnostic moteur',
            'Bruit, surchauffe, consommation : nos mécaniciens identifient l’origine du problème avant toute intervention.',
        ],
        [
            'Choix du lubrifiant',
            'Nous déterminons la viscosité et la norme exactes (ACEA, API, constructeur) adaptées à votre moteur et à votre usage.',
        ],
        [
            'Vidange & mise à niveau',
            'Vidange, remplacement des filtres et contrôle des niveaux, dans nos ateliers partenaires.',
        ],
        [
            'Assistance & dépannage',
            'Un avis technique rapide par téléphone, et une orientation vers l’atelier le plus proche.',
        ],
    ];
    const steps = [
        [
            'Vous appelez',
            'Un mécanicien prend votre appel et écoute votre besoin.',
        ],
        [
            'Vous décrivez',
            'Véhicule, motorisation, kilométrage, symptômes ou usage quotidien.',
        ],
        [
            'Nous agissons',
            'Recommandation de lubrifiant, intervention en atelier ou mise en relation.',
        ],
    ];
    return (
        <main className="inner-page">
            <section className="inner-hero allo-hero shaded">
                <div className="site-width">
                    <p className="eyebrow accent">Allo Moteur</p>
                    <h1>
                        Une équipe de mécaniciens <em>prête à vous servir</em>
                    </h1>
                    <p className="section-intro">
                        Choisir un lubrifiant ne s’improvise pas. Derrière
                        MÉTÉORE, des mécaniciens et des techniciens vous
                        accompagnent au quotidien : comprendre une panne,
                        choisir la bonne viscosité, entretenir un moteur soumis
                        à la chaleur. Vous n’êtes jamais seul face à votre
                        moteur.
                    </p>
                    <div className="hero-actions">
                        <a className="button primary" href="tel:+243855708994">
                            <Phone size={16} aria-hidden /> Appeler un
                            mécanicien
                        </a>
                        <a
                            className="button secondary"
                            href="mailto:info@obcito-energies.com"
                        >
                            <Mail size={16} aria-hidden /> Écrire à l’équipe
                        </a>
                    </div>
                </div>
            </section>
            <section className="section-band mechanic-services">
                <div className="site-width">
                    <h2>Ce que nous faisons pour vous</h2>
                    <div className="tile-grid two">
                        {services.map(([title, copy], index) => {
                            const Icon = serviceIcons[index];
                            return (
                                <article className="tile" key={title}>
                                    <Icon
                                        size={28}
                                        strokeWidth={1.5}
                                        aria-hidden
                                    />
                                    <h3>{title}</h3>
                                    <p>{copy}</p>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>
            <section className="section-band shaded mechanic-steps">
                <div className="site-width">
                    <h2>Comment ça se passe</h2>
                    <div className="tile-grid three">
                        {steps.map(([title, copy], index) => (
                            <article className="tile" key={title}>
                                <span className="solution-number">
                                    0{index + 1}
                                </span>
                                <h3>{title}</h3>
                                <p>{copy}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
            <section className="section-band">
                <div className="site-width">
                    <Offices action="Demander un devis" />
                </div>
            </section>
        </main>
    );
}
