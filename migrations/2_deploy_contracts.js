const RaaErc20Test = artifacts.require("RaaErc20Test");

module.exports = async function(deployer) {
    await deployer.deploy(RaaErc20Test);
}