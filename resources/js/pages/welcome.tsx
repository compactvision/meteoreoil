import { Head } from '@inertiajs/react';
import { ArrowRight, Plus } from 'lucide-react';
import { useEffect, useState, type CSSProperties } from 'react';
import { filters, products, type Product } from '../meteore/catalog';
import {
    AlloMoteur,
    Footer,
    HomeSections,
    Presentation,
} from '../meteore/content';
import { Header } from '../meteore/header';
import { Hero } from '../meteore/hero';
import type { Page } from '../meteore/navigation';
import {
    ContactPage,
    GuaranteePage,
    NewsPage,
    PageHero,
} from '../meteore/pages';
import { ProductImages } from '../meteore/product-images';
import { Quote, useQuote } from '../meteore/quote';

const pageTitles = {
    home: 'MÉTÉORE Lubrifiants — Performance haute température | OBCITO Énergies',
    actualites: 'Actualité — MÉTÉORE Lubrifiants',
    produits: 'Nos produits — MÉTÉORE Lubrifiants',
    garantie: 'Garantie Protect Moteur — MÉTÉORE Lubrifiants',
    contact: 'Contact — MÉTÉORE Lubrifiants',
    presentation: 'Présentation — MÉTÉORE Lubrifiants',
    'allo-moteur': 'Allo Moteur — MÉTÉORE Lubrifiants',
};

const categories = [
    {
        image: '/meteore/famille-vehicules-legers.webp',
        title: 'Huiles véhicules légers',
        detail: 'Voitures & utilitaires',
    },
    {
        image: '/meteore/poids-lourds.jpg',
        title: 'Huiles poids lourds',
        detail: 'Camions & engins agricoles',
    },
    {
        image: '/meteore/famille-hydraulique.webp',
        title: 'Huiles hydrauliques',
        detail: 'Systèmes hydrauliques',
    },
    {
        image: '/meteore/famille-transmission.webp',
        title: 'Huiles transmission',
        detail: 'Boîtes, ponts & ATF',
    },
    {
        image: '/meteore/famille-adblue.webp',
        title: 'AdBlue SCR',
        detail: 'Réduction des NOx',
    },
];

function CatalogCard({
    product,
    onAdd,
}: {
    product: Product;
    onAdd: (product: Product) => void;
}) {
    return (
        <article className="product-card">
            <ProductImages product={product} />
            <div className="product-type">
                <span className="eyebrow">{product.type}</span>
                <span>{product.code}</span>
            </div>
            <h3>{product.grade}</h3>
            <p className="eyebrow accent product-name">{product.name}</p>
            <p className="product-description">{product.description}</p>
            <ul>
                {product.specs.map((spec) => (
                    <li key={spec}>{spec}</li>
                ))}
            </ul>
            {product.extraSpecs && (
                <p className="eyebrow extra-specs">
                    +{product.extraSpecs} spécifications
                </p>
            )}
            <div className="product-volumes">
                {product.sizes.map((size) => (
                    <span key={size}>{size} L</span>
                ))}
            </div>
            <button
                type="button"
                className="button product-button secondary"
                onClick={() => onAdd(product)}
            >
                <Plus size={16} /> Ajouter au devis
            </button>
        </article>
    );
}

function scrollTo(id: string) {
    const behavior = matchMedia('(prefers-reduced-motion: reduce)').matches
        ? 'instant'
        : 'smooth';
    document.getElementById(id)?.scrollIntoView({ block: 'start', behavior });
}

function normalize(value: string) {
    return value
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase();
}

export default function Welcome({ page = 'home' }: { page?: Page }) {
    const [category, setCategory] = useState(() => {
        if (typeof window === 'undefined') return 0;
        const requested = Number(
            new URLSearchParams(location.search).get('famille'),
        );
        return Number.isInteger(requested) &&
            requested > 0 &&
            requested < filters.length
            ? requested
            : 0;
    });
    const [showAll, setShowAll] = useState(false);
    const [level, setLevel] = useState(5);
    const [query, setQuery] = useState(() =>
        typeof window === 'undefined'
            ? ''
            : (new URLSearchParams(window.location.search).get('q') ?? ''),
    );
    const quote = useQuote();

    useEffect(() => {
        const id = location.hash.slice(1);
        if (id) document.getElementById(id)?.scrollIntoView();

        if (
            !('IntersectionObserver' in window) ||
            matchMedia('(prefers-reduced-motion: reduce)').matches
        )
            return;

        const elements = document.querySelectorAll('[data-reveal]');
        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    entry.target.classList.toggle(
                        'revealed',
                        entry.isIntersecting,
                    );
                }
            },
            { threshold: 0 },
        );

        elements.forEach((element) => {
            element.setAttribute('data-reveal-ready', '');
            observer.observe(element);
        });
        return () => {
            observer.disconnect();
            elements.forEach((element) => {
                element.removeAttribute('data-reveal-ready');
                element.classList.remove('revealed');
            });
        };
    }, []);

    const search = normalize(query);
    const results = products.filter(
        (product) =>
            (category === 0 || product.category === category) &&
            product.protection <= level &&
            normalize(
                [
                    product.grade,
                    product.name,
                    product.code,
                    product.type,
                    product.description,
                    ...product.specs,
                ].join(' '),
            ).includes(search),
    );

    function handleSearch(value: string) {
        if (page !== 'produits') {
            location.assign(`/produits?q=${encodeURIComponent(value)}#gamme`);
            return;
        }
        setQuery(value);
        setCategory(0);
        setShowAll(false);
        setLevel(5);
        scrollTo('gamme');
    }

    const visibleProducts = showAll ? results : results.slice(0, 6);

    function selectCategory(index: number) {
        setCategory(index);
        setShowAll(false);
    }

    const catalog = (
        <section className="section-band shaded catalog-section" id="gamme">
            <div className="site-width">
                <div className="section-heading" data-reveal="left">
                    <div>
                        <p className="eyebrow accent">Catalogue</p>
                        <h2>Notre gamme de lubrifiants</h2>
                    </div>
                    <p className="catalog-count" aria-live="polite">
                        {results.length}{' '}
                        {results.length === 1 ? 'référence' : 'références'}
                        {query && (
                            <>
                                {' '}
                                pour « {query} »{' '}
                                <button
                                    type="button"
                                    className="text-link"
                                    onClick={() => {
                                        setQuery('');
                                        selectCategory(0);
                                        setLevel(5);
                                    }}
                                >
                                    Effacer
                                </button>
                            </>
                        )}
                    </p>
                </div>
                <div
                    className="catalog-filters"
                    aria-label="Familles de lubrifiants"
                >
                    {filters.map((filter, index) => (
                        <button
                            type="button"
                            key={filter}
                            aria-pressed={category === index}
                            onClick={() => selectCategory(index)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>
                <div className="protection">
                    <div>
                        <div className="protection-labels">
                            <span>Éco-efficacité</span>
                            <span>Protection extrême</span>
                        </div>
                        <input
                            type="range"
                            min="1"
                            max="5"
                            value={level}
                            style={
                                {
                                    '--protection-fill': `${(level - 1) * 25}%`,
                                } as CSSProperties
                            }
                            aria-label="Niveau de protection"
                            onChange={(event) => {
                                setLevel(Number(event.target.value));
                                setShowAll(false);
                            }}
                        />
                    </div>
                    <p>
                        <strong>{level}</strong>
                        <span>/ 5 — niveau de protection</span>
                    </p>
                </div>
                {results.length ? (
                    <div className="product-grid">
                        {visibleProducts.map((product) => (
                            <CatalogCard
                                key={product.id}
                                product={product}
                                onAdd={quote.add}
                            />
                        ))}
                    </div>
                ) : (
                    <p className="empty-results">
                        Aucune référence ne correspond à votre recherche.
                    </p>
                )}
                {visibleProducts.length < results.length && (
                    <div className="catalog-more">
                        <button
                            className="button secondary"
                            type="button"
                            onClick={() => setShowAll(true)}
                        >
                            Afficher les{' '}
                            {results.length - visibleProducts.length} autres
                            références
                        </button>
                    </div>
                )}
            </div>
        </section>
    );

    return (
        <div className="premium-site">
            <Head title={pageTitles[page]} />
            <Header
                currentPath={page === 'home' ? '/' : `/${page}`}
                onSearch={handleSearch}
            />
            {page === 'actualites' && <NewsPage />}
            {page === 'garantie' && <GuaranteePage />}
            {page === 'contact' && <ContactPage />}
            {page === 'presentation' && <Presentation />}
            {page === 'produits' && (
                <main>
                    <PageHero
                        title="Nos produits MÉTÉORE"
                        intro="Huiles moteur, fluides hydrauliques, huiles de transmission et AdBlue. Explorez les références et leurs conditionnements."
                        image="/meteore/famille-vehicules-legers.webp"
                    >
                        <a className="button primary" href="#gamme">
                            Explorer le catalogue
                        </a>
                    </PageHero>
                    {catalog}
                </main>
            )}
            {page === 'allo-moteur' && <AlloMoteur />}
            {page === 'home' && (
                <main>
                    <Hero />
                    <section
                        className="site-width categories"
                        id="solutions"
                        aria-labelledby="usage-title"
                    >
                        <div className="section-heading" data-reveal>
                            <div>
                                <p className="eyebrow accent">Applications</p>
                                <h2 id="usage-title">
                                    Un fluide pour chaque usage.
                                </h2>
                            </div>
                            <a className="text-link" href="/produits#gamme">
                                Voir toute la gamme
                            </a>
                        </div>
                        <div className="category-grid">
                            {categories.map(
                                ({ image, title, detail }, index) => (
                                    <a
                                        key={title}
                                        href={`/produits?famille=${index + 1}#gamme`}
                                        className="category"
                                        data-reveal={
                                            index % 2 === 0 ? 'left' : 'right'
                                        }
                                    >
                                        <span className="category-photo">
                                            <img
                                                src={image}
                                                alt=""
                                                loading="lazy"
                                            />
                                        </span>
                                        <span className="category-copy">
                                            <span className="category-title">
                                                {title}
                                            </span>
                                            <span className="category-detail">
                                                {detail}
                                            </span>
                                        </span>
                                        <ArrowRight
                                            className="category-arrow"
                                            size={17}
                                            aria-hidden
                                        />
                                    </a>
                                ),
                            )}
                        </div>
                    </section>
                    <HomeSections catalog={catalog} />
                </main>
            )}
            <Footer />
            {(page === 'home' || page === 'produits') && <Quote {...quote} />}
        </div>
    );
}
