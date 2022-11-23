// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

export class ProfileStore {
    rootStore: RootStore;
    loading: boolean = true;
    email : string = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    async refresh() {
        const { auth } = this.rootStore;
        try {
            let response : any = await auth.$().post(`${BACKEND_URL}/api/profile/get`);
            this.email = response.email;
        } catch (err) {
            console.error(err);
            this.email = '';
        }
    }

    saveEmail(email : string) {
        const { auth } = this.rootStore;

        return auth.$().post(`${BACKEND_URL}/api/profile/update`, { email });
    }
}