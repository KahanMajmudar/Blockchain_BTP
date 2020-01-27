pragma solidity >=0.4.22 <0.6.0;

import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";

contract MyToken is ERC20, ERC20Detailed, ERC20Pausable{


    constructor(string memory name, string memory symbol, uint8 decimals, uint ICO_SUPP, uint TEAM_SUPP,
    uint ALB_SUPP, address TEAM, address ALB)
    ERC20Detailed(name, symbol, decimals) public{

        _mint(msg.sender, ICO_SUPP);
        _transfer(msg.sender, TEAM, TEAM_SUPP);
        _transfer(msg.sender, ALB, ALB_SUPP);

    }

    /*function getAddress() public returns(address){

        return address(msg.sender);

    }*/

}
