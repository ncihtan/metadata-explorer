import React from "react";
import { fetchSheets, SheetsData, SheetsConfig } from "./sheetsClient";
import omit from "lodash/omit";

type ActionBuilder<T, P> = { type: T; payload: P };
type SetterBuilder<K extends keyof State> = ActionBuilder<K, State[K]>;
type Action =
  | SetterBuilder<"refresh">
  | SetterBuilder<"sheets">
  | SetterBuilder<"sheetsUrl">
  | SetterBuilder<"selectedTimepoint">
  | SetterBuilder<"selectedBiospecimenId">
  | SetterBuilder<"selectedParticipantId">;

interface State {
  refresh: boolean;
  sheets: SheetsData;
  sheetsUrl?: string;
  sheetsConfig: SheetsConfig;
  selectedTimepoint?: string;
  selectedParticipantId?: string;
  selectedBiospecimenId?: string;
}

function reducer(state: State, action: Action): State {
  // Cancel actions that don't update the data
  if (state[action.type] === action.payload) {
    return state;
  }

  switch (action.type) {
    case "selectedParticipantId":
      // Clear selected timepoint and biospecimen if participant changes
      return {
        ...omit(state, ["selectedTimepoint", "selectedBiospecimenId"]),
        selectedParticipantId: action.payload
      };
    case "selectedTimepoint":
      // Clear selected biospecimen if timepoint changes
      return {
        ...omit(state, ["selectedBiospecimenId"]),
        selectedTimepoint: action.payload
      };
    default:
      return { ...state, [action.type]: action.payload };
  }
}

export interface HTANMetadataExplorerStore {
  store: State;
  dispatch: (a: Action) => void;
}

const sheetsUrlStorageKey = "sheetsUrl";
const cachedSheetsUrl = localStorage.getItem(sheetsUrlStorageKey) || undefined;

const initialState: State = {
  refresh: false,
  sheets: { status: cachedSheetsUrl ? "will-fetch" : "unfetched" },
  sheetsUrl: cachedSheetsUrl,
  sheetsConfig: {
    participantIdColumn: "HTAN_PARTICIPANT_ID",
    biospecimenIdColumn: "HTAN_BIOSPECIMEN_ID",
    timepointColumn: "TIMEPOINT_LABEL",
    biospecimenTypeColumn: "BIOSPECIMEN_TYPE",
    biospecimenNeighborColumn: "ADJACENT_BIOSPECIMEN",
    biospecimenParentColumn: "PARENT_ID",
    biospecimenSheetTitle: "Biospecimens",
    clinicalSheetTitle: "Clinical - Demographic",
    temporalSheetTitle: "Biospecimen Temporal Relationships",
    spatialSheetTitle: "Biospecimen Spatial Relationships"
  }
};

const HTANMetadataExplorerStoreContext = React.createContext<
  HTANMetadataExplorerStore
>({
  store: initialState,
  dispatch: (a: Action) => {
    // noop
  }
});

export const HTANMetadataExplorerStoreProvider: React.FC = props => {
  const [store, dispatch] = React.useReducer(reducer, initialState);

  // A callback that retriggers on changes to the sheetsUrl or sheetsConfig
  const hydrate = React.useCallback(() => {
    if (store.sheetsUrl) {
      dispatch({ type: "sheets", payload: { status: "will-fetch" } });
      fetchSheets(store.sheetsUrl, store.sheetsConfig).then(sheets => {
        dispatch({
          type: "sheets",
          payload: sheets
        });
        dispatch({
          type: "refresh",
          payload: false
        });
      });
    } else {
      dispatch({ type: "sheets", payload: { status: "unfetched" } });
    }
  }, [store.sheetsUrl, store.sheetsConfig]);
  React.useEffect(() => hydrate(), [hydrate]);

  // Fire a data refresh
  React.useEffect(() => {
    if (store.refresh) {
      hydrate();
    }
  }, [store.refresh, hydrate]);

  return (
    <HTANMetadataExplorerStoreContext.Provider value={{ store, dispatch }}>
      {props.children}
    </HTANMetadataExplorerStoreContext.Provider>
  );
};

export const useHTANMetadataExplorerStore = () => {
  return React.useContext(HTANMetadataExplorerStoreContext);
};
