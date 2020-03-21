const { BN, ether, expectRevert} = require("@openzeppelin/test-helpers");
const { expect} = require("chai");
const CryptoShirt = artifacts.require("CryptoShirt");
const CryptoShirtGame = artifacts.require("CryptoShirtGame");

contract("CryptoShirt", function(accounts){
    const player1 = accounts[0];
    const player2 = accounts[1];
    
    const shirtPrice = ether("0.02");

    //Avant chaque test unitaire  
    beforeEach(async function() {
        this.CryptoShirtInstance = await CryptoShirt.new({from : player1});
    });

    
    it("createNewShirt", async function() {
        await this.CryptoShirtInstance.createNewShirt("myshirt", {from : player1, value: shirtPrice});
        expect(await this.CryptoShirtInstance.ownerOf(new BN(0))).to.equal(player1);
        expect(await this.CryptoShirtInstance.ownerToShirtCount(player1)).to.be.bignumber.equal(new BN(1));
        expectRevert(this.CryptoShirtInstance.createNewShirt("myshirt", {from : player1, value: ether("0.00002")}), "need 20 finney for a new cryptoshirt");
    });

    it("balanceOf", async function(){
        await this.CryptoShirtInstance.createNewShirt("myshirt", {from : player1, value: shirtPrice});
        const balance = await this.CryptoShirtInstance.balanceOf(player1, {from:player1});
        expect(balance).to.be.bignumber.equal(new BN(1));
    })

    it("ownerOf", async function(){
        await this.CryptoShirtInstance.createNewShirt("myshirt", {from : player1, value: shirtPrice});
        const owner = await this.CryptoShirtInstance.ownerOf(new BN(0), {from:player1});
        expect(owner).to.equal(player1);
    })

    it ("safeTransferFrom", async function(){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.approve(player2, new BN(0), {from:player1});
        await this.CryptoShirtInstance.safeTransferFrom(player1, player2, new BN(0));
        const newOwner = await this.CryptoShirtInstance.ownerOf(new BN(0));
        expect(newOwner).to.equal(player2);
        
    })

    it("approve + getApproved", async function(){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.approve(player2, new BN(0), {from: player1});
        const approved = await this.CryptoShirtInstance.getApproved(new BN(0));
        expect(approved).to.equal(player2);

    })

    it ("setApprovalForAll+isApprovedForAll", async function(){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.setApprovalForAll(player2, true, {from: player1});
        const approvedAll = await this.CryptoShirtInstance.isApprovedForAll(player1, player2);
        expect(approvedAll).to.equal(true);
    })

    it ("setShirtCharacteristic+getShirtCharacteristic", async function() {
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.setShirtCharacteristic(new BN(0), new BN(10), {from:player1});
        const value = await this.CryptoShirtInstance.getShirtCharacteristic(new BN(0));
        expect(value).to.be.bignumber.equal(new BN(10));

    })
})

contract("CryptoShirtGame", function(accounts){

    const player1 = accounts[0];
    const player2 = accounts[1];
    
    const shirtPrice = ether("0.02");

    //Avant chaque test unitaire  
    beforeEach(async function() {
        this.CryptoShirtInstance = await CryptoShirt.new({from : player1});
        this.CryptoShirtGameInstance = await CryptoShirtGame.new(this.CryptoShirtInstance.address,{from : player1});
    });

    it ("requestExchangingShirt", async function(){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.createNewShirt("player2Shirt", {from : player2, value: shirtPrice});
        await this.CryptoShirtGameInstance.requestExchangingShirt(0, 1, {from: player1});
        const request =  await this.CryptoShirtGameInstance.listePotentialRequest.call(0);
        expect(new BN(request._token1)).to.be.bignumber.equal(new BN(0));
        expect(new BN(request._token2)).to.be.bignumber.equal(new BN(1));
        expect(request.ownerT1).to.equal(player1);
        expect(request.ownerT2).to.equal(player2);
    })

    it ("acceptExchangingShirt", async function (){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.createNewShirt("player2Shirt", {from : player2, value: shirtPrice});
        await this.CryptoShirtGameInstance.requestExchangingShirt(0, 1, {from: player1});
        await this.CryptoShirtGameInstance.acceptExchangingShirt(0, {from: player2});
        const request =  await this.CryptoShirtGameInstance.listePotentialRequest.call(0);
        expect(request.accepted).to.equal(true);
    })

    it ("makeExchange", async function(){
        await this.CryptoShirtInstance.createNewShirt("player1Shirt", {from : player1, value: shirtPrice});
        await this.CryptoShirtInstance.createNewShirt("player2Shirt", {from : player2, value: shirtPrice});
        await this.CryptoShirtGameInstance.requestExchangingShirt(0, 1, {from: player1});
        await this.CryptoShirtGameInstance.acceptExchangingShirt(0, {from: player2});
        await this.CryptoShirtInstance.approve(this.CryptoShirtGameInstance.address, new BN(1), {from: player2});
        await this.CryptoShirtInstance.approve(this.CryptoShirtGameInstance.address, new BN(0), {from: player1});
        await this.CryptoShirtGameInstance.makeExchange(0, {from: player1});

        expect(await this.CryptoShirtInstance.ownerOf(0)).to.equal(player2);
        expect(await this.CryptoShirtInstance.ownerOf(1)).to.equal(player1);
        const val1 = await this.CryptoShirtInstance.getShirtCharacteristic(0);
        const val2 = await this.CryptoShirtInstance.getShirtCharacteristic(1);
        expect(new BN(val1)).to.be.bignumber.equal(new BN(10));
        expect(new BN(val2)).to.be.bignumber.equal(new BN(10));

    })

})