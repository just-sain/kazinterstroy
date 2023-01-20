# getting started

## first, add .env file to root directory and add:

```
NEXT_PUBLIC_SELF_DOMAIN='http://localhost:8080'

NEXT_PUBLIC_DOMAIN='domain of api'
NEXT_PUBLIC_API='url of api'
NEXT_PUBLIC_ACCESS_TOKEN='access token for api'
NEXT_PUBLIC_CATEGORIES='categories which will be show you'

NEXT_PUBLIC_CONTENTFUL_SPACE='space token'
NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN='access token for cms'
```

## second, install node packages:

```bash
npm i
# or
yarn install
# or
pnpm install
```

## third, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:8080](http://localhost:8080) with your browser to see the result.

by just.sain
