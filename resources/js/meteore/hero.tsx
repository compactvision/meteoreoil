import { PageLink } from './page-link';
import { ChevronDown } from 'lucide-react';
import { filters, products } from './catalog';

export function Hero() {
    return (
        <>
            <section className="brand-hero" aria-labelledby="hero-title">
                <div className="hero-visual" aria-hidden="true">
                    <img
                        className="hero-image"
                        src="/meteore/turbo-hero.webp"
                        alt=""
                        width="1536"
                        height="1024"
                        fetchPriority="high"
                    />
                </div>
                <div className="site-width hero-layout">
                    <div className="hero-copy">
                        <p className="hero-kicker">
                            Lubrifiants haute performance
                        </p>
                        <h1 id="hero-title">
                            <span className="hero-title-line">
                                La performance
                            </span>
                            <br />
                            <span className="hero-title-line">
                                face à la chaleur.
                            </span>
                        </h1>
                        <p className="hero-description">
                            Des lubrifiants et fluides conçus pour protéger vos
                            moteurs, vos flottes et vos équipements dans les
                            climats extrêmes.
                        </p>
                        <div className="hero-links">
                            <PageLink
                                className="button hero-primary"
                                href="/produits"
                            >
                                Explorer la gamme
                            </PageLink>
                            <PageLink
                                className="button hero-secondary"
                                href="/presentation"
                            >
                                Découvrir MÉTÉORE
                            </PageLink>
                        </div>
                    </div>
                    <a
                        className="hero-scroll"
                        href="#solutions"
                        aria-label="Découvrir les applications"
                    >
                        <ChevronDown size={19} strokeWidth={1.5} aria-hidden />
                    </a>
                </div>
            </section>
            <div className="hero-facts">
                <div className="site-width hero-facts-grid" data-reveal-group>
                    <div data-reveal="rise">
                        <strong>{products.length}</strong>
                        <span>Références de lubrifiants et fluides</span>
                    </div>
                    <div data-reveal="rise">
                        <strong>{filters.length - 1}</strong>
                        <span>Familles de produits</span>
                    </div>
                    <div data-reveal="rise">
                        <strong>Kinshasa · Paris</strong>
                        <span>Hubs logistiques</span>
                    </div>
                </div>
            </div>
        </>
    );
}
