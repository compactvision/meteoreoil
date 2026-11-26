import { Head } from '@inertiajs/react';
import {
    ArrowRight,
    Car,
    ChevronDown,
    Cog,
    Droplets,
    Factory,
    FileText,
    Handshake,
    Mail,
    Menu,
    Plus,
    Search,
    ShieldCheck,
    Truck,
    Wrench,
    X,
} from 'lucide-react';
import { useEffect, useState, type CSSProperties, type FormEvent } from 'react';
import { filters, products, type Product } from '../meteore/catalog';
import {
    AlloMoteur,
    Footer,
    HomeSections,
    Presentation,
    menu,
    presentationLinks,
} from '../meteore/content';
import { Quote, useQuote } from '../meteore/quote';

type Page = 'home' | 'presentation' | 'allo-moteur';
const pageTitles = {
    home: 'MÉTÉORE Lubrifiants — Performance haute température | OBCITO Énergies',
    presentation: 'Présentation — MÉTÉORE Lubrifiants',
    'allo-moteur': 'Allo Moteur — MÉTÉORE Lubrifiants',
};

const categories = [
    {
        Icon: Car,
        title: 'Huiles véhicules légers',
        detail: 'Voitures & utilitaires',
        target: 'gamme',
    },
    {
        Icon: Truck,
        title: 'Huiles poids lourds',
        detail: 'Camions & engins agricoles',
        target: 'gamme',
    },
    {
        Icon: Factory,
        title: 'Huiles hydrauliques',
        detail: 'Systèmes hydrauliques',
        target: 'gamme',
    },
    {
        Icon: Cog,
        title: 'Huiles transmission',
        detail: 'Boîtes, ponts & ATF',
        target: 'gamme',
    },
    {
        Icon: Droplets,
        title: 'AdBlue SCR',
        detail: 'Réduction des NOx',
        target: 'gamme',
    },
    {
        Icon: Wrench,
        title: 'Infos techniques',
        detail: 'Normes ACEA, API, OEM',
        target: 'technique',
    },
    {
        Icon: ShieldCheck,
        title: 'Garantie Protect Moteur',
        detail: 'Moteur assuré',
        target: 'garantie',
    },
    {
        Icon: Handshake,
        title: 'Devenir distributeur',
        detail: 'Réseau MÉTÉORE',
        target: 'contact',
    },
    {
        Icon: FileText,
        title: 'Catalogue MÉTÉORE',
        detail: '20 références',
        target: 'gamme',
    },
    {
        Icon: Mail,
        title: 'Nous contacter',
        detail: 'Kinshasa & Paris',
        target: 'contact',
    },
];

function Header({ onSearch }: { onSearch: (value: string) => void }) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [draft, setDraft] = useState('');

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSearchOpen(false);
        onSearch(draft.trim());
    }

    return (
        <header className="site-header">
            <div className="site-width header-row">
                <a className="brand" href="/">
                    <img
                        src="/meteore/logo.png"
                        alt="Logo MÉTÉORE"
                        width="102"
                        height="42"
                    />
                    <span className="branding">
                        <strong>By OBCITO Énergies</strong>
                        <span>Lubrifiants et fluides pour moteurs</span>
                    </span>
                </a>
                <nav aria-label="Navigation principale" className="desktop-nav">
                    <a href={menu[0][0]}>Actualités</a>
                    <div className="nav-dropdown">
                        <a href="/presentation">
                            Présentation <ChevronDown aria-hidden size={14} />
                        </a>
                        <div className="nav-flyout">
                            {presentationLinks.map(([id, , label]) => (
                                <a key={id} href={`/presentation#${id}`}>
                                    {label}
                                </a>
                            ))}
                        </div>
                    </div>
                    <a href={menu[1][0]}>Produits MÉTÉORE</a>
                    <a href={menu[2][0]}>Allo Moteur</a>
                </nav>
                <div className="header-actions">
                    <button
                        type="button"
                        className="icon-button"
                        aria-label="Rechercher un produit"
                        aria-expanded={searchOpen}
                        onClick={() => {
                            setSearchOpen(!searchOpen);
                            setMobileOpen(false);
                        }}
                    >
                        <Search size={17} />
                    </button>
                    <a
                        className="button primary header-contact"
                        href="/#contact"
                    >
                        Nous contacter
                    </a>
                    <button
                        type="button"
                        className="icon-button mobile-toggle"
                        aria-label={
                            mobileOpen ? 'Fermer le menu' : 'Ouvrir le menu'
                        }
                        aria-expanded={mobileOpen}
                        onClick={() => {
                            setMobileOpen(!mobileOpen);
                            setSearchOpen(false);
                        }}
                    >
                        {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                    </button>
                </div>
            </div>
            {mobileOpen && (
                <nav
                    aria-label="Navigation mobile"
                    className="site-width mobile-nav"
                >
                    {[
                        [...menu[0]],
                        ['/presentation', 'Présentation'],
                        ...menu.slice(1),
                    ].map(([href, label]) => (
                        <a
                            key={href}
                            href={href}
                            onClick={() => setMobileOpen(false)}
                        >
                            {label}
                        </a>
                    ))}
                </nav>
            )}
            {searchOpen && (
                <form
                    className="site-width search-row"
                    onSubmit={submit}
                    role="search"
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') setSearchOpen(false);
                    }}
                >
                    <input
                        autoFocus
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Rechercher une viscosité, une norme…"
                        aria-label="Rechercher une viscosité, une norme…"
                    />
                    <button
                        className="icon-button"
                        type="submit"
                        aria-label="Lancer la recherche"
                    >
                        <Search size={17} />
                    </button>
                    <button
                        className="icon-button"
                        type="button"
                        aria-label="Fermer la recherche"
                        onClick={() => setSearchOpen(false)}
                    >
                        <X size={17} />
                    </button>
                </form>
            )}
        </header>
    );
}

function CatalogCard({
    product,
    onAdd,
}: {
    product: Product;
    onAdd: (product: Product) => void;
}) {
    return (
        <article className="product-card">
            <div className="product-photo">
                <img
                    src={`/meteore/${product.image}`}
                    alt={`${product.name} ${product.grade}`}
                    loading="lazy"
                />
            </div>
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
    const [category, setCategory] = useState(0);
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
        if (page !== 'home') {
            location.assign(`/?q=${encodeURIComponent(value)}#gamme`);
            return;
        }
        setQuery(value);
        setCategory(0);
        setLevel(5);
        scrollTo('gamme');
    }

    return (
        <>
            <Head title={pageTitles[page]} />
            <Header onSearch={handleSearch} />
            {page === 'presentation' && <Presentation />}
            {page === 'allo-moteur' && <AlloMoteur />}
            {page === 'home' && (
                <main>
                    <h1 className="sr-only">MÉTÉORE Lubrifiants</h1>
                    <section
                        className="site-width categories"
                        aria-label="Catégories"
                    >
                        <p className="eyebrow">01 — Catégories</p>
                        <div className="category-grid">
                            {categories.map(
                                ({ Icon, title, detail, target }) => (
                                    <button
                                        key={title}
                                        type="button"
                                        className="category"
                                        onClick={() => scrollTo(target)}
                                    >
                                        <Icon
                                            size={28}
                                            strokeWidth={1.5}
                                            aria-hidden
                                        />
                                        <span className="category-title">
                                            {title}
                                        </span>
                                        <span className="category-detail">
                                            {detail}
                                        </span>
                                        <span className="action-text">
                                            Découvrir{' '}
                                            <ArrowRight size={12} aria-hidden />
                                        </span>
                                    </button>
                                ),
                            )}
                        </div>
                    </section>
                    <section className="section-band shaded" id="gamme">
                        <div className="site-width">
                            <div className="section-heading">
                                <div>
                                    <p className="eyebrow">02 — Gamme</p>
                                    <h2>Notre gamme de lubrifiants</h2>
                                </div>
                                <p className="catalog-count" aria-live="polite">
                                    {results.length}{' '}
                                    {results.length > 1
                                        ? 'références affichées'
                                        : 'référence affichée'}
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
                                        onClick={() => setCategory(index)}
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
                                        onChange={(event) =>
                                            setLevel(Number(event.target.value))
                                        }
                                    />
                                </div>
                                <p>
                                    <strong>{level}</strong>
                                    <span>/ 5 — niveau de protection</span>
                                </p>
                            </div>
                            {results.length ? (
                                <div className="product-grid">
                                    {results.map((product) => (
                                        <CatalogCard
                                            key={product.id}
                                            product={product}
                                            onAdd={quote.add}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <p className="empty-results">
                                    Aucune référence ne correspond à votre
                                    recherche.
                                </p>
                            )}
                        </div>
                    </section>
                    <HomeSections />
                </main>
            )}
            <Footer />
            {page === 'home' && <Quote {...quote} />}
        </>
    );
}
