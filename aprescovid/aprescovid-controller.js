const Relance = require('./relance-model');
const Impact = require('./impact-model');

exports.get_all_relance = function (req, res, next) {
    Relance.find({}, (err, relance) => {
        if (err) {
            next(err);
        } else {
            res.json({ relance });
        }
    })
}

exports.create_relance = function (req, res, next) {

    const path = req.file ? req.file.path : null; 
    const relance = new Relance({ json: JSON.stringify(req.body), doc: path });
    try {
        relance.save((err, newRelance) => {
            if (err) {
                next(err);
            } else {
                res.redirect('https://bloquercovid19.com');
            }
        });
    } catch (error) {
        console.log(error);
    }
}

exports.get_all_impact = function (req, res, next) {
    Impact.find({}, (err, impact) => {
        if (err) {
            next(err);
        } else {
            res.json({ impact });
        }
    })
}

exports.create_impact = function (req, res, next) {
    const impact = new Impact(req.body);

    impact.save((err, newImpact) => {
        if (err) {
            next(err);
        } else {
            res.json({ newImpact });
        }
    });
}