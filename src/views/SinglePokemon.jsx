import { Card, CardContent, CardMedia, Container, Grid2, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SinglePokemon = () => {
    const namePokemon = useLocation().pathname.split('/')[2];
    const pokemons = useSelector((state) => state.pokemons.list);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        console.log("po:", pokemons);
        const filteredPokemon = pokemons.filter((pokemon) => {
            return pokemon.name === namePokemon;
        });
        setPokemon(filteredPokemon);
    }, [pokemons])

    return (
        <>
            {
                pokemon.length > 0 ?
                    <>
                        <Grid2 justifyContent="center" container maxWidth="xl" sx={{ margin: 'auto' }}>
                            <Grid2 xs={12} xl={6} container justifyContent="center" alignItems="center">
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={pokemon[0].set.images.symbol}
                                    alt="Symbol"
                                    className="card-media-single"
                                />
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={pokemon[0].images?.large}
                                    alt={pokemon[0].name}
                                    className="card-media-single"
                                />
                            </Grid2>
                            <Grid2 xs={12} xl={6} container justifyContent="center" alignItems="center">
                                <Card>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={pokemon[0].set.images.logo}
                                            alt="Symbol"
                                            className="card-media-single"
                                        />
                                        <Typography variant="h5">Name: {pokemon[0].name}</Typography>
                                        <Typography variant="body2">Attaacks:{pokemon[0].attacks[0].name}</Typography>
                                        <Typography variant="body2">evolves From:{pokemon[0].evolvesFrom}</Typography>
                                        <Typography variant="body2">Series:{pokemon[0].set.series}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </>
                    :
                    <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" variant="rectangular" width={450} height={500} />
            }
        </>
    )
}

export default SinglePokemon;
