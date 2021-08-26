const DaiFaucet = artifacts.require("DaiFaucet");
const assert = require('assert')
const truffleAssert = require('truffle-assertions');
const BigNumber = require('bignumber.js');
const Web3 = require('Web3');
const web3 = new Web3 ('http://localhost:9545');

let contractInst;
 
contract('DaiFaucet', (accounts) => {

    beforeEach(async () => {
        contractInst = await DaiFaucet.deployed({from: accounts[0]})
    })

    describe("1. General Tests:", () =>   
    { 
        it("1.1. Should list contract address", async ()=> {
            console.log(contractInst.address);
        })

        it("1.2. Should return the list of accounts", async ()=> {
            console.log(accounts);
        })

        it("1.3. Should show all the Withdrawal events", async ()=> {
            const events = await contractInst.getPastEvents('Withdrawal');
            console.log (events);
        })
        it("1.4. Should show all the Deposit events", async ()=> {
            const events = await contractInst.getPastEvents('Deposit');
            console.log (events);
        })
    })

    // describe("2. Should check that the correct events are returned:", () => 
    // {   

    //     it("2.1. Should emited an event when a withdraw is made", async ()=> {

    //         // let result = await truffleAssert.createTransactionResult(contractInst, contractInst.transactionHash);
    //         // console.log(contractInst.transactionHash);

    //         // await truffleAssert.eventEmitted(result, 'Withdrawal');

    //         // await truffleAssert.eventEmitted(contractInst.withdraw(0), 'Withdrawal', (ev) => {
    //         //     return ev.param1 === 10 && ev.param2 === ev.param3;
    //         // }, 'Contract should return the correct message.');
    //     })

    //     it("2.2. Should emited an event when a deposit is made", async ()=> {

    //         // let result = await truffleAssert.createTransactionResult(contractInst, contractInst.transactionHash);
    //         // await truffleAssert.eventEmitted(result, 'Deposit');

    //         // await truffleAssert.eventEmitted(result, 'Deposit', (ev) => {
    //         //     return ev.param1 === 10 && ev.param2 === ev.param3;
    //         // }, 'Contract should return the correct message.');
    //     })
    // });

    describe("2. Require tests:", () =>
    {
        it("2.1. It should require an amount higher than 0.1 ether", async ()=> {
            await truffleAssert.passes(contractInst.withdraw(0));
        })

        it("2.2. Should revert solicitations greater than 0.1", async ()=> {
            await truffleAssert.reverts(contractInst.withdraw(10));
        })

    })

    describe("3. Transfer tests:", () =>
    {

        it("3.1. it should accept any incoming amount", async ()=> {
            let deposit_amount = 1000000000000000000;
            let msg_sender = accounts[2];
            await contractInst.send(deposit_amount,{from: msg_sender});
        })

        it("3.2. Sender should be able to withdraw the amount", async ()=> {

            let deposit_amount = 10;
            // let msg_sender = accounts[2];
            // let msg_sender = accounts[0];

            await contractInst.send(web3.utils.toWei(deposit_amount.toString(), 'ether'),{from: accounts[0]});
            console.log(contractInst.address);


            let value = 0.1;
            await contractInst.withdraw(web3.utils.toWei(value.toString(), 'ether'), {from: accounts[0]});
        })
    })

    describe("4. Self Destruct:", () =>
    {
        it("4.1. OnlyOwner should selfdestruct the smart contract", async ()=> {
　          let isDestructed = await contractInst.destroy({from: accounts[0]});
　          assert(isDestructed.receipt.status, true, "Owner should have to kill contract with selfdestruct.");
        })
    })

});