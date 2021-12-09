import * as React from "react";
import { getRandomInt } from "./utils";
import { getCharacter, CharacterResponse } from "./api";
import {
  CharacterDetails,
  CharacterPlaceholder,
  PLACEHOLDER_STATUS,
} from "./CharacterDetails";
import "./App.css";

function App() {
  const [isEmpty, setIsEmpty] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const [hasLoaded, setHasLoaded] = React.useState(false);
  const [hasError, setHasError] = React.useState(false);
  const [characterData, setCharacterData] =
    React.useState<CharacterResponse | null>(null);

  const fetchCharacter = async () => {
    try {
      const data = await getCharacter(
        getRandomId(),
        Boolean(getRandomInt(-1, 1))
      );

      setCharacterData(data);
    } catch {}
  };

  const hasData = characterData != null;
  const showPlaceholder = !hasLoaded;

  return (
    <div className="App">
      <header className="App-header">
        {showPlaceholder && (
          <CharacterPlaceholder
            status={getStatus({ isLoading, isEmpty, hasError })}
          />
        )}

        {isEmpty && <p>No data available, fetch your character!</p>}

        {hasError && <p style={{ color: "red" }}>There was an error :(</p>}

        {hasLoaded && hasData && <CharacterDetails {...characterData} />}

        <p>
          <button onClick={fetchCharacter}>Fetch character</button>
        </p>
      </header>
    </div>
  );
}

function getRandomId() {
  return getRandomInt(1, 80);
}

function getStatus({
  isLoading,
  hasError,
  isEmpty,
}: {
  isLoading: boolean;
  hasError: boolean;
  isEmpty: boolean;
}) {
  if (isLoading) {
    return PLACEHOLDER_STATUS.LOADING;
  }

  if (hasError) {
    return PLACEHOLDER_STATUS.ERROR;
  }

  if (isEmpty) {
    return PLACEHOLDER_STATUS.EMPTY;
  }

  return PLACEHOLDER_STATUS.UNSET;
}

export default App;
