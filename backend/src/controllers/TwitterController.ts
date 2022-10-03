import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa'
import { GithubUsername } from '../interfaces/github'
import { RepoContributor, TwitterResponse } from '../interfaces/twitter'
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
  ): Promise<TwitterResponse> {
    try {
      const githubUsernameInfo: GithubUsername = await _getGithubUsernameInfo(
        requestBody.contributor
      )
      const res: TwitterResponse = await _getRecentTweetsByUsername(
        githubUsernameInfo?.twitter_username
      )
      return res
    } catch (err) {
      logger.error('unable to get projects contributors')
      throw err
    }
  }
}
