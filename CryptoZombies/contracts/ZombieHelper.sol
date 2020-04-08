pragma solidity  >=0.5.0 <0.6.0;

import "../contracts/ZombieFeeding.sol";

contract ZombieHelper is ZombieFeeding {

    uint levelUpFee;

    modifier aboveLevel(uint _level, uint _zombieId) {
        require(zombies[_zombieId].level >= _level);
        _;
    }

    function withdraw() external onlyOwner {
        address payable _owner = address(uint160(owner()));
        _owner.transfer(address(this).balance);
    }

    function setLevelUpFee(uint _fee) external onlyOwner {
        levelUpFee = _fee;
    }
    function levelUp(uint _zombieId) external payable {
        require(msg.value >= levelUpFee, "Fee too low!!");
        zombies[_zombieId].level.add(1);
    }

    function changeName(uint _zombieId, string calldata _newName) external ownerOfZombie(_zombieId) aboveLevel(2, _zombieId) {
        zombies[_zombieId].name = _newName;
    }

    function changeDna(uint _zombieId, uint _newDna) external ownerOfZombie(_zombieId) aboveLevel(20, _zombieId) {
        zombies[_zombieId].dna = _newDna;
    }

    function getZombiesByOwner(address _zombieOwner) external view returns (uint[] memory _zombies) {

        uint[] memory result = new uint[](ownerZombieCount[_zombieOwner]);
        uint counter = 0;
        for(uint i = 0; i <= zombies.length; i++) {
            if(zombieToOwner[i] == _zombieOwner) {
                result[counter] = i;
                counter.add(1);
            }
        }

        return result;
    }

}