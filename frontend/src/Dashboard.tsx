import React, { useEffect, useState } from 'react'
import { Project, _projects } from './constants/constants'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Avatar from '@mui/material/Avatar'

import Typography from '@mui/material/Typography'
import { sendDataToBackendServer } from './services/Backend'
import { Accordion } from './accordion/Accordion'
import { AccordionSummary } from './accordion/AccordionSummary'
import { AccordionDetails } from './accordion/AccordionDetails'
import { GithubContributors } from './swagger/stubs'

export const Dashboard: React.FC = () => {
  const [contributors, setContributors] = useState<GithubContributors[]>([])
  const [selectedContributor, setSelectedContributor] = useState('')
  const [projects, setProjects] = useState<Project[]>([])
  const [selectedProjectOwner, setSelectedProjectOwner] = useState('')
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChooseContributor = (event: SelectChangeEvent): void => {
    setSelectedContributor(event.target.value)
  }

  const handleAccordionDrop =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  useEffect(() => {
    setProjects(_projects)
  }, [])

  // useEffect(() => {
  //   const getContributors = async (): Promise<GithubContributors[]> => {
  //     try {
  //       const res = await sendDataToBackendServer(selectedProjectOwner)
  //       console.log('useEffect res', res)
  //       return res
  //     } catch (e) {
  //       console.log(e)
  //       return []
  //     }
  //   }

  //   getContributors()
  //     .then((res) => {
  //       setContributors(res)
  //     })
  //     .catch((e) => console.log(e))
  // }, [selectedProjectOwner])

  const getContributors = async (projectOwner: string): Promise<void> => {
    try {
      const res = await sendDataToBackendServer(projectOwner)
      setContributors(res)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleAccordionDrop('panel1')}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>Projects</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'start',
              marginLeft: '1vw'
            }}
          >
            <Box sx={{ width: 260 }}>
              <FormControl fullWidth>
                <InputLabel
                  style={{ display: 'flex', justifyContent: 'space-between' }}
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
                        getContributors(element.owner).catch((e) => {})
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
              <Box sx={{ width: 260, marginLeft: '1vw' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Contributors
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedContributor}
                    label="Contributors"
                    onChange={handleChooseContributor}
                  >
                    {contributors.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.login}
                        onClick={() => {
                          window.open(element.htmlUrl)
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
                          >{`${element.login}`}</div>
                          <div>
                            <Avatar alt="login_name" src={element.avatarUrl} />
                          </div>
                        </div>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
            ) : (
              ''
            )}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </>
  )
}
