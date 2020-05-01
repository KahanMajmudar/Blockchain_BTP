const Oracle = artifacts.require("OracleTest");

module.exports = function(deployer) {
  // deployer.deploy(Oracle, {
  //     from: '0x89ced5229F2D31ED1eF4F7035162f0BaFdeF68c6',
  //     value: web3.utils.toHex(web3.utils.toWei('5', 'ether')),
  //     gas: '6721975'
  // });
  deployer.deploy(Oracle)
};
