pragma solidity ^0.5.8;

import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20Detailed.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/ERC20Pausable.sol";
import "./node_modules/@openzeppelin/contracts/token/ERC20/TokenTimelock.sol";

import "./node_modules/@openzeppelin/contracts/crowdsale/Crowdsale.sol";
import "./node_modules/@openzeppelin/contracts/crowdsale/validation/CappedCrowdsale.sol";
import "./node_modules/@openzeppelin/contracts/crowdsale/validation/TimedCrowdsale.sol";
import "./node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
import "./node_modules/@openzeppelin/contracts/crowdsale/distribution/RefundablePostDeliveryCrowdsale.sol";
import "./node_modules/@openzeppelin/contracts/crowdsale/emission/AllowanceCrowdsale.sol";


contract MyToken is ERC20, ERC20Detailed, ERC20Pausable {

    constructor(string memory name, string memory symbol, uint8 decimals, uint ICO_SUPP)
    public ERC20Detailed(name, symbol, decimals) {

        //solhint-disable-next-line mark-callable-contracts
        _mint(msg.sender, ICO_SUPP);

    }

}


contract MyICO is Ownable, Crowdsale, CappedCrowdsale, TimedCrowdsale, RefundablePostDeliveryCrowdsale, AllowanceCrowdsale {

    IERC20 private mytoken;
    uint private ourEndTime;
    uint private ourStartTime;
    uint private ourRate;
    uint private userLock = now + 30*1 days;
    uint private teamLock = now + 365*1 days;

    // enum CrowdsaleStage { PreICO, ICO, Round1, Round2, Round3, SaleEnd }
    // CrowdsaleStage public stage = CrowdsaleStage.PreICO;

    uint private stage = 0;

    constructor(uint256 rate, address payable wallet, IERC20 token, address tokenOwner,
    uint softcap, uint hardcap, uint startTime, uint endTime)

    public
    Crowdsale(rate, wallet, token)
    AllowanceCrowdsale(tokenOwner)
    CappedCrowdsale(hardcap)
    RefundableCrowdsale(softcap)
    TimedCrowdsale(startTime, endTime) {

        mytoken = token;
        ourRate = rate;
        ourStartTime = startTime;
        ourEndTime = endTime;
    }

    modifier beforeEnd() {
        //solhint-disable-next-line not-rely-on-time
        require(now <= ourEndTime, "CrowdSale has Ended");
        _;

    }

    modifier afterStart() {
        //solhint-disable-next-line not-rely-on-time
        require(now >= ourStartTime, "CrowdSale has not Started");
        _;

    }

    function changeRound() public onlyOwner() beforeEnd() afterStart() {

        stage = stage + 1;
        applyBonus();

    }


    function applyBonus() internal onlyOwner() beforeEnd() {

        require(stage < 6, "Rounds Excedded!!");

        if (stage == 1) {
            ourRate = ourRate*2;

        } else {
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

