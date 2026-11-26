import { Link, usePage } from '@inertiajs/react';
import type { ComponentProps } from 'react';

type PageLinkProps = Pick<
    ComponentProps<'a'>,
    'aria-current' | 'children' | 'className'
> & {
    href: string;
    onClick?: () => void;
    prefetch?: boolean;
};

export function PageLink({ href, prefetch, ...props }: PageLinkProps) {
    const { url } = usePage();
    const [path, fragment] = href.split('#');
    const currentPath = url.replace(/^https?:\/\/[^/]+/, '').split('#')[0];

    if (fragment && path === currentPath) {
        return <a {...props} href={`#${fragment}`} />;
    }

    return <Link {...props} href={href} prefetch={prefetch} />;
}
