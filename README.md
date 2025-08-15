# js-basic-projects-api-microolx

## Access to mongo db

1. Should have installed [docker desktop](https://www.docker.com/products/docker-desktop/)
2. Need to check in terminal the next command(If you try after install, relaunch terminal)
```bash
docker-compose
```
or
```bash
docker compose
```
3. If command works, run ```docker-compose up``` or ```docker compose up```
4. After that you can use mongo db with next credentials

Host - localhost

Port - 27019

Username - root

Password - example

Or just use this connection string
```mongodb://root:example@localhost:27019/```

For stopping container with mongo you can use ```CTRL + C``` in an active terminal window where you run command above

Or just click on the stop button in the GUI interface of docker desktop

## Need create api for application for creating ads

### Requests

#### Create user(registration)(public endpoint, use can request without any token)
#### Login user(public endpoint)
#### Get all ads(public endpoint)(with pagination, limit and offset params)

#### -----Work with own ads-----
#### Get own ads(private endpoint, only with token)(with pagination too) filters: By status, with search input by title
#### Create ad(private endpoint)
#### Edit ad(private endpoint)
#### Archive ad(private endpoint)
#### -----Work with other ads----
#### Apply ad(you can't apply your own ad)(private endpoint). After apply ad automatically should have status Archive
####

### Data model

#### User

| property | type     | required | restrictions          |
|----------|----------|----------|-----------------------|
| _id      | ObjectId | true     | Unique                |
| username | String   | true     | Unique, min 4, max 30 |
| email    | String   | true     | Unique  min 6, max 40 |
| password | String   | true     | hashed  min 8, max 30 |

#### Ad

| property    | type     | required | restriction                   |
|-------------|----------|----------|-------------------------------|
| _id         | ObjectId | true     | Unique                        |
| title       | String   | true     | min 6, max 40                 |
| description | String   | true     | min 10, max 10000             |
| price       | Number   | true     | >1                            |
| currency    | String   | true     | Enum(USD, UAH)                |
| location    | String   | true     |                               |
| status      | String   | true     | Enum(Draft, Public, Archived) |
| userId      | ObjectId | true     | owner of ad                   |
| applierId   | ObjectId |          | who applied this ad           |
