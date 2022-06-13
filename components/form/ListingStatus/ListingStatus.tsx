import type { NextPage } from 'next'
import type { ChangeEventHandler } from 'react'
import type { StatusType } from '../../../lib/status_types'
import Fieldset from '../Fieldset/Fieldset'
import Legend from '../Legend/Legend'
import styles from './ListingStatus.module.css'

interface ListingStatusProps {
  status: StatusType[]
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const ListingStatus: NextPage<ListingStatusProps> = (props) => {
  return (
    <Fieldset>
      <Legend>
        Status
      </Legend>
      {props.status.map(({name, id, label, selected}) => (
        <label
          key={id}
          htmlFor={name}
          className={styles.statusLabel}
        >
          <input
            type="checkbox"
            name={name}
            value={id}
            id={name}
            defaultChecked={selected}
            onChange={props.onChange}
          />
          {label}
        </label>
      ))}
    </Fieldset>
  )
}

export default ListingStatus
