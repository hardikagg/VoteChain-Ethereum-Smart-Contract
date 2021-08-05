# VoteChain

VoteChain is a Decentralized Application which used Ethererm Smart Contracts for voting.

It is a B.Tech final year project.
For now, it runs only on local Truffle Develop blockchain. 
I am working on transferring it to 'Ganache' then to a test network probably Rinkeby Test Network.

Web3 instance is used and with its transformation to Ganache local network, Metamask will be considered.

How it works?

You need to have Node and NPM as basics.

You must run these commands for truffle.js

npm install -g truffle (You may need to install it by running the terminal as administrator)
git clone https://github.com/hardikagg/VoteChain-Ethereum-Smart-Contract.git
cd VoteChain-Ethereum-Smart-Contract
npm install

Then, open up a new terminal tab:

truffle develop
> compile
> migrate
Go back to your previous tab:

npm run dev

Don't close any of the terminal.
