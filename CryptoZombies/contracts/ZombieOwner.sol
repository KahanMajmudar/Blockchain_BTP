pragma solidity >=0.5.0 < 0.6.0;

// import "../node_modules/@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "../contracts/ZombieAttack.sol";
import "../contracts/IERC721.sol";


contract ZombieOwnership is ERC721, ZombieAttack {

    function balanceOf(address owner) public view returns (uint256 balance) {
        require(owner != address(0), "ERC721: balance query for the zero address");
        return ownerZombieCount[owner];
    }

    function ownerOf(uint256 tokenId) public view returns (address owner) {
        owner = zombieToOwner[tokenId];
        require(owner != address(0), "ERC721: owner query for nonexistent token");
        return owner;
    }

    function approve(address to, uint _tokenId) public payable{
        address owner = zombieToOwner[_tokenId];
        require(to != owner, "ERC721: approval to current owner");

        require(_msgSender() == owner || zombieApprovals[_tokenId] == msg.sender,
            "ERC721: approve caller is not owner nor approved for all"
        );

        zombieApprovals[_tokenId] = to;
        emit Approval(owner, to, _tokenId);
    }

    function transferFrom(address from, address to, uint _tokenId) public payable{
        //solhint-disable-next-line max-line-length
       require (zombieToOwner[_tokenId] == msg.sender || zombieApprovals[_tokenId] == msg.sender, "ERC721: token not owned or approved");

        _transfer(from, to, _tokenId);
    }

    function _transfer(address from, address to, uint256 tokenId) internal {
        require(ownerOf(tokenId) == from, "ERC721: transfer of token that is not own");
        require(to != address(0), "ERC721: transfer to the zero address");

        // _clearApproval(tokenId);

        ownerZombieCount[from].sub(1);
        ownerZombieCount[to].add(1);

        zombieToOwner[tokenId] = to;

        emit Transfer(from, to, tokenId);
    }

}