import {
  Avatar,
  FormControl,
  InputLabel,
  MenuItem,
  Select
} from '@mui/material'
import React from 'react'

export interface GenericSelectOption {
  label: string | undefined
  value: string | undefined
  avatar?: string | undefined
}

// Need to prepare it for the case there is also onClick in the Select

export interface GenericSelectProps<GenericSelectOption> {
  selectedValue: GenericSelectOption
  placeHolder: string
  options: GenericSelectOption[]
  onChange: (selectedValue: string) => void
}

export function GenericSelect<T extends GenericSelectOption>(
  props: GenericSelectProps<T>
) {
  return (
    <FormControl sx={{ width: 260, height: 80 }}>
      <InputLabel>{props.placeHolder}</InputLabel>
      <Select
        value={props.selectedValue.value}
        label={props.placeHolder}
        onChange={(event: any) => props.onChange(event.target.value)}
        className={'select'}
      >
        {props.options.map((option: GenericSelectOption) => {
          return (
            <MenuItem value={option.value} className={'select-menu-item'}>
              <div className="select-menu-item-container">
                <div className="select-menu-item-container-name">
                  {`${option?.label}`}
                </div>
                <div>
                  <Avatar
                    alt={`${props.placeHolder} Avatar`}
                    src={option?.avatar}
                  />
                </div>
              </div>
            </MenuItem>
          )
        })}
      </Select>
    </FormControl>
  )
}
