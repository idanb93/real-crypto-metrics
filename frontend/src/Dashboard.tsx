import React, { useEffect, useState } from 'react'
import { projects } from './constants/constants'

import { styled } from '@mui/material/styles'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Avatar from '@mui/material/Avatar'

import MuiAccordion, { AccordionProps } from '@mui/material/Accordion'
import MuiAccordionSummary, {
  AccordionSummaryProps
} from '@mui/material/AccordionSummary'
import MuiAccordionDetails from '@mui/material/AccordionDetails'
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp'
import Typography from '@mui/material/Typography'
import { sendDataToBackendServer } from './services/Backend'

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  width: '30vw',
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0
  },
  '&:before': {
    display: 'none'
  }
}))

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)'
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1)
  }
}))

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)'
}))

export const Dashboard: React.FC = () => {
  const [contributors, setContributors] = useState([])
  const [contributor, setContributor] = useState('')
  const [projectOwner, setProjectOwner] = useState('')
  const [expanded, setExpanded] = useState<string | false>('panel1')

  const handleChange = (event: SelectChangeEvent) => {
    setContributor(event.target.value)
  }

  const handleChange2 =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false)
    }

  return (
    <>
      <Accordion
        expanded={expanded === 'panel1'}
        onChange={handleChange2('panel1')}
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
            <Box sx={{ width: 250 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Projects</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={projectOwner}
                  label="Projects"
                  onChange={handleChange}
                >
                  {projects.map((element, index) => (
                    <MenuItem
                      key={index}
                      value={element.owner}
                      onClick={async () => {
                        setProjectOwner(element.owner)
                        const resArray = await sendDataToBackendServer(
                          'contributors',
                          element.owner
                        )
                        resArray
                          ? setContributors(resArray)
                          : alert('There was a problem with the request')
                      }}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      {`${element.name}`}
                      <Avatar alt="logo" src={element.logo} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>

            {contributors.length > 0 ? (
              <Box sx={{ width: 250, marginLeft: '1vw' }}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Contributers
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={contributor}
                    label="Contributers"
                    onChange={handleChange}
                  >
                    {contributors.map((element, index) => (
                      <MenuItem
                        key={index}
                        value={element.login}
                        onClick={() => {
                          window.open(element.html_url)
                        }}
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        {`${element.login}`}
                        <Avatar alt={element.login} src={element.avatar_url} />
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
