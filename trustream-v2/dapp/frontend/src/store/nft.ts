// implement web3 -> backend authentication
import { makeAutoObservable } from 'mobx';
import RootStore from './root';
import ContractAddress from '../contracts/contract-address.json';
import NFTContractABI from '../contracts/ElumNFT.json';

interface NFT_INFO {
    owner : string;
    nftType : number;
    acquireTime : number;
}

interface NFT_TYPE {
    metadataURI : string;
    price : number;
    totalSupply : number;
    remainSupply : number;
}

export class NFTStore {
    rootStore: RootStore;
    loading : boolean = true;
    
    idList : Array<number> = [];
    typeList : Array<NFT_TYPE> = [];
    infoList : Array<NFT_INFO> = [];

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
            abi : NFTContractABI.abi,
            method : method,
            params : [...params],
            options : options
        });
    }

    async refresh() {
        const { god } = this.rootStore;

        if (god.currentNetwork.account == undefined) {
            this.loading = true;
            return;
        }

        try {
            this.loading = true;
        
            this.idList = [];
            this.typeList = [];
            this.infoList = [];

            let tx : any;
            
            tx = await this.getNFTLists();
            this.idList = tx.map(item => parseInt(item.toString()));

            tx = await this.getNFTTypeLists();
            this.typeList = tx.map(item => {
                return {
                    metadataURI : item.metadataURI.toString(),
                    price : parseInt(item.price.toString()) / Math.pow(10, 18),
                    totalSupply : parseInt(item.totalSupply.toString()),
                    remainSupply : parseInt(item.remainSupply.toString())
                }
            });
            
            for (let i = 0; i < this.idList.length; i++) {
                let tx : any = await this.getNFTInfo(this.idList[i]);
                this.infoList[i] = {
                    owner : tx.owner.toString(),
                    nftType : parseInt(tx.nftType.toString()),
                    acquireTime : parseInt(tx.acquireTime.toString())
                };
            }
        } catch (err) {
            console.error('nft.refresh error', err);
        } finally {
            this.loading = false;
        }
    }

    async getNFTLists() {
        const { god } = this.rootStore;
        return this.callContract('balanceOf', [god.currentNetwork.account]);
    }

    async getNFTInfo(id) {
        return this.callContract('NFT_TO_INFO', [id]);
    }

    async getNFTTypeLists() {
        return this.callContract('getNFTTypeInfo', []);
    }

    async buyNFT(type_id, amount, value) {
        return this.callContract('buyNFT', [type_id, amount], { value });
    }
}