// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import { publicConfig } from "../config/public";
const { BACKEND_URL } = publicConfig;

interface Camera {
    id : number;
    link : string;
    coordinates : string;
}

export class CameraStore {
    rootStore: RootStore;
    loading: boolean = true;

    /**
     * This table come from blockchain.
     * This table contains period & label lists.
     */
    cameraList : Array<Camera> = [];

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;

        makeAutoObservable(this, {
            rootStore: false
        });
    }

    async refresh() {
        const { god, auth } = this.rootStore;
        try {
            this.loading = true;
            let response1 : any = await auth.$().get(`${BACKEND_URL}/cameras/get`)
            if (response1.data.status == 'OK') {
                this.cameraList = response1.data.message.data.map((item : any) => {
                    return {
                        id : item.id,
                        link : item.link,
                        coordinates : item.coordinates
                    }
                });
            } else {
                this.cameraList = [];
            }
        } catch (err) {
            console.error('camera.refresh error', err);
        } finally {
            this.loading = false;
        }
    }
} 