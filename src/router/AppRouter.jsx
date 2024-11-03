import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from "react-router-dom"
import Header from '../components/Header';

const Home = lazy(() => import('../views/Home'));
const SinglePokemon = lazy(() => import('../views/SinglePokemon'));

export const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <Header />
        <Routes location={location}>
          <Route path="/*" element={<Home />} />
          <Route path="pokemon/:name" element={ <SinglePokemon />} />
        </Routes>
      </Suspense>
    </>
  )
}
