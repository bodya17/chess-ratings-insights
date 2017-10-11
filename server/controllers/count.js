const REGION_MAP = require('../REGION_MAP');
const Player = require('../models/Player');

module.exports = (req, res) => {
    const query = Player.aggregate([
        { $group: { _id: '$fed', total: { $sum: 1 } } },
    ]);
    query.exec((err, players) => {
        if (err) res.send(err);
        else {
            res.send(players.map(p => [REGION_MAP[p._id], p.total]).sort((a, b) => a[1] < b[1] ? 1 : -1));
        }
    });
};