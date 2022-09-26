import { _projects } from '../../data/projects'
import { Project } from '../../interfaces/frontend'

export const _getInitialData = (): Project[] => {
  return _projects
}
