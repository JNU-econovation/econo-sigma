import React, { useState, useCallback } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import SelectCategory from "./SelectCategory";
import UploadImg from "./UploadImg";

const StyledDiv = styled.div`
  min-width: 70rem;
`;

const Title = styled.div`
  position: absolute;
  top: 4em;
  left: 8.5em;
  margin-top: 1.8em;
  margin-left: 1.6em;
  font-size: 1.8em;
  font-weight: 700;
`;

const FormContainer = styled.div`
  text-align: left;
  position: relative;
  top: 250px;
  left: 300px;
  max-width: 65%;
  padding-left: 60px;
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
  background-color: #4d4abf;
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
  const token = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    publishYear: '',
    publisher: '',
    categories: '',
    information: '',
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

    // Check if any field is empty
    if (
      !formData.title ||
      !formData.author ||
      !formData.publishYear ||
      !formData.publisher ||
      !formData.categories ||
      !formData.information
    ) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    const response = await fetch('http://43.202.196.181:8080/api/books', {
      method: 'POST',
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    });
  
    if (response.ok) {
      console.log("성공");
      navigate('/books/all');
      alert("등록 되었습니다. 승인 검토 중...");
    } else {
      const errorData = await response.json();
      console.log(errorData.message);
    }
  };

  return (
    <div>
      <Title> 도서 등록</Title>
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <UploadImg onImageUpload={handleImageUpload} />
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
            style={{ width: '33%', marginRight: '30px', color: '#6f6f6f' }}
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
          <Button type="submit">등록</Button>
        </form>
      </FormContainer>
    </div>
  );
};

export default Form;