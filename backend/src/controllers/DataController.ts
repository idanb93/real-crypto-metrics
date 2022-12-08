import { Controller, Get, Route, SuccessResponse } from 'tsoa'
import { Project } from '../interfaces/frontend'
import { _getProjectsInitialData } from '../services/projects'

@Route('/data')
export class DataController extends Controller {
  @SuccessResponse('200', 'OK')
  @Get('/initial')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public getProjectsInitialData(): Project[] {
    const result = _getProjectsInitialData()
    return result
  }
}
