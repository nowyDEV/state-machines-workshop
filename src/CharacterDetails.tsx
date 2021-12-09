import * as React from "react";

type Props = {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
};

export function CharacterDetails({
  name,
  height,
  mass,
  hair_color,
  skin_color,
  eye_color,
  birth_year,
  gender,
}: Props) {
  return (
    <ul
      style={{
        display: "flex",
        flexFlow: "column wrap",
        width: "200px",
        height: "200px",
      }}
    >
      <li>Name: {name}</li>
      <li>Height: {height}</li>
      <li>Mass: {mass}</li>
      <li>Hair color: {hair_color}</li>
      <li>Skin color: {skin_color}</li>
      <li>Eye color: {eye_color}</li>
      <li>Birth year: {birth_year}</li>
      <li>Gender: {gender}</li>
    </ul>
  );
}

export enum PLACEHOLDER_STATUS {
  LOADING = "loading",
  ERROR = "error",
  EMPTY = "empty",
  UNSET = "unset",
}

export function CharacterPlaceholder({
  status,
}: {
  status: PLACEHOLDER_STATUS;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "300px",
        height: "300px",
        backgroundImage: getBgImage(status),
        color: "#fff",
        textAlign: "center",
      }}
    >
      {status === PLACEHOLDER_STATUS.LOADING ? "Loading..." : ""}
    </div>
  );
}

function getBgImage(status: PLACEHOLDER_STATUS) {
  if (status === PLACEHOLDER_STATUS.LOADING) {
    return "linear-gradient(to top, #09203f 0%, #537895 100%)";
  }

  if (status === PLACEHOLDER_STATUS.ERROR) {
    return "linear-gradient(-225deg, #A445B2 0%, #D41872 52%, #FF0066 100%)";
  }

  if (status === PLACEHOLDER_STATUS.EMPTY) {
    return "linear-gradient(to top, #c4c5c7 0%, #dcdddf 52%, #ebebeb 100%)";
  }

  if (status === PLACEHOLDER_STATUS.UNSET) {
    return "linear-gradient(to right, #434343 0%, black 100%)";
  }

  throw new Error("unsupported status");
}
