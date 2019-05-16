require('dotenv').config()

const newArray = [];
function get(){
    fetch('https://sandbox-api.brewerydb.com/v2/')
        .then (res => res.json())
