const TetherToken = artifacts.require('./TetherToken.sol')
const Web3 = require('web3')
const web3 = new Web3()
const BigNumber = web3.utils.BN
const chai = require('chai')
chai.use(require('chai-bignumber')(BigNumber))
chai.should()

contract("Tether Token", async accounts => {

    let token
    const totalSupp = web3.utils.toBN('3698120254587539')
    const name = "Tether Token"
    const symbol = "USDT"
    const decimals = 6
    // const owner = '0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828'
    const owner = accounts[0]
    const user1 = accounts[1]
    const user2 = accounts[2]
    const user3 = accounts[3]
    const tokenAmt = web3.utils.toBN(100)

    before(async() => {

        token = await TetherToken.new(totalSupp, name, symbol, decimals, {
            from: accounts[0]
        })
    })


    describe('Token Details', async() => {

        // console.log(totalSupp)

        it('has a correct Name', async() => {
            const _name = await token.name()
            _name.should.equal(name)
        })

        it('has a correct Symbol', async() => {
            const _symbol = await token.symbol()
            _symbol.should.equal(symbol)
        })

        it('has a correct decimal', async() => {
            const _decimals = await token.decimals()
            // _decimals.should.be.bignumber.equal(decimals)
            assert.equal(decimals.toString(), _decimals.toString())
        })

        it('has a correct Total Supply', async() => {
            const _totalSupp = await token.totalSupply()
            // console.log(_totalSupp)
            // _totalSupp.should.be.bignumber.equal(totalSupp)
            assert.equal(totalSupp.toString(), _totalSupp.toString());
        })

    })

    describe('Token Transfer to Owner', () => {
        it('has total supply same as balance of owner', async() => {
            const totalSupp = await token.totalSupply();
            const ownerBalance = await token.balanceOf(accounts[0]);

            // ownerBalance.should.be.bignumber.equal(totalSupply);
            assert.equal(totalSupp.toString(), ownerBalance.toString())
        });
    });

    describe('Token core functionalities', () => {
        it('has the functionality for purchasing tokens', async() => {
            const user1BalBefore = await token.balanceOf(user1)
            const amount = tokenAmt.mul(web3.utils.toBN(10).pow(await token.decimals()))
            await token.transfer(user1, amount, {
                from: owner
            })
            const user1BalAfter = await token.balanceOf(user1)
            const diffValue = user1BalAfter - user1BalBefore
            assert.equal(amount.toString(), diffValue.toString())

        })

        it('has the functionality for transferring tokens among users', async() => {
            const user1BalBefore = await token.balanceOf(user1)
            const user2BalBefore = await token.balanceOf(user2)
            const amount = tokenAmt.mul(web3.utils.toBN(10).pow(await token.decimals()))
            await token.transfer(user2, amount, {
                from: user1
            })
            const user1BalAfter = await token.balanceOf(user1)
            const user2BalAfter = await token.balanceOf(user2)
            const diffValue = user2BalAfter - user2BalBefore
            assert.equal(amount.toString(), diffValue.toString())
        })

        it('has the functionality for allowing someone else to transfer tokens on behalf of the user', async() => {
            const user1BalBefore = await token.balanceOf(user1)
            const user2BalBefore = await token.balanceOf(user2)
            const amount = tokenAmt.mul(web3.utils.toBN(10).pow(await token.decimals()))
            await token.approve(user3, amount)
            await token.transferFrom(user2, user1, amount)
            const user1BalAfter = await token.balanceOf(user1)
            const user2BalAfter = await token.balanceOf(user2)
            const diffValue = user1BalAfter - user1BalBefore
            assert.equal(amount.toString(), diffValue.toString())
        })
    })

})