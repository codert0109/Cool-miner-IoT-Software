const fs = require('fs');

module.exports = {
    contractsDirPath : function() {
        return __dirname + '/../../dapp/frontend/src/contracts';
    },
    contractAddressPath : function() {
        return this.contractsDirPath() + '/contract-address.json';
    },
    contractArtifactPath : function(contractName) {
        return this.contractsDirPath() + `/${contractName}.json`;
    },
    contractAddress : function() {
        let json = fs.readFileSync(this.contractAddressPath());
        return JSON.parse(json);
    },
    contractArtifact : function(contractName) {
        let json = fs.readFileSync(this.contractArtifactPath());
        return JSON.parse(json);
    }
};