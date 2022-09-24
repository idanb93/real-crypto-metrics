import { _projects } from '../constants/constants'
import { DefaultApi, GithubContributors } from '../swagger/stubs'

export const sendDataToBackendServer = async (
  projectOwner: string
): Promise<GithubContributors[]> => {
  try {
    // const response = await axios({
    //   method: 'POST',
    //   url: `${BACKEND_URL}/${route}`,
    //   data: {
    //     owner: projectOwner,
    //     repo: _projects.find((project) => project.owner === projectOwner)?.repo,
    //     route
    //   }
    // })
    const response: GithubContributors[] =
      await new DefaultApi().getProjectContributors({
        owner: projectOwner,
        repo:
          _projects.find((project) => project.owner === projectOwner)?.repo ??
          ''
      })

    console.log('sendDataToBackendServer response: ', response)

    return response
  } catch (err) {
    return []
  }
}
