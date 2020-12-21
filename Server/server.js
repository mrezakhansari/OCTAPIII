require('express-async-errors')
const express = require('express')
const cors = require('cors')



const app = express()
app.use(cors());
// app.options('*', cors())
const server = require('http').createServer(app);
const setting = require('./app-setting')
const path = require('path');
const fileUpload = require('express-fileupload');


require('./messaging/socket')(app, server);
app.use(express.json());
app.use(express.static(__dirname + '/www'));

app.use(require('./middleware/log'))
app.use(require('./bootstrap/init'));
app.use(fileUpload());


require('./bootstrap/mongodb');
require('./routes')(app);


// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname + '/www/index.html'));
// });

app.get('/*', (req, res) => res.sendFile(path.join(__dirname)));

server.listen((setting.portNo), () => {
  console.log(`Server started on ${setting.portNo} --- ${new Date()}`);
});