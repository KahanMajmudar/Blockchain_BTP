pragma solidity ^0.5.14;

contract SpaceDoggos {

    uint maxPlanetsPerSystem = 10;
    uint minPlanetsPerSystem = 3;

    uint planetCodeDigits = 7;
    uint systemCodeDigits = 7;

    uint planetCodeModulus = 10 ** planetCodeDigits;
    uint systemCodeModulus = 10 ** systemCodeDigits;

    struct Doggo {
    string name;
    uint8 breed;
    uint8 color;
    uint8 face;
    uint8 costume;
    uint coordX;
    uint coordY;
    }

    mapping(address => Doggo) doggos;

    function createDoggo(string memory _name, uint8 _breed, uint8 _color, uint8 _face, uint8 _costume) public {
        Doggo memory myDoggo = Doggo({
            name: _name,
            breed: _breed,
            color: _color,
            face: _face,
            costume: _costume,
            coordX: 0,
            coordY: 0
        });

        doggos[msg.sender] = myDoggo;
    }

    function getSystemMap(uint _coordX, uint _coordY) internal pure returns(uint)  {
        return uint(keccak256(abi.encodePacked(_coordX, _coordY)));
    }


}