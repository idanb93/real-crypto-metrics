import React, { useEffect, useState } from 'react'

import {
  getProjectsInitialData,
  getProjectsContributors,
  getRecentTweetsByContributor
} from './services/Backend'
import {
  GithubContributorsDTO,
  Project,
  RecentTweetsData,
  TwitterResponse
} from './swagger/stubs'
import { useHistory } from 'react-router-dom'
import { notificationStore } from './stores/notificationsStore'
import { Navbar } from './Navbar'
import { Sidebar } from './Sidebar'
import { GenericSelect } from './GenericSelect'

export const Dashboard: React.FC = () => {
  // const history = useHistory();
  // history.push('/');
  const [contributors, setContributors] = useState<GithubContributorsDTO[]>([])
  const [selectedContributor, setSelectedContributor] = useState('')
  const [selectedProjectOwner, setSelectedProjectOwner] = useState('')
  const [projects, setProjects] = useState<Project[]>([])

  const [selectedProject, setSelectedProject] = useState<Project | undefined>(
    undefined
  )

  const [selectGithubContributor, setSelectGithubContributor] = useState<
    GithubContributorsDTO | undefined
  >(undefined)

  const [tweetsByContributor, setTweetsByContributor] = useState<
    RecentTweetsData[]
  >([])

  useEffect(() => {
    const getInitialData = async (): Promise<void> => {
      try {
        const res = await getProjectsInitialData()
        setProjects(res)
      } catch (e) {
        console.log(e)
      }
    }

    getInitialData()
  }, [])

  const handleChoosingProject = async (
    projectOwner: string,
    projects: Project[]
  ): Promise<void> => {
    try {
      const res = await getProjectsContributors(projectOwner, projects)
      setContributors(res)
    } catch (e) {
      console.log(e)
    }
  }

  const handleChoosingContributor = async (
    contributorName: string
  ): Promise<void> => {
    try {
      const res: TwitterResponse = await getRecentTweetsByContributor(
        contributorName
      )

      if (res?.data !== undefined) {
        setTweetsByContributor(res?.data)
        notificationStore.show({
          message: `Successfully fetched ${res?.meta?.result_count} recent tweets`
        })
      } else if (res?.meta !== undefined) {
        setTweetsByContributor([])
        notificationStore.show({
          message: 'Contributor did not tweet'
        })
      } else {
        setTweetsByContributor([])
        notificationStore.show({
          message:
            'Contributor GitHub account is not associated with their Twitter account'
        })
      }
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div id="dashboard-page-container">
      <Navbar />
      <div id="dashboard-main-page">
        <Sidebar />

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '2vh 2vw 2vh 2vw',
            minHeight: '100vh',
            width: '85%',
            background: 'rgb(249,249,249)'
          }}
        >
          <GenericSelect
            selectedValue={{
              ...selectedProject,
              label: selectedProject?.name,
              value: selectedProject?.name
            }}
            placeHolder={'Projects'}
            options={projects.map((project: Project) => ({
              ...project,
              label: project.name,
              value: project.name,
              avatar: project.logo
            }))}
            onChange={(projectName: string) => {
              const selectedProject = projects.find(
                (project: Project) => project.name === projectName
              )
              setSelectedProjectOwner(selectedProject?.owner ?? '')
              handleChoosingProject(
                selectedProject?.owner ?? '',
                projects
              ).catch((e) => {})
            }}
          />
          {selectedProjectOwner !== '' ? (
            <>
              <div className="dashboard-section">
                <h1>Developers Churn</h1>
              </div>

              <div className="dashboard-section">
                <h1>Validator Count: </h1>
              </div>

              <div className="dashboard-section">
                <h2>
                  Type:{' '}
                  {
                    projects.find(
                      (projectFromBackend) =>
                        projectFromBackend.owner === selectedProjectOwner
                    )?.type
                  }
                </h2>
                <h2>
                  Transactions Per Second:{' '}
                  {
                    projects.find(
                      (projectFromBackend) =>
                        projectFromBackend.owner === selectedProjectOwner
                    )?.transactionsPerSecond
                  }
                </h2>
                <h2>
                  Consensus Protocol:{' '}
                  {
                    projects.find(
                      (projectFromBackend) =>
                        projectFromBackend.owner === selectedProjectOwner
                    )?.consensusAlgorithm
                  }
                </h2>
                <h2>
                  Latency:{' '}
                  {
                    projects.find(
                      (projectFromBackend) =>
                        projectFromBackend.owner === selectedProjectOwner
                    )?.latency
                  }
                </h2>
                <h2>
                  isScalable:{' '}
                  {projects.find(
                    (projectFromBackend) =>
                      projectFromBackend.owner === selectedProjectOwner
                  )?.isScalable
                    ? 'Yes'
                    : 'No'}
                </h2>
                <h2>
                  isIntroprable:{' '}
                  {projects.find(
                    (projectFromBackend) =>
                      projectFromBackend.owner === selectedProjectOwner
                  )?.isInteroperable
                    ? 'Yes'
                    : 'No'}
                </h2>
                <h2>
                  Immediate Finality:{' '}
                  {projects.find(
                    (projectFromBackend) =>
                      projectFromBackend.owner === selectedProjectOwner
                  )?.isInteroperable
                    ? 'Yes'
                    : 'No'}
                </h2>
              </div>
            </>
          ) : (
            ''
          )}

          {contributors.length > 0 ? (
            <div id="contributors">
              <div>
                <h1>Contributors: </h1>
              </div>

              <GenericSelect
                selectedValue={{
                  ...selectGithubContributor,
                  label: selectGithubContributor?.login,
                  value: selectGithubContributor?.login
                }}
                placeHolder={'Contributors'}
                options={contributors.map(
                  (contributor: GithubContributorsDTO) => ({
                    ...contributor,
                    label: contributor?.login,
                    value: contributor?.login,
                    avatar: contributor.avatarUrl
                  })
                )}
                onChange={(contributorName: string) => {
                  const selectedGithubContributor = contributors.find(
                    (contributor: GithubContributorsDTO) =>
                      contributor?.login === contributorName
                  )
                  setSelectedContributor(selectedGithubContributor?.login ?? '')
                  handleChoosingContributor(
                    selectedGithubContributor?.login ?? ''
                  ).catch((e) => {})
                }}
              />
            </div>
          ) : (
            ''
          )}

          {selectedContributor !== '' && tweetsByContributor.length > 0 ? (
            <>
              <div
                style={{
                  margin: '2vh 2vw 2vh 2vw'
                }}
              >
                <h1>Recent Tweets by {selectedContributor}</h1>
              </div>
              <div id="tweets-container">
                {tweetsByContributor.map((tweet) => (
                  <div className="tweet">
                    <p style={{ margin: '2vh 2vw 2vh 2vw' }}>{tweet.text}</p>
                  </div>
                ))}
              </div>
            </>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  )
}
