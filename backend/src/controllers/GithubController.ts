import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa'
import {
  GithubContributors,
  GithubRequest
} from '../interfaces/github-interfaces'
import { logger } from '../logger'
import { _getProjectContributers } from '../services/github'

@Route('/api/github')
export class GithubController extends Controller {
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('contributors')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public async getProjectContributors(
    @Body() requestBody: GithubRequest
  ): Promise<GithubContributors[]> {
    try {
      const result: GithubContributors[] = await _getProjectContributers(
        requestBody.owner,
        requestBody.repo
      )

      return result ?? []
    } catch (err) {
      logger.info('unable to get projects contributors')
      throw err
    }
  }
}
