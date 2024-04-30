import styles from './CardList.module.scss';
import { DealCard } from '../DealCard';

export const CardList = () => {
  return (
    <div className={styles.cardListWrapper}>
      <div className='container'>
        <h3 className={styles.cardListTitle}>Open Deals</h3>

        <div
          className='div'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          <div className={styles.cardList}>
            <DealCard />
            <DealCard />
            <DealCard />
            <DealCard />
          </div>
        </div>
      </div>
    </div>
  );
};
