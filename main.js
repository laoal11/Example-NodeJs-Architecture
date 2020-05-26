const app = require('express')();
const http = require('http').createServer(app);

const compression = require('compression');
const helmet = require('helmet');
const config = require('./config/config')
const cors = require('cors');
const bodyParser = require('body-parser');
const configureRoutes = require('./server.routes.js')
const cookieParser = require('cookie-parser');
const { handleError } = require('./utils/error')

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
  console.log('Server listening on port ' + config.port);
});