import ContractAddress from '../contracts/contract-address.json';

export function getContractAddressFormat() {
    let address = ContractAddress.NFT;
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

export function getNFTIDFromAddress(address) {
    let str = address.substring(2, 6);
    let info = "0123456789ABCDEF";
    str = str.toUpperCase();

    let ret = 0;

    for (let i = 0; i < str.length; i++) {
        let pos = info.indexOf(str[i]);
        ret = ret * 16 + pos;
    }

    return ret % 1000 + 1;
}