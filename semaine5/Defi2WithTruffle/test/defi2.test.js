const { expect } = require('chai');
const { BN, time, ether, expectRevert }= require('@openzeppelin/test-helpers');

const Defi2 = artifacts.require("Defi2");

contract("Defi2", (accounts) => {
    let [alice, bob, Marie, David, Jean] = accounts;
    let defi2Instance;
    beforeEach(async () => {
        defi2Instance = await Defi2.new({from:alice});
    });

    it ("check : admin", async () => {
        expect(await defi2Instance.admin()).to.equal(alice);
    })

    it("Check : utilisateur non inscrit", async () => {
        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription(nom, prenom, {from: alice});
        expectRevert(defi2Instance.inscription(nom, prenom, {from: alice}), "Utilisateur déja inscrit");
    })


    it("Check : fonction inscription", async () => {
        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription(nom, prenom, {from: alice});
        let x = await defi2Instance.utilisateur(alice);
        expect(x.nom).to.equal(nom);
        expect(x.prenom).to.equal(prenom);
        expect(x.adr).to.equal(alice);
        expect(x.reputation).to.be.bignumber.equal(new BN(1));        
    })

    it("check : utilisateur bannie", async () => {
        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription(nom, prenom, {from: bob});
        await defi2Instance.bannie(bob, {from: alice});
        expectRevert(defi2Instance.bannie(bob, {from: alice}), "déja bannie");
    })

    it ("Check : fonction bannie", async () => {
        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription (nom, prenom, {from: bob});
        await defi2Instance.bannie (bob, {from: alice});
        expect(await defi2Instance.bannies(bob)).to.equal(true);
        expect((await defi2Instance.utilisateur(bob)).reputation).to.be.bignumber.equal(new BN(0));
    
    })

    it ("Check : fonction ajouterDemande", async () => {

        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription (nom, prenom, {from: Jean});
        let _renumeration = ether("20");
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(3);
        let b = await web3.eth.getBalance(Jean);
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: ether("22")});
        let x =  await defi2Instance.demandes(0); 
        console.log(defi2Instance.demandes);
        expect(x.renumeration).to.be.bignumber.equal(_renumeration);
        expect(x.delais).to.be.bignumber.equal(_delais);
        expect(x.decrireTache).to.equal(_decrireTache);
        //expect(x.etat).to.be.bignumber.equal(_etat);
        expect(x.minReputation).to.be.bignumber.equal(_minReputation);
        expect(x.entrepriseAddress).to.equal(Jean);
        let c =  await web3.eth.getBalance(Jean);
        console.log(b ," after " , c );
        
        expect(c).to.be.bignumber.equal(b.sub(_renumeration.mul(2).div(100)));
        
   
    })
})