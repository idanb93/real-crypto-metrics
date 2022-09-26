import { Controller, Get, Route, SuccessResponse } from 'tsoa'
import { Project } from '../interfaces/frontend'
import { logger } from '../logger'
import { _getInitialData } from '../services/data'

@Route('/data')
export class DataController extends Controller {
  @SuccessResponse('200', 'OK') // Custom success response
  @Get('/initial')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public async getInitialData(): Promise<Project[]> {
    try {
      const result: Project[] = _getInitialData()
      return result ?? []
    } catch (err) {
      logger.info('unable to get projects contributors')
      throw err
    }
  }
}
