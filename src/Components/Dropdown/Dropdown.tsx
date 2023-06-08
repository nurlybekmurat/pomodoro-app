import React, { useRef, useEffect, useState } from 'react';
import styles from './dropdown.module.css';
import { DropdownContent } from './DropdownContent';

interface IDropdownProps {
  button: React.ReactNode;
  children: React.ReactNode;
  isOpen?: boolean;
  dropdownContentRootId: string;
  onOpen?: () => void;
  onClose?: () => void;
}

const NOOP = () => {};

export function Dropdown({
  button,
  children,
  isOpen,
  dropdownContentRootId,
  onOpen = NOOP,
  onClose = NOOP,
}: IDropdownProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(isOpen);
  useEffect(() => setIsDropdownOpen(isOpen), [isOpen]);
  useEffect(
    () => (isDropdownOpen ? onOpen() : onClose()),
    [isDropdownOpen,onOpen, onClose ]
  );
  const handleOpen = (e: React.MouseEvent) => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (event.target && dropdownRef.current && !dropdownRef.current.contains(event.target as Node) && !target.contains(dropdownRef.current)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isDropdownOpen]);

  return (
    <div className={styles.container} ref={dropdownRef} data-menu>
      <div onClick={handleOpen}>{button}</div>
      {isDropdownOpen && (
        <DropdownContent
          children={children}
          dropdownContentRootId={dropdownContentRootId}
        />
      )}
    </div>
  );
}