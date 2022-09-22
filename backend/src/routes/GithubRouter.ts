import Express, { Router } from 'express'
import GithubController from '../controllers/GithubController'

const GithubRouter: Router = Express.Router()
const { getProjectContributers } = GithubController

GithubRouter.post('/contributers', getProjectContributers)

export default GithubRouter
