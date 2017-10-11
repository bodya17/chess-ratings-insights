const express = require('express');
const mongoose = require('mongoose');

const averageAgeController = require('./controllers/averageAge');
const countController = require('./controllers/count');
const countForPieChartWithDrilldown = require('./controllers/count-for-pie-chart-with-drilldown');
const getPlayersController = require('./controllers/getPlayers');
const searchUserController = require('./controllers/searchUser');

const port = 3004;

mongoose.connect('mongodb://localhost:27017/ratings_nested');

const app = express();

app.get('/average-age', averageAgeController);

app.get('/', getPlayersController);

app.get('/count', countController);

app.get('/count-for-pie-chart-with-drilldown', countForPieChartWithDrilldown);

app.get('/user/:searchQuery', searchUserController);

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});