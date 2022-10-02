import { notificationStore } from '../stores/notificationsStore'
import {
  DefaultApi,
  GithubContributorsDTO,
  Project,
  RecentTweets
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
): Promise<RecentTweets[]> => {
  try {
    const response: RecentTweets[] =
      await new DefaultApi().getTweetsByContributor({
        contributor: contributorName
      })
    console.log('getTweetsByContributor response: ', response)
    if (response.data.length > 0) {
      notificationStore.show({
        message:
          'Successfully fetched recent tweets of the contributor of the project!'
      })
    } else {
      notificationStore.show({
        message:
          'Contributor GitHub account is not associated with their Twitter account or Contributor did not tweet'
      })
    }
    return response
  } catch (err) {
    return []
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
