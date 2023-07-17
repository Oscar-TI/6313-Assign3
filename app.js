document.addEventListener("DOMContentLoaded", async () => {
    // Connect to the Ethereum network
    if (window.ethereum) {
        await window.ethereum.enable();
        web3 = new Web3(window.ethereum);
    } else {
        console.error("Install MetaMask to use this application");
        return;
    }

    // Contract address and ABI
    const contractAddress = "0x358AA13c52544ECCEF6B0ADD0f801012ADAD5eE3"; //Contract address
    const contractABI = [
        
    ];

    // Contract instance
    const contract = new web3.eth.Contract(contractABI, contractAddress);

    // Get the document CID from the contract
    async function getDocumentCID() {
        const documentCID = await contract.methods.retrieveDocument690().call();
        document.getElementById("documentCID").textContent = documentCID;
    }

    // Get the company signature for contract
    async function getSignature() {
        const accounts = await web3.eth.getAccounts();
        const userSignature = await contract.methods.retrieveSignatures690(accounts[0]).call();
        document.getElementById("signature").textContent = web3.utils.hexToAscii(userSignature);
    }

    // Sign document using company account
    async function signDocument() {
        try {
            const signature = "Signature"; 
            await contract.methods.signDocument690(signature).send({ from: web3.eth.defaultAccount });
            alert("Document signed successfully!");
        } catch (error) {
            console.error(error);
            alert("Failed to sign the document.");
        }
    }

    // Add event listener to the sign button
    document.getElementById("signButton").addEventListener("click", signDocument);

    // Call  functions
    getDocumentCID();
    getSignature();
});
