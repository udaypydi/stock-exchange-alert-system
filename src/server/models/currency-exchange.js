
const fetch = require('node-fetch');

module.exports = {
    getCurrencyExchange: (req, res) => {
        const CURRENCY_EXCHANGE_RATE = [
            'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=EUR&to_symbol=USD&apikey=QZ5AG7BLQD7TLXTZ',
            'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=JPY&apikey=JJJLU0RT9LACJCYK',
            'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=USD&to_symbol=GYD&apikey=OUMK5GXJ8U10GOC0',
            'https://www.alphavantage.co/query?function=FX_DAILY&from_symbol=AUD&to_symbol=NZD&apikey=QZ5AG7BLQD7TLXTZ',
        ];
    
        Promise.all(CURRENCY_EXCHANGE_RATE.map(url => 
            fetch(url).then(res => res.json())
        )).then(json => {
            const formattedCurrency = json.map((data, index) => {
                const exchangeData = data['Time Series FX (Daily)'];
                console.log('exchange data', index, exchangeData);
                const keys = Object.keys(exchangeData);
                const formattedObject = []
                for (let index = 0; index <= 10; index ++) {
                    formattedObject.push({
                        date: keys[index],
                        currencyValue: exchangeData[keys[index]]
                    });
                }
                return formattedObject;
            });
            res.json({ status: 200, currencyExchange: formattedCurrency });
        }).catch(err => {
            console.log(err);
            res.json({ status: 500, reason: err });
        });
    }
}