const express = require('express');
require('express-async-errors');
var cors = require('cors')
const app = express();


const corsOption = {
    exposedHeaders:'x-auth-token'
}
app.use(cors(corsOption))
require('./routes/routes')(app);
require('./startup/db')();
require('./startup/config')()
require('./startup/validation')()


const port = process.env.PORT || 5000;


app.listen(port, () => {
    console.log(`app is listening on port ${port}`);
});
