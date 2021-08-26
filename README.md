

# Bot Defender - A Stop Loss Strategy
This project implement is a stop-loss bot that will sell your crypto wallet balance for a stable coin. Also, it offers a Dai faucet smart contract that is meant to be a starter code and utilized as a stable coin provider in future versions.

![alt text](https://wiki.teamfortress.com/w/images/0/0e/RobotArmy.png)



# Disclaimer
This presentation is not either an investment advice or a recommendation or solicitation to buy or sell any investment and should not be used in the evaluation of the merits of making any investment decision. It should not be relied upon for accounting, legal or tax advice or investment recommendations. The contents reflected herein are subject to change without being updated. The codes are written for informational and educational purpose only.

USE THE SOFTWARE AT YOUR OWN RISK. YOU ARE RESPONSIBLE FOR YOUR OWN MONEY. PAST PERFORMANCE IS NOT NECESSARILY INDICATIVE OF FUTURE RESULTS. THE AUTHORS AND ALL AFFILIATES ASSUME NO RESPONSIBILITY FOR YOUR TRADING RESULTS.


# About the Project
This project uses Decentralized Finance (DeFi) concepts such as automated market makers and could use lending protocols in future implementations. It utilizes DAI stable crypto coin smart contract and UniSwap Smart Contract to perform a stop-loss strategy's financial function.

# High-level Design
This bot checks cryptocurrency prices and then make the trade, buys or sells it, once a threshold is trigged. It does all this natively on the blockchain. All is powered by smart contracts.

## How the Bot works
 
1. The code continuous monitors the Ethereum price. Ethereum is one of the most popular cryptocoins but future crypto can be added in future versions.  

2. It will sell the Ethereum if it drops below a specific price (stop loss).

It limits our loss if Ethereum's price goes down. We sell Ethereum exchanging it for a different cryptocurrency. The crypto we're going to use is DAI. 

DAI is a stable coin, its price doesn't change relative to the US$ ( 1 DAI = 1 US$). It is a ERC20 smart contract token. The Uniswap exchange we are using is also a smart contract. We will access the exchange without the UI, only using the smart contracts themselves.

## Gas Cost Optimizations

While Uniswap remains the most popular DEX, several other Ethereum-based exchanges use the same AMM model, but these all have the same issue with gas fees. However, some exchanges offer a better rate for specific tokens depending on the liquidity available, which means that users can get a better exchange rate than they would on Uniswap.

Decentralized exchange aggregator 1inch searches for the best rates on multiple DEXs, splitting the trade by several pools to retrieve the maximum amount of tokens possible in one transaction. This can be useful for large trades where going through multiple exchanges will be beneficial to ensure a better exchange rate, rebating some of the value lost in gas fees.

While aggregating multiple exchanges does not improve the gas cost for swaps in and of itself, 1inch uses the Chi. This gas token is minted when the gas price is low and burnt when it is high, which allows the exchange users to save up to 40% in gas fees even if the trade goes through other exchanges, such as Uniswap or SushiSwap.

### Layer-two solutions
There are also multiple layer-two solutions available despite being unknown to the general public. Layer-two solutions function by running their own blockchain and “connecting” it to Ethereum through a smart contract that locks tokens on the Ethereum blockchain and releases proxy tokens on the second chain, which allows for cheaper transactions. These are often dubbed sidechains. Transactions on these sidechains are kept decentralized and trustless by a network of validators or watchers that have a similar function to miners on the Ethereum chain.

## Security Considerations
When integrating Uniswap V2 into another on-chain system, particular care must be taken to avoid security vulnerabilities, avenues for manipulations, and the potential loss of funds.

As a preliminary note: smart contract integrations can happen at two levels: directly with Pair contracts, or through the Router. Direct interactions offer maximal flexibility but require the most work to get right. Mediated interactions offer more limited capabilities but stronger safety guarantees.

There are two primary categories of risk associated with Uniswap V2. The first involves so-called "static" errors. These can include sending too many tokens to a pair during a swap (or requesting too few tokens back) or allowing transactions to linger in the mempool long enough for the sender's expectations about prices to no longer be accurate.

One may address these errors with fairly straightforward logic checks. Executing these logic checks is the primary purpose of routers. Those who interact directly with pairs must perform these checks themselves.

"Dynamic" risk, the second category, involves runtime pricing. Because Ethereum transactions occur in an adversarial environment, naively written smart contracts can, and will, be exploited for profit. For example, suppose a smart contract checks the asset ratio in a Uniswap pool at runtime and trades against it, assuming that the ratio represents the "fair" or "market" price of these assets. In that case, it is highly vulnerable to manipulation. A malicious actor could, e.g., trivially insert transactions before and after the naive transaction (a so-called "sandwich" attack), causing the smart contract to trade at a radically worse price, profit from this at the trader's expense, and then return the contracts to their original state, all at a low cost. (One important caveat is that these types of attacks are mitigated by trading in highly liquid pools, or at low values.)

The best way to protect against these attacks is to introduce a price oracle. An oracle is any device that returns desired information, in this case, a pair's spot price. The best "oracle" is simply a traders' off-chain observation of the prevailing price, which can be passed into the trade as a safety check. This strategy is best suited to retail trading venues where users initiate transactions on their own behalf. However, it is often the case that a trusted price observation is not available (e.g., in multi-step, programmatic interactions involving Uniswap). Without a price oracle, these interactions will be forced to trade at whatever the (potentially manipulated) rate on Uniswap is.

# Implementation Details
## Setup

Install all your packages:
```JS
npm install 
```

## .env file

Important pieces of information needed for the app are stored here: 
- URL to an Ethereum node (connected to the Robson Test-network).
- The private key for the account that's going to trade the cryptocurrency. Utilize your API key from Infura.
- The account address. If you haven't an Ethereum wallet, try to install MetaMask.

You'll need some test ether for the Robson test network. That will be the ether that we're going to use to sell.

## index.js file 
It's a NodeJS app running: just an Express app, a library for web servers.

```Bash
npm run start 
```
The code will start monitoring the Ethereum price and buying or selling based upon the prices.  It will checks the price of Ethereum every second. If the price changes, it executes a trade. 

## Steps

- Configure Express Server;
- Use Web3 to connect to the blockchain; 
- Use the private key saved in .env file ;
- Use the URL to connect to an Ethereum node;
- Configure the Smart Contracts (Robsten network);

## Functions

### sellEth()
#### Transaction settings 
- Use a high gas limit;
- Read your account from the .env file;
- Sends the Ethereum amount; 
- Performs a swap ;
- Returns a transaction hash;

### checkBalances() 
This function check the prices and balances. It reads how much DAI and ETH there is in your wallet, and log it in the console. This is checked before and after the swap to make sure the bot is running correctly.

### monitorPrice()
Finally is the actual function to monitor the prices. It's a single function is called repeatedly.  This is a stop loss strategy that's going to sell everything from the wallet automaticaly. 

## Test Cases
**Install** Truffle
```Bash
npm install truffle-g
```
Under the hood, Truffle uses  [Mocha](https://mochajs.org/) testing framework and  [Chai](https://www.chaijs.com/) assertion library to test the smart contracts. Furthermore,  `truffle test` command will run the tests from all the test files inside the  `test`folder.

```bash
npm install --save-dev chai truffle-assertions
```
You can import it at the top of your test file:

```javascript
const truffleAssert = require('truffle-assertions');
```

**Install** Solidity Coverage
```Bash
npm install --save-dev solidity-coverage
```
**Add**  this package to your plugins array in  `truffle-config.js`  ([Truffle docs](https://www.trufflesuite.com/docs))

```Bash
module.exports = {
  networks: {...},
  plugins: ["solidity-coverage"]
}
```
**Run**
```
truffle run coverage [command-options]
```

**Dai Faucet Smart Contract**
We created a Dai Faucet smart contract for future integration. Because our Dai Faucet smart contract is utilizing Dai address in Kovan network,  is necessary to fork the Kovan network:
```JS
ganache-cli --fork [https://kovan.infura.io/v3/900388c317644e7da164c3da4b5d9bca](https://kovan.infura.io/v3/900388c317644e7da164c3da4b5d9bca)
```

# More about the Project

## Author

Name  | Git Hub | LinkedIn | Twitter
------------- | ------------- | ------------- | -------------
Alexandre Rapchan B. Barros  | [@AleRapchan](https://www.github.com/AleRapchan) | [Alexandre-rapchan](https://www.linkedin.com/in/alexandre-rapchan/) | [@rapchan](https://www.twitter.com/rapchan/) 

## Support

For support, please send an email to blockchain@alexandrebarros.com.
	
## Revisions
Date  |  Revision  |  Description  |  Author
--------  |  --------  |  --------  |  --------	
05/08/2021  |  `0.1`  |  First Draft  |  Alexandre Rapchan B. Barros
25/08/2021  |  `0.2`  |  Final Review  |  Alexandre Rapchan B. Barros

## Roadmap
- Utilize our own stable coin;
- Utilize AI for trades;
- Check more coir pair prices;
- Look for arbitrage opportunities;


## Links

### Dai
- [MakerDAO](https://makerdao.com/en/)
- [DAI in Smart Contracts](https://github.com/makerdao/developerguides/blob/master/dai/dai-in-smart-contracts/dai-in-smart-contracts.md)
### Kovan TestNet
- [Kovan Faucet
](https://github.com/kovan-testnet/faucet)
- [Kovan Faucet 2](https://enjin.io/software/kovan-faucet)
- [Ethereum Testnet Faucet](https://ethdrop.dev/)
- [Kovan Testnet Explorer](https://kovan.etherscan.io/)
- [Kovan Exported Smart Contract](https://kovan.etherscan.io/address/0xF526B465faE92D3184594b1140E612aD10e6f979)
- [OASIS App - Maker Vault](https://oasis.app/)

### Tools
-  [NodeJS](https://nodejs.org/)  – A Javascript runtime
-   [Git](https://git-scm.com/downloads)  – A code repository management tool
-   [Truffle](https://www.trufflesuite.com/)  – A command line tool for migrating smart contracts
-   [Infura API Key](https://infura.io/)  – Provides access point to Ethereum network
-   [Metamask](https://metamask.io/)  – A wallet which we will use to manage keys and balances

### Tips
- [Considerations when building on Uniswap](https://docs.uniswap.org/protocol/V2/concepts/advanced-topics/security)
- [Optimize Gas Fees on DEXes](https://cointelegraph.com/news/dexs-becoming-unusable-how-to-navigate-record-gas-fees-ahead-of-eth2)
- [Using Infura custom provider](https://www.trufflesuite.com/guides/using-infura-custom-provider)
- [Truffle Mint Dai](https://github.com/ryanio/truffle-mint-dai)

## MIT License

Copyright (c) 2021 Rapchan

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
