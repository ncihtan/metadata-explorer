import React from "react";
import map from "lodash/map";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Grid
} from "@material-ui/core";
import BiospecimenChip from "../BiospecimenChip";
import omit from "lodash/omit";

export interface BiospecimenMetadataTableProps {
  sheets: Sheets;
  biospecimenId: string;
}

const BiospecimenMetadataTable: React.FC<BiospecimenMetadataTableProps> = ({
  sheets,
  biospecimenId
}) => {
  const { store } = useHTANMetadataExplorerStore();
  const bioDf = sheets.dfs.biospecimens;

  const biospecimen = bioDf
    .where(r => r[store.sheetsConfig.biospecimenIdColumn] === biospecimenId)
    .first();

  const filteredBiospecimen = omit(biospecimen, [
    store.sheetsConfig.biospecimenIdColumn,
    store.sheetsConfig.participantIdColumn
  ]);

  // If a value is another biospecimen ID, make it a button
  const maybeBiospecimenChip = (value: string) => {
    if (!value) {
      return <></>;
    }

    const values = value.split(", ");

    return (
      <Grid container spacing={1}>
        {values.map(v =>
          // @ts-ignore
          bioDf.at(v) ? (
            <Grid item key={v}>
              <Tooltip title="Jump to this Biospecimen">
                <BiospecimenChip id={v} />
              </Tooltip>
            </Grid>
          ) : (
            <div key={v}>{v}</div>
          )
        )}
      </Grid>
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

export default BiospecimenMetadataTable;
