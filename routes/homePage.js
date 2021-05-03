const express = require('express');
const router = express.Router();

router.get('/test', (req, res, next) => {
    res.status(200);
    res.send({"status":"up"});
});

module.exports = router;