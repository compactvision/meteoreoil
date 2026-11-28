import { ChevronLeft, ChevronRight, Maximize2, X } from 'lucide-react';
import { useId, useRef, useState, type PointerEvent } from 'react';
import type { Product } from './catalog';

const photoUrl = (filename: string) => `/meteore/produits/${filename}.webp`;

export function ProductImages({ product }: { product: Product }) {
    const [selected, setSelected] = useState(0);
    const preview = useRef<HTMLDialogElement>(null);
    const opener = useRef<HTMLButtonElement>(null);
    const closeButton = useRef<HTMLButtonElement>(null);
    const swipeStart = useRef<{ id: number; x: number; y: number } | null>(
        null,
    );
    const titleId = useId();

    const photos = product.photos;
    const count = photos.length;
    const [filename, caption] = photos[selected];
    const src = photoUrl(filename);
    const alt = `${product.name}, ${caption}`;

    function changeView(step: number) {
        setSelected((previous) => (previous + count + step) % count);
    }

    function startSwipe(event: PointerEvent<HTMLDivElement>) {
        swipeStart.current = null;
        if (count < 2 || !event.isPrimary || event.button !== 0) return;

        swipeStart.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
    }

    function finishSwipe(event: PointerEvent<HTMLDivElement>) {
        const start = swipeStart.current;
        swipeStart.current = null;
        if (!start || start.id !== event.pointerId) return;

        const dx = event.clientX - start.x;
        const dy = event.clientY - start.y;
        if (Math.abs(dx) >= 44 && Math.abs(dx) > Math.abs(dy) * 1.35) {
            changeView(dx < 0 ? 1 : -1);
        }
    }

    return (
        <div className="product-gallery">
            <button
                ref={opener}
                type="button"
                className="product-photo product-photo-opener"
                aria-label={`Agrandir la photo de ${product.name}`}
                aria-haspopup="dialog"
                onClick={() => {
                    preview.current?.showModal();
                    closeButton.current?.focus();
                }}
            >
                <img key={src} src={src} alt={alt} loading="lazy" />
                <span className="product-photo-expand" aria-hidden>
                    <Maximize2 size={17} strokeWidth={1.7} />
                </span>
            </button>
            <p className="product-gallery-caption" aria-live="polite">
                {caption}
            </p>
            {count > 1 && (
                <div
                    className="product-thumbnails"
                    role="group"
                    aria-label={`Photos de ${product.name}`}
                >
                    {photos.map(([file, label], index) => (
                        <button
                            type="button"
                            key={file}
                            onClick={() => setSelected(index)}
                            aria-label={`Afficher ${label}`}
                            aria-pressed={selected === index}
                            title={label}
                        >
                            <img src={photoUrl(file)} alt="" loading="lazy" />
                        </button>
                    ))}
                </div>
            )}
            <dialog
                ref={preview}
                className="product-lightbox"
                aria-labelledby={titleId}
                onClose={() => opener.current?.focus({ preventScroll: true })}
                onKeyDown={(event) => {
                    if (
                        count < 2 ||
                        !['ArrowLeft', 'ArrowRight'].includes(event.key)
                    )
                        return;
                    event.preventDefault();
                    changeView(event.key === 'ArrowLeft' ? -1 : 1);
                }}
            >
                <div className="product-lightbox-header">
                    <h2 id={titleId}>{product.name}</h2>
                    <button
                        ref={closeButton}
                        type="button"
                        className="product-lightbox-button"
                        aria-label="Fermer la photo"
                        onClick={() => preview.current?.close()}
                    >
                        <X size={22} aria-hidden />
                    </button>
                </div>
                <div
                    className="product-lightbox-stage"
                    onPointerDown={startSwipe}
                    onPointerUp={finishSwipe}
                    onPointerCancel={() => {
                        swipeStart.current = null;
                    }}
                >
                    <img
                        key={src}
                        src={src}
                        alt={alt}
                        loading="lazy"
                        draggable={false}
                    />
                </div>
                {count > 1 && (
                    <div className="product-lightbox-navigation">
                        <button
                            className="product-lightbox-button"
                            type="button"
                            aria-label="Photo précédente"
                            onClick={() => changeView(-1)}
                        >
                            <ChevronLeft size={23} aria-hidden />
                        </button>
                        <p
                            className="product-lightbox-caption"
                            aria-live="polite"
                            aria-atomic="true"
                        >
                            {caption}{' '}
                            <span>
                                · {selected + 1} / {count}
                            </span>
                        </p>
                        <button
                            className="product-lightbox-button"
                            type="button"
                            aria-label="Photo suivante"
                            onClick={() => changeView(1)}
                        >
                            <ChevronRight size={23} aria-hidden />
                        </button>
                        <p className="product-lightbox-hint">
                            Balayer pour changer de vue
                        </p>
                    </div>
                )}
            </dialog>
        </div>
    );
}
