import styles from './CardList.module.scss';
import { DealCard } from '../DealCard';
import { useAppSelector } from '../../hooks/useAppSelector';

import BounceLoader from 'react-spinners/BounceLoader';
import { STATUS } from '../../types/statusEnum';

export const CardList = () => {
  const { deals, status } = useAppSelector((state) => state.deals);

  return (
    <div className={styles.cardListWrapper}>
      <div className='container'>
        <h3 className={styles.cardListTitle}>Open Deals</h3>

        <div
          className='div'
          style={{ display: 'flex', justifyContent: 'center' }}
        >
          {status === STATUS.LOADING ? (
            <BounceLoader size={64} color='#b29f7e' />
          ) : (
            <div className={styles.cardList}>
              {deals.length > 0 &&
                deals.map((deal) => <DealCard deal={deal} key={deal.id} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
