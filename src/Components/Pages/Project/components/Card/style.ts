import styled from "styled-components";
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  /* border: 1px solid #3c4f65; */
  border-radius: 30px;
  overflow: hidden;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  background-color: #fff;
  height: 370px;
  &:hover {
    transform: translateY(-12px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
  }
`;

const CardImageWrapper = styled.div`
  height: 100%;
  width: 100%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CardImage = styled.img`
  width: 100%;
  height: 228px;
`;

const CardContent = styled.div`
  position: relative;
  padding: 15px 8px;
  margin: 0;
`;

const BoxSync = styled.div`
  margin: 0 0 0 10px;
  padding: 7px 15px 5px;
  position: relative;
  color: #3c4f65;
  font-weight: bolder;
  border-bottom: 2px solid #3c4f65;
`;
const CardTitle = styled.h3`
  margin: 0;
  font-size: 17px;
  color: #666;
  font-weight: 700;
`;
const CardColumn = styled.p`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 0 0 5px;
`;
const CardName = styled.p`
  font-weight: 700;
  margin: 0 0 5px 0;
  font-size: 16px;
  color: #666;
`;

export {
  CardContainer,
  CardImage,
  CardContent,
  CardTitle,
  CardColumn,
  CardName,
  BoxSync,
  CardImageWrapper,
};
