import styles from "../styles/Home.module.css";
import NavBar from "./NavBar";
import Footer from "./Footer";

const PrivateLayout = ({ children }) => {
  return (
    <>
      <NavBar />
      <main className={styles.main}>{children}</main>
      <Footer />
    </>
  );
};

export default PrivateLayout;
