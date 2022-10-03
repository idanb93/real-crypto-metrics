import axios from 'axios'
import { TwitterResponse } from '../../interfaces/twitter'
import { logger } from '../../logger'
import dotenv from 'dotenv'

dotenv.config()

export const _getRecentTweetsByUsername = async (
  twitterUsername: string | null
): Promise<TwitterResponse> => {
  try {
    const config = {
      headers: {
        Authorization:
          'Bearer AAAAAAAAAAAAAAAAAAAAAKMDhgEAAAAAfuqBfcbgNoR0hNfL1M%2F9nwZRBYc%3DC1FjTjQtZf0j5sSdbryUtybxtJCWKGRYIezJuPRkowNIgLlLdF'
      }
    }

    let twitterResponse: TwitterResponse = {}

    if (twitterUsername !== null) {
      const res = await axios.get(
        `https://api.twitter.com/2/tweets/search/recent?query=from:${twitterUsername}`,
        config
      )
      twitterResponse = res.data
    }
    return twitterResponse
  } catch (err) {
    logger.error(err)
    throw new Error('There was a problem trying to get recent tweets')
  }
}
