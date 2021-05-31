const axios = require("axios");
const DBUtills=require("./DButils");

async function getadmin(){
    return (await DBUtills.execQuery(`SELECT username FROM Users`))[0];
}

exports.getadmin = getadmin;