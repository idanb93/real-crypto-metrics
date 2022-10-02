export interface RecentTweets {
  edit_history_tweet_ids: string[]
  id: string
  text: string
}

export interface NoTweetsResult {
  meta: {
    result_count: number
  }
}

export interface RepoContributor {
  contributor: string
}
