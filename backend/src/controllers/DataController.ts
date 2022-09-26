import { Controller, Get, Route, SuccessResponse } from 'tsoa'
import { Project } from '../interfaces/frontend'
import { _getInitialData } from '../services/data'

@Route('/data')
export class DataController extends Controller {
  @SuccessResponse('200', 'OK') // Custom success response
  @Get('/initial')
  // eslint-disable-next-line @typescript-eslint/space-before-function-paren
  public getInitialData(): Project[] {
    const result = _getInitialData()
    return result
  }
}
