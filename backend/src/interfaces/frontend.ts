export interface Project {
  id: number
  name: string
  logo: string
  owner: string
  repo: string
  transactionsPerSecond: number
  consensusAlgorithm: string
  latency: number
  isScalable: boolean
  isInteroperable: boolean
}
