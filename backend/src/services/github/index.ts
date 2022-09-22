import axios from 'axios'
import { logger } from '../../logger'

export const _getProjectContributers = async (
  owner: string,
  repo: string
): Promise<object | undefined> => {
  try {
    return (
      await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contributors`
      )
    ).data
  } catch (err) {
    logger.error(err)
  }
}
