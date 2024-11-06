import styles from './MobileHidden.module.css'

const MobileHidden: React.FC<{ children: React.ReactNode }> = ({
  children
}) => {
  return <span className={styles.mobileHidden}>{children}</span>
}

export default MobileHidden
