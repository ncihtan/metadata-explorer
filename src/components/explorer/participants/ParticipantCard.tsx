import React from "react";
import { Card, CardHeader, CardContent, Grid } from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import ChipButton from "../ChipButton";
import { Face } from "@material-ui/icons";
import Header from "../Header";
import { useExplorerContext } from "../ExplorerPage";

const ParticipantCard: React.FC = () => {
  const { store, dispatch } = useHTANMetadataExplorerStore();
  const { sheets } = useExplorerContext();

  const ids = sheets.df
    .select(row => row[store.sheetsConfig.participantIdColumn])
    .distinct()
    .toArray();

  const setParticipant = React.useCallback(
    (id: string) => dispatch({ type: "selectedParticipantId", payload: id }),
    [dispatch]
  );

  // Select the first participant in the list on first render
  React.useEffect(() => {
    if (!store.selectedParticipantId) {
      setParticipant(ids[0]);
    }
  }, [store.selectedParticipantId, ids, setParticipant]);

  return (
    <Card>
      <CardHeader title={<Header>Participants</Header>} />
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
