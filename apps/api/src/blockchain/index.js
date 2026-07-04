import { ethers } from 'ethers'

// Minimal ABI — only the functions we call from the backend
const ABI = [
  'function registerPlayer(string mongoId, string name, string ageCategory, string teamName) external',
  'function recordMatch(string mongoId, string homeTeam, string awayTeam, string homeScore, string awayScore, string result, string venue, uint256 matchDate) external',
  'function deactivatePlayer(string mongoId) external',
  'function getPlayer(string mongoId) external view returns (tuple(string mongoId, string name, string ageCategory, string teamName, uint256 registeredAt, bool active))',
  'function isPlayerRegistered(string mongoId) external view returns (bool)',
  'function getPlayerCount() external view returns (uint256)',
  'function getMatchCount() external view returns (uint256)',
  'function getMatch(uint256 index) external view returns (tuple(string mongoId, string homeTeam, string awayTeam, string homeScore, string awayScore, string result, string venue, uint256 matchDate, uint256 recordedAt))',
  'event PlayerRegistered(string indexed mongoId, string name, string ageCategory, string teamName, uint256 timestamp)',
  'event MatchRecorded(uint256 indexed matchIndex, string indexed mongoId, string homeTeam, string awayTeam, string result, uint256 timestamp)',
]

let contract = null

function getContract() {
  if (contract) return contract

  const { ALCHEMY_SEPOLIA_URL, DEPLOYER_PRIVATE_KEY, CONTRACT_ADDRESS } = process.env

  if (!ALCHEMY_SEPOLIA_URL || !DEPLOYER_PRIVATE_KEY || !CONTRACT_ADDRESS) {
    console.warn('Blockchain env vars not set — on-chain writes disabled')
    return null
  }

  const provider = new ethers.JsonRpcProvider(ALCHEMY_SEPOLIA_URL)
  const wallet   = new ethers.Wallet(DEPLOYER_PRIVATE_KEY, provider)
  contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, wallet)
  return contract
}

export async function chainRegisterPlayer({ mongoId, name, ageCategory, teamName }) {
  const c = getContract()
  if (!c) return null
  try {
    const tx = await c.registerPlayer(mongoId, name, ageCategory, teamName ?? '')
    const receipt = await tx.wait()
    return { txHash: receipt.hash, blockNumber: receipt.blockNumber }
  } catch (err) {
    console.error('chainRegisterPlayer error:', err.message)
    return null
  }
}

export async function chainRecordMatch({ mongoId, homeTeam, awayTeam, homeScore, awayScore, result, venue, matchDate }) {
  const c = getContract()
  if (!c) return null
  try {
    const ts  = Math.floor(new Date(matchDate).getTime() / 1000)
    const tx  = await c.recordMatch(mongoId, homeTeam ?? '', awayTeam ?? '', homeScore ?? '', awayScore ?? '', result ?? '', venue ?? '', ts)
    const receipt = await tx.wait()
    return { txHash: receipt.hash, blockNumber: receipt.blockNumber }
  } catch (err) {
    console.error('chainRecordMatch error:', err.message)
    return null
  }
}

export async function chainGetPlayer(mongoId) {
  const c = getContract()
  if (!c) return null
  try {
    return await c.getPlayer(mongoId)
  } catch {
    return null
  }
}

export async function chainIsRegistered(mongoId) {
  const c = getContract()
  if (!c) return false
  try {
    return await c.isPlayerRegistered(mongoId)
  } catch {
    return false
  }
}
