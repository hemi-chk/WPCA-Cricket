// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/**
 * WPCA Cricket Registry
 * Tamper-proof on-chain record of player registrations and match results.
 * Deployed on Ethereum Sepolia testnet.
 */
contract WPCACricket {

    // ── Structs ──────────────────────────────────────────────────────────────

    struct PlayerRecord {
        string  mongoId;        // MongoDB _id for cross-reference
        string  name;
        string  ageCategory;
        string  teamName;
        uint256 registeredAt;
        bool    active;
    }

    struct MatchRecord {
        string  mongoId;
        string  homeTeam;
        string  awayTeam;
        string  homeScore;
        string  awayScore;
        string  result;
        string  venue;
        uint256 matchDate;
        uint256 recordedAt;
    }

    // ── State ─────────────────────────────────────────────────────────────────

    address public admin;

    // mongoId => PlayerRecord
    mapping(string => PlayerRecord) private _players;
    string[] private _playerIds;

    MatchRecord[] private _matches;

    // ── Events ────────────────────────────────────────────────────────────────

    event PlayerRegistered(
        string indexed mongoId,
        string name,
        string ageCategory,
        string teamName,
        uint256 timestamp
    );

    event MatchRecorded(
        uint256 indexed matchIndex,
        string indexed mongoId,
        string homeTeam,
        string awayTeam,
        string result,
        uint256 timestamp
    );

    event PlayerDeactivated(string indexed mongoId, uint256 timestamp);

    // ── Modifiers ─────────────────────────────────────────────────────────────

    modifier onlyAdmin() {
        require(msg.sender == admin, "WPCA: caller is not admin");
        _;
    }

    // ── Constructor ───────────────────────────────────────────────────────────

    constructor() {
        admin = msg.sender;
    }

    // ── Write functions (admin only) ──────────────────────────────────────────

    function registerPlayer(
        string calldata mongoId,
        string calldata name,
        string calldata ageCategory,
        string calldata teamName
    ) external onlyAdmin {
        require(bytes(mongoId).length > 0, "WPCA: mongoId required");
        require(!_players[mongoId].active, "WPCA: player already registered");

        _players[mongoId] = PlayerRecord({
            mongoId:      mongoId,
            name:         name,
            ageCategory:  ageCategory,
            teamName:     teamName,
            registeredAt: block.timestamp,
            active:       true
        });
        _playerIds.push(mongoId);

        emit PlayerRegistered(mongoId, name, ageCategory, teamName, block.timestamp);
    }

    function recordMatch(
        string calldata mongoId,
        string calldata homeTeam,
        string calldata awayTeam,
        string calldata homeScore,
        string calldata awayScore,
        string calldata result,
        string calldata venue,
        uint256         matchDate
    ) external onlyAdmin {
        _matches.push(MatchRecord({
            mongoId:    mongoId,
            homeTeam:   homeTeam,
            awayTeam:   awayTeam,
            homeScore:  homeScore,
            awayScore:  awayScore,
            result:     result,
            venue:      venue,
            matchDate:  matchDate,
            recordedAt: block.timestamp
        }));

        emit MatchRecorded(
            _matches.length - 1,
            mongoId,
            homeTeam,
            awayTeam,
            result,
            block.timestamp
        );
    }

    function deactivatePlayer(string calldata mongoId) external onlyAdmin {
        require(_players[mongoId].active, "WPCA: player not active");
        _players[mongoId].active = false;
        emit PlayerDeactivated(mongoId, block.timestamp);
    }

    // ── Read functions (public) ───────────────────────────────────────────────

    function getPlayer(string calldata mongoId)
        external view returns (PlayerRecord memory)
    {
        return _players[mongoId];
    }

    function isPlayerRegistered(string calldata mongoId)
        external view returns (bool)
    {
        return _players[mongoId].active;
    }

    function getPlayerCount() external view returns (uint256) {
        return _playerIds.length;
    }

    function getMatch(uint256 index)
        external view returns (MatchRecord memory)
    {
        require(index < _matches.length, "WPCA: index out of bounds");
        return _matches[index];
    }

    function getMatchCount() external view returns (uint256) {
        return _matches.length;
    }
}
