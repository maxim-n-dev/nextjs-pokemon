import type { GetStaticProps, NextPage } from 'next'

import { Grid } from '@nextui-org/react';

import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonListResponse, SmallPokemon } from '../interfaces';
import { PokemonCard } from '../components/pokemon';


interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <Layout title='Listado de Pokémons' pokemon='Bulbasaur'>
      
      <Grid.Container gap={ 2 } justify='flex-start'>
       {
         pokemons.map(( pokemon ) => (
          <PokemonCard key={ pokemon.id } pokemon={ pokemon } />
         ))
       }
      </Grid.Container>
      
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
  
  const pokemons: SmallPokemon[] = data.results.map((pkm, i) => { 
    const id = i+1;
    const pokemon: SmallPokemon = {
      ...pkm,
      id,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg` 
    }
    return pokemon;
   });

  return {
    props: {
      pokemons
    }
  }
}

export default HomePage;
