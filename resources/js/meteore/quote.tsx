import { ShoppingBag, Trash2, X } from 'lucide-react';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import { products, type Product } from './catalog';

export type QuoteLine = {
    productId: number;
    size: number;
    pack: 'bidons' | 'cartons' | 'futs';
    quantity: number;
};

const storageKey = 'meteore-quote';
const packLabels = { bidons: 'Bidons', cartons: 'Cartons', futs: 'Fûts 210 L' };

function findProduct(id: number) {
    return products.find((product) => product.id === id);
}

function readQuote(): QuoteLine[] {
    try {
        const stored: unknown = JSON.parse(
            localStorage.getItem(storageKey) ?? '[]',
        );
        if (!Array.isArray(stored)) return [];
        return stored.filter(
            (line): line is QuoteLine =>
                line &&
                findProduct(line.productId)?.sizes.includes(line.size) &&
                ['bidons', 'cartons', 'futs'].includes(line.pack) &&
                Number.isInteger(line.quantity) &&
                line.quantity > 0 &&
                line.quantity <= 10000,
        );
    } catch {
        return [];
    }
}

function volume(line: QuoteLine) {
    return line.quantity * line.size;
}

export function useQuote() {
    const [lines, setLines] = useState<QuoteLine[]>(readQuote);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        try {
            localStorage.setItem(storageKey, JSON.stringify(lines));
        } catch {
            // The quote remains usable when storage is unavailable.
        }
    }, [lines]);

    function add(product: Product) {
        setLines((previous) =>
            previous.some((line) => line.productId === product.id)
                ? previous
                : [
                      ...previous,
                      {
                          productId: product.id,
                          size: 5,
                          pack: 'bidons',
                          quantity: 1,
                      },
                  ],
        );
        setOpen(true);
    }

    return { lines, setLines, open, setOpen, add };
}

type QuoteProps = ReturnType<typeof useQuote>;

export function Quote({ lines, setLines, open, setOpen }: QuoteProps) {
    const panel = useRef<HTMLDialogElement>(null);
    const [sending, setSending] = useState(false);
    const [status, setStatus] = useState('');
    const [error, setError] = useState(false);
    const total = lines.reduce((sum, line) => sum + volume(line), 0);

    useEffect(() => {
        const dialog = panel.current;
        if (!dialog) return;
        if (open) {
            if (!dialog.open) dialog.showModal();
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = 'hidden';
            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }
        if (dialog.open) dialog.close();
    }, [open]);

    function update(id: number, changes: Partial<QuoteLine>) {
        setLines((previous) =>
            previous.map((line) =>
                line.productId === id ? { ...line, ...changes } : line,
            ),
        );
    }

    async function submit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!lines.length || sending) return;

        const form = event.currentTarget;
        setSending(true);
        setStatus('');
        setError(false);
        try {
            const response = await fetch('/devis', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-TOKEN':
                        document.querySelector<HTMLMetaElement>(
                            'meta[name="csrf-token"]',
                        )?.content ?? '',
                },
                body: JSON.stringify({
                    ...Object.fromEntries(new FormData(form)),
                    lines,
                }),
            });
            const result = await response.json();
            if (!response.ok) {
                throw new Error(
                    response.status === 422
                        ? result.message
                        : 'La demande n’a pas pu être enregistrée. Réessayez.',
                );
            }
            form.reset();
            setLines([]);
            setStatus('Votre demande de devis a été enregistrée.');
        } catch (reason) {
            setError(true);
            setStatus(
                reason instanceof Error && reason.message !== 'Failed to fetch'
                    ? reason instanceof SyntaxError
                        ? 'Le serveur est indisponible. Réessayez.'
                        : reason.message
                    : 'La connexion a été interrompue. Réessayez.',
            );
        } finally {
            setSending(false);
        }
    }

    return (
        <>
            <button
                type="button"
                className="button primary quote-trigger"
                onClick={() => setOpen(true)}
            >
                <ShoppingBag size={16} /> Devis ({lines.length})
            </button>
            <dialog
                className="quote-panel"
                ref={panel}
                aria-labelledby="quote-title"
                onClose={() => setOpen(false)}
                onClick={(event) => {
                    if (event.target === event.currentTarget) setOpen(false);
                }}
            >
                <div className="quote-content">
                    <button
                        type="button"
                        className="close-quote"
                        aria-label="Fermer le devis"
                        onClick={() => setOpen(false)}
                    >
                        <X size={16} />
                    </button>
                    <h2 id="quote-title">Demande de devis</h2>
                    {status && (
                        <p
                            role={error ? 'alert' : 'status'}
                            className={error ? 'quote-error' : 'quote-success'}
                        >
                            {status}
                        </p>
                    )}
                    {!lines.length && (
                        <p className="quote-empty">Votre devis est vide.</p>
                    )}
                    <form onSubmit={submit} hidden={!lines.length}>
                        <fieldset disabled={sending}>
                            {lines.map((line) => {
                                const product = findProduct(line.productId)!;
                                return (
                                    <div
                                        className="quote-line"
                                        key={product.id}
                                    >
                                        <button
                                            type="button"
                                            className="remove-line"
                                            aria-label={`Retirer ${product.name}`}
                                            onClick={() =>
                                                setLines((previous) =>
                                                    previous.filter(
                                                        (item) =>
                                                            item.productId !==
                                                            product.id,
                                                    ),
                                                )
                                            }
                                        >
                                            <Trash2 size={15} />
                                        </button>
                                        <strong>{product.name}</strong>
                                        <p className="quote-grade">
                                            {product.grade}
                                        </p>
                                        <div className="quote-sizes">
                                            {product.sizes.map((size) => (
                                                <button
                                                    key={size}
                                                    type="button"
                                                    aria-pressed={
                                                        size === line.size
                                                    }
                                                    onClick={() =>
                                                        update(product.id, {
                                                            size,
                                                        })
                                                    }
                                                >
                                                    {size} L
                                                </button>
                                            ))}
                                        </div>
                                        <div className="quote-amount">
                                            <select
                                                aria-label={`Conditionnement de ${product.name}`}
                                                value={line.pack}
                                                onChange={(event) =>
                                                    update(product.id, {
                                                        pack: event.target
                                                            .value as QuoteLine['pack'],
                                                    })
                                                }
                                            >
                                                {Object.entries(packLabels).map(
                                                    ([value, label]) => (
                                                        <option
                                                            key={value}
                                                            value={value}
                                                        >
                                                            {label}
                                                        </option>
                                                    ),
                                                )}
                                            </select>
                                            <input
                                                aria-label={`Quantité de ${product.name}`}
                                                type="number"
                                                min="1"
                                                max="10000"
                                                value={line.quantity || ''}
                                                required
                                                onChange={(event) =>
                                                    update(product.id, {
                                                        quantity: Number(
                                                            event.target.value,
                                                        ),
                                                    })
                                                }
                                            />
                                        </div>
                                        <p className="quote-volume">
                                            Volume : {volume(line)} L
                                        </p>
                                    </div>
                                );
                            })}
                            <p className="quote-total">
                                Volume total : <strong>{total} L</strong>
                            </p>
                            <div className="quote-fields">
                                <input
                                    name="name"
                                    placeholder="Nom complet"
                                    aria-label="Nom complet"
                                    autoComplete="name"
                                    maxLength={150}
                                    required
                                />
                                <input
                                    name="company"
                                    placeholder="Société"
                                    aria-label="Société"
                                    autoComplete="organization"
                                    maxLength={150}
                                />
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Email"
                                    aria-label="Email"
                                    autoComplete="email"
                                    maxLength={254}
                                    required
                                />
                                <input
                                    name="phone"
                                    type="tel"
                                    placeholder="Téléphone"
                                    aria-label="Téléphone"
                                    autoComplete="tel"
                                    maxLength={50}
                                />
                                <input
                                    name="country"
                                    placeholder="Pays de livraison"
                                    aria-label="Pays de livraison"
                                    autoComplete="country-name"
                                    maxLength={100}
                                />
                                <textarea
                                    name="message"
                                    placeholder="Message (optionnel)"
                                    aria-label="Message (optionnel)"
                                    maxLength={5000}
                                    rows={2}
                                />
                            </div>
                            <button type="submit" className="quote-submit">
                                {sending
                                    ? 'Envoi en cours…'
                                    : 'Envoyer la demande'}
                            </button>
                        </fieldset>
                    </form>
                </div>
            </dialog>
        </>
    );
}
