import axios from 'axios'
import { BACKEND_URL, projects } from '../constants/constants'

export const sendDataToBackendServer = async (
  route: string,
  projectOwner: string
) => {
  try {
    const response = await axios({
      method: 'POST',
      url: `${BACKEND_URL}/${route}`,
      data: {
        owner: projectOwner,
        repo: projects.find((project) => project.owner === projectOwner)?.repo,
        route
      }
    })
    console.log(response?.data)
    return response?.data?.data
  } catch (err) {
    return []
  }
}
