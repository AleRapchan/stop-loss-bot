var DaiFaucet = artifacts.require("DaiFaucet");

module.exports = function(deployer) {
	deployer.deploy(DaiFaucet);
}