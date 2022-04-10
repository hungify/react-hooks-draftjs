import { useState, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const readDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // async event handlers
    reader.onload = (e) => resolve(reader.result);
    reader.onerror = (e) => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const UploadImageButton = ({ addImage, handleClose }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState({
    file: null,
    base64: null,
    objectUrl: null,
  });

  const handleChangePhotoFileInput = (e) => {
    const target = e.currentTarget;
    const file = target.files.item(0);
    // store reference to the File object and a base64 representation of it
    readDataUrl(file).then((dataUrl) => {
      setSelectedFile({
        ...selectedFile,
        file,
        base64: dataUrl,
        objectUrl: URL.createObjectURL(file),
      });
    });
  };

  const handleChangePhotoButton = (e) => {
    e.preventDefault();
    addImage({ url: selectedFile.objectUrl });
    handleClose();
  };

  return (
    <Container>
      Fazer Upload
      <input
        accept="image/*"
        type="file"
        onChange={handleChangePhotoFileInput}
        ref={fileInputRef}
      />
      <button onClick={handleChangePhotoButton}>Confirmar</button>
    </Container>
  );
};

export default UploadImageButton;
