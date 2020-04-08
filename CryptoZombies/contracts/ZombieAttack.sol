pragma solidity  >=0.5.0 <0.6.0;

import "../contracts/ZombieHelper.sol";

contract ZombieAttack is ZombieHelper {

    uint randNonce = 0;
    uint attackVictoryProbability = 70;

    function pseudoRandom(uint _modulus) internal returns (uint pseudoInt) {
        randNonce++;
        return uint(keccak256(abi.encodePacked(now, msg.sender, randNonce))).mod(_modulus);
    }

    function attack(uint _zombieId, uint _targetId) external ownerOfZombie(_zombieId) {

        Zombie storage attacker = zombies[_zombieId];
        Zombie storage defender = zombies[_targetId];
        uint value = pseudoRandom(100);
        if(value <= attackVictoryProbability) {
            attacker.winCount.add(1);
            attacker.level.add(1);
            defender.lossCount.add(1);
            // this.levelUp(_zombieId);
            feedAndMultiply(_zombieId, defender.dna, "Zombie");
            _triggerCooldown(zombies[_zombieId]);
        }

        else {
            defender.winCount.add(1);
            attacker.lossCount.add(1);
            _triggerCooldown(attacker);

        }

    }

}