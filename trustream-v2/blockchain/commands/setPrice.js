const config = require('../config/config');
const contractAddressList = config.contractAddress();

module.exports = {
    setPrice : async function(price) {
        try {
            console.log(`Setting Token price to ${price} IoTex coin`);
            price = price * Math.pow(10, 18);
            console.log('price11', price);
            const ElumTokenContract = await ethers.getContractFactory("ElumToken");
            console.log('working11', price);
            const ElumToken = await ElumTokenContract.attach(contractAddressList.ElumToken);
            console.log('called');
            await ElumToken.setTokenPrice(price);
            console.log(`Success!`);
        } catch (err) {
            console.log('Errors occured in setPrice', err);
        }
    }
}