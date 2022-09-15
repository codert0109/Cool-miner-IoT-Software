// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import { getNFTIDFromAddress } from '../utils';

export class NFTStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    async getNFTLists() {
        // Should be update to use smart contracts.
        const { god } = this.rootStore;

        return [ getNFTIDFromAddress(god.currentNetwork.account) ] ;
    }
}