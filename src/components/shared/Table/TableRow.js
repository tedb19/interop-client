import React from "react";
import { Table } from "semantic-ui-react";

export const TableRow = props => {
  return (
    <Table.Row>
      <Table.Cell collapsing>
        <strong>{props.name}</strong>
      </Table.Cell>
      <Table.Cell>{props.value}</Table.Cell>
    </Table.Row>
  );
};
