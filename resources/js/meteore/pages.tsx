import { PageLink } from './page-link';
import { Check, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { NewsSection } from './content';

export function PageHero({
    label,
    title,
    intro,
    image,
    children,
}: {
    label?: string;
    title: string;
    intro: string;
    image?: string;
    children?: ReactNode;
}) {
    return (
        <section className="section-band page-masthead">
            {image && (
                <img
                    className="page-masthead-image"
                    src={image}
                    alt=""
                    fetchPriority="high"
                />
            )}
            <div className="site-width page-masthead-wrap">
                <div className="page-masthead-copy" data-reveal="left">
                    {label && <p className="eyebrow">{label}</p>}
                    <h1>{title}</h1>
                    <p className="section-intro">{intro}</p>
                    {children && (
                        <div className="page-masthead-actions">{children}</div>
                    )}
                </div>
            </div>
        </section>
    );
}

export function NewsPage() {
    return (
        <main>
            <PageHero
                title="Actualité MÉTÉORE"
                intro="Les lancements de produits, la garantie Protect Moteur et les nouvelles du réseau de distribution."
                image="/meteore/atelier.webp"
            />
            <NewsSection dedicated />
        </main>
    );
}

const included = [
    ['Le lubrifiant MÉTÉORE', 'Une huile adaptée à l’usage du moteur.'],
    ['Deux filtres', 'Le remplacement des filtres inclus dans le forfait.'],
    ['La main-d’œuvre', 'L’entretien réalisé dans un garage agréé.'],
    [
        'La garantie casse moteur',
        'Le remplacement du moteur en cas de panne causée par nos lubrifiants.',
    ],
];

export function GuaranteePage() {
    return (
        <main>
            <PageHero
                label="Garantie casse moteur"
                title="MÉTÉORE Protect Moteur"
                intro="Un forfait d’entretien tout compris auprès de nos garages agréés, avec une garantie de remplacement lorsque la panne est causée par nos lubrifiants."
                image="/meteore/poids-lourds.jpg"
            >
                <PageLink className="button primary" href="/contact">
                    Contacter l’équipe
                </PageLink>
                <a className="button page-masthead-secondary" href="#forfait">
                    Voir le forfait
                </a>
            </PageHero>
            <section className="section-band" id="forfait">
                <div className="site-width">
                    <div className="page-editorial-head">
                        <h2 data-reveal="left">
                            Un forfait d’entretien tout compris.
                        </h2>
                        <p data-reveal="right">
                            De la moto-taxi aux excavatrices minières, MÉTÉORE
                            Protect Moteur a été conçu pour les véhicules et les
                            engins qui travaillent au quotidien.
                        </p>
                    </div>
                    <div className="page-feature-grid">
                        {included.map(([title, description], index) => (
                            <article
                                key={title}
                                data-reveal={index % 2 ? 'right' : 'left'}
                            >
                                <span className="page-feature-icon">
                                    <Check size={20} aria-hidden />
                                </span>
                                <h3>{title}</h3>
                                <p>{description}</p>
                            </article>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

const email = 'info@obcito-energies.com';
const contacts = [
    {
        country: 'France',
        city: 'Paris',
        address: '3 rue de l’arrivée, 75015 Paris',
        phone: '+33 3 21 43 57 57',
        tel: '+33321435757',
    },
    {
        country: 'RD Congo',
        city: 'Kinshasa',
        address: '55/61 Avenue Madrandele, C/Limete, Kinshasa',
        phone: '+243 855 70 89 94',
        tel: '+243855708994',
    },
    { country: 'Côte d’Ivoire' },
    { country: 'Sénégal' },
];

export function ContactPage() {
    return (
        <main>
            <PageHero
                label="OBCITO Énergies"
                title="Contact"
                intro="Une question sur un produit, une demande de livraison ou la garantie Protect Moteur ? Écrivez à l’équipe MÉTÉORE."
            >
                <a className="button primary" href={`mailto:${email}`}>
                    <Mail size={18} aria-hidden /> Nous écrire
                </a>
                <PageLink
                    className="button page-masthead-secondary"
                    href="/allo-moteur"
                >
                    Allo Moteur
                </PageLink>
            </PageHero>
            <section className="section-band" id="coordonnees">
                <div className="site-width">
                    <div className="page-editorial-head">
                        <h2 data-reveal="left">Nos contacts par pays</h2>
                        <a
                            className="text-link"
                            href={`mailto:${email}`}
                            data-reveal="right"
                        >
                            {email}
                        </a>
                    </div>
                    <div className="page-feature-grid contact-grid">
                        {contacts.map(
                            ({ country, city, address, phone, tel }, index) => (
                                <article
                                    key={country}
                                    data-reveal={index % 2 ? 'right' : 'left'}
                                >
                                    <span className="page-feature-icon">
                                        <MapPin size={20} aria-hidden />
                                    </span>
                                    <h3>{country}</h3>
                                    <p>OBCITO Énergies{city && ` · ${city}`}</p>
                                    {address && <p>{address}</p>}
                                    {phone ? (
                                        <a href={`tel:${tel}`}>
                                            <Phone size={15} aria-hidden />{' '}
                                            {phone}
                                        </a>
                                    ) : (
                                        <a
                                            href={`mailto:${email}?subject=${encodeURIComponent('MÉTÉORE — ' + country)}`}
                                        >
                                            <Mail size={15} aria-hidden />{' '}
                                            Contacter l’équipe
                                        </a>
                                    )}
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
