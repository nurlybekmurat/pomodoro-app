import { useRef } from 'react';
import styles from './period.module.css';
import { Dropdown } from '../../../../Dropdown';
import { PeriodMenu } from './PeriodMenu';
import { useAppSelector } from '../../../../../store/store';

export const Period = () => {
  const dropdown = useRef<HTMLDivElement>(null);
  const periodList = useAppSelector(state => state.period.periodList);

  return (
    <div className={styles.dropdownContainer} ref={dropdown}>
      <span className={styles.currentPeriod}>
        { periodList.currentPeriod }
      </span>
      <div className={styles.dropdownBtn}>
      <Dropdown
        isOpen={false}
        dropdownContentRootId={'dropdown_root'}
        button={
          <button
            onClick={(e: React.MouseEvent) => {
              const node = document.getElementById('dropdown_root');
              if (!node) return;
              if (!dropdown.current) return;
              node.style.position = 'absolute';
              var rect = dropdown.current.getBoundingClientRect();
              node.style.top = `${rect.bottom}px`;
              node.style.left = `${rect.left}px`;
              node.style.width = '100%';
              node.style.maxWidth = '370px';
            }}
            className={`${styles.menuButton}`}
          >
            <svg width="16" height="10" viewBox="0 0 16 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 1L8 8L1 1" stroke="#B7280F" strokeWidth="2"/>
            </svg>
          </button>
        }
      >
        <PeriodMenu 
          periodList={ periodList } 
        />
      </Dropdown>
      </div>
    </div>
  )
}