// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

interface AlertInfo {
    type: string,
    icon: string,
    priority: number
}

interface AlertNode {
    type: string,
    message: string,
    submessage: string
}

export class AlertStore {
    rootStore: RootStore;
    loading: boolean = true;
    hasAlert : boolean = false;
    opened : boolean = false;

    typelist: Array<AlertInfo> = [];
    message: Array<AlertNode> = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });

        this.initTypeList();
    }

    toggleOpen() {
        this.opened = !this.opened;
    }

    initTypeList() {
        this.typelist.push({
            type: 'miner',
            icon: '',
            priority: 1
        })
        this.typelist.push({
            type: 'staking',
            icon: '',
            priority: 2
        })
        this.typelist.push({
            type: 'network',
            icon: '',
            priority: 0
        })
    }

    addAlert(info: AlertNode) {
        let flg = false;
        this.message.forEach((item, index) => {
            if (item.type == info.type) {
                this.message[index] = info;
                flg = true;
                this.hasAlert = true;
            }
        });
        if (flg == false) {
            this.hasAlert = true;
            this.message.push(info);
        }
    }

    getPriority(type: string) {
        let filterData = this.typelist.find(item => item.type == type);
        if (filterData != null)
            return filterData.priority;
        return 100;
    }

    getAlert() {
        if (this.message.length == 0)
            return null;

        // this.message.sort((a, b) => {
        //     return this.getPriority(a.type) - this.getPriority(b.type)
        // });

        return this.message[this.message.length - 1];
    }

    async refresh() {
        const { god, auth, nft } = this.rootStore;

        try {
            let data = await nft.getNFTLists()
            let info: any = data;
            let nftCnt = info.length;

            let response = await auth.$().post(`${BACKEND_URL}/api/device_status/getActiveMiner`, {
                address : god.currentNetwork.account
            });

            let curCnt = response.data.data.CNT;

            if (nftCnt != curCnt) {
                this.addAlert({
                    type : 'miner',
                    message : 'Miner has been offline for 1 hour.',
                    submessage : 'You could earn more tokens.'
                });
            }
        } catch (err) {
        }
    }
}