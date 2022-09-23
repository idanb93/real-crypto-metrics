import React, { useEffect, useState } from 'react'
import { BACKEND_URL } from './constants'
import axios from 'axios'

import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import Avatar from '@mui/material/Avatar'

export const App: React.FC = () => {
  const [age, setAge] = React.useState('')
  const [contributers, setContributers] = useState([])
  const [contributer, setContributer] = useState('')

  const handleChange = (event: SelectChangeEvent) => {
    console.log('hello')
    setContributer(event.target.value)
  }

  useEffect(() => {
    axios({
      method: 'post',
      url: `${BACKEND_URL}/contributers`,
      data: {
        owner: 'solana-labs',
        repo: 'solana'
      }
    })
      .then((response) => {
        console.log(response)
        setContributers(response.data.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  return (
    <>
      <Box sx={{ width: 220 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Contributers</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={contributer}
            label="Contributers"
            onChange={handleChange}
          >
            {contributers.map((element, index) => (
              <div
                key={element.id}
                style={{ display: 'flex', justifyContent: 'space-between' }}
              >
                <MenuItem
                  key={index}
                  value={element.login}
                  onClick={() => {
                    window.location = element.html_url
                  }}
                >
                  {`${element.login}`}
                </MenuItem>
                <Avatar alt={element.login} src={element.avatar_url} />
              </div>
            ))}
          </Select>
        </FormControl>
      </Box>
    </>
  )
}
