export function Production() {
    return (
        <section
            className="section-band production-section"
            id="conditionnement"
            aria-labelledby="production-title"
        >
            <div className="site-width production-layout">
                <div className="production-intro" data-reveal="left">
                    <p className="eyebrow">En atelier</p>
                    <h2 id="production-title">
                        Sur la ligne de conditionnement.
                    </h2>
                    <p>
                        Les bidons MÉTÉORE défilent sur la ligne. Entre bidons
                        et fûts, découvrez les emballages de la gamme.
                    </p>
                </div>
                <figure className="production-film" data-reveal="media">
                    <div className="production-player">
                        <video
                            aria-label="Les bidons MÉTÉORE sur la ligne de conditionnement"
                            controls
                            playsInline
                            preload="none"
                            poster="/meteore/conditionnement-poster.webp"
                            width="368"
                            height="448"
                        >
                            <source
                                src="/meteore/ligne-conditionnement.mp4"
                                type="video/mp4"
                            />
                            <a href="/meteore/ligne-conditionnement.mp4">
                                Ouvrir la vidéo du conditionnement
                            </a>
                        </video>
                    </div>
                    <figcaption>La ligne en mouvement</figcaption>
                </figure>
                <div className="production-photos" data-reveal-group>
                    <figure className="production-workshop" data-reveal="media">
                        <img
                            src="/meteore/atelier.webp"
                            alt="Bidons MÉTÉORE alignés sur la table de la ligne de conditionnement"
                            width="1120"
                            height="840"
                            loading="lazy"
                        />
                        <figcaption>Les bidons en atelier</figcaption>
                    </figure>
                    <figure className="production-barrel" data-reveal="media">
                        <img
                            src="/meteore/fut-obcito.webp"
                            alt="Fût métallique gris portant le logo OBCITO Énergies"
                            width="598"
                            height="920"
                            loading="lazy"
                        />
                        <figcaption>Fût OBCITO Énergies</figcaption>
                    </figure>
                </div>
            </div>
        </section>
    );
}
