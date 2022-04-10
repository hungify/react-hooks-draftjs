import { useState, useRef } from "react";

const readDataUrl = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    // async event handlers
    reader.onload = (e) => resolve(reader.result);
    reader.onerror = (e) => reject(reader.error);
    reader.readAsDataURL(file);
  });
};

const UploadImageButton = ({ insertImage }) => {
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
    insertImage({ url: selectedFile.objectUrl });
  };

  return (
    <form>
      <input
        accept="image/*"
        type="file"
        onChange={handleChangePhotoFileInput}
        ref={fileInputRef}
      />
      <button onClick={handleChangePhotoButton}>upload image</button>
    </form>
  );
};

export default UploadImageButton;
