import ContractAddress from '../contracts/contract-address.json';
import axios from 'axios';
import { publicConfig } from "../config/public";
const { TOKEN_UNIT } = publicConfig;

export function getAddressFormat(address) {
    return address.substring(0, 6) + '...' + address.substring(address.length - 4);
}

export function formatDecimalWeb3(x : bigint) {
    return parseInt((x / (TOKEN_UNIT / BigInt(10000))).toString()) / 10000;
}

export function formatNumber(x) {
    let a = [];
    while (x > 0) {
        let y = x % 1000;
        a.push(y);
        x = (x - y) / 1000;
    }
    let ret = '';
    for (let i = a.length - 1; i >= 0; i--) {
        if (i != a.length - 1) ret += ',';
        ret += a[i];
    }
    return ret;
}

export function formatUpTime(x : number) {
    let a = new Date(x * 3600 * 1000);
    let b = new Date((x + 1) * 3600 * 1000);
    let cur = new Date();

    let aStr, bStr;
    aStr = a.toLocaleTimeString();
    bStr = b.toLocaleTimeString();
    
    return aStr + ' - ' + bStr;
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
    const unit_str = ['s',  'm',    'h',    'd'];

    let timeValue = [];

    for (let i = unit_val.length - 1; i >= 0; i--) {
        timeValue[i] = Math.floor(seconds / unit_val[i]);
        seconds -= timeValue[i] * unit_val[i];
    }

    let cnt = 0;
    let ans = '';
    for (let i = unit_val.length - 1; i >= 0; i--) {
        if (timeValue[i] > 0) {
            ans += `${timeValue[i]}${unit_str[i]}`;
            ++ cnt;
            if (cnt == 2) break;
        }
    }
    if (ans == '')
        ans = '0s';
    return ans;
}

export function formatMultiplier(num) {
    return num / 10000 + 'x';
}