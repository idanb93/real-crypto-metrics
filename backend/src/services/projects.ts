import { _projects } from '../data/projects'
import { Project } from '../interfaces/frontend'

export const _getProjectsInitialData = (): Project[] => {
  return _projects
}
