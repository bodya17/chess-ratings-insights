const Player = require('../models/Player');

module.exports = (req, res) => {
    const { searchQuery } = req.params;
    console.log(searchQuery)
    const queryObj = searchQuery === '' ? {} : { lastName: new RegExp(searchQuery, 'i') };
    const query = Player.find(
        queryObj,
        { _id: 0,lastName: 1, firstName: 1, fed: 1, dob: 1, 'ratings.title': 1, 'ratings.ukrRating': 1, 'ratings.date': 1 });
    query.exec((err, players) => {
        if (err) res.send(err);
        else {
            res.send(players);
        }
    });
};