import { useParams } from "react-router-dom";

const SinglePokemon = () => {
  const params = useParams();  
  console.log(params);
  return (
    <h1>Pokemon</h1>
  )
}

export default SinglePokemon;
