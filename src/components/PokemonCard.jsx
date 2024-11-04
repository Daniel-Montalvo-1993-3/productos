import { Card, CardContent, CardMedia, Grid2, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export const PokemonCard = ({ card, index }) => {

  // Seteando estilo de carta
  const cardStyle = {
    boxShadow: 'none', 
    border: 'none',   
  };
  

  return (
    <Grid2 justifyContent="center" xs={12} sm={6} md={4}>
      <Link style={{ textDecoration: 'none' }} to={`/pokemon/${card.id}`} >
      <Card style={cardStyle} className="cardPokemon">
        {/* Mediante el index se determina cuales imagenes contendran carga diferida y cuales seran las prioritarias  */}
        {/* para su carga y optimizacion del sitio */}
        {
          index > 3 ? 
            <CardMedia
              component="img"
              image={card.images?.small}
              alt={card.name}
              className="card-media"
              width="245"
              height="342"
              loading="lazy"
            />
          :
          <CardMedia
            component="img"
            image={card.images?.small}
            alt={card.name}
            className="card-media"
            width="245"
            height="342"
            fetchPriority="high"
          />
        }
        <CardContent>
          <Typography variant="h5">{card.name}</Typography>
          <Typography variant="body2">{card.set.name}</Typography>
        </CardContent>
      </Card>
     </Link>
    </Grid2>

  )
}
