import * as React from "react";
import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/react";
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

enum Action {
  FETCH_IMG = "FETCH_IMG",
  FETCH_IMG_SUCCESS = "FETCH_IMG_SUCCESS",
  FETCH_IMG_ERROR = "FETCH_IMG_ERROR",
}

type StarWarsMachineContext = {
  characterData: CharacterResponse | null;
};

const starWarsMachine = createMachine<StarWarsMachineContext>({
  id: "star-wars-machine",
  initial: states.empty,
  context: {
    characterData: null,
  },
  states: {
    [states.empty]: {
      on: {
        [Action.FETCH_IMG]: {
          target: states.isLoading,
          cond: (_, event) => event.isReady,
        },
      },
    },
    [states.isLoading]: {
      on: {
        [Action.FETCH_IMG_SUCCESS]: {
          target: states.hasLoaded,
          actions: assign({
            characterData: (_, event) => event.characterData,
          }),
        },
        [Action.FETCH_IMG_ERROR]: states.hasError,
      },
    },
    [states.hasLoaded]: {
      on: {
        [Action.FETCH_IMG]: states.isLoading,
      },
    },
    [states.hasError]: {
      on: {
        [Action.FETCH_IMG]: states.isLoading,
      },
    },
  },
});

function App() {
  const [currentMachine, send] = useMachine(starWarsMachine);
  const [isReady, setIsReady] = React.useState(false);

  const fetchCharacter = async () => {
    send(Action.FETCH_IMG, { isReady });

    try {
      const data = await getCharacter(
        getRandomId(),
        Boolean(getRandomInt(-1, 1))
      );

      send(Action.FETCH_IMG_SUCCESS, { characterData: data });
    } catch {
      send(Action.FETCH_IMG_ERROR);
    }
  };

  const showPlaceholder = !currentMachine.matches(states.hasLoaded);

  return (
    <div className="App">
      <header className="App-header">
        {showPlaceholder && (
          <CharacterPlaceholder
            status={getStatus({
              isLoading: currentMachine.matches(states.isLoading),
              isEmpty: currentMachine.matches(states.empty),
              hasError: currentMachine.matches(states.hasError),
            })}
          />
        )}

        {currentMachine.matches(states.empty) && (
          <p>No data available, fetch your character!</p>
        )}

        {currentMachine.matches(states.hasError) && (
          <p style={{ color: "red" }}>There was an error :(</p>
        )}

        {currentMachine.matches(states.hasLoaded) &&
          currentMachine.context.characterData != null && (
            <CharacterDetails {...currentMachine.context.characterData} />
          )}

        <label htmlFor="is-ready" style={{ fontSize: "14px" }}>
          <input
            type="checkbox"
            id="is-ready"
            checked={isReady}
            onChange={(e) => setIsReady(e.target.checked)}
          />
          Fetch enabled
        </label>

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
