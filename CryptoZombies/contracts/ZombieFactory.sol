pragma solidity  >=0.5.0 <0.6.0;

import "../node_modules/@openzeppelin/contracts/ownership/Ownable.sol";
// import "../contracts/Ownable.sol";
import "../contracts/SafeMath.sol";

/*
Unix time is traditionally stored in a 32-bit number. This will lead to the "Year 2038" problem,
when 32-bit unix timestamps will overflow and break a lot of legacy systems. So to keep the DApp running 20 years from now,
use a 64-bit number instead — but users would have to spend more gas to use the DApp in the meantime. Design decisions!
*/

contract ZombieFactory is Ownable {

    using SafeMath for uint256;
    using SafeMath for uint32;
    using SafeMath for uint16;
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTimer = 1 days;

    // Solidity reserves 256 bits of storage regardless of the uint size
    // multiple uints inside a struct, using a smaller-sized uint when possible will allow Solidity to pack these variables together to take up less storage.
    // cluster identical data types together (i.e. put them next to each other in the struct) so that Solidity can minimize the required storage space
    struct Zombie {
        string name;
        uint dna;
        uint32 level;
        uint32 readyTime;
        uint16 winCount;
        uint16 lossCount;
    }

    Zombie[] public zombies;

    mapping (uint => address) public zombieToOwner;
    mapping (address => uint) ownerZombieCount;
    mapping (uint => address) zombieApprovals;


    event NewZombie(uint id, string name, uint dna);

    // the `variables` should be stored in memory for all reference types such as arrays, structs, mappings, and strings
    function _createZombie(string memory _name, uint _dna) internal {
        require(ownerZombieCount[msg.sender] == 0, "Trying to create zombie more than once!!");
        uint id = zombies.push(Zombie(_name, _dna, 1, uint32(now + cooldownTimer), 0, 0)) - 1;
        zombieToOwner[id] = msg.sender;
        ownerZombieCount[msg.sender].add(1);
        emit NewZombie(id, _name, _dna);
    }

    function _generateRandomDna(string memory _str) private view returns (uint rand) {
        return uint(keccak256(abi.encodePacked(_str))).mod(dnaModulus);
    }

    function createRandomZombie(string memory _name) public {
        uint randDna = _generateRandomDna(_name);
        _createZombie(_name, randDna);
    }
}
