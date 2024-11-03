import { useEffect, useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { getPokemons } from '../helpers/getPokemons';
import { PokemonCard } from './PokemonCard';
import { Container, Grid2, Skeleton } from '@mui/material';

const CardListPokemons = () => {
    const [cards, setCards] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(1);
    const [items, setItems] = useState(new Array(8).fill(0));


    const loadCards = async () => {
        const newCards = await getPokemons(page);
        setCards((prevCards) => [...prevCards, ...newCards.data]);
        if (newCards.data.length === 0 || newCards.data.length < 8) {
            setHasMore(false);
        }
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        loadCards();
    }, []);

    return (
        <>
            {
                cards.length > 0 ?
                <InfiniteScroll
                    dataLength={cards.length}
                    next={loadCards}
                    hasMore={hasMore}
                    loader={<h4></h4>}
                >
                    <Container maxWidth="xl" sx={{ margin: 'auto' }} >
                        <Grid2 container spacing={10} justifyContent={"center"} padding={'100px 16px'} >
                            {cards.map((card) => (
                                <PokemonCard key={card.id + Math.random()} card={card} />
                            ))}
                        </Grid2>
                    </Container>
                </InfiniteScroll>
                :
                <Container maxWidth="xl" sx={{ margin: 'auto' }} >
                    <Grid2 container spacing={10} justifyContent={"center"} padding={'100px 16px'} >
                    {items.map((item) => (
                         <Grid2 key={item + Math.random()} justifyContent="center" xs={12} sm={6} md={4}>
                            <Skeleton  sx={{ bgcolor: 'grey.100' }} animation="wave" variant="rectangular" width={250} height={300} />
                            <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                            <Skeleton sx={{ bgcolor: 'grey.100' }} animation="wave" width="100%" />
                        </Grid2>
                    ))}
                    </Grid2>
                </Container>
            }
        </>
    )
}

export default CardListPokemons;
