import React from 'react';
import styles from './dropdowncontent.css';
import ReactDOM from 'react-dom';

interface IDropdownContent {
  children: React.ReactNode;
  dropdownContentRootId: string;
}
export function DropdownContent({
  children,
  dropdownContentRootId,
}: IDropdownContent) {
  const node = document.getElementById(dropdownContentRootId);
  if (!node) return null;
  return ReactDOM.createPortal(
    <>
      <div className={styles.listContainer}>
        <div className={styles.list} >
          {children}
        </div>
      </div>
    </>,
    node
  );
}