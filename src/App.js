import React, { useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import Resultados from "./Resultados";
import "./style.css";

const App = () => {
  const BASE_API_URL = "https://5cf93b05e3c79f001439b581.mockapi.io/articles";

  const [state, setState] = useState({
    query: "",
    pagination: "10",
    sort: "asc",
  });

  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [search, setSearch] = useState(false);

  const updateState = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const getResults = () => {
    if (state.query !== "") {
      let PARAMS = `?name=${state.query}&p=1&l=${state.pagination}&sortBy=name&order=${state.sort}`;
      let URI = BASE_API_URL + PARAMS;
      console.log(`[getResults] => URL: ${URI}`);
      fetch(URI)
        .then((resp) => resp.json())
        .then((data) => setResults(data))
        .catch((error) => console.log(error));
    }
    console.log(`[getResults] => Data: ${results}`);
  };

  const handlePagination = (event) => {
    if (!isNaN(event.target.value)) {
      setState({ ...state, [event.target.name]: event.target.value });
    } else {
      console.log("not a number");
    }
  };

  const setNewQuery = (query) => {
    setState({ ...state, query });
    setSuggestions([]);
  };

  const getSuggestions = () => {
    if (state.query !== "") {
      let URI = BASE_API_URL + `?name=${state.query}&p=1&l=3`;
      fetch(URI)
        .then((resp) => resp.json())
        .then((data) => setSuggestions(data))
        .catch((error) => console.log(error));
    }
  };

  useEffect(() => {
    console.log(`[useEffect getResults] => query: ${state.query}`);
    getResults(state.query, state.pagination, "id", state.sort);
  }, [search]);

  useEffect(() => {
    console.log(`[useEffect Suggestions] => query: ${state.query}`);
    getSuggestions();
  }, [state.query]);

  return (
    <section className="app">
      <h1 className="app__title">Ejemplo de consumo de API</h1>

      {/*Búsqueda*/}
      <section className="app__section app__section--search">
        <h3 className="app__heading app__heading--small">
          Comienza la búsqueda
        </h3>
        <section className="app__controls">
          <DebounceInput
            className="app__input"
            placeholder="escribe algo..."
            minLength={1}
            debounceTimeout={1000}
            name="query"
            onChange={(event) => updateState(event)}
          />
          <button className="app__cta" onClick={() => setSearch(!search)}>
            Buscar
          </button>
          <div className="app__suggestions">
            {suggestions.length > 0 && state.query !== ""
              ? suggestions.map((item) => (
                  <p
                    onClick={() => {
                      setNewQuery(item.name);
                      setSearch(!search);
                    }}
                    className="app__suggestion"
                    key={item.id}
                  >
                    {item.name}
                  </p>
                ))
              : null}
          </div>
        </section>
      </section>

      {/*Filtros*/}
      <section style={{ backgroundColor: "gray" }} className="app__section">
        <h3>Filtros</h3>
        <section className="app__sort" style={{ display: "flex" }}>
          <div className="app__sorttype">
            <p>Selecciona tipo de sort</p>
            <div>
              <input
                onClick={(event) => updateState(event)}
                type="radio"
                id="asc"
                name="sort"
                value="asc"
              />
              <label htmlFor="asc">Ascendente</label>
            </div>

            <div>
              <input
                onClick={(event) => updateState(event)}
                type="radio"
                id="desc"
                name="sort"
                value="desc"
              />
              <label htmlFor="desc">Descendente</label>
            </div>
          </div>
          <div style={{ marginLeft: "1rem" }}>
            <p>Selecciona paginación</p>
            <input
              onChange={(event) => handlePagination(event)}
              name="pagination"
              className="app__input--pag"
              placeholder="paginación.."
            />
          </div>
        </section>
      </section>
      <section className="app__resultados">
        <h1>Resultados</h1>
        <button onClick={() => setResults([])}>Limpiar</button>
        <Resultados data={results} query={state.query} />
      </section>
    </section>
  );
};

export default App;
