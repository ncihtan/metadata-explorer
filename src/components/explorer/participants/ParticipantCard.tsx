import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  List,
  ListItem,
  Typography
} from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../../data/store";
import { Sheets } from "../../../data/sheetsClient";
import ChipButton from "../timepoints/ChipButton";
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
      <CardHeader title={"Participants"}></CardHeader>
      <CardContent>
        <List dense>
          {ids.map(id => (
            <ListItem key={id}>
              <ChipButton
                label={id}
                avatar={<Face />}
                onClick={() => setParticipant(id)}
                selected={id === store.selectedParticipantId}
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default ParticipantCard;
