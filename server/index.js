const express = require("express");
const app = express();
const port = 2000;
const rootroute = require("./Routes/index");
const cors = require('cors');
app.use(express.json());
app.use(cors());


app.use("/api/v1",rootroute);



app.listen(port,()=>{console.log(`port is runing on ${port}`)});