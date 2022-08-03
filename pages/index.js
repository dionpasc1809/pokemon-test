import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';

import {
  Container,
  InnerContainer,
  Heading1,
  PokemonListContainer,
  PokemonItem,
  PokemonItemShimmer,
  PokemonItemId,
  PokemonItemName,
  PokemonItemTypeWrapper,
  PokemonItemTypeSpan,
} from "./style";

export default function Home() {
  const [pokemonSpecies, setPokemonSpecies] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [hasFetched, setHasFetched] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [limit, setLimit] = useState(100);
  const [offset, setOffset] = useState(0);

  const GetPokemonData = async (limit, offset, pokemonSpecies, init=false) => {
    setTimeout(async () => {
      axios
        .post("https://beta.pokeapi.co/graphql/v1beta", {
          query: `
            query getPokemons {
              species: pokemon_v2_pokemonspecies(
                limit: ${limit}
                offset: ${offset}
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
          if (init) {
            setPokemonSpecies(res.data.data.species);
            setHasFetched(true);
          }
          else {
            setPokemonSpecies(() => {
              return [
                ...pokemonSpecies,
                ...res.data.data.species
              ];
            });
          }
          setTotalCount(res.data.data.species_aggregate.aggregate.count);
          setIsFetching(false);
        });
    }, 500);
  };

  useEffect(() => {
    if (!hasFetched) {
      setIsFetching(true);
      GetPokemonData(limit, offset, pokemonSpecies, true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFetched]);

  useEffect(() => {
    const handleScroll = () => {
      const sY = window.scrollY;
      const oH = window.outerHeight;
      const dbsH = document.body.scrollHeight;
      setScrollY(sY);

      if ((dbsH < (sY + oH + 400)) && hasFetched && !isFetching  && offset < totalCount) {
        setIsFetching(true);
        GetPokemonData(limit, offset + 100, pokemonSpecies);
        setOffset(offset + 100);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    // remove event on unmount to prevent a memory leak with the cleanup
    return (() =>{
      window.removeEventListener("scroll", handleScroll, { passive: true })
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCount, offset, limit, hasFetched, isFetching, pokemonSpecies]);

  

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

  const showLazyLoaderComponent = () => {
    if (offset < totalCount || isFetching) {
      return [1,2,3,4,5,6].map((i, idx) => {
        return <PokemonItemShimmer key={idx}></PokemonItemShimmer>
      });
    }
  };

  const renderPokemonList = () => {
    if (pokemonSpecies?.length > 0) {
      return pokemonSpecies.map((i, idx) => {
        return (
          <Link key={idx} href={`/detail/${i.name}`}>
            <PokemonItem>
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
          </Link>
        );
      });
    }
  };

  return (
    <Container>
      <Head>
        <title>Pokédex -- Test for govtech.edu</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <InnerContainer>
        <Heading1>
          Pokédex ({totalCount || 0})
        </Heading1>
        <PokemonListContainer>
          {renderPokemonList()}
          {showLazyLoaderComponent()}
        </PokemonListContainer>
      </InnerContainer>
    </Container>
  );
}
