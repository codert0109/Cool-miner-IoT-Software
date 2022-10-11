// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import $ from "axios";
import ContractAddress from '../contracts/contract-address.json';
import RewardContractABI from '../contracts/ElumReward.json';

export class RewardStore {
    rootStore: RootStore;
    loading: boolean = true;

    claimedToken:number = 0;
    availableToken:number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    callContract(method: string, params: Array<any>, options: Object = {}) {
        const { god } = this.rootStore;
        return god.currentNetwork.execContract({
            address: ContractAddress.ElumReward,
            abi: RewardContractABI.abi,
            method: method,
            params: [...params],
            options: options
        });
    }

    async refresh() {
        const { god } = this.rootStore;
        try {
            if (god.currentNetwork.account == null)
                return;

            this.loading = true;

            let ret1: any = await $.post(`${publicConfig.BACKEND_URL}/api/claim_tokens/getInfo`, {
                address : god.currentNetwork.account
            });
            this.availableToken = parseInt(ret1.data.amount);

            let ret2: any = await this.callContract('claimedToken', [god.currentNetwork.account]);
            this.claimedToken = parseInt(ret2.toString());
        } catch (err) {
            console.error('reward.refresh error', err);
        } finally {
            this.loading = false;
        }
    }
} 