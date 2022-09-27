// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import ContractAddress from '../contracts/contract-address.json';
import TokenContractABI from '../contracts/ElumNFT.json';

export class NFTStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    callContract(method : string, params : Array<any>, options : Object = {}) {
        const { god } = this.rootStore;
        return god.currentNetwork.execContract({
            address : ContractAddress.ElumNFT,
            abi : TokenContractABI.abi,
            method : method,
            params : [...params],
            options : options
        });
    }

    async getNFTLists() {
        const { god } = this.rootStore;
        return this.callContract('balanceOf', [god.currentNetwork.account]);
    }

    async getNFTInfo(id) {
        return this.callContract('NFT_TYPE_INFO', [id]);
    }

    async buyNFT(type_id, amount, value) {
        return this.callContract('buyNFT', [type_id, amount], { value });
    }
}