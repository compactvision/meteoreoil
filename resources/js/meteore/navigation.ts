export const navigation = [
    ['/', 'Accueil'],
    ['/actualites', 'Actualité'],
    ['/presentation', 'Présentation'],
    ['/produits', 'Nos produits MÉTÉORE'],
    ['/garantie', 'Garantie'],
    ['/contact', 'Contact'],
    ['/allo-moteur', 'Allo Moteur'],
] as const;

export const presentationLinks = [
    ['la-marque', 'La Marque', 'La Marque'],
    ['philosophie', 'Philosophie', 'Notre Philosophie'],
    ['solutions', 'Gamme de solutions', 'Notre gamme de solutions'],
    ['pourquoi', 'Pourquoi MÉTÉORE', 'Pourquoi choisir MÉTÉORE'],
    ['livraison', 'Livraison', 'Où pouvons-nous livrer'],
    ['entreprise', 'Notre entreprise', 'Notre entreprise'],
] as const;

export type Page =
    | 'home'
    | 'actualites'
    | 'presentation'
    | 'produits'
    | 'garantie'
    | 'contact'
    | 'allo-moteur';
