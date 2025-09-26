import { customeName } from "@/Hook";
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
    name: string;
    value: any;
  }[];
}) => {
  return (
    <Container>
      <div>
        <CardName name={name} />
        <div style={{ marginTop: "30px" }}>
          {list?.map((item, index) => (
            <div className="value" key={index}>
              <div className="nameValue">
                {customeName({
                  name: item?.name,
                  value: item?.value,
                })}
              </div>
              <div className="name">{item.name}</div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};
