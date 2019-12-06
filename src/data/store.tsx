import React from "react";
import { fetchSheets, SheetsApiResult } from "./sheetsClient";

type ActionBuilder<T, P> = { type: T; payload: P };
type SetterBuilder<K extends keyof State> = ActionBuilder<K, State[K]>;
type Action =
  | SetterBuilder<"refresh">
  | SetterBuilder<"sheets">
  | SetterBuilder<"sheetsUrl">
  | SetterBuilder<"selectedBiospecimenId">;

interface State {
  refresh: boolean;
  sheets: SheetsApiResult;
  sheetsUrl?: string;
  selectedBiospecimenId?: string;
}

function reducer(state: State, action: Action): State {
  return { ...state, [action.type]: action.payload };
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
  sheetsUrl: cachedSheetsUrl
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

  const hydrate = React.useCallback(() => {
    if (store.sheetsUrl) {
      dispatch({ type: "sheets", payload: { status: "will-fetch" } });
      fetchSheets(store.sheetsUrl).then(sheets => {
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
  }, [store.sheetsUrl]);

  React.useEffect(() => hydrate(), [hydrate]);
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
