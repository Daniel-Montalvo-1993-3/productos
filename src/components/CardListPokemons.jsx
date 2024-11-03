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
        const newCards = await getPokemons(page, searchQuery);
        
        setCards((prevCards) => [...prevCards, ...newCards.data]);
        
        if (newCards.data.length === 0 || newCards.data.length < 8) {
            setHasMore(false);
        }
    };

    useEffect(() => {
        const fetchCards = async () => {
            setCards([]);
            setHasMore(true);
            setPage(1);
            await loadCards();
        };
        fetchCards();
    }, [searchQuery]);

    useEffect(() => {
        if (page > 1) {
            loadCards();
        }
    }, [page]);

    useEffect(() => {
        dispatch(setPokemons(cards));
    }, [cards, dispatch]);

    return (
        <>
            <Container className="headerSearch" position="fixed" sx={{ margin: '20px auto 20px', padding: '20px' }}>
                <TextField
                    variant="outlined"
                    label="Buscar Pokemon por nombre"
                    fullWidth
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </Container>

            {cards.length > 0 ? (
                <InfiniteScroll
                    dataLength={cards.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    loader={<h4>Loading...</h4>}
                >
                    <Container maxWidth="xl" sx={{ margin: 'auto' }}>
                        <Grid2 container spacing={10} justifyContent={"center"} padding={'50px 16px 100px'}>
                            {cards.map((card) => (
                                <PokemonCard key={card.id} card={card} />
                            ))}
                        </Grid2>
                    </Container>
                </InfiniteScroll>
            ) : (
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
