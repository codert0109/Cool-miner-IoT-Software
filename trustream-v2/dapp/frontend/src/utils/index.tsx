import ContractAddress from '../contracts/contract-address.json';
import axios from 'axios';

export function getAddressFormat(address) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

export function getContractAddressFormat() {
    return getAddressFormat(ContractAddress.ElumNFT);
}

export function getLocalTimeStringFromSeconds(seconds) {
    let x = new Date(seconds * 1000);
    return x.toLocaleString();
}

/**
 * This function formats the seconds to the suitable time string.
 * For example, if the seconds is 45, it returns 45 secs,
 *              if the seconds is 45 * 86400, it returns 45 days.
 * It also shows only the highest non-zero unit time.
 * It means, if the seconds is 250, it returns 4.1 mins  
 * @param seconds Seconds to Convert Suitable Time String.
 */
export function formatTime(seconds : number) {
    const unit_val = [1,    60,     3600,   86400];
    const unit_str = ['sec','min',  'hour', 'day'];

    for (let i = unit_val.length - 1; i >= 0; i--) {
        if (seconds >= unit_val[i]) {
            let cur : number = Math.round(seconds / unit_val[i] * 100) / 100;
            if (cur > 1 - 1e-8) {       // should add 's' suffix.
                return `${cur}${unit_str[i]}s`;
            }
        }
    }
    return '0s'
}

export function formatMultiplier(num) {
    return num / 100 + '%';
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