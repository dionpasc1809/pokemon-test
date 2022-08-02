import styled from 'styled-components';

export const Container = styled.div`
    width: 100%;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const InnerContainer = styled.div`
    width: 576px;
    min-height: 100vh;
    background-color: #fff;
`;

export const Heading1 = styled.h1`
    font-weight: 700;
    font-size: 1.25rem;
    width: 100%;
    padding: 0 1.5rem;
    color: #000;
`;

export const PokemonListContainer = styled.div`
    width: 100%;
    padding: 1rem 1.5rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 0.75rem;
    grid-row-gap: 0.75rem;
`;

export const PokemonItem = styled.div`
    position: relative;
    border: 1px solid rgba(0,0,0,0.5);
    padding: 0.75rem 0;
    border-radius: 1.25rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: hand;
    cursor: pointer;
`;

export const PokemonItemId = styled.span`
    font-weight: 400;
    color: #000;
    width: 100%;
    padding: 0 0.75rem;
`;

export const PokemonItemName = styled.span`
    font-weight: 700;
    color: #000;
    width: 100%;
    padding: 0 0.75rem;
`;

export const PokemonItemTypeWrapper = styled.div`
    width: 100%;
    padding: 0 0.75rem;
    display: flex;
`;

export const PokemonItemTypeSpan = styled.span`
    color: #000;
    font-size: 0.714rem;
    line-height: 1;
    border: 1px solid rgba(0,0,0,0.2);
    border-radius: 0.5rem;
    margin-right: 0.2rem;
    padding: 0.2rem 0.5rem;
`;
