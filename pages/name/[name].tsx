import { Grid, Card, Button, Container, Text, Image } from '@nextui-org/react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import React from 'react'
import pokeApi from '../../api/pokeApi';
import { Layout } from '../../components/layouts';
import { Pokemon, PokemonListResponse, SmallPokemon } from '../../interfaces';


interface Props {
  pokemon: Pokemon
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {
  return (
    <Layout title={ pokemon.name }>
       <Grid.Container css={{ marginTop: '5px' }} gap={ 2 }>
        <Grid xs={ 12 } sm={ 4 } >
          <Card hoverable css={{ padding: '30px' }}>
            <Card.Body>
              <Card.Image 
                src={ pokemon.sprites.other?.dream_world.front_default || '/no-image.png'} 
                alt={ pokemon.name }
                height={ 200 }
                width='100%'
                />
            </Card.Body>
          </Card>
        </Grid>
        <Grid xs={ 12 } sm={ 8 }>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform='capitalize'>{ pokemon.name }</Text>

 
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites: </Text>
              <Container direction='row' justify='center' display='flex'>
                <Image 
                  src={ pokemon.sprites.front_default } 
                  alt={ pokemon.name } 
                  width={100} 
                  height={100} 
                />
                <Image 
                  src={ pokemon.sprites.front_shiny } 
                  alt={ pokemon.name } 
                  width={100} 
                  height={100} 
                />
                <Image 
                  src={ pokemon.sprites.back_default } 
                  alt={ pokemon.name} 
                  width={100} 
                  height={100} 
                />
                <Image 
                  src={ pokemon.sprites.back_shiny } 
                  alt={ pokemon.name } 
                  width={100} 
                  height={100} 
                />
              </Container>
            </Card.Body>
          </Card>
        </Grid>

      </Grid.Container>
    </Layout>
  )
}

export default PokemonByNamePage


export const getStaticPaths: GetStaticPaths = async (ctx) => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemonNames: string[] = data.results.map(pkmn => pkmn.name);

  return {
    paths: pokemonNames.map( name => ({
      params: { name }
    })),
    fallback: false
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  
  const { name } = params as { name: string };

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${name}`)

  const pokemon = {
    id: data.id,
    name: data.name,
    sprites: data.sprites,

  }


  return {
    props: {
      pokemon
    }
  }
  
}