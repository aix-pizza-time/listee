const express = require('express');
const bodyparser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');

const {stash, initialize} = require('./utils/');

let _data = {
    current: {},
    archive: {},
};

const app = express();

app.use(morgan('tiny'));
app.use(bodyparser.json());
app.use(cors());

// app.use((req, res, next) => {
//     console.log(_data);
//     next();
// });

require('./routes/api.js')(app, express.Router());

const port = process.env.PORT || 3000;


app.listen(port, () => {
    console.log(`Listening to port ${port}`);
});

module.exports = {
    stash: () => stash(data),
};