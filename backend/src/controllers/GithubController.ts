import { Request, Response } from 'express'
import { _getProjectContributers } from '../services/github/index'

const getProjectContributers = async (
  reqeust: Request,
  response: Response
): Promise<void> => {
  try {
    const { owner, repo } = reqeust.body
    const result: object | undefined = await _getProjectContributers(
      owner,
      repo
    )

    if (result !== undefined) {
      response.status(200).send({
        message: 'contributers of the project was successfully fetched',
        data: result
      })
    } else {
      throw new Error('The data from the request is empty')
    }
  } catch (err) {
    response.status(404).send({ message: 'owner or repo did not found!' })
  }
}

const GithubController = { getProjectContributers }
export default GithubController
