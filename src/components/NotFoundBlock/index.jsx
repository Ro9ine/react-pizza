import styles from './NotFoundBlock.module.scss';

function NotFoundBlock() {
  return (
    <div className={styles.root}>
      <h1>
        <span>😔</span>
        <br />
        Ничего не найдено (:
      </h1>
      <p className={styles.discription}>
        К сожалениюданная страница отсутствует в нашем интернет магазине
      </p>
    </div>
  );
}

export default NotFoundBlock;
