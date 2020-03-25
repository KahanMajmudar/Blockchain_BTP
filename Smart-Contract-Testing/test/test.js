const TetherToken = artifacts.require('./TetherToken.sol')
const Web3 = require('web3')
const web3 = new Web3()
const {expect} = require('chai')
const chai = require('chai')
// const expect = chai.expect()
// chai.use(require('chai-bignumber')(web3.utils.BN))
chai.should()
const truffleAssert = require('truffle-assertions')
const {
    BN,
    constants
} = require('@openzeppelin/test-helpers');


contract("Tether Token", async accounts => {

    let token
    let transferAmt
    let issueAmt
    let basisPointsRate
    let maximumFee
    let blackTransferAmt
    // const realOwner = '0xc6cde7c39eb2f0f0095f41570af89efc2c1ea828'
    const totalSupp = new BN('3698120254587539')
    const name = "Tether Token"
    const symbol = "USDT"
    const decimals = new BN(6)
    const owner = accounts[0]
    const Alpha = accounts[1]
    const Bravo = accounts[2]
    const Charlie = accounts[3]
    const Delta = accounts[4]
    const BlackAlpha = accounts[5]
    const BlackBravo = accounts[6]
    const BlackCharlie = accounts[7]
    const BlackDelta = accounts[8]
    const notOwner = accounts[9]

    const tokenAmt = new BN(100)
    const tokenAmt1 = new BN(1000)
    const blackTokenAmt = new BN(200)
    const zeroAmt = new BN(0)

    before(async() => {

        token = await TetherToken.new(totalSupp, name, symbol, decimals, {
            from: accounts[0]
        })

        transferAmt = tokenAmt.mul(web3.utils.toBN(10).pow(await token.decimals()))
        issueAmt = tokenAmt1.mul(web3.utils.toBN(10).pow(await token.decimals()))
        basisPointsRate = await token.basisPointsRate()
        maximumFee = await token.maximumFee()
        blackTransferAmt = blackTokenAmt.mul(web3.utils.toBN(10).pow(await token.decimals()))

        console.log('----------------------------------Called-------------------------')

    })


    describe('Token Details', async() => {

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
            expect(_decimals).to.be.bignumber.equal(decimals)
            // assert.equal(decimals.toString(), _decimals.toString())
        })

        it('has a correct Total Supply', async() => {
            const _totalSupp = await token.totalSupply()
            expect(_totalSupp).to.be.bignumber.equal(totalSupp);
            // assert.equal(totalSupp.toString(), _totalSupp.toString());
        })

    })

    describe('Token Transfer to Owner', () => {
        it('has total supply same as balance of owner', async() => {
            const totalSupp = await token.totalSupply();
            const ownerBalance = await token.balanceOf(accounts[0]);
            expect(ownerBalance).to.be.bignumber.equal(totalSupp);
            // assert.equal(totalSupp.toString(), ownerBalance.toString())
        });
    });

    describe('Token core functionalities', () => {
        it('has the functionality for purchasing tokens', async() => {
            const AlphaBalBefore = await token.balanceOf(Alpha)
            await token.transfer(Alpha, transferAmt, {
                from: owner
            })

            await token.transfer(Delta, transferAmt, {
                from: owner
            })

            const AlphaBalAfter = await token.balanceOf(Alpha)
            const diffValue = AlphaBalAfter - AlphaBalBefore
            assert(AlphaBalAfter > AlphaBalBefore)
            // expect(diffValue.toString()).to.be.bignumber.equal(transferAmt)
            assert.equal(transferAmt.toString(), diffValue.toString())

        })

        it('has the functionality for transferring tokens among users', async() => {
            const AlphaBalBefore = await token.balanceOf(Alpha)
            const BravoBalBefore = await token.balanceOf(Bravo)
            await token.transfer(Bravo, transferAmt, {
                from: Alpha
            })
            const AlphaBalAfter = await token.balanceOf(Alpha)
            const BravoBalAfter = await token.balanceOf(Bravo)
            assert(AlphaBalAfter < AlphaBalBefore)
            assert(BravoBalAfter > BravoBalBefore)
            const diffValue = BravoBalAfter - BravoBalBefore
            // expect(diffValue.toString()).to.be.bignumber.equal(transferAmt)
            assert.equal(transferAmt.toString(), diffValue.toString())
        })

        it('has the functionality for allowing someone else to transfer tokens on behalf of the user', async() => {
            const AlphaBalBefore = await token.balanceOf(Alpha)
            const BravoBalBefore = await token.balanceOf(Bravo)
            await token.approve(Charlie, transferAmt, {
                from: Bravo
            })
            await token.transferFrom(Bravo, Alpha, transferAmt, {
                from: Charlie
            })
            const AlphaBalAfter = await token.balanceOf(Alpha)
            const BravoBalAfter = await token.balanceOf(Bravo)
            assert(AlphaBalAfter > AlphaBalBefore)
            assert(BravoBalAfter < BravoBalBefore)
            const diffValue = BravoBalBefore - BravoBalAfter
            // expect(diffValue.toString()).to.be.bignumber.equal(transferAmt)
            assert.equal(transferAmt.toString(), diffValue.toString())
        })

        it('has the functionality of pausing the transfers', async() => {
            await token.transfer(Charlie, transferAmt, {
                from: owner
            })
            let isPaused = await token.paused()
            assert(isPaused == false)
            await token.pause({
                from: owner
            })
            isPaused = await token.paused()
            assert(isPaused == true)
        })

        it('should now fail transfer as pause is true', async() => {
            await truffleAssert.reverts(
                token.transfer(owner, transferAmt, {
                from: Charlie
            }))

        })

        it('should now unpause', async() => {
            await token.unpause({
                from: owner
            })

            const isPaused = await token.paused()
            console.log(isPaused)
            assert(isPaused == false)

        })


    })

    describe('Token additional functionalites', async() => {
        it('should issue new tokens to the owner', async() => {
            const ownerBalBefore = await token.balanceOf(owner)
            await token.issue(issueAmt, {
                from: owner
            })
            const ownerBalAfter = await token.balanceOf(owner)
            assert(ownerBalAfter > ownerBalBefore)
            const diffValue = ownerBalAfter - ownerBalBefore
            // expect(diffValue.toString()).to.be.bignumber.equal(issueAmt)
            assert.equal(issueAmt.toString(), diffValue.toString())
        })

        it('should not be issued by someone other than owner', async() => {
            await truffleAssert.reverts(
                token.issue(issueAmt, {
                    from: notOwner
                })
            )
        })

        it('should not issue zero amount', async() => {
            await truffleAssert.reverts(
                token.issue(zeroAmt, {
                    from: owner
                })
            )
        })

        it('should redeem tokens from the owner', async() => {
            const ownerBalBefore = await token.balanceOf(owner)
            await token.redeem(issueAmt, {
                from: owner
            })
            const ownerBalAfter = await token.balanceOf(owner)
            assert(ownerBalAfter < ownerBalBefore)
            const diffValue = ownerBalBefore - ownerBalAfter
            // expect(diffValue.toString()).to.be.bignumber.equal(issueAmt)
            assert.equal(issueAmt.toString(), diffValue.toString())
        })

        it('should not be redeemed by someone other than owner', async() => {
            await truffleAssert.reverts(
                token.redeem(issueAmt, {
                    from: notOwner
                })
            )
        })

        it('can redeem zero amount', async() => {
            await token.redeem(zeroAmt, {
                from: owner
            })
        })

        it('can set new parameters', async() => {
            assert.equal(basisPointsRate.toString(), zeroAmt.toString())
            assert.equal(maximumFee.toString(), zeroAmt.toString())
            const newBasisPointsRate = new BN(10)
            const newMaximumFee = new BN(10)
            await token.setParams(newBasisPointsRate, newMaximumFee, {
                from: owner
            })
            // token.basisPointsRate().then(res => console.log(res))
            // token.maximumFee().then(res => console.log(res))
            // const _newBasisPointsRate = await token.basisPointsRate()
            // const _maximumFee = await token.maximumFee()
            // assert.equal(newBasisPointsRate.toString(), _newBasisPointsRate.toString())
            // assert.equal(newMaximumFee.toString(), _maximumFee.toString())
        })

        it('cannot set new parameters without owner', async() => {
            assert.equal(basisPointsRate.toString(), zeroAmt.toString())
            assert.equal(maximumFee.toString(), zeroAmt.toString())
            const newBasisPointsRate = new BN(10)
            const newMaximumFee = new BN(10)
            await truffleAssert.reverts(
                token.setParams(newBasisPointsRate, newMaximumFee, {
                    from: notOwner
                })
            )
        })

        it('cannot set new parameters such that newBasisPoints > 20 and newMaxFee > 50', async() => {
            const newBasisPointsRate = new BN(20)
            const newMaximumFee = new BN(30)
            await truffleAssert.reverts(
                token.setParams(newBasisPointsRate, newMaximumFee, {
                    from: owner
                })
            )
        })

    })

    describe('Blacklist features', async() => {
        it('can add users to blacklist by owner', async() => {
            await token.addBlackList(Delta, {
                from: owner
            })
        })

        it('cannot add users to blacklist without owner', async() => {
            await truffleAssert.reverts(
                token.addBlackList(Alpha, {
                    from: notOwner
                })
            )
        })

        it('can destroy funds of blacklisted address by owner', async() => {
            const _totalSuppBefore = await token.totalSupply()
            const deltaBalBefore = await token.balanceOf(Delta)

            await token.destroyBlackFunds(Delta, {
                from: owner
            })

            const deltaBalAfter = await token.balanceOf(Delta)
            const _totalSuppAfter = await token.totalSupply()

            const diffValue = _totalSuppBefore - _totalSuppAfter

            assert.equal(deltaBalAfter.toString(), zeroAmt.toString())
            assert.equal(diffValue.toString(), deltaBalBefore.toString())
        })

        it('can remove users from blacklist by owner', async() => {
            await token.removeBlackList(Delta, {
                from: owner
            })
        })

        it('cannot remove users from blacklist without owner', async() => {
            await truffleAssert.reverts(
                token.removeBlackList(Delta, {
                    from: notOwner
                })
            )
        })

        it('cannot allow blacklisted users to transfer tokens', async() => {
            await token.transfer(BlackAlpha, blackTokenAmt, {
                from: owner
            })

            await token.addBlackList(BlackAlpha, {
                from: owner
            })

            await truffleAssert.reverts(
                token.transfer(BlackBravo, blackTokenAmt, {
                    from: BlackAlpha
                })
            )
        })

        it('has the functionality for not allowing someone else to transfer tokens on behalf of the blacklisted user', async() => {
            await token.approve(BlackCharlie, blackTransferAmt, {
                from: BlackAlpha
            })

            await truffleAssert.reverts(
                token.transferFrom(BlackAlpha, BlackDelta, blackTransferAmt, {
                    from: BlackCharlie
                })
            )

        })
    })

})