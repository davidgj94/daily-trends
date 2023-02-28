# daily-trends

## Installation

This project uses node > 18.12 so please install a compatible version before running project.

```bash
$ nvm install 18.13
$ nvm use
```

Install dependencies:

```bash
$ npm i
```

## Project structure

For this project Hexagonal architecture has been used. There are 2 main folders within `/src`:

- `src/apps` which contains api and crons code
- `src/Context` which contins input and output port and adapaters, as well as bussiness logic

## Feed Items

They have the following fields:

- id
- description
- images
- url
- source (currently only "elPais" or "elMundo")

## Feed Example

```
{
    "elPais": [
        {
            "id": "40d91ba0-a0a7-4933-84b1-863b1bde8a8b",
            "url": "https://elpais.com/espana/2023-02-28/los-whatsapp-de-la-kitchen-la-caceria-de-la-cupula-de-interior-de-la-era-rajoy-contra-podemos-y-el-independentismo.html",
            "date": "2023-02-28T04:40:00.682Z",
            "images": [
                "https://imagenes.elpais.com/resizer/v-fNrhGzodRC2-W_XwGsyh28vUc=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/7JJZNZUUDZBZJNOE274YGNFF74.jpeg"
            ],
            "source": "elPais",
            "description": "Los ‘whatsapp’ de la Kitchen: la cacería de la cúpula de Interior de la era Rajoy contra Podemos y el independentismo"
        },
        {
            "id": "a4207f58-4033-4202-abb6-ef784464900f",
            "url": "https://elpais.com/economia/2023-02-28/la-inflacion-repunta-al-61-y-encadena-dos-meses-acelerando.html",
            "date": "2023-02-28T09:02:33.169Z",
            "images": [
                "https://imagenes.elpais.com/resizer/Qp5l2_d1_jYEgBoUGHRoxxmlgC8=/414x0/cloudfront-eu-central-1.images.arcpublishing.com/prisa/CP3TAUIVONFUXNVW62MVNNYNUM.JPG"
            ],
            "source": "elPais",
            "description": "La inflación repunta al 6,1% y acelera por segundo mes consecutivo"
        }
    ],
    "elMundo": [
        {
            "id": "970db483-4b6a-4602-9088-282048d5238a",
            "url": "https://www.elmundo.es/espana/2023/02/28/63fde0bffdddff9e8a8b459b.html",
            "date": "2023-02-28T12:27:43.000Z",
            "images": [],
            "source": "elMundo",
            "description": "Vox esquiva la pol�mica de Tamames sobre la \"Naci�n Catalana\" y afirma que puede \"atraer\" a gente que piensa diferente"
        },
    ]
}
```

## Apps

### REST API

Located at `src/apps/api`. The following CRUD endpoints are implemented:

- GET `/api/v1/feed`: endpoint to fetch all items matching `date` and `sources` filters given via queryparams.
- POST `/api/v1/item`: endpoint for manually creating new items
- PUT `/api/v1/item/:id`: endpoint for updating already existing items (`description`, `url` and `images` fields)

### Scraper cron jobs

Located at `src/apps/scraper`. Contains scrapers for extracting data from news websites such as ElMundo and ElPais. Scraper proceed in the following way:

- First all relevant urls are extracted from the main page
- For each url extract relevant information (description, publication date, images, etc)

To extends the list of currently supported websites, create a new scraper in `src/apps/scraper/scrapers` implementing `WebScraper` interface and instanciate a new `ScrapeJob` that makes uses of it.
Scrape jobs are ran 3 times a day: (at 00:00, 14:00 and 20:00).

## Run project

Prepare .env files following `env.example` template:

```bash
$ cp .env.example .env
$ cp .env.example .env.prod
```

You can start the mongo database separately and then run locally the REST API and scrapers crons, this is useful for development:

```bash
$ npm run db:up
$ npm run start:dev
$ npm run scraper:dev
```

Or you can run everything in docker containers:

```bash
$ npm run docker:up
```
