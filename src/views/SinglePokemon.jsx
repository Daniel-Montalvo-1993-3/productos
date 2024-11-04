import { Card, CardContent, CardMedia, Grid2, Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const SinglePokemon = () => {
    const idPokemon = useLocation().pathname.split('/')[2];
    const pokemons = useSelector((state) => state.pokemons.list);
    const [pokemon, setPokemon] = useState([]);

    useEffect(() => {
        // Funcion que filtra los datos del pokemon que se quiere ver 
        // mediante el parametro pasado a la ruta y el store
        const filteredPokemon = pokemons.filter((pokemon) => {
            return pokemon.id === idPokemon;
        });
        setPokemon(filteredPokemon);
    }, [pokemons])

    // Seteo de estilos para la carta
    const cardStyle = {
        boxShadow: 'none',
        border: 'none',
    };

    return (
        <>
            {
                pokemon.length > 0 ?
                    <>
                        <Grid2 container justifyContent="center" maxWidth="xl" sx={{ margin: 'auto' }}>
                            {/* Represntacion de carta y texto del pokemon */}
                            <Grid2 xs={12} md={6} container justifyContent="center" alignItems="center">
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={pokemon[0].images?.large}
                                    alt={pokemon[0].name}
                                    className="card-media-single"
                                />
                            </Grid2>
                            <Grid2 xs={12} md={6} container justifyContent="center" alignItems="center">
                                <Card style={cardStyle}>
                                    <CardContent>
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={pokemon[0].set.images.symbol}
                                            alt="Symbol"
                                            className="card-media-symbol"
                                        />
                                        <CardMedia
                                            component="img"
                                            height="auto"
                                            image={pokemon[0].set.images.logo}
                                            alt="Symbol"
                                            className="card-media-logo"
                                        />
                                        <Typography variant="h5">Name: {pokemon[0].name}</Typography>
                                        <Typography variant="body2">Attacks: {pokemon[0].attacks[0].name}</Typography>
                                        <Typography variant="body2">Evolves From: {pokemon[0].evolvesFrom}</Typography>
                                        <Typography variant="body2">Series: {pokemon[0].set.series}</Typography>
                                    </CardContent>
                                </Card>
                            </Grid2>
                        </Grid2>
                    </>
                    :
                    // Elementos de carga mientars se obtienen datos de pokemones
                    <Grid2 container justifyContent="center" maxWidth="xl" sx={{ margin: 'auto', paddingTop: '50px' }}>
                        <Grid2 xs={12} md={6} container justifyContent="center" alignItems="center">
                            <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" variant="rectangular" width={450} height={500} />
                        </Grid2>
                        <Grid2 xs={12} md={6} container justifyContent="center" alignItems="center">
                            <Card style={cardStyle}>
                                <CardContent>
                                    <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width={450} />
                                    <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                                    <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                                </CardContent>
                            </Card>
                        </Grid2>
                    </Grid2>
            }
        </>
    )
}

export default SinglePokemon;
