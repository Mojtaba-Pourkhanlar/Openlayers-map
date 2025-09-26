import styled from "styled-components";

export const Container = styled.div`
  & > div {
    position: relative;
    .value {
      margin-top: 3px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .name {
        color: #212121;
        font-size: 15px;
        font-weight: 600;
      }
      .nameValue {
        font-size: 15px;
        color: #757575;
        font-weight: 600;
        direction: ltr;
      }
    }
  }
`;
export const CustomName = styled.div`
  position: relative;
  border-bottom: 1px dashed #616161;
  margin-top: 30px;
  & > p {
    position: absolute;
    top: -17px;
    right: 0;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 5px 10px;
    background-color: #ccc;
  }
`;
