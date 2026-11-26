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
import type { ReactNode } from 'react';
import { PageLink } from './page-link';
import { Production } from './production';
import { navigation, presentationLinks } from './navigation';

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
        '/meteore/atelier.webp',
        '/produits#gamme',
        'Voir la gamme',
    ],
    [
        '2 novembre 2026',
        'PROTECT MOTEUR : le moteur assuré',
        'Le lubrifiant, deux filtres, la main-d’œuvre et le remplacement du moteur : une offre unique pour les flottes et les artisans.',
        '/meteore/engineering.webp',
        '/garantie',
        'Voir la garantie',
    ],
    [
        '12 octobre 2026',
        'Distribution en Afrique et en Europe',
        'OBCITO Énergies étend son réseau de distribution entre Kinshasa et Paris, avec livraison de 500 ml à 1000 L.',
        heavyVehiclesImage,
        '/presentation#livraison',
        'Zones de livraison',
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
                    <div data-reveal="rise">
                        <p className="eyebrow">Contact</p>
                        <h2>Parlons de vos moteurs.</h2>
                        <a
                            className="footer-email"
                            href="mailto:info@obcito-energies.com"
                        >
                            info@obcito-energies.com
                        </a>
                    </div>
                    <div className="footer-marks" data-reveal="rise">
                        <div className="footer-mark footer-veritas">
                            <img
                                src="/meteore/bureau-veritas.webp"
                                alt="Bureau Veritas"
                                width="471"
                                height="588"
                                loading="lazy"
                            />
                        </div>
                        <div className="footer-brand">
                            <div className="footer-mark">
                                <img
                                    src="/meteore/logo.png"
                                    alt="Logo MÉTÉORE"
                                    width="3188"
                                    height="1262"
                                    loading="lazy"
                                />
                            </div>
                            <p>
                                La marque de lubrifiants et fluides d’OBCITO
                                Énergies, conçue pour les moteurs soumis aux
                                climats extrêmes.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="footer-menu">
                    <nav aria-label="Menu de pied de page">
                        <p className="eyebrow">Menu</p>
                        {navigation.map(([href, label]) => (
                            <PageLink key={href} href={href}>
                                {label}
                            </PageLink>
                        ))}
                    </nav>
                    <nav aria-label="Sommaire de présentation">
                        <PageLink className="eyebrow" href="/presentation">
                            Présentation
                        </PageLink>
                        {presentationLinks.map(([id, , label]) => (
                            <PageLink key={id} href={`/presentation#${id}`}>
                                {label}
                            </PageLink>
                        ))}
                    </nav>
                    <div className="footer-offices">
                        {offices.map(([region, phone, href, address]) => (
                            <div key={region}>
                                <p className="eyebrow">{region}</p>
                                <a href={`tel:${href}`}>{phone}</a>
                                <p>{address}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="footer-bottom">
                    <span>
                        © 2023 MÉTÉORE Lubrifiants. Tous droits réservés.
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
        <section
            id="solutions"
            className="section-band dark-band solutions-section"
        >
            <div className="site-width">
                <p className="eyebrow">Applications</p>
                <h2>Une solution fluide pour chaque usage</h2>
                <p className="section-intro">
                    Que vous soyez un professionnel de l’industrie, un
                    transporteur ou un particulier, MÉTÉORE a développé la
                    solution adaptée à vos exigences.
                </p>
                <div className="tile-grid three" data-reveal-group>
                    {solutions.map(([title, copy, label], index) => {
                        const Icon = icons[index];
                        return (
                            <PageLink
                                key={title}
                                href="/produits#gamme"
                                className="tile solution-tile"
                                data-reveal={index % 2 === 0 ? 'left' : 'right'}
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
                            </PageLink>
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
        <div className="tile-grid three" data-reveal-group>
            {entries.map(([title, copy], index) => {
                const Icon = icons[index + firstIcon];
                return (
                    <article
                        key={title}
                        className="tile"
                        data-reveal={index % 2 === 0 ? 'left' : 'right'}
                    >
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

export function HomeSections({ catalog }: { catalog: ReactNode }) {
    return (
        <>
            <section className="section-band editorial-band" id="presentation">
                <div className="site-width editorial-grid">
                    <div className="editorial-photo" data-reveal="media">
                        <img
                            src="/meteore/engineering.webp"
                            alt="Engrenages en acier et film de lubrifiant"
                            width="1448"
                            height="1086"
                            loading="lazy"
                        />
                    </div>
                    <div className="editorial-copy" data-reveal="right">
                        <p className="eyebrow accent">La marque MÉTÉORE</p>
                        <h2>
                            Conçus pour les
                            <br />
                            climats extrêmes.
                        </h2>
                        <p>
                            La chaleur, la poussière et les charges prolongées
                            mettent les moteurs à l’épreuve. OBCITO Énergies a
                            développé la gamme MÉTÉORE pour les véhicules
                            légers, les flottes et les équipements industriels
                            qui travaillent dans ces conditions.
                        </p>
                        <div className="editorial-actions">
                            <PageLink
                                className="button secondary"
                                href="/presentation"
                            >
                                Découvrir notre approche
                            </PageLink>
                            <a className="text-link" href="#conditionnement">
                                Voir la ligne en vidéo
                            </a>
                        </div>
                    </div>
                </div>
            </section>
            {catalog}
            <Production />
            <section
                className="section-band shaded technical-section"
                id="technique"
            >
                <div className="site-width">
                    <div data-reveal>
                        <p className="eyebrow accent">Expertise technique</p>
                        <h2>Pourquoi choisir MÉTÉORE&nbsp;?</h2>
                    </div>
                    <BenefitGrid entries={benefits} />
                </div>
            </section>
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
                    <div className="guarantee-copy" data-reveal="left">
                        <p className="eyebrow">Garantie casse moteur</p>
                        <h2>
                            MÉTÉORE <em>Protect Moteur</em>
                        </h2>
                        <p className="section-intro">
                            La première offre de lubrification haute performance
                            qui assure votre moteur. De la moto-taxi aux
                            excavatrices minières, une protection fiable pour
                            votre moteur et une sécurité pour votre emploi.
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
                        <PageLink className="button primary" href="/garantie">
                            Découvrir la garantie
                        </PageLink>
                    </div>
                </div>
            </section>
            <NewsSection />
        </>
    );
}

export function NewsSection({ dedicated = false }: { dedicated?: boolean }) {
    return (
        <section className="section-band news-section" id="actualites">
            <div className="site-width">
                <div className="section-heading" data-reveal>
                    <div>
                        <h2>
                            {dedicated
                                ? 'Les dernières nouvelles'
                                : 'Nos actualités'}
                        </h2>
                    </div>
                    {!dedicated && (
                        <PageLink
                            className="button secondary"
                            href="/actualites"
                        >
                            Toute l’actualité
                        </PageLink>
                    )}
                </div>
                <div className="news-grid" data-reveal-group>
                    {news.map(
                        ([date, title, copy, image, href, label], index) => (
                            <article
                                key={title}
                                data-reveal={index % 2 === 0 ? 'left' : 'right'}
                            >
                                <div className="news-image">
                                    <img
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
                                <PageLink className="action-text" href={href}>
                                    {label} <ArrowRight size={12} aria-hidden />
                                </PageLink>
                            </article>
                        ),
                    )}
                </div>
            </div>
        </section>
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
            <PageLink className="button primary" href="/contact">
                {action}
            </PageLink>
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
                    <h2 data-reveal="left">La Marque</h2>
                    <div className="split prose">
                        <div data-reveal="left">
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
                        <div data-reveal="right">
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
                    <h2 data-reveal="left">
                        Notre philosophie : l’excellence thermique
                    </h2>
                    <div className="prose" data-reveal="right">
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
                    <h2 data-reveal="left">Pourquoi choisir MÉTÉORE ?</h2>
                    <BenefitGrid entries={benefits.slice(3)} firstIcon={3} />
                    <ThermalStatement />
                </div>
            </section>
            <section className="section-band" id="livraison">
                <div className="site-width">
                    <h2 data-reveal="left">Où pouvons-nous livrer ?</h2>
                    <p className="section-intro">
                        Nos deux hubs logistiques couvrent la RD Congo et
                        l’international. Chaque demande est étudiée selon la
                        destination, les volumes et le conditionnement souhaité.
                    </p>
                    <figure className="delivery-map" data-reveal="media">
                        <img
                            src="/meteore/carte-livraison.webp"
                            alt="Carte du monde illustrant la portée des livraisons MÉTÉORE"
                            width="1127"
                            height="622"
                            loading="lazy"
                        />
                    </figure>
                    <Offices action="Demander une livraison" />
                </div>
            </section>
            <section className="section-band shaded" id="entreprise">
                <div className="site-width">
                    <h2 data-reveal="left">Notre entreprise</h2>
                    <div className="split prose">
                        <div data-reveal="left">
                            <p>
                                MÉTÉORE est la marque d’OBCITO Énergies. La
                                société commercialise, stocke et distribue des
                                produits pétroliers. Elle intervient aussi dans
                                le négoce, le transport, l’affrètement,
                                l’exploration, la production et la
                                transformation des hydrocarbures.
                            </p>
                            <p>
                                Présente à l’international, OBCITO Énergies
                                développe son réseau de représentation en
                                Afrique. Elle travaille avec les raffineurs, les
                                compagnies maritimes, les institutions
                                financières, les distributeurs et les
                                utilisateurs finaux.
                            </p>
                            <p>
                                Notre équipe formule, produit et commercialise
                                des fluides automobiles adaptés aux exigences
                                techniques des constructeurs. Nous conditionnons
                                les produits MÉTÉORE de 500 ml à 1 000 L.
                            </p>
                        </div>
                        <div data-reveal="right">
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
                    <div className="tile-grid two" data-reveal-group>
                        {services.map(([title, copy], index) => {
                            const Icon = serviceIcons[index];
                            return (
                                <article
                                    className="tile"
                                    key={title}
                                    data-reveal={
                                        index % 2 === 0 ? 'left' : 'right'
                                    }
                                >
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
                    <div className="tile-grid three" data-reveal-group>
                        {steps.map(([title, copy], index) => (
                            <article
                                className="tile"
                                key={title}
                                data-reveal={index % 2 === 0 ? 'left' : 'right'}
                            >
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
