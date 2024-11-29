import express from 'express';
import {getRandomIngredients} from "../utils";
const router = express.Router();

router.get('/ingredients', function(req, res) {
    res.send(getRandomIngredients());
});

export default router;
