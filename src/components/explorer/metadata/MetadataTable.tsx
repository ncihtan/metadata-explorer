import React from "react";
import map from "lodash/map";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip
} from "@material-ui/core";
import BiospecimenChip from "../BiospecimenChip";
import omit from "lodash/omit";

export interface MetadataTableProps {
  sheets: Sheets;
  biospecimenId: string;
}

const MetadataTable: React.FC<MetadataTableProps> = ({
  sheets,
  biospecimenId
}) => {
  const { store } = useHTANMetadataExplorerStore();

  const biospecimen = sheets.df
    .where(r => r[store.sheetsConfig.biospecimenIdColumn] === biospecimenId)
    .first();

  const filteredBiospecimen = omit(biospecimen, [
    store.sheetsConfig.biospecimenIdColumn,
    store.sheetsConfig.participantIdColumn
  ]);

  const ids = sheets.df
    .select(row => row[store.sheetsConfig.biospecimenIdColumn])
    .where(id => id !== biospecimenId)
    .toArray();

  // If a value is another biospecimen ID, make it a button
  const maybeBiospecimenChip = (value: string) => {
    if (!value) {
      return null;
    }

    const values = value.split(", ");

    return (
      <>
        {values.map(v =>
          ids.includes(v) ? (
            <Tooltip title="Jump to this Biospecimen">
              <BiospecimenChip id={v} />
            </Tooltip>
          ) : (
            <>{v}</>
          )
        )}
      </>
    );
  };

  return (
    <Table size="small">
      <TableBody>
        {map(filteredBiospecimen, (value: string, key) => (
          <TableRow key={key}>
            <TableCell>{key}</TableCell>
            <TableCell>{maybeBiospecimenChip(value)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default MetadataTable;
