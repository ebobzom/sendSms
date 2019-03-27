const Nexmo = require('nexmo');

//secret object containing paersonal details from nexmo dash board;
const secretDetails = {
    apiKey: "61a3204e",
    apiSecret: "LxqD9ZkwB0JoZ6BG"
};

const nexmo = new Nexmo(secretDetails);

module.exports ={
    nexmo
}