import React from 'react';
import styles from '@/styles/LoadingScreen.module.css';

const LoadingScreen = ({ message }: { message: string }) => {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.spinner}></div>
      <p className={styles.message}>{message}</p>
    </div>
  );
};

export default LoadingScreen;
