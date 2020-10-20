import React from 'react';
import styles from './UIGridLayout.module.css';

export const UIGridLayout = ({ children }) => (
  <div className={styles.gridContainer}>{children}</div>
);
