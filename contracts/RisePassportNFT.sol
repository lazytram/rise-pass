// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RisePassportNFT is ERC721, Ownable {
    uint256 private _tokenIds;

    // Mapping from tokenId to passport data
    mapping(uint256 => PassportData) public passports;

    // Mapping from address to discordId to roleId to tokenId
    mapping(address => mapping(string => mapping(string => uint256)))
        public addressToPassport;

    // Mapping from discordId to address (one Discord ID can only be associated with one address)
    mapping(string => address) public discordToAddress;

    // Mapping from tokenId to SVG data
    mapping(uint256 => string) public tokenSVG;

    // Mapping from tokenId to token URI
    mapping(uint256 => string) public tokenURIs;

    // Private key for minting (stored as hash for security)
    bytes32 public mintingKeyHash;

    struct PassportData {
        address owner;
        string discordId;
        string roleId;
        string roleName;
        uint256 mintedAt;
    }

    event PassportMinted(
        uint256 indexed tokenId,
        address indexed owner,
        string discordId,
        string roleId,
        string roleName
    );

    event WalletUpdated(
        string indexed discordId,
        address indexed oldWallet,
        address indexed newWallet
    );

    event AdminWalletOverride(
        string indexed discordId,
        address indexed oldWallet,
        address indexed newWallet,
        address admin
    );

    constructor(
        string memory name,
        string memory symbol,
        bytes32 _mintingKeyHash
    ) ERC721(name, symbol) Ownable(msg.sender) {
        mintingKeyHash = _mintingKeyHash;
    }

    function mint(
        address to,
        string memory discordId,
        string memory roleId,
        string memory roleName,
        bytes32 mintingKey,
        string memory svgData,
        string memory tokenURI
    ) external returns (uint256) {
        require(
            keccak256(abi.encodePacked(mintingKey)) == mintingKeyHash,
            "Invalid minting key"
        );
        require(to != address(0), "Cannot mint to zero address");
        require(bytes(discordId).length > 0, "Discord ID cannot be empty");
        require(bytes(roleId).length > 0, "Role ID cannot be empty");

        // Check if this Discord ID is already associated with a different address
        address existingAddress = discordToAddress[discordId];
        require(
            existingAddress == address(0) || existingAddress == to,
            "Discord ID already associated with different address"
        );

        // Check if this specific combination already exists
        require(
            addressToPassport[to][discordId][roleId] == 0,
            "Passport already exists for this address, discord ID and role"
        );

        _tokenIds++;
        uint256 newTokenId = _tokenIds;

        // Create passport data
        passports[newTokenId] = PassportData({
            owner: to,
            discordId: discordId,
            roleId: roleId,
            roleName: roleName,
            mintedAt: block.timestamp
        });

        // Update mappings
        addressToPassport[to][discordId][roleId] = newTokenId;
        discordToAddress[discordId] = to; // Associate Discord ID with address

        // Store SVG data
        tokenSVG[newTokenId] = svgData;

        // Store token URI
        tokenURIs[newTokenId] = tokenURI;

        // Mint the NFT (soulbound - cannot be transferred)
        _mint(to, newTokenId);

        emit PassportMinted(newTokenId, to, discordId, roleId, roleName);

        return newTokenId;
    }

    // Function to get passport data by token ID
    function getPassportData(
        uint256 tokenId
    ) external view returns (PassportData memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return passports[tokenId];
    }

    // Function to get SVG data by token ID
    function getTokenSVG(
        uint256 tokenId
    ) external view returns (string memory) {
        require(_ownerOf(tokenId) != address(0), "Token does not exist");
        return tokenSVG[tokenId];
    }

    // Function to get token ID by address, discord ID and role ID
    function getTokenIdByAddressAndDiscord(
        address owner,
        string memory discordId,
        string memory roleId
    ) external view returns (uint256) {
        return addressToPassport[owner][discordId][roleId];
    }

    // Function to get address by discord ID
    function getAddressByDiscord(
        string memory discordId
    ) external view returns (address) {
        return discordToAddress[discordId];
    }

    // Function to check if a passport exists
    function passportExists(
        address owner,
        string memory discordId,
        string memory roleId
    ) external view returns (bool) {
        return addressToPassport[owner][discordId][roleId] != 0;
    }

    // Function to check if user can mint a higher priority role
    function canMintHigherRole(
        address owner,
        string memory discordId,
        string memory newRoleId
    ) external view returns (bool) {
        // Get all existing passports for this user and discord ID
        // This would require iterating through all possible role IDs
        // For now, we'll allow minting if the specific role doesn't exist
        return addressToPassport[owner][discordId][newRoleId] == 0;
    }

    // Function to get all passports for a user and discord ID
    function getUserPassports(
        address owner,
        string memory discordId
    ) external view returns (uint256[] memory) {
        // This is a simplified version - in practice you might want to store this data differently
        // For now, we'll return an empty array as this would require complex iteration
        uint256[] memory passports = new uint256[](0);
        return passports;
    }

    // Function to get total supply
    function totalSupply() external view returns (uint256) {
        return _tokenIds;
    }

    // Function to update minting key (only owner)
    function updateMintingKey(bytes32 newMintingKeyHash) external onlyOwner {
        mintingKeyHash = newMintingKeyHash;
    }

    // Function to get minting key hash
    function getMintingKeyHash() external view returns (bytes32) {
        return mintingKeyHash;
    }

    /**
     * @dev Update the wallet address for an existing Discord ID
     * Only the current associated wallet can update the mapping
     * @param discordId The Discord ID to update
     * @param newWalletAddress The new wallet address
     */
    function updateWalletForDiscord(
        string calldata discordId,
        address newWalletAddress
    ) external {
        require(bytes(discordId).length > 0, "Discord ID cannot be empty");
        require(
            newWalletAddress != address(0),
            "New wallet address cannot be zero"
        );
        require(
            discordToAddress[discordId] != address(0),
            "Discord ID not registered"
        );
        require(
            discordToAddress[discordId] == msg.sender,
            "Only current wallet can update"
        );

        address oldWallet = discordToAddress[discordId];

        // Update the Discord ID mapping
        discordToAddress[discordId] = newWalletAddress;

        // Update all passport mappings for this Discord ID
        // We need to iterate through all possible role IDs and update them
        // This is a simplified approach - in practice you might want to store role IDs separately

        emit WalletUpdated(discordId, oldWallet, newWalletAddress);
    }

    /**
     * @dev Admin function to override Discord ID mapping (for lost wallet recovery)
     * @param discordId The Discord ID to override
     * @param newWalletAddress The new wallet address
     */
    function adminOverrideWallet(
        string calldata discordId,
        address newWalletAddress
    ) external onlyOwner {
        require(bytes(discordId).length > 0, "Discord ID cannot be empty");
        require(
            newWalletAddress != address(0),
            "New wallet address cannot be zero"
        );
        require(
            discordToAddress[discordId] != address(0),
            "Discord ID not registered"
        );

        address oldWallet = discordToAddress[discordId];

        // Update the Discord ID mapping
        discordToAddress[discordId] = newWalletAddress;

        emit AdminWalletOverride(
            discordId,
            oldWallet,
            newWalletAddress,
            msg.sender
        );
    }

    /**
     * @dev Check if a Discord ID is registered
     * @param discordId The Discord ID to check
     * @return True if registered, false otherwise
     */
    function isDiscordRegistered(
        string calldata discordId
    ) external view returns (bool) {
        return discordToAddress[discordId] != address(0);
    }

    // Override transfer functions to make it soulbound
    function transferFrom(address, address, uint256) public virtual override {
        require(false, "Token is soulbound and cannot be transferred");
    }

    function safeTransferFrom(
        address,
        address,
        uint256,
        bytes memory
    ) public virtual override {
        require(false, "Token is soulbound and cannot be transferred");
    }

    function approve(address, uint256) public virtual override {
        require(false, "Token is soulbound and cannot be approved");
    }

    function setApprovalForAll(address, bool) public virtual override {
        require(false, "Token is soulbound and cannot be approved");
    }

    /**
     * @dev Returns the Uniform Resource Identifier (URI) for `tokenId` token.
     * This function uses the stored SVG data to generate metadata
     */
    function tokenURI(
        uint256 tokenId
    ) public view virtual override returns (string memory) {
        _requireOwned(tokenId);

        // Check if we have a stored URI
        string memory storedURI = tokenURIs[tokenId];
        if (bytes(storedURI).length > 0) {
            return storedURI;
        }

        // Fallback to dynamic generation
        PassportData memory passport = passports[tokenId];
        string memory storedSVG = tokenSVG[tokenId];

        // If no SVG is stored, return a basic metadata
        if (bytes(storedSVG).length == 0) {
            string memory json = string.concat(
                '{"name": "RISE Passport #',
                _uint2str(tokenId),
                '",',
                '"description": "RISE Passport NFT - A digital identity token representing membership in the RISE community.",',
                '"attributes": [',
                '{"trait_type": "Role", "value": "',
                passport.roleName,
                '"},',
                '{"trait_type": "Discord ID", "value": "',
                passport.discordId,
                '"},',
                '{"trait_type": "Role ID", "value": "',
                passport.roleId,
                '"},',
                '{"trait_type": "Minted At", "value": "',
                _uint2str(passport.mintedAt),
                '"}',
                "],",
                '"external_url": "https://rise-pass.vercel.app",',
                '"background_color": "000000"',
                "}"
            );

            return
                string.concat(
                    "data:application/json;base64,",
                    _base64Encode(bytes(json))
                );
        }

        // Generate JSON metadata with stored SVG
        string memory json = string.concat(
            '{"name": "RISE Passport #',
            _uint2str(tokenId),
            '",',
            '"description": "RISE Passport NFT - A digital identity token representing membership in the RISE community.\\n\\nThis soulbound token serves as proof of your role and contribution within the RISE ecosystem. Each passport is permanently linked to your Discord identity and cannot be transferred, ensuring authentic representation of your place in our community.\\n\\nRole: ',
            passport.roleName,
            '\\n\\nThis passport represents your unique contribution to the RISE community and serves as a permanent record of your membership.",',
            '"image": "data:image/svg+xml;base64,',
            _base64Encode(bytes(storedSVG)),
            '",',
            '"attributes": [',
            '{"trait_type": "Role", "value": "',
            passport.roleName,
            '"},',
            '{"trait_type": "Discord ID", "value": "',
            passport.discordId,
            '"},',
            '{"trait_type": "Role ID", "value": "',
            passport.roleId,
            '"},',
            '{"trait_type": "Minted At", "value": "',
            _uint2str(passport.mintedAt),
            '"}',
            "],",
            '"external_url": "https://rise-pass.vercel.app",',
            '"background_color": "000000"',
            "}"
        );

        return
            string.concat(
                "data:application/json;base64,",
                _base64Encode(bytes(json))
            );
    }

    /**
     * @dev Generate token URI with custom SVG
     * This function allows the frontend to pass a pre-generated SVG
     */
    function tokenURIWithSVG(
        uint256 tokenId,
        string memory customSVG
    ) public view virtual returns (string memory) {
        _requireOwned(tokenId);

        PassportData memory passport = passports[tokenId];

        // Generate JSON metadata with custom SVG
        string memory json = string.concat(
            '{"name": "RISE Passport #',
            _uint2str(tokenId),
            '",',
            '"description": "RISE Passport NFT - A digital identity token representing membership in the RISE community.\\n\\nThis soulbound token serves as proof of your role and contribution within the RISE ecosystem. Each passport is permanently linked to your Discord identity and cannot be transferred, ensuring authentic representation of your place in our community.\\n\\nRole: ',
            passport.roleName,
            '\\n\\nThis passport represents your unique contribution to the RISE community and serves as a permanent record of your membership.",',
            '"image": "data:image/svg+xml;base64,',
            _base64Encode(bytes(customSVG)),
            '",',
            '"attributes": [',
            '{"trait_type": "Role", "value": "',
            passport.roleName,
            '"},',
            '{"trait_type": "Discord ID", "value": "',
            passport.discordId,
            '"},',
            '{"trait_type": "Role ID", "value": "',
            passport.roleId,
            '"},',
            '{"trait_type": "Minted At", "value": "',
            _uint2str(passport.mintedAt),
            '"}',
            "],",
            '"external_url": "https://rise-pass.vercel.app",',
            '"background_color": "000000"',
            "}"
        );

        return
            string.concat(
                "data:application/json;base64,",
                _base64Encode(bytes(json))
            );
    }

    /**
     * @dev Convert uint to string
     */
    function _uint2str(uint256 _i) internal pure returns (string memory) {
        if (_i == 0) {
            return "0";
        }
        uint256 j = _i;
        uint256 length;
        while (j != 0) {
            length++;
            j /= 10;
        }
        bytes memory bstr = new bytes(length);
        uint256 k = length;
        while (_i != 0) {
            k -= 1;
            uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
            bytes1 b1 = bytes1(temp);
            bstr[k] = b1;
            _i /= 10;
        }
        return string(bstr);
    }

    /**
     * @dev Base64 encoding
     */
    function _base64Encode(
        bytes memory data
    ) internal pure returns (string memory) {
        bytes
            memory table = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        uint256 len = data.length;
        if (len == 0) return "";

        uint256 encodedLen = 4 * ((len + 2) / 3);
        bytes memory result = new bytes(encodedLen);

        uint256 i = 0;
        uint256 j = 0;

        while (i < len) {
            uint256 a = i < len ? uint8(data[i++]) : 0;
            uint256 b = i < len ? uint8(data[i++]) : 0;
            uint256 c = i < len ? uint8(data[i++]) : 0;

            uint256 triple = (a << 16) + (b << 8) + c;

            result[j++] = table[(triple >> 18) & 63];
            result[j++] = table[(triple >> 12) & 63];
            result[j++] = table[(triple >> 6) & 63];
            result[j++] = table[triple & 63];
        }

        // Adjust padding
        while (j > 0 && result[j - 1] == 0x3D) {
            // 0x3D is '='
            j--;
        }

        return string(result);
    }
}
