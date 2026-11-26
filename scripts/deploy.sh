
#!/usr/bin/env bash

set -Eeuo pipefail
umask 077

# Configuration one.com
ROOT="$HOME/webroots/14d466ac"
APP="$ROOT/laravel-app"
DEPLOY="$HOME/deployments/meteoreoil"
DOMAIN="https://meteoreoil.com"

RELEASE="${1:?Identifiant de release manquant}"
[[ "$RELEASE" =~ ^[a-f0-9]{40}$ ]] || exit 1

SOURCE="$DEPLOY/incoming/$RELEASE"
BACKUP="$DEPLOY/backups/$(date +%Y%m%d-%H%M%S)-$RELEASE"

echo "=== Meteore Oil Deployment ==="

# Prevent concurrent deployments
mkdir "$DEPLOY/deploy.lock" || exit 1
trap 'rmdir "$DEPLOY/deploy.lock"' EXIT

check_security() {
    for host in meteoreoil.com www.meteoreoil.com; do
        for file in composer.json .env; do
            status=$(curl -sS --max-time 20 \
                -o /dev/null -w "%{http_code}" \
                "https://$host/laravel-app/$file")

            if [[ "$status" != "403" ]]; then
                echo "Security check failed: $host/$file"
                exit 1
            fi
        done
    done
}

echo "=== Preflight checks ==="

test -f "$APP/.env"
test -f "$ROOT/index.php"
test -f "$ROOT/.htaccess"
test -f "$SOURCE/composer.lock"
test -f "$SOURCE/public/build/manifest.json"

grep -Fxq 'Require all denied' "$APP/.htaccess"

check_security

echo "=== Installing PHP dependencies ==="

cd "$SOURCE"

composer install \
    --no-dev \
    --optimize-autoloader \
    --no-interaction \
    --prefer-dist

composer check-platform-reqs --no-dev

echo "=== Creating backup ==="

mkdir -p "$BACKUP/app" "$BACKUP/public"

rsync -a "$APP/" "$BACKUP/app/"

rsync -a \
    --exclude='/laravel-app/' \
    "$ROOT/" "$BACKUP/public/"

echo "Backup: $BACKUP"

echo "=== Maintenance mode ==="

cd "$APP"
php artisan down

echo "=== Publishing backend ==="

rsync -a --delete \
    --chmod=D755,F644 \
    --exclude='.git/' \
    --exclude='.github/' \
    --exclude='.env*' \
    --exclude='.htaccess' \
    --exclude='/storage/' \
    --exclude='/bootstrap/cache/' \
    --exclude='/database/*.sqlite*' \
    --exclude='/node_modules/' \
    --exclude='/public/' \
    --exclude='/tests/' \
    --exclude='/scripts/' \
    "$SOURCE/" "$APP/"

echo "=== Publishing frontend ==="

rsync -a \
    --chmod=D755,F644 \
    --exclude='/index.php' \
    --exclude='/.htaccess' \
    --exclude='/hot' \
    --exclude='/storage' \
    "$SOURCE/public/" "$ROOT/"

echo "=== Laravel configuration ==="

cd "$APP"

php artisan optimize:clear
php artisan migrate --force
php artisan config:cache
php artisan view:cache

echo "=== Security checks ==="

check_security

echo "=== Bringing application online ==="

php artisan up

echo "=== Health checks ==="

if ! curl -fsS --max-time 30 "$DOMAIN/up" > /dev/null \
    || ! curl -fsS --max-time 30 "$DOMAIN/" > /dev/null
then
    php artisan down
    echo "Health check failed. Backup: $BACKUP"
    exit 1
fi

echo "=== DEPLOYMENT SUCCESSFUL ==="
echo "Release: $RELEASE"
echo "Website: $DOMAIN"

