const RaaErc20Test = artifacts.require("RaaErc20Test");

contract('Test Raa Contract', (accounts) => {
    it('Mint 15000 to Owner Account', async () => {
        const raaErc20TestInst = await RaaErc20Test.deployed();
        await raaErc20TestInst.mint(accounts[0], 15000);
        const balance = await raaErc20TestInst.balanceOf(accounts[0]).then((res) => {
            return res.words[0];
        });        
        assert.equal(balance, 15000, 'Error in minting to Onwer Account 1');
    });

    it('Testing approve method', async () => {
        const raaErc20TestInst = await RaaErc20Test.deployed();
        await raaErc20TestInst.approve(accounts[1], 500);
        const allowance = await raaErc20TestInst.allowance(accounts[0], accounts[1]).then((res) => {
            return res.words[0]
        });
        assert.equal(allowance, 500, 'Account 1 succesfully approved to spent 500');
    });

    it('Testing transferFrom method', async () => {
        const raaErc20TestInst = await RaaErc20Test.deployed();
        // Если сумма будет больше 15000 тест не пройдет, так как в первом тесте мы наминтили 15000 для Аккаунта 0
        await raaErc20TestInst.approve(accounts[0], 10000);
        await raaErc20TestInst.transferFrom(accounts[0], accounts[1], 10000);
        const balance = await raaErc20TestInst.balanceOf(accounts[1]).then((res) => {
            return res.words[0];
        });
        assert.equal(balance, 10000, 'Account 0 succesfully transferred to Account 1 10000');
    });
});