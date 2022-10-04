import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa'
import { GithubContributorsDTO, GithubRequest } from '../interfaces/github'
import { logger } from '../logger'
import { _getProjectContributers } from '../services/github'

@Route('/api')
export class GithubController extends Controller {
  @SuccessResponse('201', 'Created')
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
      if (err instanceof Error) {
        logger.error(err.message)
      }
      throw err
    }
  }
}
