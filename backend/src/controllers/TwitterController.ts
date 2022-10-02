import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa'
import { RecentTweets, RepoContributor } from '../interfaces/twitter'
import { logger } from '../logger'
import { _getGithubUsernameInfo } from '../services/github'
import { _getRecentTweetsByUsername } from '../services/twitter'

@Route('/api')
export class TwitterController extends Controller {
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/twitter/recent-tweets-by-contributor')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public async getTweetsByContributor(
    @Body() requestBody: RepoContributor
  ): Promise<RecentTweets[] | {}> {
    try {
      const githubUsernameInfo = await _getGithubUsernameInfo(
        requestBody.contributor
      )
      const result: RecentTweets[] | {} = await _getRecentTweetsByUsername(
        githubUsernameInfo?.twitter_username
      )
      return result
    } catch (err) {
      logger.error('unable to get projects contributors')
      throw err
    }
  }
}
