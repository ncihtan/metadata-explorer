import React from "react";
import {
  TextField,
  Button,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActions,
  Grid,
  makeStyles
} from "@material-ui/core";
import { useHTANMetadataExplorerStore } from "../../data/store";
import { parseGoogleSheetsUrl } from "../../data/sheetsClient";

const useStyles = makeStyles({
  container: {
    height: "100%"
  },
  card: {
    width: "30rem"
  }
});

const SheetsImportDialog: React.FC = () => {
  const classes = useStyles();

  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const [url, setUrl] = React.useState<string>("");

  const { dispatch } = useHTANMetadataExplorerStore();

  const handleChange = (
    e: React.SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    setErrorMessage("");
    setUrl(e.currentTarget.value);
  };

  const handleSubmit = () => {
    if (url) {
      if (!parseGoogleSheetsUrl(url)) {
        setErrorMessage(`${url} is not a valid Google Sheets URL.`);
      } else {
        dispatch({ type: "sheetsUrl", payload: url });
      }
    }
  };

  return (
    <Grid
      className={classes.container}
      container
      justify="center"
      alignItems="center"
      alignContent="center"
    >
      <Grid item>
        <Card className={classes.card}>
          <CardHeader title="Import Metadata" />
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              To use the explorer, please provide a link to a{" "}
              <strong>public</strong> Google Sheet containing example HTAN
              metadata.
            </Typography>
            <TextField
              autoFocus
              fullWidth
              margin="dense"
              label="Google Sheets URL"
              error={!!errorMessage}
              helperText={errorMessage}
              value={url}
              onChange={handleChange}
            />
          </CardContent>
          <CardActions>
            <Button
              onClick={handleSubmit}
              disabled={!url || !!errorMessage}
              color="primary"
            >
              Import
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default SheetsImportDialog;
