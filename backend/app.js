const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({credentials:true,origin:'http://localhost:3000'}));

app.use(express.json())
const Task = require('./route/taskroutee')

app.use('/',Task)
module.exports=app