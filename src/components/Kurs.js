import React, { useState } from "react";

//ikoner
import { AiOutlineDown } from "react-icons/ai";
import { AiOutlineUp } from "react-icons/ai";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsFolderPlus } from "react-icons/bs";
import { BsTrash3 } from "react-icons/bs";

export default function Kurs(props) {
  const kurs = props.kursdata;

  const [isReadMore, setIsReadMore] = useState(false);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };

  return (
    <>
      <h1 className="kursnamn">{kurs.kursnamn}</h1>
      <h2 className="kursinfo">
        <p>Kurskod: {kurs.kurskod}</p>
        <p>Termin: {kurs.termin}</p>
        <p>
          Period:{" "}
          {kurs.period.map((prop) => {
            return <p>{prop}</p>;
          })}
        </p>
        <p>
          Block:{" "}
          {kurs.block.map((prop) => {
            return <p>{prop}</p>;
          })}
        </p>
        <p>
          Huvudområde:{" "}
          {kurs.huvudomrade.map((prop) => {
            return <p>{prop}</p>;
          })}
        </p>

        <p>Utbildningsnivå: {kurs.utbildningsniva}</p>

        <span onClick={toggleReadMore} className="read-or-hide">
          {isReadMore ? (
            <p className="läsa_mer/mindre">
              Läs mindre <AiOutlineUp />{" "}
            </p>
          ) : (
            <p className="läsa_mer/mindre">
              Läs mer <AiOutlineDown />{" "}
            </p>
          )}
        </span>

        {isReadMore && <p>HP: {kurs.hp}</p>}
        {isReadMore && <p>Ort: {kurs.ort}</p>}
        {isReadMore && (
          <a href={kurs.url}>
            {" "}
            Linnköpings univeristet- Läs mer om kurser <BsBoxArrowUpRight />
          </a>
        )}
      </h2>
import React, { useState, useEffect } from "react";
import { saveKurs, deleteKurs } from "../firebase_setup/firebase.js";
import "firebase/compat/database";
import { getAuth } from "firebase/auth";
export default function Kurs(props) {
  const kurs = props.kursdata;
  const auth = getAuth();

  const [addkurs, exists] = useState(false);

  function handleClick() {
    saveKurs(kurs);
    exists(true);
  }

  function handleDelete() {
    deleteKurs(kurs);
    exists(false);
  }

  return (
    <>
      <h1>{kurs.kursnamn}</h1>
      <p>Kurskod: {kurs.kurskod}</p>
      <p>HP: {kurs.hp}</p>
      <p>Huvudområde: {kurs.huvudomrade[0]}</p>
      <p>Utbildningsnivå: {kurs.utbildningsniva}</p>
      <p>Termin: {kurs.termin}</p>
      <p>Period: {kurs.period[0]}</p>
      <p>Block: {kurs.block[0]}</p>
      <p>Ort: {kurs.ort}</p>
      <a href={kurs.url}>Kurshemsida</a>

      {!addkurs && <button onClick={handleClick}>Lägg till kurs</button>}
      {addkurs == true && <button onClick={handleDelete}>Ta bort kurs</button>}
    </>
  );
}
