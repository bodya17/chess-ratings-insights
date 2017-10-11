const convertRegion = (fed) => REGION_MAP[fed];
const R = require('ramda');
const REGION_MAP = require('../REGION_MAP');
const Player = require('../models/Player');

const FIRST_CATEGORY = '1';
const NATIONAL_MASTER = 'кмс';

module.exports = (req, res) => {
    const query = Player.find({}, { _id: 0, ratings: 1, fed: 1 });

    const objToSend = {};

    query.exec((err, players) => {
        if (err) res.send(err);

        else {
            players.forEach(p => {
                const title =  R.contains(p.ratings[0].title, [NATIONAL_MASTER, FIRST_CATEGORY])
                    ? p.ratings[0].title
                    : 'інші';

                const [ isCandidate, isFirst ] = [R.equals(title, NATIONAL_MASTER), R.equals(title, FIRST_CATEGORY)];
                if (objToSend[convertRegion(p.fed)]) {
                    objToSend[convertRegion(p.fed)].count++;
                    objToSend[convertRegion(p.fed)].byTitle[title]++;
                } else {
                    objToSend[convertRegion(p.fed)] = {
                        count: 1,
                        byTitle: {
                            [NATIONAL_MASTER]: isCandidate ? 1 : 0,
                            [FIRST_CATEGORY]: isFirst ? 1 : 0,
                            'інші': !isCandidate && !isFirst ? 1 : 0
                        }
                    }
                }
            });
            const series = [];
            const drilldown = [];
            for (const key in objToSend) {
                series.push({name: key, y: objToSend[key].count, drilldown: key});
                drilldown.push({name: key, id: key, data: R.toPairs(objToSend[key].byTitle)});
            }
            res.send({series, drilldown});
        }
    });
};
