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

const exportEmail = 'export@meteore-oil.com';
const company = 'OBCITO Énergies';

type CountryContact = {
    country: string;
    location: string;
    company?: string;
    address?: string;
    intro?: string;
    emails: string[];
    phone?: string;
};

const contacts: CountryContact[] = [
    {
        country: 'France',
        location: 'Paris',
        company,
        address: '3 rue de l’Arrivée, 75015 Paris – France',
        intro: 'Pour toutes vos commandes vers la France et à l’exportation',
        emails: [exportEmail, 'direct.commercial@meteore-oil.com'],
        phone: '+33 6 27 80 85 65',
    },
    {
        country: 'RD Congo',
        location: 'Kinshasa',
        company,
        address: '63 avenue Colonel Mondjiba, Cotex, Kinshasa',
        emails: ['commercial.cd@meteore-oil.com'],
        phone: '+243 855 70 89 94',
    },
    {
        country: 'Côte d’Ivoire',
        location: 'Abidjan',
        company,
        emails: ['commercial.ci@meteore-oil.com'],
    },
    {
        country: 'Sénégal',
        location: 'Dakar',
        company,
        emails: ['commercial.sn@meteore-oil.com'],
    },
    {
        country: 'Afrique – Océan Indien',
        location: 'Seychelles',
        emails: [exportEmail],
    },
];

export function ContactPage() {
    return (
        <main>
            <PageHero
                title="Contact"
                intro="Une question sur un produit, une demande de livraison ou la garantie Protect Moteur ? Écrivez à l’équipe MÉTÉORE."
            >
                <a className="button primary" href={`mailto:${exportEmail}`}>
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
                            href={`mailto:${exportEmail}`}
                            data-reveal="right"
                        >
                            {exportEmail}
                        </a>
                    </div>
                    <div className="page-feature-grid contact-grid">
                        {contacts.map(
                            (
                                {
                                    country,
                                    location,
                                    company,
                                    address,
                                    intro,
                                    emails,
                                    phone,
                                },
                                index,
                            ) => (
                                <article
                                    key={country}
                                    data-reveal={index % 2 ? 'right' : 'left'}
                                >
                                    <span className="page-feature-icon">
                                        <MapPin size={20} aria-hidden />
                                    </span>
                                    <h3>{country}</h3>
                                    {intro && <p>{intro}</p>}
                                    <address className="contact-card-address">
                                        <p className="contact-location">
                                            {location}
                                        </p>
                                        {company && <p>{company}</p>}
                                        {address && <p>{address}</p>}
                                    </address>
                                    <div className="contact-card-links">
                                        {emails.map((email) => (
                                            <a
                                                key={email}
                                                href={`mailto:${email}`}
                                            >
                                                <Mail size={15} aria-hidden />
                                                <span>{email}</span>
                                            </a>
                                        ))}
                                        {phone && (
                                            <a
                                                href={`tel:${phone.replaceAll(' ', '')}`}
                                            >
                                                <Phone size={15} aria-hidden />
                                                <span>{phone}</span>
                                            </a>
                                        )}
                                    </div>
                                </article>
                            ),
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
