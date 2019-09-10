"use strict";

import * as express from "express";
import * as bodyParser from "body-parser";

import * as fs from "fs";
import EDIParser from './parser';

import map from './map';

const rawFile = fs.readFileSync('./edi/02072019_153752_oco240620191025-1.txt', 'utf8');

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

const parser = new EDIParser(map, {
    dateFormat: "DDMMYYYYhhmmii",
    identifierSize: 3
});

var parsedFile = parser.parse(rawFile);
console.log(parsedFile);

app.get('/edi', (req, res) => {

});

app.listen(3000, () => {
    console.log('Listening to port 3000');
});

export default app;