import axios from 'axios'
import {
  GithubContributors,
  GithubContributorsDTO
} from '../../interfaces/github'
import { logger } from '../../logger'

export const _getProjectContributers = async (
  owner: string,
  repo: string
): Promise<GithubContributorsDTO[]> => {
  try {
    const res = await axios.get(
      `https://api.github.com/repos/${owner}/${repo}/contributors`,
      {
        params: {
          page: '1',
          per_page: '100'
        }
      }
    )
    const resDTO: GithubContributorsDTO[] = res.data.map(
      (obj: GithubContributors) => convertGithubContributorsToDTOObj(obj)
    )
    // axios.interceptors.request.use((request) => {
    //   logger.info(JSON.stringify(request.url))
    //   logger.info('Starting Request', JSON.stringify(request, null, 2))
    //   return request
    // })
    return resDTO
  } catch (err) {
    logger.error(err)
    throw new Error('Could not fetch contributors')
  }
}

/**
 * Convert GithubContributors to DTO object due to swagger cli codegen limitation (camelCase)
 * @param githubContributors
 * @returns GithubContributorsDTO
 */

export const convertGithubContributorsToDTOObj = (
  githubContributors: GithubContributors
): GithubContributorsDTO => {
  return {
    login: githubContributors.login,
    id: githubContributors.id,
    nodeId: githubContributors.node_id,
    avatarUrl: githubContributors.avatar_url,
    gravatarId: githubContributors.gravatar_id,
    url: githubContributors.url,
    htmlUrl: githubContributors.html_url,
    followersUrl: githubContributors.followers_url,
    followingUrl: githubContributors.following_url,
    gistsUrl: githubContributors.gists_url,
    starredUrl: githubContributors.starred_url,
    subscriptionsUrl: githubContributors.subscriptions_url,
    organizationsUrl: githubContributors.organizations_url,
    reposUrl: githubContributors.repos_url,
    eventsUrl: githubContributors.events_url,
    receivedEventsUrl: githubContributors.received_events_url,
    type: githubContributors.type,
    siteAdmin: githubContributors.site_admin,
    contributions: githubContributors.contributions
  }
}
