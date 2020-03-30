var TetherToken = artifacts.require('./TetherToken')

export default function(deployer) {

    const totalSupply = 3698120254587539
    const name = "Tether Token"
    const symbol =  "USDT"
    const decimal = 6

    deployer.deploy(TetherToken, totalSupply, name, symbol, decimal);
};