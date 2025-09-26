import { Container, CustomName } from "./Style";

export const CardName = ({ name }: { name: string }) => {
  return (
    <CustomName>
      <p>{name}</p>
    </CustomName>
  );
};
export const Card = ({
  name,
  list,
}: {
  name: string;
  list: {
    id: number;
    name: string;
    data: any;
  }[];
}) => {
  return (
    <Container>
      <div>
        <CardName name={name} />
        <div style={{ marginTop: "30px" }}>
          {list?.map((item, index) => (
            <div className="value" key={index}>
              <div className="name">{item.name}</div>
              <div className="nameValue">{item.data}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
