# Como rodar

### 1- Clone esse repositório

```
git clone https://github.com/AntonioGMN/test-WM-back.git
```

### 2- Crie um arquivo .env seguindo exemplo abaixo:

```
PORT=4000

DB_TYPE=postgresql
DB_USER=postgres
DB_PASSWORD=123456
DB_HOST=localhost
DB_PORT=5432
DB_NAME=testWKM


DB_DATABASE=${DB_TYPE}://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}
```

### 3. Instale as dependências com:

```bash
npm i
```

### 4. Crie o banco:

```bash
npm run prisma migrate dev
```

### 5. Rode com:

```bash
npm run dev
```

#Docker

### 1- Crie um arquivo .docker.env seguindo o exemplo abaixo:

```
PORT=4000

POSTGRES_USER=postgres
POSTGRES_PASSWORD=123456
POSTGRES_DB=testWKM
POSTGRES_HOST=db
POSTGRES_PORT=5432

DB_DATABASE=${DB_TYPE}://${POSTGRES_USER}:${POSTGRES_PASSWORD}@${POSTGRES_HOST}:${POSTGRES_PORT}/${POSTGRES_DB}
```


### 2- Exercute:

```
docker-compose up
```
