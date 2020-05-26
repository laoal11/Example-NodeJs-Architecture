const app = require('express')();
const http = require('http').createServer(app);
const config = require('./config/config')

const compression = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const configureRoutes = require('./server.routes.js')

const { handleError } = require('./utils/error')
const logger = require('./logger')

app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(cors());
app.use(bodyParser());

configureRoutes(app);

app.use((err, req, res, next) => {
  handleError(err, res);
})

http.listen(config.port, function () {
  logger.info('Server listening on port ' + config.port)
});