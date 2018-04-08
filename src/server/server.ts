import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as path from 'path';
import * as http from 'http';
import { config } from './config';

const app = express();

// API file for interacting with MongoDB
const api = require(config.server.path.api);

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Angular output folder
app.use(express.static(path.join(__dirname, config.server.path.angularOutput)));

// API location
app.use('/api', api);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, config.server.path.angularIndex));
});

// Set port
const port = process.env.PORT || config.server.port;
app.set('port', port);

// Server
const server = http.createServer(app);
server.listen(port, () => console.log(`Running on port: ${port}`));
