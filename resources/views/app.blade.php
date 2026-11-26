<!DOCTYPE html>
<html lang="fr">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <meta name="description" content="MÉTÉORE, les lubrifiants et fluides pour moteurs d’OBCITO Énergies, conçus pour les climats extrêmes.">
        @if (($page['props']['page'] ?? null) === 'home')
            <link rel="preload" as="image" href="/meteore/turbo-hero.webp" fetchpriority="high">
        @endif
        <link rel="icon" href="/meteore/logo.png" type="image/png">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400..800&amp;display=swap">
        @viteReactRefresh
        @vite(['resources/css/app.css', 'resources/js/app.tsx', "resources/js/pages/{$page['component']}.tsx"])
        <x-inertia::head>
            <title>MÉTÉORE Lubrifiants — Performance haute température | OBCITO Énergies</title>
        </x-inertia::head>
    </head>
    <body class="antialiased">
        <x-inertia::app />
    </body>
</html>
