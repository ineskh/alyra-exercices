
const { balance, BN, constants, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

const { ZERO_ADDRESS } = constants;

const { expect } = require('chai');



const ArtipCrowdSale = artifacts.require('ArtipCrowdSale');

  
contract('ArtipCrowdSale', function (accounts) {

  //const [invertor, purchaser ] = accounts; 
 
  
  //const { ZERO_ADDRESS } = constants;

  const _datePreSaleStart = "1580598000";
  const _datePreSaleEnd = "1593468000";
  const _dateSaleStart = "1593554400";
  const _dateSaleEnd = "1601416800";
  const _dateRemboursementStart = "1604185200";
  const _dateRemboursementEnd = "1609369200";
  const _minContrubPreSale = ether("10");
  const _maxContrubPreSale = ether("1000");
  const _minContrubSale = ether("5");
  const _maxContrubSale = ether("500");
  const _maxArtip = ether("6000000") ;
  const _preSalReduction = "20"; //20%
  const owner = accounts[0];
  const recipient = accounts[1];
  
  const wallet = "0x13706550eA6dDA91EcE780EBe03Dd2dEc12BDA18";

  
  
  context('with token', async function () {
  it('requires a non-null wallet', async function () {
    await expectRevert(
      ArtipCrowdSale.new(ZERO_ADDRESS), 'ArtipCrowdSale: wallet is the zero address'
    );
  });
});

  beforeEach(async function () {
    this.ArtipCrowdSaleInstance = await ArtipCrowdSale.new(wallet);
  }); 

});




