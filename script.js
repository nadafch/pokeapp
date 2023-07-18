//search data
$(".search-button").on("click", function () {
  let content = `loading...`;
  $.ajax({
    url: `https://pokeapi.co/api/v2/pokemon/` + $(".input-keyword").val(),
    success: (results) => {
      content = showItem(results);
      $(".card-wrapper").html(content);
      $(".card").on("click", function () {
        console.log(showDetail(results));
        $(".detail-wrapper").html(showDetail(results));
      });
    },
    error: (error) => console.log(error.statusText),
  });
});

// fetch data
$.ajax({
  url: "https://pokeapi.co/api/v2/pokemon?limit=12",
  success: (response) => {
    const results = response.results;
    let card = "";
    results.map((item) => {
      card += showItem(item);
    });
    $(".card-wrapper").html(card);

    //detail data
    $(".card").on("click", function () {
      $.ajax({
        url: $(this).data("detail"),
        success: (item) => {
          let detail = ``;
          detail += showDetail(item);
          $(".detail-wrapper").html(detail);
        },
        error: (e) => {
          console.log(e.responseText);
        },
      });
    });
  },
  error: (e) => {
    console.log(e.responseText);
  },
});

function showItem(item) {
  return `<div class="card" data-detail="${item.url}">
          <img src="https://img.pokemondb.net/artwork/large/${item.name}.jpg" alt="image" />
          <div class="card-title">${item.name}</div>
          </div>`;
}

function showDetail(item) {
  let types = "";
  let abilities = "";
  let stats = "";

  item.types.map(
    (type) => (types += `<div class="type">${type.type.name}</div>`)
  );

  item.abilities.map((ability) =>
    ability.is_hidden === false
      ? (abilities += `<div class="ability">${ability.ability.name}</div>`)
      : (abilities += `<div class="ability hidden">${ability.ability.name}</div>`)
  );

  item.stats.map(
    (stat) =>
      (stats += `<div class="badge">
                  <div class="badge-type ${stat.stat.name}">
                  ${stat.stat.name.substring(0, 3)}
                  </div>
                  <div>${stat.base_stat}</div>
                  </div>`)
  );

  return `<img src="https://play.pokemonshowdown.com/sprites/xyani/${item.name}.gif"/>
          <div class="detail-content">
          <strong>${item.name}</strong>
          <p>TYPES</p>
          <div class="types-wrapper">
          ${types}
          </div>
          <p>ABILITIES</p>
          <div class="abilities-wrapper">
          ${abilities}
          </div>
          <p>STATS</p>
          <div class="stats-wrapper">
          ${stats}
          </div>
          </div>`;
}
