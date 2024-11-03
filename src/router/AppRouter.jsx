import { lazy, Suspense } from 'react';
import { Route, Routes, useLocation } from "react-router-dom"
import Header from '../components/Header';

const Home = lazy(() => import('../views/Home'));
const SinglePokemon = lazy(() => import('../views/SinglePokemon'));
const DynamicForm = lazy(() => import('../views/DynamicForm'));


export const AppRouter = () => {
  const location = useLocation();

  return (
    <>
      <Suspense fallback={<div>Cargando...</div>}>
        <Header />
        <Routes location={location}>
          <Route path="/*" element={<Home />} />
          <Route path="pokemon/:id" element={ <SinglePokemon />} />
          <Route path="formulario" element={ <DynamicForm /> } />
        </Routes>
      </Suspense>
    </>
  )
}
