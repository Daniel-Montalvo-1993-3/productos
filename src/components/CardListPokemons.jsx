import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPokemons } from '../helpers/getPokemons';
import { PokemonCard } from './PokemonCard';
import { Container, Grid2, Skeleton, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { setPokemons } from '../redux/slices/pokemons';

const CardListPokemons = () => {
    const [cards, setCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const dispatch = useDispatch();

    const loadCards = async () => {
        // Se ejecuta la funcion que trae la peticion a la api de pokemones y se
        // setean las cards con los datos, si existian datos previos los agrega al mismo array
        const newCards = await getPokemons(page, searchQuery);
        setCards((prevCards) => [...prevCards, ...newCards.data]);
        if (newCards.data.length === 0 || newCards.data.length < 8) {
            // setHasMore evita cargar mas pokemones, se ejecuta solo en caso de   
            // que no haya datos o sean menor a los deseados
            setHasMore(false);
        }
    };

    useEffect(() => {
        // Se llama a funcion para la carga inicial de pokemones setenaod la paginacion 
        const fetchCards = async () => {
            setCards([]);
            setHasMore(true);
            setPage(1);
            await loadCards();
        };
        fetchCards();
    }, [searchQuery]);

    useEffect(() => {
        // Funcion que escucha el estado de page para la carga de pokemones solo cuando pagina 
        // sea mayor a 1 para evitar renderizados no deseados
        if (page > 1) {
            loadCards();
        }
    }, [page]);

    useEffect(() => {
        // Se guardan los datos de los pokemones en redux una vez obtenidos
        dispatch(setPokemons(cards));
    }, [cards, dispatch]);

    return (
        <>
            <Container className="headerSearch" position="fixed" sx={{ margin: '20px auto 20px', padding: '20px' }}>
                {/* Barra de busqueda */}
                <TextField
                    variant="outlined"
                    label="Buscar Pokemon por nombre"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Container>
            {/* Carga de cartas de pokemones haciendo uso de infinite scroll (se ejecuta solo cuando hace el scroll)*/}
            {cards.length > 0 ? (
                <InfiniteScroll
                    dataLength={cards.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <Container maxWidth="xl" sx={{ margin: 'auto' }}>
                        <Grid2 container spacing={10} justifyContent={"center"} padding={'50px 16px 100px'}>
                            {cards.map((card, index) => (
                                <PokemonCard key={card.id} index={index} card={card} />
                            ))}
                        </Grid2>
                    </Container>
                </InfiniteScroll>
            ) : (
                // Elementos de carga mientars se obtienen datos de pokemones
                <Container maxWidth="xl" sx={{ margin: 'auto' }}>
                    <Grid2 container spacing={10} justifyContent={"center"} padding={'100px 16px'}>
                        {new Array(8).fill(0).map((_, index) => (
                            <Grid2 key={index} justifyContent="center" xs={12} sm={6} md={4}>
                                <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" variant="rectangular" width={250} height={300} />
                                <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                                <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                            </Grid2>
                        ))}
                    </Grid2>
                </Container>
            )}
        </>
    );
};

export default CardListPokemons;
