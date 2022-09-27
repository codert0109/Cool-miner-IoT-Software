import { useEffect, useState } from "react"
import { ethers } from "ethers";
const { ethereum } = require('../../global.js').getWindow();
import NFTArtifact from "../../contracts/ElumNFT.json";
import contractAddress from "../../contracts/contract-address.json";
import { useStore } from '../../store/index';
import { NetworkState } from '@/store/lib/NetworkState';
let window = require('../../global.js');

export default function ({onStatus}) {
    const { god } = useStore();
    let networkError = '';
    let selectedAddress = null;
    const IOTEX_TEST_NETWORK_ID = '4690';
    const IOTEX_MAIN_NETWORK_ID = '4689';

    // let window._NFT = null;
    let _provider = null;

    const _updateInfo = async () => {
        // return;
        // const balance = await window._NFT.balanceOf(selectedAddress);
        let realAddress = (god.currentNetwork as NetworkState).account;
        if (selectedAddress != realAddress) {
            _stopPollingData();
            // `accountsChanged` event can be triggered with an undefined newAddress.
            // This happens when the user removes the Dapp from the "Connected
            // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
            // To avoid errors, we reset the dapp state 
            if (realAddress === undefined) {
                return _resetState();
            }
            _initialize(realAddress);
        } else if (selectedAddress != null) {
            const balance = await window._NFT.balanceOf(selectedAddress);

            const Info = [
                {
                    type : 'NormalNFT',
                    price : (await window._NFT.priceNormalNFT()).toString(),
                    totalSupply : (await window._NFT.totalNormalSupply()).toString(),
                    maxSupply : (await window._NFT.maxNormalSupply()).toString(),
                    balance : balance[0].toString()
                },
                {
                    type : 'SpecialNFT',
                    price : (await window._NFT.priceSpecialNFT()).toString(),
                    totalSupply : (await window._NFT.totalSpecialSupply()).toString(),
                    maxSupply : (await window._NFT.maxSpecialSupply()).toString(),
                    balance : balance[1].toString()
                },
            ];

            onStatus({account : selectedAddress, Info });
        }
    }

    // This method checks if Metamask selected network is Localhost:8545 
    const _checkNetwork = async () => {
        if (ethereum.networkVersion === IOTEX_TEST_NETWORK_ID)
            return true;

        networkError = 'Please connect Metamask to IoTex Network';
        return false;
    }

    const _initialize = async (userAddress) => {
        // This method initializes the dapp

        // We first store the user's address in the component's state
        selectedAddress = userAddress;

        // Then, we initialize ethers, fetch the token's data, and start polling
        // for the user's balance.

        // Fetching the token data and the user's balance are specific to this
        // sample project, but you can reuse the same initialization pattern.
        _initializeEthers();
        // _getTokenData();
        _startPollingData();
    }

    const _initializeEthers = async () => {
        // We first initialize ethers by creating a provider using window.ethereum
        _provider = new ethers.providers.Web3Provider(ethereum);


        // Then, we initialize the contract using that provider and the token's
        // artifact. You can do this same thing with your contracts.
        window._NFT = new ethers.Contract(
            contractAddress.NFT,
            NFTArtifact.abi,
            _provider.getSigner(0)
        );
    }

    const _connectWallet = async () => {
        // This method is run when the user clicks the Connect. It connects the
        // dapp to the user's wallet, and initializes it.

        // To connect to the user's wallet, we have to run this method.
        // It returns a promise that will resolve to the user's address.

        let selectedAddress = (god.currentNetwork as NetworkState).account;

        // Once we have the address, we can initialize the application.

        // First we check the network
        if (!_checkNetwork()) {
            return;
        }

        _initialize(selectedAddress);

        // We reinitialize it whenever the user changes their account.
        ethereum.on("accountsChanged", ([newAddress]) => {
            _stopPollingData();
            // `accountsChanged` event can be triggered with an undefined newAddress.
            // This happens when the user removes the Dapp from the "Connected
            // list of sites allowed access to your addresses" (Metamask > Settings > Connections)
            // To avoid errors, we reset the dapp state 
            if (newAddress === undefined) {
                return _resetState();
            }

            _initialize(newAddress);
        });

        // We reset the dapp state if the network is changed
        ethereum.on("chainChanged", ([networkId]) => {
            _stopPollingData();
            _resetState();
        });
    }

    const _resetState = () =>{
        selectedAddress = null;
        networkError = '';
    }

    const _startPollingData = () => {
        _stopPollingData();
        require('../../global.js')._pollDataInterval = setInterval(() => _updateInfo(), 1000);
        // We run it once immediately so we don't have to wait for it
        _updateInfo();
    }

    const _stopPollingData = () => {
        if (require('../../global.js')._pollDataInterval != undefined)
            clearInterval(require('../../global.js')._pollDataInterval);
        require('../../global.js')._pollDataInterval = undefined;
    }

    useEffect(() => {
        _connectWallet();
    }, []);

    return (
        <></>
    )
};