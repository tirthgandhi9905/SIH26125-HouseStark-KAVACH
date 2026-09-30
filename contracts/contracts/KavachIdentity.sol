// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

// ERC-5192 interface
interface IERC5192 {
    event Locked(uint256 tokenId);
    event Unlocked(uint256 tokenId);
    function locked(uint256 tokenId) external view returns (bool);
}

contract KavachIdentity is ERC721, AccessControl, IERC5192 {
    bytes32 public constant MANAGER_ROLE = keccak256("MANAGER_ROLE");
    bytes32 public constant AUDITOR_ROLE = keccak256("AUDITOR_ROLE");

    uint256 private _nextTokenId;

    // Attributes for ABAC
    struct UserAttributes {
        uint8 securityClearance; // e.g. 1 (Public), 2 (Confidential), 3 (Secret)
        bool isActive;
        string department;
    }

    mapping(uint256 => UserAttributes) public userAttributes;
    mapping(uint256 => bool) private _lockedTokens;

    event AccessGranted(address indexed user, string resourceId, string message);
    event AccessDenied(address indexed user, string resourceId, string reason);

    constructor(address defaultAdmin) ERC721("KavachIdentity", "KAV") {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(MANAGER_ROLE, defaultAdmin);
    }

    function issueIdentity(
        address to, 
        uint8 clearance, 
        string memory department
    ) external onlyRole(MANAGER_ROLE) {
        uint256 tokenId = _nextTokenId++;
        
        // Mint SBT
        _safeMint(to, tokenId);
        
        // Lock the token (ERC-5192)
        _lockedTokens[tokenId] = true;
        emit Locked(tokenId);

        // Set ABAC Attributes
        userAttributes[tokenId] = UserAttributes({
            securityClearance: clearance,
            isActive: true,
            department: department
        });
    }

    // --- ERC-5192 Logic ---
    function locked(uint256 tokenId) external view override returns (bool) {
        return _lockedTokens[tokenId];
    }

    // Override transfer functions to enforce Soulbound constraints
    function transferFrom(address from, address to, uint256 tokenId) public virtual override {
        require(!_lockedTokens[tokenId], "Kavach: Token is Soulbound");
        super.transferFrom(from, to, tokenId);
    }

    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public virtual override {
        require(!_lockedTokens[tokenId], "Kavach: Token is Soulbound");
        super.safeTransferFrom(from, to, tokenId, data);
    }

    // --- ABAC Verification Logic ---
    function requestAccess(
        uint256 tokenId, 
        string memory resourceId, 
        uint8 requiredClearance, 
        string memory requiredDepartment
    ) external {
        require(ownerOf(tokenId) == msg.sender, "Kavach: Not owner of this identity");

        UserAttributes memory attrs = userAttributes[tokenId];

        if (!attrs.isActive) {
            emit AccessDenied(msg.sender, resourceId, "Identity inactive");
            return;
        }

        if (attrs.securityClearance < requiredClearance) {
            emit AccessDenied(msg.sender, resourceId, "Insufficient clearance");
            return;
        }

        // Simulating ABAC logical check (Department constraint)
        if (keccak256(bytes(requiredDepartment)) != keccak256(bytes("ANY")) && 
            keccak256(bytes(attrs.department)) != keccak256(bytes(requiredDepartment))) {
            emit AccessDenied(msg.sender, resourceId, "Department mismatch");
            return;
        }

        emit AccessGranted(msg.sender, resourceId, "Access approved via ABAC policy");
    }

    function revokeIdentity(uint256 tokenId) external onlyRole(MANAGER_ROLE) {
        userAttributes[tokenId].isActive = false;
    }

    // Required overrides
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721, AccessControl) returns (bool) {
        return interfaceId == type(IERC5192).interfaceId || super.supportsInterface(interfaceId);
    }
}
