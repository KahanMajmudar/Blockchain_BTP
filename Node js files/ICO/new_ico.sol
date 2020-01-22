pragma solidity >=0.4.22 <0.6.0;

import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Detailed.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/ERC20Pausable.sol";
//import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";

contract MyToken is ERC20, ERC20Detailed, ERC20Pausable{

    constructor(string memory name, string memory symbol, uint8 decimals, uint ICO_SUPP)
    ERC20Detailed(name, symbol, decimals) public{

        _mint(msg.sender, ICO_SUPP);

    }

}



// import "./Token_Generation.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/IERC20.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/Crowdsale.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";
import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/crowdsale/emission/AllowanceCrowdsale.sol";
// import "http://github.com/OpenZeppelin/openzeppelin-solidity/contracts/token/ERC20/TokenTimelock.sol";


contract MyICO is Ownable, Crowdsale, CappedCrowdsale, TimedCrowdsale, RefundablePostDeliveryCrowdsale, AllowanceCrowdsale{

    uint _endTime;
    uint _startTime;
    uint ourRate;
    // uint _lock = now+30*1 days;


    // enum CrowdsaleStage { PreICO, ICO, Round1, Round2, Round3, SaleEnd }
    // CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    uint stage = 0;

    //event SaleEnded(address a);

    constructor(uint256 rate, address payable wallet, IERC20 token, address tokenOwner, uint softcap,  uint hardcap, uint startTime, uint endTime)

    Crowdsale(rate, wallet, token)
    AllowanceCrowdsale(tokenOwner)
    CappedCrowdsale(hardcap)
    RefundableCrowdsale(softcap)
    TimedCrowdsale(startTime, endTime) public{

        //address deployed_address = MyToken.getAddress();
        //require(address(msg.sender) == address(deployed_address), "Owner of Token can create ICO");

        require(rate > 0);
        require(wallet != address(0));
        require(address(token) != address(0));
        ourRate = rate;
        _startTime = startTime;
        _endTime = endTime;
        applyBonus();
    }

    modifier beforeEnd(){

        require(now <= _endTime, "CrowdSale has Ended");
        _;

    }

    modifier afterStart(){

        require(now >= _startTime, "CrowdSale has not Started");
        _;

    }


    function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal view{

        // require(block.timestamp >= _lock);
        super._preValidatePurchase(_beneficiary, _weiAmount);

    }


    function changeRound() public onlyOwner() beforeEnd() afterStart(){

        stage = stage + 1;
        applyBonus();

    }


    function applyBonus() internal onlyOwner() beforeEnd(){


        if(stage == 1){
            ourRate = ourRate*2;

        }

        else{
            ourRate = ourRate/4;
        }

    }


    function rate() public view returns (uint256) {
        return ourRate;
    }


    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(ourRate);
    }



}
