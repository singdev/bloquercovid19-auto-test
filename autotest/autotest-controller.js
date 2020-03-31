const AutoTest = require('./autotest-model');

exports.get_all_autotest = function (req, res, next) {
    AutoTest.find({}, (err, autotest) => {
        if (err) {
            next(err);
        } else {
            res.json({ autotest });
        }
    })
}

exports.create_autotest = function (req, res, next) {
    const autotest = new AutoTest(req.body);

    autotest.save((err, newAutotest) => {
        if (err) {
            next(err);
        } else {
            res.json({ newAutotest });
        }
    });
}