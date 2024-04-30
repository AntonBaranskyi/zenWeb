
import styles from './DealCard.module.scss';

import cardPhoto from '../../assets/cardPhoto.png';

export const DealCard = () => {
  return (
    <div
      className={styles.dealCard}
      style={{ background: `url("${cardPhoto}")` }}
    >
      <h4 className={styles.cardTitle}>The Marina Torch</h4>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardInfoItem}>
          <p className={styles.cardInfoText}>6 500 000 Dhs</p>
          <p className={styles.cardInfoText}>Tiket - 60 000 Dhs</p>
        </div>

        <div className={styles.cardInfoItem}>
          <p className={styles.cardInfoText}>Yield 9.25%</p>
          <p className={styles.cardInfoText}>Days left 150</p>
        </div>

        <div className={styles.cardInfoItem}>
          <p className={styles.cardInfoText}>Sold 75%</p>
        </div>
      </div>
    </div>
  );
};
