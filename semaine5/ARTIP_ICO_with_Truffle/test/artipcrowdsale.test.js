
const { BN, ether, constants, expectRevert }= require('@openzeppelin/test-helpers');

const { expect } = require('chai');
const { ZERO_ADDRESS } = constants;

const ArtipToken = artifacts.require('ArtipToken');

contract('ArtipToken', function (accounts) {

    const _name = 'ArtipToken';
    const _symbol = 'ARTIP';
    const _decimals = new BN(18);
    const owner = accounts[0];

    beforeEach(async function () {
        this.ArtipTokenInstance = await ArtipToken.new({from: owner});
      }); 

    context('Tester le ArtipToken', async function () {
        it('a un nom', async function () {
            expect(await this.ArtipTokenInstance.name()).to.equal(_name);
          });
        
          it('a un symbole', async function () {
            expect(await this.ArtipTokenInstance.symbol()).to.equal(_symbol);
          });
        
          it('a une valeur décimal', async function () {
            expect(await this.ArtipTokenInstance.decimals()).to.be.bignumber.equal(_decimals);
          });
        
          it('vérifie la balance du propriétaire du contrat', async function (){
            let balanceOwner = await this.ArtipTokenInstance.balanceOf(owner);
            let totalSupply = await this.ArtipTokenInstance.totalSupply();
            expect(balanceOwner).to.be.bignumber.equal(totalSupply);
          });
    });


});


const ArtipCrowdSale = artifacts.require('ArtipCrowdSale');
  
contract('ArtipCrowdSale', function (accounts) {


  const _datePreSaleStart = new BN(1580598000);
  const _datePreSaleEnd = 1593468000;
  const _dateSaleStart = 1593554400;
  const _dateSaleEnd = new BN(1601416800);
  const _dateRemboursementStart = 1604185200;
  const _dateRemboursementEnd = 1609369200;
  const _minContrubPreSale = ether("10");
  const _maxContrubPreSale = ether("1000");
  const _minContrubSale = ether("5");
  const _maxContrubSale = ether("500");
  const _maxArtip = ether("6000000") ;
  const _preSalReduction = new BN(20);; //20%
  const  _rate = new BN(1);
  const timenow = 1581935306;

  const owner = accounts[0];
  const recipient = accounts[1];
  
  const wallet = "0x13706550eA6dDA91EcE780EBe03Dd2dEc12BDA18";
  
  it('requires a non-null wallet', async function () {
    await expectRevert(
      ArtipCrowdSale.new(ZERO_ADDRESS), 'ArtipCrowdSale: wallet is the zero address'
    );
  });
 
  beforeEach(async function () {
    this.ArtipCrowdSaleInstance = await ArtipCrowdSale.new(wallet);
  }); 

  context('tester la fonction _premiereValidation', async function() {

    it('requires maximum ARTIP not reached', async function () { 
        /*await expectRevert(
            this.ArtipCrowdSaleInstance.artiptoken.totalSupply() < _maxArtip, 'le maximum de artip est atteint'
        );*/
      });

    it('requires non zero amount', async function () {
        await expectRevert (
            this.ArtipCrowdSaleInstance._premiereValidation(recipient, ether("0")), 'ArtipCrowdsale: weiAmount is 0'
        );
    });

    it('requires non zero beneficiary address', async function () {
        await expectRevert (
            this.ArtipCrowdSaleInstance._premiereValidation(ZERO_ADDRESS, new BN(2)), 'ArtipCrowdsale: beneficiary is the zero address'
        );
    });

    it('requires valide dates' , async function () {
        /*await expectRevert (
            timenow >= _datePreSaleStart && timenow <= _dateSaleEnd, ' sale expiré !'
        );
        */
    });

});  

it ('verifie la fonction acheterArtipToken', async function () {

});
  
  

it ('verifie la fonction getTokenAmount', async function () {
      let tokenAmount = new BN(5);
      let computedAmount = tokenAmount.mul(_rate) ; 
      await this.ArtipCrowdSaleInstance._getTokenAmount(tokenAmount);
      expect(computedAmount).to.be.bignumber.equal(tokenAmount.mul(_rate));

      
});

});
