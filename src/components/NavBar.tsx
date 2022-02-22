import styles from '../App.module.scss';

export default function NavBar() {
  return (
    <div className={styles.navbar}>
      <img src={`${process.env.PUBLIC_URL}/navigationIcon.png`} />
      <p>Interview App</p>
    </div>
  );
}
