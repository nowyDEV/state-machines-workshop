import * as React from "react";
import { getRandomInt } from "./utils";
import { getCharacter, CharacterResponse } from "./api";
import {
  CharacterDetails,
  CharacterPlaceholder,
  PLACEHOLDER_STATUS,
} from "./CharacterDetails";
import "./App.css";

const states = {
  empty: "empty",
  isLoading: "loading",
  hasError: "error",
  hasLoaded: "loaded",
} as const;

type State = typeof states[keyof typeof states];

enum Action {
  FETCH_IMG = "FETCH_IMG",
  FETCH_IMG_SUCCESS = "FETCH_IMG_SUCCESS",
  FETCH_IMG_ERROR = "FETCH_IMG_ERROR",
}

const transitions = {
  [states.empty]: {
    [Action.FETCH_IMG]: states.isLoading,
  },
  [states.isLoading]: {
    [Action.FETCH_IMG_SUCCESS]: states.hasLoaded,
    [Action.FETCH_IMG_ERROR]: states.hasError,
  },
  [states.hasLoaded]: {
    [Action.FETCH_IMG]: states.isLoading,
  },
  [states.hasError]: {
    [Action.FETCH_IMG]: states.isLoading,
  },
};

function transition<T extends State>(
  currentState: T,
  action: keyof typeof transitions[T]
) {
  const nextState = transitions[currentState][action];

  return nextState ?? currentState;
}

function App() {
  const [currentState, setCurrentState] = React.useState<State>(states.empty);

  const updateState = (action: Action) => {
    // @ts-expect-error we omit additional guards & conditional logic here, there is an escape hatch in `return nextState ?? currentState` if we pass unsupported action
    setCurrentState((prevState) => transition(prevState, action));
  };

  const isCurrentState = (state: State) => currentState === state;

  const [characterData, setCharacterData] =
    React.useState<CharacterResponse | null>(null);

  const fetchCharacter = async () => {
    updateState(Action.FETCH_IMG);

    try {
      const data = await getCharacter(
        getRandomId(),
        Boolean(getRandomInt(-1, 1))
      );

      setCharacterData(data);
      updateState(Action.FETCH_IMG_SUCCESS);
    } catch {
      updateState(Action.FETCH_IMG_ERROR);
    }
  };

  const hasData = characterData != null;
  const showPlaceholder = !isCurrentState(states.hasLoaded);

  return (
    <div className="App">
      <header className="App-header">
        {showPlaceholder && (
          <CharacterPlaceholder
            status={getStatus({
              isLoading: isCurrentState(states.isLoading),
              isEmpty: isCurrentState(states.empty),
              hasError: isCurrentState(states.hasError),
            })}
          />
        )}

        {isCurrentState(states.empty) && (
          <p>No data available, fetch your character!</p>
        )}

        {isCurrentState(states.hasError) && (
          <p style={{ color: "red" }}>There was an error :(</p>
        )}

        {isCurrentState(states.hasLoaded) && hasData && (
          <CharacterDetails {...characterData} />
        )}

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
