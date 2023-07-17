//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

contract DigitalSignatureA3 {
    string private documentCID;
    mapping(address => bytes) private signatures;
    mapping(address => bool) private hasSigned;

    event SignatureStored(address indexed signer, bytes signature);

    function retrieveDocument690() public view returns (string memory) {
        return documentCID;
    }

    function signDocument690(bytes memory signature) public {
        require(bytes(documentCID).length != 0, "Document CID not set");
        require(!hasSigned[msg.sender], "Company has already signed the document");

        signatures[msg.sender] = signature;
        hasSigned[msg.sender] = true;
        emit SignatureStored(msg.sender, signature);
    }

    function retrieveSignatures690(address company) public view returns (bytes memory) 
    {
        require(hasSigned[company], "Company has not signed the document");
        return signatures[company];
    }

    function verifyAuthenticity() public view returns (bool) {
        }

    function setDocumentCID(string memory cid) public {
        documentCID = cid;
    }
}
