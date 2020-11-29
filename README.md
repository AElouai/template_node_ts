# Step 1

## MongoDB Environment variables

Specify the following information in your .env file

```
MONGO_HOST : mongo host
MONGO_DATABASE : name of the database
MONGO_USERNAME : mongo user's username
MONGO_PASSWORD : mongo user's password
```

you can check  [Connect to MongoDB Cluster](https://docs.atlas.mongodb.com/connect-to-cluster/#connect-to-a-cluster)  for more information and  [create a free Cluster account](https://www.mongodb.com/try) to play with

## Getting into it

```shell
# Get the latest snapshot
git clone git@github.com:AElouai/testitoto-.git AETest

# Change directory
cd AETest

# Install dependencies
npm install

# Build the project
npm run build

# Don't forget to add your Data, can't run mongoDb on my Machine so -_-
cat .env.example > .env

# Run (development mode) the API on port 9100
npm run watch
```

To build the project by running `npm build` then start the server by running `npm start` .

Finally, navigate to [http://localhost:9100](http://localhost:9100) and you now have access to your API


## Build scripts


 `start` :  Runs `tsc -w` (continuously watches `.ts` files and re-compiles when a change is made) and `nodemon dist/server.js` (runs node with nodemon so the process restarts when a change is made) concurrently. Use this for development 

`test` : Runs tests using Jest test runner verbosely and generate a coverage report (`test:watch`:  Runs tests in watch mode )

`build`: Full build. Runs `build-ts` and `lint` build tasks (`build-ts` Compiles all source `.ts` files to `.js` files in the `dist` folder and
`lint` runs ESLint on project files )

## API Endpoint

### GET /concert 

API Endpoint that returns the concerts matching the criteria given by the user.
The endpoint accept the four filters below as query parameters

```json
bandIds: String - Comma separated list of bandIds
latitude: float
longitude: float
radius: Int - In kilometers
```

and return and array of object

```json
    [{
        "band": "Radiohead",
        "location": "Point Ephémère, Paris, France",
        "date": 1569531810650,
        "latitude": 48.8814422,
        "longitude": 2.3684356
    } ... ]
```

CAll Example

```curl
curl --location --request GET 'http://localhost:9100/concert?latitude=43.63967479999999&longitude=-79.3535794&radius=20'
```

### GET /healthy 
API Endpoint that returns the 'OK' with `200` status if the server is Up and running 

```curl
curl --location --request GET 'http://localhost:9100/healthy'
```

# Step 2

For the previous step, we had 1400 bands across 376 venues, and around 20,000 events, but what if we had 2 million bands, 10,000 venues, and 200 million events the way i see the architecture changing is depending on the clients needs (future requirements) for example are we listing list fo concert by Each artist or listing different Venues by Date or ... 

- What do you identify as possible risks in the architecture that you described in the long run, and how would you mitigate those?

we had 3 object, I used [MongoDB](https://www.mongodb.com/) since it has a good support for [Geospatial Queries](https://docs.mongodb.com/manual/geospatial-queries/) by comparison to other [database](https://scholarworks.sjsu.edu/cgi/viewcontent.cgi?article=1674&context=etd_projects) 

```
    date: Number,
    band: {
        id: Number,
        name: String,
    },
    venue: {
        id: Number,
        name: String,
        location: {
            type: { type: String, default: "Point" },
            coordinates: { type: [Number], default: [0, 0] },
        },
    },
```
My document schema was based on the current requirement but when the app will start scaling the performance will take a big hit and if we need to add more filters we can hit a bottleneck to resolve that instead of Embedding the 3 document in one i will go by Referencing them, but again when working with a many-to-many module we can have a performance issues that can be solve by old way like Schema [Stitching](https://developer.mongodb.com/how-to/graphql-support-atlas-stitch) or new approach like  [Federation services](https://docs.atlas.mongodb.com/security/federated-authentication/) .

- What are the key elements of your architecture that would need to be monitored, and what would you use to monitor those?

Response time for all calls made and data validation as requested for input params this information ensures that the API is not only available but that the data is correct.

I tried to put a base for monitering the log by  using [winston](https://github.com/winstonjs/winston) in the app