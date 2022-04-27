import styles from "../styles/Home.module.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        COPYRIGHT © {year} CODE THE DREAM · ALL RIGHTS RESERVED · BUILT WITH
        THOUGHT BY CODE THE DREAM LABS
      </div>
    </footer>
  );
};
export default Footer;
