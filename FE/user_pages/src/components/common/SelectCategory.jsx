import React from "react";
import styled from "styled-components"
import { useState, useEffect } from 'react';
import { useRef } from 'react';

const SelectContainer = styled.div`
  position: relative;
  display: inline-block;
  width: 190px;
  //height: auto;
  //overflow-y: auto;
  height:${(props) => props.isOpen? '291px' : 'auto'};
  //background-color: aliceblue; 
  border: 1.5px solid transparent;
  border-image: ${(props) => props.isOpen? 'linear-gradient(to bottom, #4D4ABF, #FB8500) 1': 'none'};
  z-index: 1;
`;

const DropdownButton = styled.button`
  background-color: white;
  font-family: 'NanumSquareOTF', sans-serif;
  font-weight: 700;
  color: ${(props) =>props.isOpen ? '#4D4ABF':'#6f6f6f'};
  width: 190px;
  padding: 10px;
  font-size: 16px;
  border: ${(props) => props.isOpen? 'none':'1px solid #A8A8A8'};
  border-bottom: ${(props) => props.isOpen? '1px solid #A8A8A8':'1px solid #A8A8A8'};
  border-radius: ${(props) => props.isOpen? 'none':'5px 5px 5px 5px'};
  cursor: pointer;

`;

const SelectCategory = styled.div`
  display: block;
  position: absolute;
  background-color: white;
  width: 190px;
  margin: auto;
  z-index: 1;
`;

const Label = styled.label`
  display: block;
  padding: 8px 16px;
  cursor: pointer;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const Input = styled.input`
  margin-right: 8px;
`;

const Dropdown = ({ onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const dropdownRef = useRef(null);

  const categories = [
    '전공서적',
    'FE',
    'BE',
    'AI',
    'UI/UX',
    'AOS/IOS',
    '기타',
  ];

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (category) => {
    setSelectedCategory((prev) =>
      prev.includes(category) ? prev.filter((item) => item !== category) : [...prev, category]
    );
  };

  const handleClickOutside = (event) => {
    if (!dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    onCategoryChange(selectedCategory.join(','));
  }, [selectedCategory, onCategoryChange]);

  return (
    <SelectContainer ref={dropdownRef} isOpen={isOpen}>
      <DropdownButton onClick={handleToggle} isOpen={isOpen}>도서 카테고리 </DropdownButton>
      {isOpen && (
        <SelectCategory>
          {categories.map((category) => (
            <Label key={category}>
              <Input
                type="checkbox"
                //포함되어 있으면 체크
                checked={selectedCategory.includes(category)}
                onChange={() => handleSelect(category)}
              />
              {category}
            </Label>
          ))}
        </SelectCategory>
      )}
    </SelectContainer>
  );
};

export default Dropdown;
