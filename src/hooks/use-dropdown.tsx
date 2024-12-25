import { useState } from 'react';

export const useDropdown = () => {
  const [currentOption, setCurrentOption] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen((prev) => !prev);

  // Change option from dropdown
  const handleOption = (value: string) => {
    setCurrentOption(value);
    setIsOpen(false);
  };

  return { currentOption, isOpen, setIsOpen, toggleDropdown, handleOption };
};