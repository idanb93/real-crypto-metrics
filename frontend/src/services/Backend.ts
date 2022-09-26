import { DefaultApi, GithubContributors, Project } from '../swagger/stubs'

export const sendDataToBackendServer = async (
  projectOwner: string,
  projects: Project[]
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
          projects.find((project) => project.owner === projectOwner)?.repo ?? ''
      })

    console.log('getProjectContributors response: ', response)

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
