import axios from 'axios'
import { GithubContributors } from '../../interfaces/github-interfaces'
import { logger } from '../../logger'

export const _getProjectContributers = async (
  owner: string,
  repo: string
): Promise<GithubContributors[]> => {
  try {
    return (
      await axios.get(
        `https://api.github.com/repos/${owner}/${repo}/contributors`
      )
    ).data
  } catch (err) {
    logger.error(err)
    throw new Error('Could not fetch contributors')
  }
}
