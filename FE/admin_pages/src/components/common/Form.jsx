import React from "react";
import styled from "styled-components"
import { useState, useEffect } from 'react';
import { useCallback } from "react";

import SelectCategory from './SelectCategory';
import UploadImg from "./UploadImg";
//import Title from "./Title";

const Title = styled.div`
    position: absolute;
    /* display: flex;
    justify-content: left;
    align-items: flex-end;
    
    gap: 0.5em; */
    top: 4em;
    left: 8.5em;
    margin-top: 1.8em;
    margin-left: 1.6em;
    font-size: 1.8em;
    font-weight: 700;
`
const FormContainer = styled.div`
  text-align: left;
  position: relative;
  top:250px;
  left: 300px;
  max-width: 65%;
  padding-left: 60px;
  //margin: auto;
  //background-color: aliceblue;
  //border: 1px solid #a4a4a4;
`;


const Input = styled.input`
  all: unset;
  width: 60%;
  padding: 10px;
  margin-top: 10px;
  margin-bottom: 20px;
  margin-left: 40px;
  border-bottom: 1px solid #a4a4a4;
  
`;

const Description = styled.textarea`
  display: block;
  position: absolute;
  top: 310px;
  width: 84%;
  height: 120px;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #a4a4a4;
  border-radius: 4px;
`;

const Button = styled.button`
  display: block;
  position: absolute;
  top: 470px;
  width: 15%;
  padding: 10px;
  background-color: #4D4ABF;
  font-weight: 700;
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
    publishYear: '',
    publisher: '',
    categories: '',
    imformation: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (image) => {
    setFormData({ ...formData, image });
  };

  const handleCategoryChange = useCallback((categories) => {
    setFormData((prevData) => ({ ...prevData, categories }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const data = new FormData();
    data.append('title', formData.title);
    data.append('author', formData.author);
    data.append('publishYear', formData.publishYear);
    data.append('publisher', formData.publisher);
    data.append('categories', formData.categories);
    data.append('information', formData.information);

    if (formData.imageURL) {
      data.append('imageURL', formData.imageURL);
    }

    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    const response = await fetch('URL', {
      method: 'POST',
      body: data,
    });
  
    if (response.ok) {
      console.log("성공");
    } else {
      console.error("error");
    }
    
  };


  return (
    <div>
    <Title> 도서 등록</Title>
    <FormContainer>
      <form onSubmit={handleSubmit}>
        <UploadImg onImageUpload={handleImageUpload}/>
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
            style={{width: '33%', marginRight: '30px', color: '#6f6f6f'}}
            type="date"
            name="publishYear"
            placeholder="출간일"
            value={formData.publishYear}
            onChange={handleChange}
          />
        <SelectCategory onCategoryChange={handleCategoryChange} />
        <Description
          name="information"
          placeholder="간단한 책 소개를 작성해주세요."
          value={formData.information}
          onChange={handleChange}
        />
        <Button type="submit" onSubmit={handleSubmit}>등록</Button>
      </form>
    </FormContainer>
    
    </div>
  );
};

export default Form;
