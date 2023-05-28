import styles from './loader.module.css'

export default function Loader() {
    return (
        <div>
            <svg className={styles.loader} viewBox="25 25 50 50">
                <circle className={styles.loadCircle} r="20" cy="50" cx="50"></circle>
            </svg>
        </div>
    );
}