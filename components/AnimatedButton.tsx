// CSS Modules
import styles from "../styles/AnimatedButton.module.css"

const AnimatedButton = (props: { text: string }) => {
  return <button className={styles.animatedButton}>{props.text}</button>
}

export default AnimatedButton