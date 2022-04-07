import styles from "../styles/Home.module.css";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div>
        COPYRIGHT © {year} CODE THE DREAM · ALL RIGHTS RESERVED · WEBSITE BY
        CODE THE DREAM
      </div>
    </footer>
  );
};
export default Footer;
