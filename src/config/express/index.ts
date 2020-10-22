import express from "express"; 

import {router as  appRouter} from "routes"
import {constants} from "config/constants";

export const startExpress = (app = express(), router = appRouter) => {
app.use("/", router);

app.all('*', (_, res) => {
    res.status(404).json({message: "Not found."})
})

app.listen(constants.port, () => {
    console.log(`Server's listening at 127.0.0.1:${constants.port}`)
})
}