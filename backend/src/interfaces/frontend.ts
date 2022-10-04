export interface Project {
  id: number
  name: string
  type: string
  logo: string
  owner: string
  repo: string
  transactionsPerSecond: string
  consensusAlgorithm: string
  latency: number
  isScalable: boolean
  isInteroperable: boolean
}
