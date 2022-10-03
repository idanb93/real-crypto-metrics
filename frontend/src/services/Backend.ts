import { notificationStore } from '../stores/notificationsStore'
import {
  DefaultApi,
  GithubContributorsDTO,
  Project,
  TwitterResponse
} from '../swagger/stubs'

export const sendDataToBackendServer = async (
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

    console.log('getProjectContributors response: ', response)
    notificationStore.show({
      message: 'Successfully fetched contributors of the project!'
    })
    return response
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

export const getInitialDataFromBackendServer = async (): Promise<Project[]> => {
  try {
    const response: Project[] = await new DefaultApi().getInitialData()
    console.log('getInitialDataFromBackendServer response: ', response)

    return response
  } catch (err) {
    return []
  }
}
