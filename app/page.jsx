"use client";

import React, { useState } from "react";
import styles from "./page.module.css";

const page = () => {
  const [name, setName] = React.useState("");
  const [pokeData, setPokeData] = React.useState(null);

  const inputName = (e) => {
    setName(e.target.value);
  };

  const ClickButton = async () => {
    if (!name.trim()) {
      return;
    }
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
    console.log(response);
    const data = await response.json();
    console.log(data);
    setPokeData(data);
  };

  return (
    <div className={styles.container}>
      <div>ポケモン検索</div>
      <div>
        <input
          type="text"
          className={styles.input}
          onChange={inputName}
          value={name}
        />
        <button onClick={ClickButton}>検索</button>
        {pokeData && (
          <div>
            <h2>{pokeData.name}</h2>
            <img src={pokeData.sprites.front_default}></img>
          </div>
        )}
      </div>
      <div>
        <a href="/test">掲示barn</a>
      </div>
      <div>
        <a href="/test2">掲示バーン</a>
      </div>
      <a href="/test3">掲示VAN</a>
    </div>
  );
};

export default page;
