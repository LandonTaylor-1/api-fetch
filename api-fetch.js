require('dotenv').config()
const fetch = require('node-fetch');

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

const baseURL = 'https://sandbox-api.brewerydb.com/v2/';

const favBrews = [];

const get = (zip) => {
    fetch(baseURL + 'locations/?key=' + process.env.KEY + '&postalCode=' + zip)
        .then(res => {
            if(!res.ok) {
            throw Error(res.statusText)
            } return res.json()
        })
        .then(obj => {
            const totalResults = obj.totalResults;
            const data = obj.data[0];

            const breweryName = data.name;
            const breweryAddress = data.streetAddress;
            const breweryPhone = data.phone;
            const breweryWebsite = data.website;

            console.log(`There are ${totalResults} results in that zip code!`);
            console.log(breweryName);
            console.log(breweryAddress);
            console.log(breweryPhone);
            console.log(breweryWebsite);
            readline.question(`Save as a Favorite? `, (answer) => {
                if (answer == 'yes') {
                    favBrews.push(breweryName)
                    console.log('Your favorite breweries are: ' + favBrews);
                };
                readline.close();
            });
        })
        .catch(err => {
            console.log(`Sorry, there are no breweries in your area.`);
        })
}

readline.question(`What's your zip? `, (zip) => {
    get(zip)
})