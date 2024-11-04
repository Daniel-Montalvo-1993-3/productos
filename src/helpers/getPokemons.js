import axios from "axios";

export const getPokemons = async (page, searchQuery) => {
  // Obtencion de lista de pokemones
  const response = await axios({
    method: "get",
    url: `${
      import.meta.env.VITE_APP_POKEMON_TCG_API
    }cards/?page=${page}&pageSize=8&q=name:${searchQuery}*`,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + import.meta.env.VITE_APP_POKEMON_TCG_API_KEY,
    },
  })
    .then(function (resp) {
      if (resp.status === 200) {
        console.log(resp.data);
        return resp.data;
      }
    })
    .catch(function (error) {
      if (error.response) {
        console.log(`${error.response.data}`);
        console.log(`${error.response.status}`);
      } else if (error.request) {
        console.log(`${error.request}`);
      } else {
        console.log(`${error.message}`);
      }
    });
  return response;
};
