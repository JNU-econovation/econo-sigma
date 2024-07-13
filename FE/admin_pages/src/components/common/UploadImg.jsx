// import React from "react";
// import { useState } from "react";
// import styled from "styled-components"

// const ImgContainer = styled.input `
//     //width: 600px;
//     //height: 900px;
// `
// const UploadImg = ({onFileSelect}) => {
//     const [imgSrc, setImgSrc] = useState(null);
//     const [preview, setPreview] = useState(null);
    
//     const onUpload = (e) => {
//         const file = e.target.files[0];
//         setImgSrc(file);
        
//         const previewUrl = URL.createObjectURL(file);
//         setPreview(previewUrl);

//         //onFileSelect(file);
//     };

//     return (
//         <div>
//             <input type="file" accept="image/*" onChange={onUpload}/>
//             {previewUrl && <img src={previewUrl} alt="Book" style={{width: '200px', height:'auto' }} />}
//         </div>
//     );
// };

//export default UploadImg;



