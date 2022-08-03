import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Link from 'next/link';
import { useRouter } from 'next/router';

import {
  Container,
  InnerContainer,
  Header,
  HeaderButton,
  PokemonItemId,
  PokemonItemName,
  PokemonItemTypeWrapper,
  PokemonItemTypeSpan,
  PokemonImageWrapper,
} from "./style";

export default function DetailPokemon() {
  const [singlePokemon, setSinglePokemon] = useState({});
  const [hasFetched, setHasFetched] = useState(false);

  const router = useRouter();
  const { pname } = router.query;

  useEffect(() => {
    if (pname && !hasFetched)
      axios
        .post("https://beta.pokeapi.co/graphql/v1beta", {
          query: `
            query getPokemon {
              species: pokemon_v2_pokemonspecies(where: {name: { _eq: "${pname}" }} limit: 1) {
                id
                gender_rate
                hatch_counter
                name
                description: pokemon_v2_pokemonspeciesflavortexts(limit: 1 where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
                  flavor_text
                }
                evolutions: pokemon_v2_evolutionchain {
                  species: pokemon_v2_pokemonspecies(order_by: {order: asc}) {
                    id
                    name
                    evolves_from_species_id
                    evolutions: pokemon_v2_pokemonevolutions {
                      min_level
                      min_affection
                      min_beauty
                      min_happiness
                      gender_id
                      time_of_day
                      move: pokemon_v2_move {
                        name
                      }
                      by_held_item: pokemonV2ItemByHeldItemId {
                        name
                      }
                      item: pokemon_v2_item {
                        name
                      }
                      evolution_trigger: pokemon_v2_evolutiontrigger {
                        name
                      }
                      location: pokemon_v2_location {
                        name
                      }
                    }
                  }
                }
                egg_groups: pokemon_v2_pokemonegggroups {
                  group: pokemon_v2_egggroup {
                    name
                  }
                }
                pokemons: pokemon_v2_pokemons {
                  id
                  name
                  height
                  weight
                  types: pokemon_v2_pokemontypes {
                    type: pokemon_v2_type {
                      name
                    }
                  }
                  abilities: pokemon_v2_pokemonabilities {
                    ability: pokemon_v2_ability {
                      name
                    }
                  }
                  stats: pokemon_v2_pokemonstats {
                    base_stat
                    stat: pokemon_v2_stat {
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
          setSinglePokemon(res.data.data);
          setHasFetched(true);
        });
  }, [pname, hasFetched]);

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
        {!hasFetched || (
          <Fragment>
            <Header>
              <Link href="/">
                <HeaderButton>
                  <Image src="/ic-back.svg" width="24" height="24" alt="back" />
                </HeaderButton>
              </Link>
            </Header>
            <PokemonItemId>{hasFetched && handleIdMap(singlePokemon?.species[0]?.id) || ''}</PokemonItemId>
            <PokemonItemName>{hasFetched && handleNameFormat(singlePokemon?.species[0]?.name) || ''}</PokemonItemName>
            <PokemonItemTypeWrapper>
              {
                (hasFetched && singlePokemon?.species?.length > 0) && singlePokemon?.species[0]?.pokemons[0]?.types.map((t, tidx) => {
                  return <PokemonItemTypeSpan key={tidx}>{t.type.name}</PokemonItemTypeSpan>
                })
              }
            </PokemonItemTypeWrapper>
            <PokemonImageWrapper>
              <Image
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${singlePokemon?.species[0]?.id || 0}.png`}
                height="343px"
                width="343px"
                alt={singlePokemon?.species[0]?.name || ''}
              />
            </PokemonImageWrapper>
          </Fragment>
        )}
      </InnerContainer>
    </Container>
  );
}
