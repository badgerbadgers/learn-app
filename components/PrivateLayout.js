import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import Footer from "./Footer";
import { publicLayout } from "./PublicLayout";

export const PrivateLayout = ({ children }) => (
  <>
    <NavBar />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export const privateLayout = (page) => <PrivateLayout>{page}</PrivateLayout>;
