const Player = require('../models/Player');
const REGION_MAP = require('../REGION_MAP');

module.exports = (req, res) => {
    const query = Player.find({}, { _id: 0 }).limit(+req.query.limit);
    query.exec(query, (err, result) => {
        res.send(result.map(
            p => Object.assign({}, p._doc, {fed: REGION_MAP[p.fed]})
        ));
    })
};