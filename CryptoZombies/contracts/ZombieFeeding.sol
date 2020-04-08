pragma solidity  >=0.5.0 <0.6.0;

import "../contracts/ZombieFactory.sol";


// For our contract to talk to another contract on the blockchain that we don't own, we need to define an interface.
contract KittyInterface {

    function getKitty(uint256 _id) external view returns (
        bool isGestating,
        bool isReady,
        uint256 cooldownIndex,
        uint256 nextActionAt,
        uint256 siringWithId,
        uint256 birthTime,
        uint256 matronId,
        uint256 sireId,
        uint256 generation,
        uint256 genes
    );

}

contract ZombieFeeding is ZombieFactory {

    // address public kittyContractAddress = 0x06012c8cf97BEaD5deAe237070F9587f8E7A266d
    KittyInterface kitty;

    modifier ownerOfZombie(uint _zombieId) {
        require(zombieToOwner[_zombieId] == msg.sender, "This zombie doesn't belong to you!!");
        _;
    }

    function setKittyContractAddress(address _address) external onlyOwner {
        kitty = KittyInterface(_address);
    }
    function feedAndMultiply(uint _zombieId, uint _targetDna, string memory _species) internal ownerOfZombie(_zombieId) {

        Zombie storage myZombie = zombies[_zombieId];
        // require(myZombie.readyTime >= now, "The zombie is not ready to feed!!");
        require((_isReady(myZombie))  , "The zombie is not ready");
        _targetDna = _targetDna.mod(dnaModulus);
        uint newDna = (myZombie.dna.add(_targetDna)).div(2);
        if(keccak256(abi.encodePacked(_species)) == keccak256(abi.encodePacked("kitty"))) {
            // newDna -= newDna % 100 + 99;        //replace last 2 digits with 99
            newDna.sub(newDna.mod(100)).add(99);
        }
        _createZombie('newlyCreated', newDna);
        _triggerCooldown(myZombie);
    }

    function feedOnKitty(uint _zombieId, uint _kittyId) public {

        uint kittyDna;
        (,,,,,,,,,kittyDna) = kitty.getKitty(_kittyId);
        feedAndMultiply(_zombieId, kittyDna, "kitty");

    }

    function _triggerCooldown(Zombie storage _zombie) internal {
        _zombie.readyTime = uint32(now.add(cooldownTimer));
    }

    function _isReady(Zombie storage _zombie) internal view returns (bool isReady) {
        return _zombie.readyTime <= now;
    }
}