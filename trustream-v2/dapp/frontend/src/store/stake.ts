// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
import $ from "axios";
import ContractAddress from '../contracts/contract-address.json';
import StakeContractABI from '../contracts/ElumStaking.json';

const { TOKEN_UNIT } = publicConfig;


export class StakeStore {
    rootStore: RootStore;
    loading: boolean = true;

    stakedInfo = {
        type_id: 0,
        startTime: 0,
        expireTime: 0,
        amount: BigInt(0)
    };

    STAKING_STATUS = {
        NO_STAKING: 0,
        EXPIRED: 1,
        STAKING: 2
    };

    activeMinerCnt: number = 0;

    /**
     * This table come from blockchain.
     * This table contains period & label lists.
     */
    stakeTypeList = [];

    /**
     * This table comes from webserver.
     * This table should be equal to stakeTypeList.
     * This table have multiplier extra field and period_label string.
     * The multiplier can be changed dynamically.
     * The period_label will be useful to display information.
     */
    stakingTable = {
        level: [],
        amount: [],
        period: [],
        multiplier: [],
        period_label: []
    };

    /**
     * Returns the lastest block timestamp at confirmTime.
     * Don't use these values. Use timestamp.
     */
    currentTime: number = 0;
    confirmTime: number = 0;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    callContract(method: string, params: Array<any>, options: Object = {}) {
        const { god } = this.rootStore;
        return god.currentNetwork.execContract({
            address: ContractAddress.ElumStaking,
            abi: StakeContractABI.abi,
            method: method,
            params: [...params],
            options: options
        });
    }

    async refresh() {
        const { god } = this.rootStore;
        try {
            this.loading = true;
            let tx: any = await this.getStakingInfo();
            this.stakedInfo = {
                type_id: parseInt(tx.type_id.toString()),
                startTime: parseInt(tx.startTime.toString()),
                expireTime: parseInt(tx.expireTime.toString()),
                amount: BigInt(tx.amount.toString())
            };

            let ret1: any = await $.get(`${publicConfig.BACKEND_URL}/api/staking/getparam`);
            this.stakingTable = ret1.data.data;

            let ret2: any = await $.post(`${publicConfig.BACKEND_URL}/api/device_status/getActiveMiner`, {
                address: god.currentNetwork.account
            });
            this.activeMinerCnt = ret2.data.data.CNT;

            this.stakeTypeList = await this.getStakingList();

            this.currentTime = await this.getCurrentTime();
            this.confirmTime = Date.now();
        } catch (err) {
            this.stakedInfo = {
                type_id: 0,
                startTime: 0,
                expireTime: 0,
                amount: BigInt(0)
            };
            console.error('stake.refresh error', err);
        } finally {
            this.loading = false;
        }
    }

    async getCurrentTime() {
        try {
            let tx = await this.callContract('getCurrentTime', []);
            return parseInt(tx.toString());
        } catch (err) {
            console.error('stake.now return error', err);
            return 0;
        }
    }

    async getStakingList() {
        // Should be update to use smart contracts.
        const { god } = this.rootStore;
        try {
            let stakeTypeList: any = await this.callContract('getStakeTypeList', []);
            return stakeTypeList.map((item: any) => {
                return {
                    period: parseInt(item.period.toString()),
                    id: parseInt(item.id.toString()),
                    label: item.label
                }
            });
        } catch (err) {
            console.error('getStakingList return error', err, god.currentNetwork.account);
            return [];
        }
    }

    async getStakingInfo() {
        const { god } = this.rootStore;
        try {
            let tx = await this.callContract('ADDRESS_TO_INFO', [god.currentNetwork.account]);
            return tx;
        } catch (err) {
            console.error('getStakingList return error', err, god.currentNetwork.account);
            return null;
        }
    }

    // operation functions
    stake(stakeType, amount) {
        return this.callContract('stake', [stakeType, amount]);
    }

    withdrawStaker() {
        const { god } = this.rootStore;

        return this.callContract('withdrawStaker', [god.currentNetwork.account]);
    }

    getStakingLabel() {
        return this.labelFromPeriod(this.stakedInfo.expireTime - this.stakedInfo.startTime);
    }

    labelFromPeriod(period) {
        for (let i = 0; i < this.stakingTable.period.length; i++) {
            if (this.stakingTable.period[i] == period)
                return this.stakingTable.period_label[i];
        }
        return null;
    }

    /**
     * Returns current timestamp.
     */
    timestamp() {
        if (this.currentTime == 0) return 0;
        return Math.floor((Date.now() - this.confirmTime) / 1000) + this.currentTime;
    }

    stakingStatus() {
        if (this.stakedInfo.amount == BigInt(0))
            return this.STAKING_STATUS.NO_STAKING
        else {
            if (this.stakedInfo.expireTime <= this.timestamp()) {
                return this.STAKING_STATUS.EXPIRED;
            } else {
                return this.STAKING_STATUS.STAKING;
            }
        }
    }
}