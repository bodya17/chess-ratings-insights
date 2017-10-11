const Player = require('../models/Player');

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
    return [ REGION_MAP[fed._id], +(avg / millisecondsInOneYear).toFixed(2) ];
}

const REGION_MAP = require('../REGION_MAP');

module.exports = (req, res) => {
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
};
