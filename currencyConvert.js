//installed npm axios for Promise based HTTP client for the browser and node.js
//http://data.fixer.io/api/latest?access_key=5f5165efdedc4a75492c608adf91cc00

const axios = require("axios");

// const getExchangeRate = (from, to) => {
//     return axios.get("http://data.fixer.io/api/latest?access_key=5f5165efdedc4a75492c608adf91cc00").then((response) => {
//         //the base exchange rate for the url api listed above is the euro. accessed the response.data.rates array from the http request using the url
//         const euro = 1 / response.data.rates[from];
//         const rate = euro * response.data.rates[to];
//         return rate;
//     });
// };

//async version:
const getExchangeRate = async(from, to) => {

    try {
        const response = await axios.get("http://data.fixer.io/api/latest?access_key=5f5165efdedc4a75492c608adf91cc00");
        //the base exchange rate for the url api listed above is the euro. accessed the response.data.rates array from the http request using the url
        const euro = 1 / response.data.rates[from];
        const rate = euro * response.data.rates[to];

        if (isNaN(rate)) {
            throw new Error();
        }

        return rate;
    } catch (e) {
        throw new Error(`Unable to get exchange rate for ${from} and ${to} currencies.`)
    }
};

// const getCountries = (currencyCode) => {
//     return axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`).then((response) => {
//         return response.data.map((country) => country.name);
//     });
// };

//async version: 
const getCountries = async(currencyCode) => {
    try {
        const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${currencyCode}`);
        return response.data.map((country) => country.name);
    } catch (e) {
        throw new Error(`Unable to get countries that use ${currencyCode}`);
    }
};

// const convertCurrency = (from, to, amount) => {
//     let convertedAmount;
//     return getExchangeRate(from, to).then((rate) => {
//         convertedAmount = (amount * rate).toFixed(2);
//         return getCountries(to);
//     }).then((countries) => {
//         return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
//     });
// };

//async version: 
const convertCurrencyAsync = async(from, to, amount) => {
    const rate = await getExchangeRate(from, to);
    const countries = await getCountries(to);
    const convertedAmount = (amount * rate).toFixed(2);
    return `${amount} ${from} is worth ${convertedAmount} ${to}. You can spend it in the following countries: ${countries.join(", ")}`;
};

convertCurrencyAsync("GBP", "EUR", 20).then((message) => {
    //used the return value from getExchangeRate to output the message
    console.log(message);
}).catch((e) => {
    console.log(e.message);
});