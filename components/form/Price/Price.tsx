import type { NextPage } from 'next'
import styles from './Price.module.css'
import formStyles from '../../../styles/forms.module.css'
import MenuButton from '../../MenuButton/MenuButton'
import InputFromToSeparator from '../InputFromToSeparator/InputFromToSeparator'

const Price: NextPage = () => {
  return (
    <MenuButton label="Price">
      <div className={styles.price}>
        <input type="text" placeholder='Min' className={formStyles.input} />
        <InputFromToSeparator />
        <input type="text" placeholder='Max' className={formStyles.input} />
      </div>
    </MenuButton>
  )
}

export default Price
