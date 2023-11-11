// https://www.npmjs.com/package/node-binance-api

const Binance = require('node-binance-api');
const binance = Binance().options({
    APIKEY: 'npzVoMUpFGWdQE8FAzXnoORYE1411J2fdDX9CtiNyrUKh8rWQw098SjoIv0uPUwN',
    APISECRET: '21F2RwDEefhWI1XtmdtXpGyaIwkijO7zTMSIKZzBWn3NZQv2vf9ETmQRChNdP8QQ'
});

module.exports = binance;