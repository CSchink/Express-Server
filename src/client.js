const axios = require('axios');

axios.default.get('https://cryptic-peak-59985.herokuapp.com/')
.then((resp) => {
    console.log(resp.data);
});

console.log("last");