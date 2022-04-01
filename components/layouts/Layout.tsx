import { FC } from "react";
import Head from "next/head";

import { NavBar } from "../ui";

interface LayoutProps {
  title?: string;
  pokemon?: string;
}

const origin = ( typeof window  === 'undefined' ? '': window.location.origin );

export const Layout:FC<LayoutProps> = ({ children, title, pokemon }) => {


( console.log({ origin }) );

  return (
    <>
      <Head>
        <title>{ title || 'Pokémon App' }</title>
        <meta name='author' content='Maxim Nakonechnyy'/>
        <meta name='description' content={`Información sobre el pokémon ${pokemon || 'xxxx'}`}/>
        <meta name='keywords' content={`${pokemon} pokemon, pokedex, pokémon, pokédex`}/>
        <meta property="og:title" content={`Información sobre ${ title }`} />
        <meta property="og:description" content={`Esta es una página sobre ${ title }`} />
        <meta property="og:image" content={`${origin}/img/banner.png`} />
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
