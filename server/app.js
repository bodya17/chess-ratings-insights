const express = require('express');
const mongoose = require('mongoose');
const Player = require('./models/Player');

const port = 3000;

const REGION_MAP = {
    "ЗАК": "Закарпатська",
    "ЧРК": "Черкаська",
    "ЧНИ": "Чернігівська",
    "ЧНО": "Чернівецька",
    "АРК": "Крим",
    "ДНЕ": "Дніпро",
    "ДОН": "Донецька",
    "И-Ф": "Івано-Франківська",
    "ХАР": "Харківська",
    "ХЕР": "Херсонська",
    "ХМЕ": "Хмельницька",
    "КИР": "Кіровоградська",
    "КИО": "Київська",
    "КИЕ": "Київ",
    "ЛУГ": "Луганська",
    "ЛЬВ": "Львівська",
    "НИК": "Миколаївська",
    "ОДЕ": "Одеська",
    "ПОЛ": "Полтавська",
    "РОВ": "Рівенська",
    "СЕВ": "Севастополь",
    "СУМ": "Сумська",
    "ТЕР": "Тернопільська",
    "ВИН": "Вінницька",
    "ВОЛ": "Волинська",
    "ЗАП": "Запоріжська",
    "ЖИТ": "Житомирська"
}

mongoose.connect('mongodb://localhost:27017/ratings_nested');

const app = express()

function magic (key1, key2, obj) {
  const keys = Object.keys(obj);
  return JSON.stringify(keys.map(key => ({
    [key1]: key,
    [key2]: obj[key]
  })), null, 2)
}
app.get('/players-by-year', (req, res) => {
    const query = Player.find({}, { dob: 1, _id: 0 });
    const getProperArray = magic.bind(null, 'year', 'players')
    query.exec((err, players) => {
      if (err) res.send(err);
      else {
        //   res.send(players)
        res.send(getProperArray(players.reduce(
         (obj, info) => {
            // get year
            // console.log(obj)
            if (info.dob) {
                const year = new Date(info.dob).getFullYear()
                obj[year] = obj[year] ? obj[year] + 1 : 1
            } 
            return obj

         }, {}
        )));
      }
    });
})

app.get('/average-age', (req, res) => {
  const query = Player.aggregate([
        // { $project : {_id : 0, fed: 1, dob: 1}}
        { $group: { _id: '$fed', players: { $push: '$dob' } } },
  ]);

  query.exec((err, players) => {
    if (err) res.send(err);
    else {
        // res.send(players)
        // res.send(players.map(p => [ mapping[p._id], p.rating ]))
        //
        res.send(players.map(findAverage).sort((a, b) => a[1] < b[1] ? 1 : -1));
    }
  });
});

app.get('/', (req, res) => {
  const query = Player.find({}, { _id: 0 }).limit(+req.query.limit);
  query.exec(query, (err, result) => {
    res.send(result.map(
      p => Object.assign({}, p._doc, {fed: REGION_MAP[p.fed]})
    ));
  })
})

app.get('/count', (req, res) => {
    const query = Player.aggregate([
        // { $match: { 'ratings[0].title': new RegExp(req.params.title) } },
        { $group: { _id: '$fed', total: { $sum: 1 } } },
    ]);
    query.exec((err, players) => {
        if (err) res.send(err);
        else {
            res.send(players.map(p => [REGION_MAP[p._id], p.total]).sort((a, b) => a[1] < b[1] ? 1 : -1));
        }
    });
});


app.get('/age', (req, res) => {
    const query = Player.aggregate([
        { $group: { _id: '$fed', total: { $sum: 1 } } },
    ]);
    query.exec((err, players) => {
        if (err) res.send(err);
        else {
            res.send(players);
        }
    });
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`);
});

function findAverage(fed) {
    let playersWithBday = 0;
    const dob = fed.players.map((strDate) => {
        if (strDate) {
          const date = new Date(strDate);
          playersWithBday++;
          return Date.now() - date;
        }
        return 0;
    });

    const sum = dob.reduce((a, b) => a + b);
    const avg = sum / playersWithBday;
    const millisecondsInOneYear = 365 * 24 * 60 * 60 * 1000;
    //   return [mapping[fed._id], +(avg / 31536000000).toFixed(2)];
    return [ REGION_MAP[fed._id], +(avg / millisecondsInOneYear).toFixed(2) ];
}