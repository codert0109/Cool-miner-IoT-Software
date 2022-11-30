// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

interface AlertNode {
    type : string,
    color : string,
    caption : string,
    imgurl : string,
    opened : boolean,
    message : string,
    submessage : string,
    link : string
}

export class AlertStore {
    rootStore: RootStore;
    loading: boolean = true;
    visible : boolean = false;

    message: Array<AlertNode> = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    setVisible(flag : boolean) {
        this.visible = flag;
    }

    addAlert(info: AlertNode, override : boolean) {
        if (override == true) {
            for (let i = 0; i < this.message.length; i++) {
                if (this.message[i].type == info.type) {
                    this.message[i] = {...info};
                    return;
                }
            }
        }

        // same type, same message not allowed
        for (let i = 0; i < this.message.length; i++) {
            if (this.message[i].type == info.type && this.message[i].message == info.message) {
                return;
            }
        }
        
        this.message.push({...info});
    }

    removeAlert(type : string) {
        let sp = 0;
        for (let i = 0; i < this.message.length; i++) {
            if (this.message[i].type != type) {
                this.message[sp++] = this.message[i];
            }
        }
        this.message.splice(sp);
    }

    getAlert() {
        return this.message;
    }

    toggleOpen(index) {
        this.message[index].opened = !this.message[index].opened;
    }

    async refresh() {
        const { god, auth, nft } = this.rootStore;

        try {
            let data = await nft.getNFTLists()
            let info: any = data;

            let response = await auth.$().post(`${BACKEND_URL}/api/alert/get`, {
                address : god.currentNetwork.account
            });

            this.removeAlert('miner');

            if (response.data.message != 'No Alert') {
                this.addAlert({
                    type : 'miner',
                    color : 'rgb(255, 102, 0)',
                    caption : 'Miner Alert',
                    imgurl : '/images/alert/computer.png',
                    opened : true,
                    message : response.data.message,
                    submessage : '',
                    link : ''
                }, false);
            }

            this.addAlert({
                type : 'profile_update',
                color : 'rgb(76, 175, 80)',
                caption : 'Profile Alert',
                imgurl : '/images/alert/email.png',
                opened : true,
                message : 'Email alerts are now available for optimal rewards.',
                submessage : '',
                link : '/profile'
            }, true)
        } catch (err) {
        }
    }
}