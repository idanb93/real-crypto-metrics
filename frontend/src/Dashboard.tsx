import React, { useEffect, useState } from 'react'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Avatar from '@mui/material/Avatar'

import Typography from '@mui/material/Typography'
import {
  getInitialDataFromBackendServer,
  sendDataToBackendServer,
  getRecentTweetsByContributor
} from './services/Backend'
import { Accordion } from './accordion/Accordion'
import { AccordionSummary } from './accordion/AccordionSummary'
import { AccordionDetails } from './accordion/AccordionDetails'
import {
  GithubContributorsDTO,
  Project,
  RecentTweetsData,
  TwitterResponse
} from './swagger/stubs'
import { useHistory } from 'react-router-dom'
import { notificationStore } from './stores/notificationsStore'

export const Dashboard: React.FC = () => {
  // const history = useHistory();
  // history.push('/');
  const [contributors, setContributors] = useState<GithubContributorsDTO[]>([])
  const [selectedContributor, setSelectedContributor] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectOwner, setSelectedProjectOwner] = useState('')
  const [tweetsByContributor, setTweetsByContributor] = useState<
    RecentTweetsData[]
  >([])
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChooseContributor = (event: SelectChangeEvent): void => {
    setSelectedContributor(event.target.value)
  }

  const handleAccordionDrop =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  useEffect(() => {
    const getInitialData = async (): Promise<void> => {
      try {
        const res = await getInitialDataFromBackendServer()
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
      const res = await sendDataToBackendServer(projectOwner, projects)
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
    <div
      id="page-container"
      style={{
        display: 'grid',
        gridTemplateColumns: 'side-menu navbar',
        gridTemplateRows: 'navbar main'
      }}
    >
      <div
        id="navbar"
        style={{
          height: '10vh',
          border: '0.5vh solid green',
          background: 'rgb(96, 96, 96)'
        }}
      ></div>
      <div
        id="main-page"
        style={{
          display: 'flex'
        }}
      >
        <div
          id="side-menu"
          style={{
            background: 'rgb(96, 96, 96)',
            minHeight: '100vh',
            width: '15%',
            border: '0.5vh solid red',
            float: 'left'
          }}
        ></div>
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
          <Box
            sx={{
              width: 260,
              maxHeight: '10%',
              margin: '2vh 2vw 2vh 2vw',
              background: 'white'
            }}
          >
            <FormControl sx={{ width: 260 }}>
              <InputLabel
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
                id="demo-simple-select-label"
              >
                Projects
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={selectedProjectOwner}
                label="Projects"
              >
                {projects.map((element, index) => (
                  <MenuItem
                    key={index}
                    value={element.owner}
                    onClick={() => {
                      setSelectedProjectOwner(element.owner)
                      handleChoosingProject(element.owner, projects).catch(
                        (e) => {}
                      )
                    }}
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        width: '11vw'
                      }}
                    >
                      <div
                        style={{ display: 'flex', alignItems: 'center' }}
                      >{`${element.name}`}</div>
                      <div>
                        <Avatar alt="logo" src={element.logo} />
                      </div>
                    </div>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>

          {contributors.length > 0 ? (
            <>
              <div
                id="Developers Churn Visulaization"
                style={{
                  height: '40vh',
                  borderRadius: '5vh',
                  margin: '2vh 2vw 2vh 2vw',
                  background: 'white'
                }}
              >
                <h1>Developers Churn</h1>
              </div>

              <div
                id="Decentralization"
                style={{
                  height: '40vh',
                  borderRadius: '5vh',
                  margin: '2vh 2vw 2vh 2vw',
                  background: 'white'
                }}
              >
                <h1>Validator Count: </h1>
              </div>

              <div
                id="Performance Analytics"
                style={{
                  height: '40vh',
                  borderRadius: '5vh',
                  margin: '2vh 2vw 2vh 2vw',
                  background: 'white'
                }}
              >
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

              <div
                style={{
                  height: '20vh',
                  borderRadius: '5vh',
                  margin: '2vh 2vw 2vh 2vw',
                  background: 'white'
                }}
              >
                <div>
                  <h1>Contributors: </h1>
                </div>
                <Box
                  sx={{
                    height: '100%',
                    marginLeft: '1vw'
                  }}
                  style={{
                    alignItems: 'center'
                  }}
                >
                  <FormControl sx={{ width: 260, height: 80 }}>
                    <InputLabel id="demo-simple-select-label">
                      Contributors
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={selectedContributor}
                      label="Contributors"
                      onChange={handleChooseContributor}
                      style={{ justifyContent: 'center' }}
                    >
                      {contributors.map((element, index) => (
                        <MenuItem
                          key={index}
                          value={element.login}
                          onClick={() => {
                            // window.open(element.htmlUrl)
                            handleChoosingContributor(element.login).catch(
                              (e) => {}
                            )
                          }}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                          }}
                        >
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '11vw'
                            }}
                          >
                            <div
                              style={{
                                display: 'flex',
                                alignItems: 'center'
                              }}
                            >{`${element.login}`}</div>
                            <div>
                              <Avatar
                                alt="login_name"
                                src={element.avatarUrl}
                              />
                            </div>
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
              </div>
            </>
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
              <div
                id="tweets-container"
                style={{
                  margin: '2vh 1vw 2vh 1vw',
                  borderRadius: '5vh',
                  display: 'grid',
                  alignSelf: 'center',
                  gridTemplateColumns: '1fr 1fr 1fr',
                  gridTemplateRows: '1fr 1fr 1fr 1fr',
                  background: 'white'
                }}
              >
                {tweetsByContributor.map((tweet) => (
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '18vh',
                      width: '20vw',
                      borderRadius: '3vh',
                      margin: '1vh 1vw 1vh 1vw',
                      background: 'rgb(249,249,249)'
                    }}
                  >
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
