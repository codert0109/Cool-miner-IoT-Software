// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./interfaces/IElumNFT.sol";
import "./AppStorage.sol";

contract ElumNFT is Ownable, IElumNFT {
    event AffectWhiteList(address[], bool);

    uint256 public NFT_TYPE_COUNTER = 0;
    uint256 public NFT_ID_COUNTER = 0;

    // Stores available NFT type lists.
    mapping (uint256 => NFT_TYPE)       internal NFT_TYPE_INFO;

    // Mapping address to the array of NFT ids.
    mapping (address => NFT_BALANCE)    internal USER_TO_NFT;

    // Mapping NFT id to NFT_Info
    mapping (uint256 => NFT_INFO)       internal NFT_TO_INFO;

    // Mapping of Approved users that can mine data
    mapping (address => bool)           internal whiteLists;

    // Token address
    address public token_address;

    /* Begin OnlyOwner Module */
    function setTokenAddress(address _token_address) public virtual onlyOwner {
        require (_token_address != address(0), "invalid token address");
        token_address = _token_address;
    }
    
    function addNewType(string calldata metadataURI, 
                        uint256 price) 
                        public virtual onlyOwner returns (uint256) {
        NFT_TYPE_INFO[NFT_TYPE_COUNTER].metadataURI = metadataURI;
        NFT_TYPE_INFO[NFT_TYPE_COUNTER].price = price;
        NFT_TYPE_INFO[NFT_TYPE_COUNTER].totalSupply = 0;
        NFT_TYPE_INFO[NFT_TYPE_COUNTER].remainSupply = 0;
        ++ NFT_TYPE_COUNTER;

        return NFT_TYPE_COUNTER - 1;
    }

    function updateType(uint256 nftID, 
                        string calldata metadataURI,
                        uint256 price)
                        public virtual onlyOwner {
        require (nftID < NFT_TYPE_COUNTER, "id should be less than NFT_TYPE_COUNTER");

        NFT_TYPE_INFO[nftID].metadataURI = metadataURI;
        NFT_TYPE_INFO[nftID].price = price;
        NFT_TYPE_INFO[nftID].totalSupply = 0;
        NFT_TYPE_INFO[nftID].remainSupply = 0;
    }

    function mint(uint256[] calldata ids, uint256[] calldata amounts) public virtual onlyOwner returns (bool) {
        require (ids.length == amounts.length, "Id and Amount array length should be equal.");
        for (uint i = 0; i < ids.length; i++) {
            require (ids[i] < NFT_TYPE_COUNTER, "id should be less than NFT_TYPE_COUNTER");
            NFT_TYPE_INFO[ids[i]].totalSupply += amounts[i];
            NFT_TYPE_INFO[ids[i]].remainSupply += amounts[i];
        }
        return true;
    }

    function affectWhiteList(address[] calldata _addressList, bool isApprove) public virtual onlyOwner {
        for (uint i = 0; i < _addressList.length; i++)
            whiteLists[_addressList[i]] = isApprove;

        emit AffectWhiteList(_addressList, isApprove);
    }
    /* End OnlyOwner Module */

    /* Begin User Module */
    function isWhiteLists(address addr) public view virtual returns (bool) {
        return whiteLists[addr];
    }

    function buyNFT(uint256 nftType, uint256 amount) external payable virtual returns(bool) {
        require (isWhiteLists(msg.sender), "The wallet address should be in the approved list.");
        require (nftType < NFT_TYPE_COUNTER, "NFT Type should be less than NFT_TYPE_COUNTER");
        require (NFT_TYPE_INFO[nftType].remainSupply >= amount, "Not enough supply.");
        
        require (msg.value >= amount * NFT_TYPE_INFO[nftType].price, "Not enough payment.");

        for (uint i = 0; i < amount; i++) {
            NFT_TO_INFO[NFT_ID_COUNTER].owner = msg.sender;
            NFT_TO_INFO[NFT_ID_COUNTER].nftType = nftType;
            NFT_TO_INFO[NFT_ID_COUNTER].acquireTime = block.timestamp;
            NFT_TO_INFO[NFT_ID_COUNTER].index = USER_TO_NFT[msg.sender].idList.length;
            USER_TO_NFT[msg.sender].idList.push(NFT_ID_COUNTER);
            ++ NFT_ID_COUNTER;
        }

        return true;
    }

    function transferNFT(uint256[] calldata ids, address to) external virtual {
        require (to != address(0), "Target address cannot be null");
        require (isWhiteLists(msg.sender), "src address should be in the approved list.");
        require (isWhiteLists(to), "dst address should be in the approved list.");

        for (uint i = 0; i < ids.length; i++) {
            uint256 id = ids[i];

            require (id < NFT_ID_COUNTER, "ID value should be less than NFT_ID_COUNTER");
            require (NFT_TO_INFO[id].owner == msg.sender, "Src are not the owner.");

            NFT_TO_INFO[id].owner = to;
            NFT_TO_INFO[id].acquireTime = block.timestamp;
            
            uint oldIndex = NFT_TO_INFO[id].index;
            require (USER_TO_NFT[msg.sender].idList[oldIndex] == id, "id.index should be correct.");

            uint256 oldUserBalance = USER_TO_NFT[msg.sender].idList.length;
            require(oldUserBalance > 0, "Old User Balance should be greater than zero.");

            USER_TO_NFT[msg.sender].idList[oldIndex] = USER_TO_NFT[msg.sender].idList[oldUserBalance - 1];
            NFT_TO_INFO[USER_TO_NFT[msg.sender].idList[oldIndex]].index = oldIndex;
            USER_TO_NFT[msg.sender].idList.pop();

            uint256 newUserBalance = USER_TO_NFT[to].idList.length;

            USER_TO_NFT[to].idList.push(id);
            NFT_TO_INFO[id].index = newUserBalance;
        }
    }

    function balanceOf(address _address) public view virtual returns (uint256[] memory) {
        return USER_TO_NFT[_address].idList;
    }

    function isOwner(address _address, uint256 nftID) external view override virtual returns (bool) {
        require (nftID < NFT_ID_COUNTER, "NFT ID should be less than NFT_ID_COUNTER");
        require (_address != address(0), "Address cannot be null");

        return NFT_TO_INFO[nftID].owner == _address;
    }
    /* End User Module */
}