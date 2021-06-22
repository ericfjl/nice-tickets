const { expect } = require("chai");

describe("NiceTickets", function() {
  it("Should return the new greeting once it's changed", async function() {
    const NiceTickets = await ethers.getContractFactory("NiceTickets");
    const niceTickets = await NiceTickets.deploy("Hello, world!");
    await niceTickets.deployed();
  //
  //   expect(await greeter.greet()).to.equal("Hello, world!");
  //
  //   const setGreetingTx = await greeter.setGreeting("Hola, mundo!");
  //
  //   // wait until the transaction is mined
  //   await setGreetingTx.wait();
  //
  //   expect(await greeter.greet()).to.equal("Hola, mundo!");
  // });
});