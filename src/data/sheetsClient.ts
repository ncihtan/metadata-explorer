import axios from "axios";
import omit from "lodash/omit";
import mapValues from "lodash/mapValues";
import { DataFrame } from "data-forge";

interface Unfetched {
  status: "unfetched";
}

interface WillFetch {
  status: "will-fetch";
}

interface FetchError {
  status: "error";
  error: string;
}

interface FetchSuccess<T> {
  status: "fetched";
  payload: T;
}

type Fetch<T> = Unfetched | WillFetch | FetchError | FetchSuccess<T>;

export interface Sheets {
  title: string;
  sheets: { [sheetName: string]: string[][] };
  df: DataFrame;
}

export interface SheetsConfig {
  biospecimenIdColumn: string;
  participantIdColumn: string;
  timepointColumn: string;
  biospecimenTypeColumn: string;
  biospecimenSheetTitle: string;
  clinicalSheetTitle: string;
  temporalSheetTitle: string;
  spatialSheetTitle: string;
}

export type SheetsApiResult = Fetch<Sheets>;

/**
 * Extract the spreadsheet ID from a gooogle sheets link.
 *
 * @param url A string that may be a Google Sheets URL.
 * @returns The extracted sheet ID, or `null` if the URL is invalid.
 */
export function parseGoogleSheetsUrl(url: string): string | null {
  const sheetsUrlRegex = /https:\/\/docs.google.com\/spreadsheets\/d\/([a-zA-Z0-9_-]*)(\/.*)?/;
  const matches = sheetsUrlRegex.exec(url);
  return matches ? matches[1] : null;
}

/**
 * Extract metadata and data from a JSON payload response to a spreadsheets.get request.
 * (reference: https://developers.google.com/sheets/api/reference/rest/v4/spreadsheets/get])
 *
 * Note: this function assumes the JSON payload represents a spreadsheet containing
 * metadata conforming to the HTAN data model.
 *
 * @param spreadsheet The JSON payload.
 * @returns Spreadsheet metadata and containing data
 */
function buildHTANSheets(
  spreadsheet: gapi.client.sheets.Spreadsheet,
  config: SheetsConfig
): Sheets {
  const title = spreadsheet.properties!.title!;

  const sheets = spreadsheet.sheets!.reduce((acc, sheet) => {
    let rawData: string[][] = [];
    if (sheet.data) {
      const data = sheet.data[0];
      if (data.rowData) {
        rawData = data.rowData
          .map(({ values }) => {
            if (values) {
              return values.map(value => value.formattedValue!);
            }
            return [];
          })
          .filter(row => row.filter(v => !!v).length > 0);
      }
    }
    return { ...acc, [sheet.properties!.title!]: rawData };
  }, {} as Sheets["sheets"]);

  const df = joinSheetsAsDf(sheets, config);

  return {
    title,
    sheets,
    df
  };
}

function joinSheetsAsDf(
  sheets: Sheets["sheets"],
  config: SheetsConfig
): DataFrame {
  const sheetDfs = mapValues(sheets, data => {
    const [columnNames, ...rows] = data;
    return new DataFrame({ columnNames, rows });
  });

  // Infer participants
  const participantsData = sheetDfs[config.biospecimenSheetTitle]
    .select(row => {
      const biospecimenId = row[config.biospecimenIdColumn] as string;
      const participantId = biospecimenId.split("_", 2).join("_");
      return [biospecimenId, participantId];
    })
    .toArray();
  const participantsDf = new DataFrame({
    rows: participantsData,
    columnNames: [config.biospecimenIdColumn, config.participantIdColumn]
  });

  function joinOnId(left: DataFrame, right: DataFrame): DataFrame {
    // @ts-ignore
    return left.joinOuterLeft(
      right,
      l => l[config.biospecimenIdColumn],
      r => r[config.biospecimenIdColumn],
      (l, r) => ({ ...l, ...omit(r, config.biospecimenIdColumn) })
    );
  }

  const joinedDf = joinOnId(
    joinOnId(
      joinOnId(
        joinOnId(
          sheetDfs[config.biospecimenSheetTitle],
          sheetDfs[config.temporalSheetTitle]
        ),
        sheetDfs[config.spatialSheetTitle]
      ),
      sheetDfs[config.clinicalSheetTitle]
    ),
    participantsDf
  );

  const sortedDf = joinedDf
    .orderBy(row =>
      // Order by Participant ID
      parseInt(row[config.participantIdColumn].split("_").slice(-1))
    )
    .orderBy(row =>
      // Order by Biospecimen ID
      parseInt(row[config.biospecimenIdColumn].split("_").slice(-1))
    );

  // @ts-ignore
  return sortedDf;
}

export async function fetchSheets(
  sheetsUrl: string,
  config: SheetsConfig
): Promise<SheetsApiResult> {
  const sheetId = parseGoogleSheetsUrl(sheetsUrl);

  if (!sheetId) {
    const error = `${sheetsUrl} is not a valid Google Sheets URL.`;
    return { status: "error", error };
  }

  try {
    const { data } = await axios.get(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}`,
      {
        params: {
          key: process.env.REACT_APP_SHEETS_API_KEY,
          includeGridData: true
        }
      }
    );
    const payload = buildHTANSheets(data, config);

    return { status: "fetched", payload };
  } catch (e) {
    console.error(e);
    return { status: "error", error: e.message };
  }
}
