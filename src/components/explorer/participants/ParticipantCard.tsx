import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import ChipButton from "../ChipButton";
import { Face } from "@material-ui/icons";

export interface ParticipantsListProps {
  sheets: Sheets;
}

const ParticipantCard: React.FC<ParticipantsListProps> = ({ sheets }) => {
  const { store, dispatch } = useHTANMetadataExplorerStore();

  const ids = sheets.df
    .select(row => row[store.sheetsConfig.participantIdColumn])
    .distinct()
    .toArray();

  const setParticipant = (id: string) =>
    dispatch({ type: "selectedParticipantId", payload: id });

  // Select the first participant in the list on first render
  React.useEffect(() => {
    if (!store.selectedParticipantId) {
      setParticipant(ids[0]);
    }
  }, [store.selectedParticipantId, ids]);

  return (
    <Card>
      <CardHeader title={"Participants"} />
      <CardContent>
        <Grid container spacing={1}>
          {ids.map(id => (
            <Grid item key={id}>
              <ChipButton
                label={id}
                avatar={<Face />}
                onClick={() => setParticipant(id)}
                selected={id === store.selectedParticipantId}
              />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
