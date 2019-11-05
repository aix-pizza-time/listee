const controller = require('../controllers/controller');

module.exports = function(app, router){
    // Mount router under API
    app.use('/api', router);

    router.get('/list', (req, res, next) => {
        controller.get().then((data) => {
            res.json({
                currentList: data,
                status: "ok"
            });
        }).catch((err) => {
            res.json({
                error: '500',
                msg: err.toString()
            });
        })
    });

    router.get('/list/:id', (req, res, next) => {
        controller.get(req.params.id).then((data) => {
            res.json({
                list: data,
                status: "ok"
            });
        }).catch((err) => {
            res.json({
                error: '500',
                msg: err.toString()
            });
        })
    });

    router.get('/lists', (req, res, next) => {
        controller.lists().then(list => {
            res.json({
                archive: list,
                status: "ok"
            });
        }).catch((err) => {
            res.json({
                error: '400',
                msg: err.toString()
            });
        })
    });

    router.post('/add', (req, res, next) => {
        controller.add(req.body.entry).then((data) => {
            res.json({
                newEntry: data,
                status: "ok"
            });
            next();
        }).catch((err) => {
            res.json({
                error: '400',
                msg: err.toString()
            });
        })
    });

    router.post('/commit', (req, res, next) => {
        controller.commit().then((data) => {
            res.json({
                status: "ok",
                lastState: data
            });
        }).catch((err) => {
            res.json({
                error: '500',
                msg: err.toString()
            });
        })
    });

    router.post('/reset', (req, res, next) => {
        controller.reset().then((data) => {
            res.json({
                status: "ok",
                previousState: data
            });
        }).catch((err) => {
            res.json({
                error: '400',
                msg: err.toString()
            });
        })
    });

    router.delete('/delete/:id', (req, res, next) => {
        controller.delete(req.params.id).then((data) => {
            res.json({
                deletedEntry: data
            });
        }).catch((err) => {
            res.json({
                error: '400',
                msg: err.toString()
            })
        });
    });

    router.post('/rename/:id', (req, res, next) => {
        controller.rename(req.params.id, req.body.entry).then((data) => {
            res.json({
                changedEntry: data
            });
        }).catch((err) => {
            res.json({
                error: '400',
                msg: err.toString()
            })
        });
    });
}