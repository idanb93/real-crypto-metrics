import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa'
import { GithubContributorsDTO, GithubRequest } from '../interfaces/github'
import { logger } from '../logger'
import { _getProjectContributers } from '../services/github'

@Route('/api')
export class GithubController extends Controller {
  @SuccessResponse('201', 'Created') // Custom success response
  @Post('/github/contributors')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public async getProjectContributors(
    @Body() requestBody: GithubRequest
  ): Promise<GithubContributorsDTO[]> {
    try {
      const result: GithubContributorsDTO[] = await _getProjectContributers(
        requestBody.owner,
        requestBody.repo
      )

      return result ?? []
    } catch (err) {
      logger.error('unable to get projects contributors')
      throw err
    }
  }
}
