import { PageLink } from './page-link';
import { ChevronDown, Search, X } from 'lucide-react';
import {
    useEffect,
    useRef,
    useState,
    type CSSProperties,
    type FormEvent,
} from 'react';
import { navigation, presentationLinks } from './navigation';

const desktopLinks = navigation.filter(([href]) => href !== '/contact');

function Brand() {
    return (
        <PageLink className="brand" href="/">
            <img
                src="/meteore/logo.png"
                alt="Logo MÉTÉORE"
                width="3188"
                height="1262"
            />
            <span className="branding">
                <strong>by Obcito energies</strong>
                <span>Lubrifiant, additif & fluides</span>
            </span>
        </PageLink>
    );
}

export function Header({
    currentPath,
    onSearch,
}: {
    currentPath: string;
    onSearch: (value: string) => void;
}) {
    const [searchOpen, setSearchOpen] = useState(false);
    const [presentationOpen, setPresentationOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mobilePresentationOpen, setMobilePresentationOpen] = useState(false);
    const [draft, setDraft] = useState('');
    const mobileMenu = useRef<HTMLDialogElement>(null);
    const closeMenuButton = useRef<HTMLButtonElement>(null);
    const searchButton = useRef<HTMLButtonElement>(null);
    const presentationButton = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        const desktop = matchMedia('(min-width: 1240px)');
        const closeOnDesktop = (event: MediaQueryListEvent) => {
            if (event.matches && mobileMenu.current?.open)
                mobileMenu.current.close();
        };
        desktop.addEventListener('change', closeOnDesktop);
        return () => desktop.removeEventListener('change', closeOnDesktop);
    }, []);

    function openMenu() {
        setSearchOpen(false);
        setPresentationOpen(false);
        mobileMenu.current?.showModal();
        closeMenuButton.current?.focus();
        setMobileOpen(true);
    }

    function closeMenu() {
        mobileMenu.current?.close();
    }

    function closeSearch() {
        setSearchOpen(false);
        searchButton.current?.focus();
    }

    function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setSearchOpen(false);
        onSearch(draft.trim());
    }

    return (
        <header className="site-header">
            <div className="site-width header-row">
                <Brand />
                <nav aria-label="Navigation principale" className="desktop-nav">
                    {desktopLinks.map(([href, label]) =>
                        href === '/presentation' ? (
                            <div
                                className="nav-dropdown"
                                key={href}
                                onBlur={(event) => {
                                    if (
                                        !event.currentTarget.contains(
                                            event.relatedTarget,
                                        )
                                    )
                                        setPresentationOpen(false);
                                }}
                                onKeyDown={(event) => {
                                    if (
                                        event.key === 'Escape' &&
                                        presentationOpen
                                    ) {
                                        event.stopPropagation();
                                        setPresentationOpen(false);
                                        presentationButton.current?.focus();
                                    }
                                }}
                            >
                                <PageLink
                                    className="nav-link"
                                    href={href}
                                    prefetch
                                    aria-current={
                                        currentPath === href
                                            ? 'page'
                                            : undefined
                                    }
                                >
                                    {label}
                                </PageLink>
                                <button
                                    ref={presentationButton}
                                    type="button"
                                    className="nav-caret"
                                    aria-label="Sections de présentation"
                                    aria-expanded={presentationOpen}
                                    aria-controls="presentation-menu"
                                    onClick={() => {
                                        setPresentationOpen(!presentationOpen);
                                        setSearchOpen(false);
                                    }}
                                >
                                    <ChevronDown size={15} aria-hidden />
                                </button>
                                <div
                                    className="nav-flyout"
                                    id="presentation-menu"
                                    inert={!presentationOpen}
                                    data-open={presentationOpen}
                                >
                                    {presentationLinks.map(
                                        ([id, , section]) => (
                                            <PageLink
                                                key={id}
                                                href={`/presentation#${id}`}
                                                onClick={() =>
                                                    setPresentationOpen(false)
                                                }
                                            >
                                                {section}
                                            </PageLink>
                                        ),
                                    )}
                                </div>
                            </div>
                        ) : (
                            <PageLink
                                className="nav-link"
                                key={href}
                                href={href}
                                prefetch
                                aria-current={
                                    currentPath === href ? 'page' : undefined
                                }
                            >
                                {label}
                            </PageLink>
                        ),
                    )}
                </nav>
                <div className="header-actions">
                    <button
                        ref={searchButton}
                        type="button"
                        className="icon-button search-toggle"
                        aria-label={
                            searchOpen
                                ? 'Fermer la recherche'
                                : 'Rechercher un produit'
                        }
                        aria-expanded={searchOpen}
                        onClick={() => {
                            setSearchOpen(!searchOpen);
                            setPresentationOpen(false);
                        }}
                    >
                        {searchOpen ? (
                            <X size={19} aria-hidden />
                        ) : (
                            <Search size={19} aria-hidden />
                        )}
                    </button>
                    <PageLink
                        className="button primary header-contact"
                        href="/contact"
                        prefetch
                        aria-current={
                            currentPath === '/contact' ? 'page' : undefined
                        }
                    >
                        Contact
                    </PageLink>
                    <button
                        type="button"
                        className="icon-button mobile-toggle"
                        aria-label="Ouvrir le menu"
                        aria-expanded={mobileOpen}
                        aria-controls="mobile-menu"
                        aria-haspopup="dialog"
                        onClick={openMenu}
                    >
                        <span className="burger-lines" aria-hidden>
                            <i />
                            <i />
                        </span>
                    </button>
                </div>
            </div>
            {searchOpen && (
                <form
                    className="site-width search-row"
                    onSubmit={submit}
                    role="search"
                    onKeyDown={(event) => {
                        if (event.key === 'Escape') closeSearch();
                    }}
                >
                    <Search
                        size={19}
                        aria-hidden
                        className="search-field-icon"
                    />
                    <input
                        autoFocus
                        value={draft}
                        onChange={(event) => setDraft(event.target.value)}
                        placeholder="Rechercher une viscosité, une norme…"
                        aria-label="Rechercher une viscosité, une norme…"
                    />
                    <button
                        className="button primary"
                        type="submit"
                        aria-label="Lancer la recherche"
                    >
                        Rechercher
                    </button>
                </form>
            )}
            <dialog
                className="mobile-menu"
                id="mobile-menu"
                ref={mobileMenu}
                aria-label="Menu principal"
                onClose={() => {
                    setMobileOpen(false);
                    setMobilePresentationOpen(false);
                }}
            >
                <div className="mobile-menu-layout">
                    <div className="mobile-menu-bar">
                        <div className="site-width header-row">
                            <Brand />
                            <button
                                ref={closeMenuButton}
                                type="button"
                                className="icon-button menu-close"
                                aria-label="Fermer le menu"
                                onClick={closeMenu}
                            >
                                <X size={21} strokeWidth={1.6} aria-hidden />
                            </button>
                        </div>
                    </div>
                    <div className="site-width mobile-menu-content">
                        <nav
                            className="mobile-menu-links"
                            aria-label="Navigation mobile"
                        >
                            {navigation.map(([href, label], index) => (
                                <div
                                    key={href}
                                    className="mobile-menu-item"
                                    style={
                                        {
                                            '--menu-index': index,
                                        } as CSSProperties
                                    }
                                >
                                    <div className="mobile-menu-link-row">
                                        <PageLink
                                            href={href}
                                            aria-current={
                                                currentPath === href
                                                    ? 'page'
                                                    : undefined
                                            }
                                        >
                                            {label}
                                        </PageLink>
                                        {href === '/presentation' && (
                                            <button
                                                className="mobile-submenu-toggle"
                                                type="button"
                                                aria-label="Sections de présentation"
                                                aria-expanded={
                                                    mobilePresentationOpen
                                                }
                                                aria-controls="mobile-presentation-menu"
                                                onClick={() =>
                                                    setMobilePresentationOpen(
                                                        !mobilePresentationOpen,
                                                    )
                                                }
                                            >
                                                <ChevronDown
                                                    size={21}
                                                    aria-hidden
                                                />
                                            </button>
                                        )}
                                    </div>
                                    {href === '/presentation' && (
                                        <div
                                            className="mobile-submenu"
                                            id="mobile-presentation-menu"
                                            data-open={mobilePresentationOpen}
                                            inert={!mobilePresentationOpen}
                                        >
                                            <div>
                                                {presentationLinks.map(
                                                    ([id, , section]) => (
                                                        <PageLink
                                                            key={id}
                                                            href={`/presentation#${id}`}
                                                            onClick={
                                                                currentPath ===
                                                                '/presentation'
                                                                    ? closeMenu
                                                                    : undefined
                                                            }
                                                        >
                                                            {section}
                                                        </PageLink>
                                                    ),
                                                )}
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </nav>
                        <div className="mobile-menu-footer">
                            <a href="mailto:info@obcito-energies.com">
                                info@obcito-energies.com
                            </a>
                            <span>Kinshasa · Paris</span>
                        </div>
                    </div>
                </div>
            </dialog>
        </header>
    );
}
