import styles from '../styles/Home.module.css'
import Header from './Header';

const PublicLayout = ({children}) => {

    return (
        <>
        <Header/>
        <main className={styles.main}>{children}</main>
        </>
    );
}

export default PublicLayout;