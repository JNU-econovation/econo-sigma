import React from "react";
import styled from "styled-components"
import { useState, useEffect } from 'react';

import SelectCategory from './SelectCategory';
//import UploadImg from "./UploadImg";

const FormContainer = styled.div`
  position: relative;
  top:70px;
  max-width: 65%;
  margin: 0 auto;
  //border: 1px solid #a4a4a4;
`;

const Input = styled.input`
  all: unset;
  width: 90%;
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #a4a4a4;
  
`;

const Description = styled.textarea`
  display: block;
  position: absolute;
  top: 250px;
  width: 90%;
  height: 120px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #a4a4a4;
  border-radius: 4px;
`;

const Button = styled.button`
  display: block;
  position: absolute;
  top: 410px;
  width: 20%;
  padding: 10px;
  background-color: #4D4ABF;
  color: white;
  border: none;
  border-radius: 10px;
  margin-left: 70%;
  cursor: pointer;
  &:hover {
    background-color: #423fa8;
  }
`;

const Form = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publisher: '',
    publishDate: '',
    category: '',
    description: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (image) => {
    setFormData({ ...formData, image });
  };

  const handleCategoryChange = (category) => {
    setFormData({ ...formData, category });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    
  };

  return (
    <FormContainer>
      <form onSubmit={handleSubmit}>
        
        <Input
          type="text"
          name="title"
          placeholder="도서 이름"
          value={formData.title}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="author"
          placeholder="저자"
          value={formData.author}
          onChange={handleChange}
        />
        <Input
          type="text"
          name="publisher"
          placeholder="출판사"
          value={formData.publisher}
          onChange={handleChange}
        />
        <Input
          style={{width: '40%', marginRight: `30px`}}
          type="date"
          name="publishDate"
          placeholder="출간일"
          value={formData.publishDate}
          onChange={handleChange}
        />
        <SelectCategory onCategoryChange={handleCategoryChange} />
        <Description
          name="description"
          placeholder="간단한 책 소개를 작성해주세요."
          value={formData.description}
          onChange={handleChange}
        />
        <Button type="submit">등록</Button>
      </form>
    </FormContainer>
  );
};

export default Form;
