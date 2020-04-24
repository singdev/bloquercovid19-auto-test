const router = require('express').Router();
const controller = require('./aprescovid-controller');

const os = require('os');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, os.homedir + '/uploads/covid19/relance');
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, "document" + uniqueSuffix);
    }
})

router.get('/impact', controller.get_all_impact);

router.post('/impact', controller.create_impact);

router.get('/relance', controller.get_all_relance);

const upload = multer({ storage: storage});

router.post('/relance', upload.single('doc'), controller.create_relance);

module.exports = router;