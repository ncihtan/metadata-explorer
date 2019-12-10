import React from "react";
import {
  Typography,
  Table,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import BiospecimenMetadataTable from "./BiospecimenMetadataTable";
import { useExplorerContext } from "../ExplorerPage";
import map from "lodash/map";
import MultipartCard from "../MultipartCard";

const MetadataCard: React.FC = () => {
  const { store } = useHTANMetadataExplorerStore();
  const { sheets } = useExplorerContext();

  return (
    <MultipartCard
      sections={[
        {
          header: (
            <>
              Clinical Metadata (<strong>{store.selectedParticipantId}</strong>)
            </>
          ),
          body: (
            <Table size="small">
              <TableBody>
                {map(
                  // @ts-ignore
                  sheets.dfs.clinical.at(store.selectedParticipantId!),
                  (value: string, key: string) => (
                    <TableRow key={key}>
                      <TableCell>{key.toUpperCase()}</TableCell>
                      <TableCell>{value}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          )
        },
        {
          header: (
            <>
              Biospecimen Metadata{" "}
              {store.selectedBiospecimenId && (
                <>
                  (<strong>{store.selectedBiospecimenId}</strong>)
                </>
              )}
            </>
          ),
          body: store.selectedBiospecimenId ? (
            <BiospecimenMetadataTable
              sheets={sheets}
              biospecimenId={store.selectedBiospecimenId}
            />
          ) : (
            <Typography color="textSecondary">
              Select a biospecimen to view its metadata.
            </Typography>
          )
        }
      ]}
    />
  );
};

export default MetadataCard;
