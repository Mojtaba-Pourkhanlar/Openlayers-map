import React, { ReactNode } from "react";
import AccordionComponent, { AccordionProps } from "react-bootstrap/Accordion";

interface AccordionItemProps {
  eventKey: string;
  header: ReactNode;
  children: ReactNode;
}

interface CustomAccordionProps
  extends Omit<AccordionProps, "defaultActiveKey"> {
  defaultActiveKey: string;
  items: AccordionItemProps[];
}

const Accordion: React.FC<CustomAccordionProps> = ({
  defaultActiveKey,
  items,
  ...rest
}) => {
  return (
    <AccordionComponent defaultActiveKey={defaultActiveKey} {...rest}>
      {items.map((item, index) => (
        <AccordionComponent.Item key={index} eventKey={item.eventKey}>
          <AccordionComponent.Header>{item.header}</AccordionComponent.Header>
          <AccordionComponent.Body>{item.children}</AccordionComponent.Body>
        </AccordionComponent.Item>
      ))}
    </AccordionComponent>
  );
};

export default Accordion;

/* 
For Example:
  const accordionItems = [
    {
      eventKey: '0',
      header: 'First Accordion',
      children: (
        <p>
          Lorem ipsum dolor sit amet First
        </p>
      ),
    },
    {
      eventKey: '1',
      header: 'Second Accordion',
      children: (
        <p>
          Lorem ipsum dolor sit amet Second
        </p>
      ),
    },
  ];
    <CustomAccordion defaultActiveKey="0" items={accordionItems} />
*/
