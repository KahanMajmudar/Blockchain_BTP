pragma solidity ^0.5.8;

import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";

import "../node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";
import "../node_modules/@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";


contract MyToken is ERC20, ERC20Detailed, ERC20Pausable{

    constructor(string memory name, string memory symbol, uint8 decimals, uint ICO_SUPP)
    ERC20Detailed(name, symbol, decimals) public{

        _mint(msg.sender, ICO_SUPP);

    }

}


contract MyICO is Ownable, Crowdsale, CappedCrowdsale, TimedCrowdsale, RefundablePostDeliveryCrowdsale, AllowanceCrowdsale{

    uint ourEndTime;
    uint ourStartTime;
    uint ourRate;
    // uint ourLock = now+30*1 days;


    // enum CrowdsaleStage { PreICO, ICO, Round1, Round2, Round3, SaleEnd }
    // CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    uint stage = 0;

    constructor(uint256 rate, address payable wallet, IERC20 token, address tokenOwner,
    uint softcap,  uint hardcap, uint startTime, uint endTime)

    Crowdsale(rate, wallet, token)
    AllowanceCrowdsale(tokenOwner)
    CappedCrowdsale(hardcap)
    RefundableCrowdsale(softcap)
    TimedCrowdsale(startTime, endTime) public{

        //address deployed_address = MyToken.getAddress();
        //require(address(msg.sender) == address(deployed_address), "Owner of Token can create ICO");

        require(rate > 0, 'Rate cannot be 0');
        require(wallet != address(0), 'Wallet address cannot be 0');
        require(address(token) != address(0), 'Token address cannot be 0');

        ourRate = rate;
        ourStartTime = startTime;
        ourEndTime = endTime;
        applyBonus();
    }

    modifier beforeEnd(){

        require(now <= ourEndTime, "CrowdSale has Ended");
        _;

    }

    modifier afterStart(){

        require(now >= ourStartTime, "CrowdSale has not Started");
        _;

    }


    // function _preValidatePurchase(address _beneficiary, uint256 _weiAmount) internal view{

    //     require(block.timestamp >= ourLock);
    //     super._preValidatePurchase(_beneficiary, _weiAmount);

    // }


    function changeRound() public onlyOwner() beforeEnd() afterStart(){

        stage = stage + 1;
        applyBonus();

    }


    function applyBonus() internal onlyOwner() beforeEnd(){

        require(stage < 6, 'Rounds Excedded!!');

        if(stage == 1){
            ourRate = ourRate*2;

        }

        else{
            ourRate = ourRate/2;
        }

    }

    function rate() public view returns (uint256) {
        return ourRate;
    }


    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(ourRate);
    }

}