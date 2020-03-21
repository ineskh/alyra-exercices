const { expect } = require('chai');
const { BN, time, ether, expectRevert }= require('@openzeppelin/test-helpers');

const Defi2 = artifacts.require("Defi2");

contract("Defi2", (accounts) => {
    let [alice, bob, Sami, Jean] = accounts;
    let defi2Instance;
    beforeEach(async () => {
        defi2Instance = await Defi2.new();
    });
/*
    it ("check : admin", async () => {
        expect(await defi2Instance.getAdmin()).to.equal(alice);
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
        let _renumeration = ether("0.000000000000001");//new BN(web3.utils.toWei('1', 'shannon'));//ether("1"); //web3 .....wei
        let _userPaye = _renumeration.add(_renumeration.mul(new BN(2)).div(new BN(100)));
        
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(3);

        let balanceInitiale = await web3.eth.getBalance(Jean);

        console.log("balance initiale ", balanceInitiale);
        console.log("userpay ", _userPaye); 

    
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: _userPaye});
        let x =  await defi2Instance.demandes(0); 
        //console.log(defi2Instance.demandes);
        expect(x.renumeration).to.be.bignumber.equal(_renumeration);
        expect(x.delais).to.be.bignumber.equal(_delais);
        expect(x.decrireTache).to.equal(_decrireTache);
        expect(x.minReputation).to.be.bignumber.equal(_minReputation);
        expect(x.entrepriseAddress).to.equal(Jean);

        let balanceCalculee =  await web3.eth.getBalance(Jean);
        console.log("balance calculer par le contrat ", balanceCalculee);


        //balance.toNumber()
        let balanceFinaleEsperee = balanceInitiale.sub(_userPaye);
        console.log("balance calculer en test ", balanceFinaleEsperee);
        expect(balanceCalculee).to.equal(balanceFinaleEsperee);
    })
    

    it ("Check : fonction postuler", async () => {
        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription (nom, prenom, {from: Jean});

        let _renumeration = new BN(100);//web3.utils.toWei('1', 'shannon'));//ether("1"); //web3 .....wei
        let _userPaye = _renumeration.add(_renumeration.mul(new BN (2)).div( new BN (100)));
        
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(1);
        
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: _userPaye}); 

        nom = "Sami";
        prenom = "Sami"; 
        
        await defi2Instance.inscription (nom, prenom, {from: Sami});
        let indice = new BN(1);
        expectRevert(defi2Instance.postuler(indice, {from: Sami}), "la demandes n'existe pas");
        indice = new BN(0);
        await defi2Instance.postuler(indice, {from : Sami});
        let dem =  await defi2Instance.demandes(0);
        console.log(dem); 
        expect(dem.candidatsAddress[0]).to.equal(Sami);
        expect(dem.candidats(Sami)).to.equal(defi2Instance.utilisateur(Sami));




    })

    it ("Check : fonction accepterOffre", async () => {

        let nom = "ines";
        let prenom = "khoufi"; 

        await defi2Instance.inscription (nom, prenom, {from: Jean});

        let _renumeration = new BN(web3.utils.toWei('1', 'shannon'));//ether("1"); //web3 .....wei
        let _userPaye = new BN (_renumeration).add(_renumeration.mul(new BN (2)).div( new BN (100)));
        
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(1);
        
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: _userPaye});

        nom = "Sami";
        prenom = "Sami"; 
        
        await defi2Instance.inscription (nom, prenom, {from: Sami});
        
        indice = new BN(0);
        
        await defi2Instance.postuler(indice, {from : Sami});
       
        await defi2Instance.accepterOffre(indice,Sami, {from : Jean}); 

        let dem =  await defi2Instance.demandes(0); 

        expect(dem.candidatAccepte).to.equal(Sami);

        expect(dem.etat).to.be.bignumber.equal(new BN(1));


    })*/

    it ("Check :  livraison", async () => {

        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription (nom, prenom, {from: Jean});
        let _renumeration = ether("0.000000000000001");//new BN(web3.utils.toWei('1', 'shannon'));//ether("1"); //web3 .....wei
        let _userPaye = _renumeration.add(_renumeration.mul(new BN(2)).div(new BN(100)));
        
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(1);
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: _userPaye});
        nom = "Sami";
        prenom = "Sami";  
        await defi2Instance.inscription (nom, prenom, {from: Sami});  
        indice = new BN(0);
        await defi2Instance.postuler(indice, {from : Sami});
        await defi2Instance.accepterOffre(indice,Sami, {from : Jean}); 
        let _linkDepot = await defi2Instance.hashDepot("https://github.com/ineskh/alyra-exercices.git");
        await defi2Instance.livraison(indice, _linkDepot, {from : Sami});
        let dem =  await defi2Instance.demandes(indice); 
        expect(dem.linkDepot).to.equal(_linkDepot);
        expect(dem.etat).to.be.bignumber.equal(new BN(2));
        expect(dem.autorisePayment).to.equal(true);
        let userSami = await defi2Instance.utilisateur(Sami);
        expect(userSami.reputation).to.be.bignumber.equal(new BN(2));
    })

    it ("Check : fonction Renumeration", async () => {

        let nom = "ines";
        let prenom = "khoufi"; 
        await defi2Instance.inscription (nom, prenom, {from: Jean});
        let _renumeration = ether("0.000000000000001");//new BN(web3.utils.toWei('1', 'shannon'));//ether("1"); //web3 .....wei
        let _userPaye = _renumeration.add(_renumeration.mul(new BN(2)).div(new BN(100)));
        
        let _delais = await time.latestBlock() + time.duration.days(7);
        let _decrireTache = "on cherche un illustrateur ..";
        let _etat = 0;
        let _minReputation = new BN(1);
        await defi2Instance.ajouterDemande(_renumeration, _delais, _decrireTache, _etat, _minReputation, {from: Jean, value: _userPaye});
        nom = "Sami";
        prenom = "Sami";  
        await defi2Instance.inscription (nom, prenom, {from: Sami});  
        indice = new BN(0);
        await defi2Instance.postuler(indice, {from : Sami});
        await defi2Instance.accepterOffre(indice,Sami, {from : Jean}); 
        let _linkDepot = await defi2Instance.hashDepot("https://github.com/ineskh/alyra-exercices.git");
        await defi2Instance.livraison(indice, _linkDepot, {from : Sami});

        let balanceInitial = await web3.eth.getBalance(Sami);
        console.log("balance Initiale ", balanceInitial);
        await defi2Instance.renumeration(indice, {from : Sami});
        let balanceFinale = await web3.eth.getBalance(Sami);
        let totalBalance = balanceInitial + _renumeration;
        //console.log("balance Initiale ", balanceFinale, " calcul ", totalBalance);
        //expect(balanceFinale).to.be.bignumber.equal(totalBalance);
        // verifie les balances
    })

})