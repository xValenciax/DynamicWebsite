const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const port = 8000;

app.listen(port, listening);

function listening(){
    console.log('Server is running');
    console.log(`running on port ${port}`);
}

app.use(express.static('public'));