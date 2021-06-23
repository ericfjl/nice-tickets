// This is an exmaple test file. Hardhat will run every *.js file in `test/`,
// so feel free to add new ones.

// Hardhat tests are normally written with Mocha and Chai.

// We import Chai to use its asserting functions here.
const { expect } = require("chai");

// `describe` is a Mocha function that allows you to organize your tests. It's
// not actually needed, but having your tests organized makes debugging them
// easier. All Mocha functions are available in the global scope.

// `describe` recieves the name of a section of your test suite, and a callback.
// The callback must define the tests of that section. This callback can't be
// an async function.
  describe("NiceTickets contract test", function () {
    // Mocha has four functions that let you hook into the the test runner's
    // lifecyle. These are: `before`, `beforeEach`, `after`, `afterEach`.

    // They're very useful to setup the environment for tests, and to clean it
    // up after they run.

    // A common pattern is to declare some variables, and assign them in the
    // `before` and `beforeEach` callbacks.

    let NiceTickets;
    let hardhatNiceTickets;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let betMinAmount = 1*10^18;
    let firstPrizeMaxAmount = 1000*10^18;
    let secondPrizeMaxAmount = 10*10^18;
    
    // time. It receives a callback, which can be async.
    beforeEach(async function () {
      // Get the ContractFactory and Signers here.
      console.log("beforeEach start ... ");
      NiceTickets = await ethers.getContractFactory("NiceTickets");
      [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
      console.log("owner="+owner.address);
      // To deploy our contract, we just have to call Token.deploy() and await
      // for it to be deployed(), which happens onces its transaction has been
      // mined.
      hardhatNiceTickets = await NiceTickets.deploy();
      await hardhatNiceTickets.deployed();

      console.log("111 tickets="+hardhatNiceTickets.betMinAmount());
      // We can interact with the contract by calling `hardhatNiceTickets.method()`
      //await hardhatNiceTickets.deployed();
    });

    // You can nest describe calls to create subsections.
    describe("Deployment", function () {
      // `it` is another Mocha function. This is the one you use to define your
      // tests. It receives the test name, and a callback function.
      console.log("Deployment start ... ");
      // If the callback function is async, Mocha will `await` it.
      it("Should set the right betMinAmount/first/secondPrizeAmount", async function () {
        // Expect receives a value, and wraps it in an assertion objet. These
        // objects have a lot of utility methods to assert values.

        // This test expects the owner variable stored in the contract to be equal
        // to our Signer's owner.
        console.log("222 tickets="+hardhatNiceTickets.betMinAmount());
        console.log("betMinAmount="+betMinAmount);
        expect(await hardhatNiceTickets.betMinAmount()).to.equal(betMinAmount);
        expect(await hardhatNiceTickets.firstPrizeMaxAmount()).to.equal(firstPrizeMaxAmount);
        expect(await hardhatNiceTickets.secondPrizeMaxAmount()).to.equal(secondPrizeMaxAmount);
      });

      it("Should assign the prizePool", async function () {
        expect(await hardhatNiceTickets.prizePool()).to.equal(0);
      });
    });

    describe("Transactions", function () {
      console.log("Transactions start ... ")
      it("Should place bet crorrectly", async function () {
        const num = 1234;
        const prizePoolOld = hardhatNiceTickets.prizePool();
        // Transfer 50 tokens from owner to addr1
        const tx = await hardhatNiceTickets.placeBet(num, {value:ethers.utils.parseEther("1")});
        const prizePoolNew = hardhatNiceTickets.prizePool();

        const receipt = await tx.wait();

        // The receipt, contains a status flag, which is 0 to indicate an error.
        expect(receipt.status).to.equal(1);

        // The receipt will have an "events" Array, which will have
        // the emitted event from the Contract. The "WonTicket() or LostTicket()"
        let theEvent = receipt.events.pop()
        if(theEvent.event == 'WonTicket'){
          let lotNumber = theEvent.args[1];
          let level = theEvent.args[2];
          let amount = theEvent.args[3];
          if(level == 1){
            expect(lotNumber).to.equal(num);
            let winAmount =  prizePoolOld > firstPrizeMaxAmount ? firstPrizeMaxAmount : prizePoolOld;
            expect(amount).to.equal(winAmount);
          }else if(level == 2){
            let numPatterns = [num%1000, num/10];
            let lotPatterns = [lotNumber%1000, lotNumber/10];
            let isWin = false;
            for(let i=0;i<numPatterns.length;i++){
              if(isWin)break;
              for(let j=0;j<lotPatterns.length;j++){
                if(isWin)break;
                if(numPatterns[i] == lotPatterns[j])
                  isWin = true;
              }
            }
            expect(isWin).to.equal(true);
            let winAmount =  prizePoolOld > secondPrizeMaxAmount ? secondPrizeMaxAmount : prizePoolOld;
            expect(amount).to.equal(winAmount);
          }
          expect(prizePoolNew).to.equal(prizePoolOld-amount);
        }else if(theEvent.event == 'LostTicket'){
          //let lotNumber = theEvent.args[1];
          expect(prizePoolNew).to.equal(prizePoolOld+betMinAmount);
        }
      });

    });
  });