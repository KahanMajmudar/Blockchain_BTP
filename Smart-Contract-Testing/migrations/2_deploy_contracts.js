var TetherToken = artifacts.require('./TetherToken')

module.exports = function(deployer) {
    deployer.deploy(TetherToken, 3698120254587539, "Tether Token", "USDT", 6);
};