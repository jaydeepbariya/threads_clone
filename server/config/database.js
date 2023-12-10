const mongoose = require('mongoose');
require('dotenv').config();

exports.dbConnect = () => {

    mongoose.connect(process.env.DB_URL)
    .then( () => console.log("DB CONNECTION SUCCESSFUL"))
    .catch( (error) => console.log("DB CONNECTION NOT SUCCESSFUL",error));

}