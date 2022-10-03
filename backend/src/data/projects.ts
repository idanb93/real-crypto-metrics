import { Project } from '../interfaces/frontend'

export const _projects: Project[] = [
  {
    id: 1,
    name: 'Bitcoin',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1.png',
    owner: 'bitcoin',
    repo: 'bitcoin',
    transactionsPerSecond: 7,
    consensusAlgorithm: 'PoW',
    latency: 600,
    isScalable: false,
    isInteroperable: false
  },
  {
    id: 2,
    name: 'Ethereum',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/1027.png',
    owner: 'ethereum',
    repo: 'go-ethereum',
    transactionsPerSecond: 15,
    consensusAlgorithm: 'PoS',
    latency: 98,
    isScalable: false,
    isInteroperable: true
  },
  {
    id: 3,
    name: 'Solana',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5426.png',
    owner: 'solana-labs',
    repo: 'solana',
    transactionsPerSecond: 2000,
    consensusAlgorithm: 'PoS',
    latency: 11,
    isScalable: true,
    isInteroperable: false
  },
  {
    id: 4,
    name: 'Elrond',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/6892.png',
    owner: 'ElrondNetwork',
    repo: 'elrond-go',
    transactionsPerSecond: 10000,
    consensusAlgorithm: 'SPoS',
    latency: 5,
    isScalable: true,
    isInteroperable: true
  },
  {
    id: 5,
    name: 'Avalanche',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/5805.png',
    owner: 'ava-labs',
    repo: 'avalanchego',
    transactionsPerSecond: 2500,
    consensusAlgorithm: 'PoS',
    latency: 14,
    isScalable: true,
    isInteroperable: false
  },
  {
    id: 6,
    name: 'Polygon',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3890.png',
    owner: 'maticnetwork',
    repo: 'bor',
    transactionsPerSecond: 9000,
    consensusAlgorithm: 'PoS',
    latency: 90,
    isScalable: true,
    isInteroperable: false
  },
  {
    id: 7,
    name: 'UniSwap',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/7083.png',
    owner: 'Uniswap',
    repo: 'interface',
    transactionsPerSecond: 5,
    consensusAlgorithm: 'PoS',
    latency: 90,
    isScalable: true,
    isInteroperable: false
  },
  {
    id: 8,
    name: 'Algorand',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/4030.png',
    owner: 'algorand',
    repo: 'go-algorand',
    transactionsPerSecond: 360,
    consensusAlgorithm: 'PoS',
    latency: 40,
    isScalable: true,
    isInteroperable: true
  },
  {
    id: 9,
    name: 'Quant',
    logo: 'https://s2.coinmarketcap.com/static/img/coins/64x64/3155.png',
    owner: 'quantnetwork',
    repo: 'overledger-sdk-javascript-v2',
    transactionsPerSecond: 1000,
    consensusAlgorithm: 'PoS',
    latency: 1000,
    isScalable: true,
    isInteroperable: false
  }
]
