import React from 'react';

import styles from './MainScreen.module.scss';

export const MainScreen = () => {
  return (
    <div className={styles.mainScreen}>
      <div className='container'>
        <div className={styles.mainWrapper}>
          <h1 className={styles.mainTitle}>The chemical negatively charged</h1>

          <p className={styles.mainText}>
            Numerous calculations predict, and experiments confirm, that the
            force field reflects the beam, while the mass defect is not formed.
            The chemical compound is negatively charged. Twhile the mass defect
            is{' '}
          </p>

          <a className={`button ${styles.mainButton}`}>Get started</a>
        </div>
      </div>
    </div>
  );
};
