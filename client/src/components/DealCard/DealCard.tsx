import styles from './DealCard.module.scss';

// import cardPhoto from '../../assets/cardPhoto.png';
import { IDeal } from '../../types/IDeal';
import React from 'react';

type Props = {
  deal: IDeal;
};

export const DealCard: React.FC<Props> = ({ deal }) => {
  return (
    <div
      className={styles.dealCard}
      style={{ background: `url("${deal.photo}")` }}
    >
      <h4 className={styles.cardTitle}>{deal.title}</h4>

      <div className={styles.cardInfoWrapper}>
        <div className={styles.cardInfoItem}>
          <p className={styles.cardInfoText}>{`${deal.amount} Dhs`}</p>
          <p className={styles.cardInfoText}>Tiket - 60 000 Dhs</p>
        </div>

        <div className={styles.cardInfoItem}>
          <p className={styles.cardInfoText}>{`Yield ${deal.yield}`}</p>
          <p className={styles.cardInfoText}>{`Days left ${deal.days_left}`}</p>
        </div>

        <div className={styles.cardInfoItem}>
          <p
            className={styles.cardInfoText}
          >{`Sold ${deal.sold_percentage}`}</p>
        </div>
      </div>
    </div>
  );
};
