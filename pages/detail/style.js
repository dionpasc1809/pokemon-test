import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  width: 100%;
  height: 48px;
`;

export const HeaderButton = styled.a`
  display: inline-block;
  width: auto;
  cursor: hand;
  cursor: pointer;
  padding: 0.75rem 1rem;
`;

export const PokemonItemId = styled.span`
  font-weight: 700;
  font-size: 1.125rem;
  color: #000;
  width: 100%;
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
`;

export const PokemonItemName = styled.span`
  font-weight: 700;
  font-size: 1.5rem;
  color: #000;
  width: 100%;
  padding: 0 1.5rem;
  margin-bottom: 0.5rem;
`;

export const PokemonItemTypeWrapper = styled.div`
  width: 100%;
  padding: 0.5rem 1.5rem;
  display: flex;
`;

export const PokemonItemTypeSpan = styled.span`
  color: #fff;
  font-size: 0.714rem;
  line-height: 1;
  border: 1px solid rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
  border-radius: 0.5rem;
  margin-right: 0.2rem;
  padding: 0.2rem 0.5rem;
`;

export const PokemonImageWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center;
`;
