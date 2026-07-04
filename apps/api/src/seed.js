import 'dotenv/config'
import mongoose from 'mongoose'
import Team from './models/Team.js'
import Player from './models/Player.js'
import Match from './models/Match.js'
import PracticeSession from './models/PracticeSession.js'

await mongoose.connect(process.env.MONGODB_URI)
console.log('Connected to MongoDB')

// Clear existing data
await Promise.all([Team.deleteMany(), Player.deleteMany(), Match.deleteMany(), PracticeSession.deleteMany()])
console.log('Cleared existing data')

// --- Teams ---
const [wpca, wpu19, wpu17, wpu15, wpu13, cdwca] = await Team.insertMany([
  { name: 'Western Province WCA',        shortName: 'WPCA',   category: 'Senior',   location: 'Colombo',          founded: 2008 },
  { name: 'Western Province Under 19',   shortName: 'WP U19', category: 'Under 19', location: 'Colombo',          founded: 2012 },
  { name: 'Western Province Under 17',   shortName: 'WP U17', category: 'Under 17', location: 'Colombo',          founded: 2015 },
  { name: 'Western Province Under 15',   shortName: 'WP U15', category: 'Under 15', location: 'Colombo',          founded: 2016 },
  { name: 'Western Province Under 13',   shortName: 'WP U13', category: 'Under 13', location: 'Colombo',          founded: 2018 },
  { name: 'Colombo District WCA',        shortName: 'CDWCA',  category: 'Senior',   location: 'Colombo District', founded: 2010 },
])
console.log('Teams seeded')

// --- Players ---
const players = await Player.insertMany([
  { name: 'Chamari Athapaththu', role: 'All-rounder', ageCategory: 'Senior',   team: wpca._id,  battingHand: 'Left hand',  shirtNumber: 1,  nationality: 'Sri Lankan', stats: { matches: 30, runs: 612, wickets: 4,  battingAvg: 51.0, strikeRate: 134.2 } },
  { name: 'Anjali Perera',       role: 'All-rounder', ageCategory: 'Under 19', team: wpu19._id, battingHand: 'Right hand', shirtNumber: 7,  nationality: 'Sri Lankan', stats: { matches: 24, runs: 487, wickets: 12, battingAvg: 44.3, strikeRate: 128.6 } },
  { name: 'Dilini Fernando',     role: 'Bowler',      ageCategory: 'Under 19', team: wpu19._id, battingHand: 'Right hand', shirtNumber: 11, nationality: 'Sri Lankan', stats: { matches: 22, runs: 421, wickets: 18, battingAvg: 38.3, strikeRate: 121.4 } },
  { name: 'Nadeesha Silva',      role: 'Batter',      ageCategory: 'Under 17', team: wpu17._id, battingHand: 'Right hand', shirtNumber: 5,  nationality: 'Sri Lankan', stats: { matches: 20, runs: 398, wickets: 8,  battingAvg: 36.2, strikeRate: 119.7 } },
  { name: 'Inoka Ranaweera',     role: 'Bowler',      ageCategory: 'Senior',   team: cdwca._id, battingHand: 'Right hand', shirtNumber: 9,  nationality: 'Sri Lankan', stats: { matches: 28, runs: 374, wickets: 22, battingAvg: 34.0, strikeRate: 115.2 } },
  { name: 'Sethumi Wickrama',    role: 'Batter',      ageCategory: 'Under 15', team: wpu15._id, battingHand: 'Right hand', shirtNumber: 3,  nationality: 'Sri Lankan', stats: { matches: 18, runs: 312, wickets: 6,  battingAvg: 28.4, strikeRate: 108.3 } },
  { name: 'Piyumi Jayawardena',  role: 'All-rounder', ageCategory: 'Under 17', team: wpu17._id, battingHand: 'Left hand',  shirtNumber: 8,  nationality: 'Sri Lankan', stats: { matches: 16, runs: 289, wickets: 14, battingAvg: 26.3, strikeRate: 104.8 } },
  { name: 'Kavindi Dissanayake', role: 'Batter',      ageCategory: 'Senior',   team: wpca._id,  battingHand: 'Right hand', shirtNumber: 4,  nationality: 'Sri Lankan', stats: { matches: 25, runs: 265, wickets: 9,  battingAvg: 24.1, strikeRate: 101.5 } },
])

// Assign captains
const [chamari, anjali, dilini, nadeesha, inoka, sethumi] = players
await Promise.all([
  wpca.updateOne({ captain: chamari._id,  players: [chamari._id, players[7]._id] }),
  wpu19.updateOne({ captain: anjali._id,  players: [anjali._id, dilini._id] }),
  wpu17.updateOne({ captain: nadeesha._id,players: [nadeesha._id, players[6]._id] }),
  wpu15.updateOne({ captain: sethumi._id, players: [sethumi._id] }),
  cdwca.updateOne({ captain: inoka._id,   players: [inoka._id] }),
])
console.log('Players seeded')

// --- Matches ---
const southern = await Team.create({ name: 'Southern Province WC', shortName: 'SP', category: 'Senior', location: 'Galle', founded: 2009 })
const kandy    = await Team.create({ name: 'Kandy WC',             shortName: 'KWC',category: 'Senior', location: 'Kandy', founded: 2010 })
const galle    = await Team.create({ name: 'Galle WC',             shortName: 'GWC',category: 'Senior', location: 'Galle', founded: 2011 })

await Match.insertMany([
  { type: 'Practice', date: new Date('2026-06-02'), venue: 'Colombo Cricket Ground',  homeTeam: wpca._id, awayTeam: southern._id, homeScore: '142/6', awayScore: '138/9',  result: 'Won',  mvp: anjali._id,  notes: 'Provincial Championship Round 1' },
  { type: 'Practice', date: new Date('2026-06-08'), venue: 'Kandy Sports Club',        homeTeam: wpca._id, awayTeam: kandy._id,    homeScore: '167/4', awayScore: '145/8',  result: 'Won',  mvp: chamari._id, notes: 'Provincial Championship Round 2' },
  { type: 'Practice', date: new Date('2026-06-15'), venue: 'Galle International Oval', homeTeam: wpca._id, awayTeam: galle._id,    homeScore: '118/10',awayScore: '121/7',  result: 'Lost', mvp: dilini._id,  notes: 'Provincial Championship Round 3' },
  { type: 'Practice', date: new Date('2026-06-21'), venue: 'Colombo Cricket Ground',  homeTeam: wpca._id, awayTeam: southern._id, homeScore: '155/5', awayScore: '140/10', result: 'Won',  mvp: nadeesha._id,notes: 'Provincial Championship Round 4' },
  { type: 'Practice', date: new Date('2026-06-27'), venue: 'Colombo Cricket Ground',  homeTeam: wpca._id, awayTeam: kandy._id,    homeScore: '178/3', awayScore: '160/7',  result: 'Won',  mvp: anjali._id,  notes: 'Provincial Championship Round 5' },
])
console.log('Matches seeded')

// --- Practice Sessions ---
const months = [
  { month: 0, sessions: 8,  hours: 24 },
  { month: 1, sessions: 10, hours: 30 },
  { month: 2, sessions: 9,  hours: 27 },
  { month: 3, sessions: 12, hours: 36 },
  { month: 4, sessions: 11, hours: 33 },
  { month: 5, sessions: 14, hours: 42 },
]
const focuses = ['Batting', 'Bowling', 'Fielding', 'Fitness', 'Full Team']

const sessionDocs = []
for (const { month, sessions, hours } of months) {
  const minsPerSession = Math.round((hours * 60) / sessions)
  for (let i = 0; i < sessions; i++) {
    sessionDocs.push({
      date:         new Date(2026, month, i + 1),
      team:         wpca._id,
      venue:        'WPCA Training Ground',
      durationMins: minsPerSession,
      focus:        focuses[i % focuses.length],
      attendees:    [chamari._id, anjali._id, players[7]._id],
    })
  }
}
await PracticeSession.insertMany(sessionDocs)
console.log('Practice sessions seeded')

console.log('\n✓ Database seeded successfully!')
await mongoose.disconnect()
