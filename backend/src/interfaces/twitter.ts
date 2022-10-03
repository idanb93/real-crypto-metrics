export interface RepoContributor {
  contributor: string
}

export interface RecentTweetsData {
  edit_history_tweet_ids: string[]
  id: string
  text: string
}

interface RecentTweetsMeta {
  result_count: number
}

export interface TwitterResponse {
  data?: RecentTweetsData[]
  meta?: RecentTweetsMeta
  info?: string
}
