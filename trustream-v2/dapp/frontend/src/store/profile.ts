// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;
import Swal from 'sweetalert2';

export class ProfileStore {
    rootStore: RootStore;
    loading: boolean = true;
    email: string = '';
    setting: string = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    async refresh() {
        const { auth } = this.rootStore;

        this.loading = true;
        try {
            let response: any = await auth.$().post(`${BACKEND_URL}/api/profile/get`);
            this.email = response.data.email;
            this.setting = response.data.setting;
            this.loading = false;
        } catch (err) {
            console.error(err);
            this.email = '';
            this.setting = '';
            this.loading = false;
        }
    }

    saveEmail(email: string, code : string = '') {
        const { auth } = this.rootStore;

        if (email == '')
            return auth.$().post(`${BACKEND_URL}/api/profile/updateEmail`, { email, code });
        else {
            return auth.$().post(`${BACKEND_URL}/api/profile/updateEmail`, { email, code });
        }
    }

    verifyEmailRequest(email : string) {
        const { auth } = this.rootStore;
        return auth.$().post(`${BACKEND_URL}/api/email_auth/verify`, { email }); 
    }

    saveSetting(setting: any) {
        const { auth } = this.rootStore;

        return auth.$().post(`${BACKEND_URL}/api/profile/updateSetting`, {
            setting: JSON.stringify(setting)
        });
    }
}