import React from "react";
import { Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import MetadataTable from "./MetadataTable";
import { Sheets } from "../../../data/sheetsClient";
import Header from "../Header";

export interface MetadataCardProps {
  sheets: Sheets;
}

const MetadataCard: React.FC<MetadataCardProps> = ({ sheets }) => {
  const { store } = useHTANMetadataExplorerStore();

  return (
    <Card>
      <CardHeader
        title={
          <Header>
            {!!store.selectedBiospecimenId ? (
              <>
                Biospecimen Metadata:{" "}
                <strong>{store.selectedBiospecimenId}</strong>
              </>
            ) : (
              "Biospecimen Metadata"
            )}
          </Header>
        }
      />
      <CardContent>
        {store.selectedBiospecimenId ? (
          <MetadataTable
            sheets={sheets}
            biospecimenId={store.selectedBiospecimenId}
          />
        ) : (
          <Typography color="textSecondary">
            Select a biospecimen to view its metadata.
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetadataCard;
