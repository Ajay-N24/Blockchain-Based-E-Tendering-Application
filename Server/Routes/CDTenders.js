const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config({ path: "./config/.env" });

const { ethers } = require('ethers');
const provider = new ethers.JsonRpcProvider('http://localhost:8545');
// Connect to the MetaMask provider
async function connectToMetaMask(w) {
    // Check if MetaMask is installed
    // Example function to get the latest block number
    const win = w;

    // Call the function to get the latest block number
}

router.get("/connectMask", async (req, res) => {
    // Call the function to connect to MetaMask
    const win = req.win;
    if (win) {
        provider.send("eth_requestAccounts", [])
            .then(async () => {
                await accountChangedHandler(provider.getSigner());
            })
    } else {
        setErrorMessage("Please Install MetaMask!!!");
    }
})
module.exports = router;