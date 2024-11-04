import axios from "axios";

export const getDataInputs = async () => {
  // Obtencion de template para generar inputs
  const response = await axios({
    method: "get",
    url: `https://run.mocky.io/v3/2280f387-5f05-499f-a15e-f0ee8c8f33cd`,
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(function (resp) {
      if (resp.status === 200) {
        console.log(resp.data);
        const jsonString = resp.data.replace(/,\s*([\]}])/g, '$1');
        return JSON.parse(jsonString);
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
