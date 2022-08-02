import { useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";

import {
  Container,
  InnerContainer,
  Heading1,
  PokemonListContainer,
  PokemonItem,
  PokemonItemId,
  PokemonItemName,
  PokemonItemTypeWrapper,
  PokemonItemTypeSpan,
} from "./style";

export default function Home() {
  const [pokemon, setPokemon] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    axios
      .post("https://beta.pokeapi.co/graphql/v1beta", {
        query: `
          query getPokemons {
            species: pokemon_v2_pokemonspecies(
              limit: 100
              offset: 0
              order_by: {id: asc}
              ) {
              id
              name
              pokemons: pokemon_v2_pokemons {
                id
                types: pokemon_v2_pokemontypes {
                  type: pokemon_v2_type {
                    name
                  }
                }
              }
            }
            
            species_aggregate: pokemon_v2_pokemonspecies_aggregate {
              aggregate {
                count
              }
            }
          }
      `,
      })
      .then((res) => {
        setPokemon(res.data.data);
        setHasFetched(true);
      });
  }, []);

  const handleIdMap = id => {
    if (id < 10) {
      return `#00${id}`;
    }
    if (id < 100) {
      return `#0${id}`;
    }
    return `#${id}`;
  };

  const handleNameFormat = name => {
    return name.replace(
      /\w\S*/g,
      function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
    );
  };

  return (
    <Container>
      <Head>
        <title>Pokédex -- Test for govtech.edu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <InnerContainer>
        <Heading1>
          Pokédex ({pokemon?.species_aggregate?.aggregate?.count || 0})
        </Heading1>
        <PokemonListContainer>
          {!pokemon?.species || pokemon?.species.map((i, idx) => {
            return (
              <PokemonItem key={idx}>
                <Image
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${i.id}.png`}
                  height="167px"
                  width="167px"
                  alt={i.name}
                />
                <PokemonItemId>{handleIdMap(i.id)}</PokemonItemId>
                <PokemonItemName>{handleNameFormat(i.name)}</PokemonItemName>
                <PokemonItemTypeWrapper>
                  {
                    i.pokemons[0].types.map((t, tidx) => {
                      return <PokemonItemTypeSpan key={tidx}>{t.type.name}</PokemonItemTypeSpan>
                    })
                  }
                </PokemonItemTypeWrapper>
              </PokemonItem>
            );
          })}
        </PokemonListContainer>
      </InnerContainer>
    </Container>
  );
}
