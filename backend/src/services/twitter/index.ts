import axios from 'axios'
import { NoTweetsResult, RecentTweets } from '../../interfaces/twitter'
import { logger } from '../../logger'
import dotenv from 'dotenv'

dotenv.config()

export const _getRecentTweetsByUsername = async (
  twitterUsername: string
): Promise<RecentTweets[] | {}> => {
  try {
    const config = {
      headers: {
        Authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAAKMDhgEAAAAAfuqBfcbgNoR0hNfL1M%2F9nwZRBYc%3DC1FjTjQtZf0j5sSdbryUtybxtJCWKGRYIezJuPRkowNIgLlLdF'
      }
    }

    let res: any = []

    if (twitterUsername !== null) {
      res = await axios.get(
        `https://api.twitter.com/2/tweets/search/recent?query=from:${twitterUsername}`,
        config
      )
      return res.data
    } else {
      return {
        data: []
      }
    }
  } catch (err) {
    logger.error(err)
    throw new Error('Could not fetch tweetsByContributor')
  }
}
