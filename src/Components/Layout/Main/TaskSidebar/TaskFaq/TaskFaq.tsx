import styles from './taskfaq.module.css';

export const TaskFaq = () => {
  return (
    <div className={styles.faqWrapper}>
      <h1 className={`${styles.faqTitle} title`}>
        Ура! Теперь можно начать работать:
      </h1>
      <ul className={styles.faqList}>
        <li className={styles.faqItem}>
          Выберите категорию и напишите название текущей задачи
        </li>
        <li className={styles.faqItem}>
          Запустите таймер («помидор»)
        </li>
        <li className={styles.faqItem}>
          Работайте пока «помидор» не прозвонит
        </li>
        <li className={styles.faqItem}>
          Сделайте короткий перерыв (3-5 минут)
        </li>
        <li className={styles.faqItem}>
          Продолжайте работать «помидор» за «помидором», пока задача не будут выполнена. Каждые 4 «помидора» делайте длинный перерыв (15-30 минут).
        </li>
      </ul>
    </div>
  );
};

