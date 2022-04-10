import React, { useState } from "react";
import styled from "styled-components";
import UploadImageButton from "./UploadImageButton";

const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  width: 600px;
  padding: 10px;
  background-color: #fff;
`;
const Content = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 600px;
  background-color: #fff;
  padding: 10px;
  border-top: 1px solid #eee;
  border-bottom: 1px solid #eee;
`;
const Title = styled.span`
  margin: 0;
`;
const CloseButton = styled.button``;
const Divider = styled.div`
  border-left: 4px solid black;
  height: 100px;
  margin-right: 10px;
`;

const Modal = ({ open, handleClose, addImage }) => {
  const [url, setUrl] = useState();
  const handleURLChange = (e) => setUrl(e.target.value);
  const handleConfirm = () => {
    addImage({ url });
    handleClose();
  };
  return (
    open && (
      <Container>
        <Header>
          <Title>Adicionar Imagem</Title>
          <CloseButton onClick={() => handleClose()}>x</CloseButton>
        </Header>
        <Content>
          <div>
            Endereço da Web (URL)
            <input onChange={handleURLChange} type="text" value={url} />
            <button onClick={() => handleConfirm()}>Confirmar</button>
          </div>
          <Divider />
          <UploadImageButton addImage={addImage} handleClose={handleClose} />
        </Content>
      </Container>
    )
  );
};

export default Modal;
