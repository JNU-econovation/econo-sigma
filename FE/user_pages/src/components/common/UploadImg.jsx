import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { ReactComponent as PlaceholderImg} from "../../assets/PlaceholderImg.svg";


const ImgContainer = styled.div`
  display: inline-block;
  float: left;
  position: relative;
  border: 2px solid transparent;
  border-image: linear-gradient(to bottom, #4D4ABF, #FB8500) 1;
  
  width: 210px;
  height: 280px;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  background-color: white;
  &:hover {
    background-color: #f9f9f9;
  }
`;

const ImagePreview = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Placeholder = styled(PlaceholderImg)`
    width: 100%;
    height: 100%;
    cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const ErrorMessage = styled.p`
  font-size: 12px;
`;

const UploadImg = ({ onImageUpload }) => {
    const [image, setImage] = useState(null);
    const [error, setError] = useState('');
  
    const handlePlaceholderClick = () => {
        document.getElementById('imageUpload').click();
    };

    const handleImageUpload = (e) => {
      const file = e.target.files[0];
      if (file) {
        if (file.type.startsWith('image/')) {
          setImage(URL.createObjectURL(file));
          setError('');
          //이미지 파일 폼 컴포넌트로 전달하기
          onImageUpload(file);
        } else {
          setError('사용 불가능한 파일');
        }
      }
    };

  return (
    <ImgContainer onClick={handlePlaceholderClick}>
      <FileInput
        type="file"
        accept="image/*"
        id="imageUpload"
        onChange={handleImageUpload}
      />
      {image ? (
        <ImagePreview src={image} alt="Uploaded Preview" />
      ) : (
        <Placeholder  alt="Placeholder" />
        
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </ImgContainer>
  );
};

export default UploadImg;


