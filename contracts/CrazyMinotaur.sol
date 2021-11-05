// SPDX-License-Identifier: MIT
pragma solidity 0.8.6;

import "./tokens/nf-token.sol";
import "./ownership/ownable.sol";

/**
 * @dev Crazy Minatour
 */
contract CrazyMinotaur is NFToken, Ownable {

    uint256 public constant crazyMinotaurPrice = 10000000000000000; //0.01 ETH
    uint256 public constant maxMint = 1;
    uint256 public constant maxCrazyMinotaur = 3;

    mapping (uint256 => string) internal uri;

    constructor() {
        nftName = "CrazyMinotaur";
        nftSymbol = "CM";
        uri[0] = "https://gateway.pinata.cloud/ipfs/QmeCZ4XEfdHWKuFp5JtpEYa6jpEJdQoFcSjVqTGztZTgcN";
        uri[1] = "https://gateway.pinata.cloud/ipfs/QmfAnVfCVucy6ubawqRpX5txZTLCQBqnTF4fsQLEUAB1CA";
        uri[2] = "https://gateway.pinata.cloud/ipfs/QmU8JjDLMidjUBdsbxVK8UUjBbG9fV1msyUFeUNYLjUQo4";
    }

    function mint(uint _number) public payable {
        require(_number > 0 && _number <= maxMint, "can only mint 1 Minatour at a time");
        require(_totalSupply() + _number <= maxCrazyMinotaur, "exceed max supply");
        require(msg.value >= crazyMinotaurPrice * _number, "Ether is not correct");

        for(uint i = 0; i < _number; i++) {
            uint index = _totalSupply();
            _mint(msg.sender, index);
            _setTokenUri(index, uri[index]);
        }
    }

    function burn(uint256 _tokenId) external onlyOwner {
        _burn(_tokenId);
    }


}
