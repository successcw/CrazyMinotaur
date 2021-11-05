const CrazyMinotaur = artifacts.require("CrazyMinotaur")

contract("CrazyMinotaur", async accounts => {
    it("CrazyMinotaur should be minted correctly", async () => {
        const instance = await CrazyMinotaur.deployed();
        balance_before = await instance.balanceOf(accounts[0]);
        result = await instance.mint(1,{
            from: accounts[0],
            gasPrice: 0,
            value: web3.utils.toWei("0.01", "ether")
        });
        balance_after = await instance.balanceOf(accounts[0]);

        balance = balance_after - balance_before;
        assert.equal(balance, 1);
    });
    it("CrazyMinotaur should be burned correctly", async () => {
        const instance = await CrazyMinotaur.deployed();
        balance_before = await instance.balanceOf(accounts[0]);
        tokenId = await instance.tokenOfOwnerByIndex(accounts[0], 0, {
            from: accounts[0],
            gasPrice: 0
        });

        await instance.burn(tokenId);
        balance_after = await instance.balanceOf(accounts[0]);
        balance = balance_before - balance_after;
        assert.equal(balance, 1);
    });
    it("CrazyMinotaur can only mint 1 Minotaur at a time", async () => {
        const instance = await CrazyMinotaur.deployed();
        try {
            await instance.mint(2, {
                from: accounts[0],
                gasPrice: 0,
                value: web3.utils.toWei("0.01", "ether")
            });
        } catch (error) {
            //console.log(error.reason);
            assert.equal(error.reason, "can only mint 1 Minatour at a time");
        }
    });
    it("CrazyMinotaur's max supply is 3", async () => {
        const instance = await CrazyMinotaur.deployed();
        index = await instance.totalSupply();
        for( i = 0; i < 3 - index; i++) {
            await instance.mint(1,{
                from: accounts[0],
                gasPrice: 0,
                value: web3.utils.toWei("0.01", "ether")
            });
        }
        try {
            await instance.mint(1, {
                from: accounts[0],
                gasPrice: 0,
                value: web3.utils.toWei("0.01", "ether")
            });
        } catch (error) {
            //console.log(error.reason);
            assert.equal(error.reason, "exceed max supply");
        }
    });

});
