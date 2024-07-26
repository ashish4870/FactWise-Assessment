import React from 'react';
import './SearchBar.css';
import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  onSearchChange: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="search-bar-container">
      <span className="search-bar-icon"><BsSearch /></span>
      <input
        type="text"
        className="search-bar-input"
        placeholder="Search user"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default SearchBar;
