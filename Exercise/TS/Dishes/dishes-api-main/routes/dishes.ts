import express from 'express';
import dishes from '../assets/dishes.json';
const router = express.Router();

router.get('/dishes', function(req, res) {
    res.send(dishes)
});

export default router;
