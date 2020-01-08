var app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var cors = require('cors')
var http = require('http');

const Todo = require('./api/models/event')

//Importing Routes
const loginRoute = require('./api/routes/login')
const signupRoute = require('./api/routes/signup')
const eventRoute = require('./api/routes/event')


//Setting up body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//MongoDB Connection
mongoose.connect("mongodb://root:" + process.env.MONGO_ATLAS_PW + "@cluster0-shard-00-00-q5jmf.mongodb.net:27017,cluster0-shard-00-01-q5jmf.mongodb.net:27017,cluster0-shard-00-02-q5jmf.mongodb.net:27017/chatApp?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true", { useMongoClient: true })

//deprecation warning suppression
mongoose.Promise = global.Promise;

//CORS error handling: to filter request before forwarded to routes
app.use(cors())
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET, OPTIONS')
        return res.status(200).json({});
    }
    next();
});

//using the routes
app.use('/api/login', loginRoute);
app.use('/api/signup', signupRoute);
app.use('/api/events', eventRoute);


app.use((error, req, res, next) => {
    if (error) {
        res.status(500).json({
            error: {
                message: error.message
            }
        });
    } else {
        res.status(200);
    }
});

const port = 3000;

const server = http.createServer(app);

server.listen(port);
