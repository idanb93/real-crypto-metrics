import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'
import {
  GithubContributors,
  GithubContributorsDTO,
  GithubUsername
} from '../../interfaces/github'
import { logger } from '../../logger'
import dotenv from 'dotenv'

dotenv.config()

const GitHubClient = axios.create({
  baseURL: 'https://api.github.com/',
  timeout: 1000,
  headers: {
    Accept: 'application/vnd.GitHub.v3+json',
    Authorization: `Bearer ${process.env.GITHUN_TOKEN ?? ''}`
  }
})

GitHubClient.interceptors.request.use(
  (request: AxiosRequestConfig) => {
    // logger.info(JSON.stringify(request, null, 2))
    logger.info(request.url)
    return request
  },
  (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // logger.error(`HTTP Response Status Code: ${error.response.status}`)
    if (error.response != null) {
      // logger.error(error)
      logger.error(error.response.statusText)
      logger.error(error.message)
      // logger.error(JSON.stringify(error.response.headers, null, 2))
      logger.error('\n' + JSON.stringify(error.response.data, null, 2))
    }
  }
)

GitHubClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // logger.info(JSON.stringify(response.data, null, 2))
    return response
  },
  (error: AxiosError) => {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    // logger.error(`HTTP Response Status Code: ${error.response.status}`)
    if (error.response != null) {
      // logger.error(error)
      logger.error(error.response.statusText)
      logger.error(error.message)
      // logger.error(JSON.stringify(error.response.headers, null, 2))
      logger.error('\n' + JSON.stringify(error.response.data, null, 2))
    }
  }
)

export const _getProjectContributers = async (
  owner: string,
  repo: string
): Promise<GithubContributorsDTO[]> => {
  try {
    const res: AxiosResponse = await GitHubClient.get(
      `/repos/${owner}/${repo}/contributors`,
      {
        params: {
          page: '1',
          per_page: '100'
        }
      }
    )

    const resDTO: GithubContributorsDTO[] = res?.data.map(
      (obj: GithubContributors) => convertGithubContributorsToDTOObj(obj)
    )
    return resDTO
  } catch (err) {
    logger.error(err)
    throw err
  }
}

export const _getGithubUsernameInfo = async (
  contributor: string
): Promise<GithubUsername> => {
  try {
    const res = await GitHubClient.get(`users/${contributor}`)
    return res.data
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
