import React from "react";

const Resultados = ({ data, query }) => {
  console.log(data.toString());
  return (
    <div className="results">
      {data.length > 0 && query !== ""
        ? data.map((res) => (
            <article className="results__result" key={res.id}>
              <figure className="results__imgs">
                <img
                  className="result__avatar"
                  src={res.avatar}
                  alt={res.name}
                />
                <img className="result__cover" src={res.coverUrl} alt="cover" />
              </figure>
              <section className="result__description">
                <p>
                  <strong>id: </strong>
                  {res.id}
                </p>
                <p>
                  <strong>name: </strong>
                  {res.name}
                </p>
                <p>
                  <strong>title: </strong>
                  {res.title}
                </p>
                <p>
                  <strong>description: </strong>
                  {res.description}
                </p>
                <p>
                  <strong>rate: </strong>
                  {res.rate}
                </p>
              </section>
            </article>
          ))
        : null}
    </div>
  );
};

export default Resultados;
