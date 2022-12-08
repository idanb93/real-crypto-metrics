import { notificationStore } from '../stores/notificationsStore'
import {
  DefaultApi,
  GithubContributorsDTO,
  Project,
  TwitterResponse
} from '../swagger/stubs'

export const getProjectsContributors = async (
  projectOwner: string,
  projects: Project[]
): Promise<GithubContributorsDTO[]> => {
  try {
    const response: GithubContributorsDTO[] =
      await new DefaultApi().getProjectContributors({
        owner: projectOwner,
        repo:
          projects.find((project) => project.owner === projectOwner)?.repo ?? ''
      })

    console.log(
      `getProjectContributors for ${projectOwner} response: `,
      response.filter((contributor) => contributor.type === 'User')
    )

    notificationStore.show({
      message: `Successfully fetched contributors of ${projectOwner}/${
        projects.find((project) => project.owner === projectOwner)?.repo ?? ''
      }`
    })

    return response.filter((contributor) => contributor.type === 'User')
  } catch (err) {
    return []
  }
}

export const getRecentTweetsByContributor = async (
  contributorName: string
): Promise<TwitterResponse> => {
  try {
    const res: TwitterResponse = await new DefaultApi().getTweetsByContributor({
      contributor: contributorName
    })
    console.log('getRecentTweetsByContributor response: ', res)
    return res
  } catch (err) {
    throw new Error('Error fetching recent tweets by contributor')
  }
}

export const getProjectsInitialData = async (): Promise<Project[]> => {
  try {
    const response: Project[] = await new DefaultApi().getProjectsInitialData()
    console.log('getProjectsInitialData response: ', response)

    return response
  } catch (err) {
    return []
  }
}
