import express from "express";
import dishes from "./routes/dishes";
import ingredients from "./routes/ingredients";
import cors from 'cors';

const app = express();

app.use(cors())

app.use('/api', dishes);
app.use('/api', ingredients);

export default app;
