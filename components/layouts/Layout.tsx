import { FC } from "react";
import Head from "next/head";
import { NavBar } from "../ui";

interface LayoutProps {
  title?: string;
  pokemon?: string;
}

export const Layout:FC<LayoutProps> = ({ children, title, pokemon }) => {
  return (
    <>
      <Head>
        <title>{ title || 'Pokémon App' }</title>
        <meta name='author' content='Maxim Nakonechnyy'/>
        <meta name='description' content={`Información sobre el pokémon ${pokemon || 'xxxx'}`}/>
        <meta name='keywords' content={`${pokemon} pokemon, pokedex, pokémon, pokédex`}/>
      </Head>

       <NavBar />

      <main style={{
        padding: '0 20px'
      }}>
        { children }
      </main>
    </>
  )
}
