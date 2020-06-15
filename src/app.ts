import * as mongoose from "mongoose";
import * as express from "express";
import * as bodyParser from "body-parser";
import { SystemConfig } from '../src/config/system-config';
import cashFlowGroupingRoutes from "./routes/cash-flow-grouping-routes";
import * as passport from "./config/auth";

const app = express();

mongoose.connect(SystemConfig.MONGO_CONNECTION, 
    { useNewUrlParser: true, useCreateIndex: true });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use('/api/cashFlowGroupingRoutes', passport.Authenticate(),cashFlowGroupingRoutes);

export { app };