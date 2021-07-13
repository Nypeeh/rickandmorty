import styled from 'styled-components'
import { shade } from 'polished'

export const Container = styled.div`
  > h2,
  > h3 {
    display: inline-block;
    width: 100%;
    text-align: center;
    margin-top: 1.5rem;
    color: ${shade(0.2, '#159fed')};
  }

  > h3 {
    font-size: 1.5rem;
    color: ${shade(0.1, '#d3455b')};
  }

  > svg {
    display: block;
    margin: 1rem auto 0;
    font-size: 7rem;
    color: ${shade(0.1, '#d3455b')};
  }

  > img {
    display: block;
    max-width: 600px;
    max-height: 400px;
    margin: 0 auto;
  }
`

export const Main = styled.main`
  position: relative;
  background-image: url('background-main.jpg');
  background-position: 80% 20%;
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 50vh;
  background-color: red;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > button {
    z-index: 2;
    width: 95%;
    max-width: 200px;
    height: 50px;
    border-radius: 1rem;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0 1rem;
    border: 0;
    margin-top: 1rem;
    background-color: #159fed;
    color: white;
    font-size: 1.1rem;
    transition: filter 0.2s ease;

    :hover {
      filter: brightness(0.85);
    }
  }

  ::before {
    content: '';
    position: absolute;
    z-index: 1;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
`

export const SectionResults = styled.section`
  margin: 2rem auto 0;
  padding: 0 3%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`

export const PaginationContainer = styled.div`
  margin: 3rem 0;
  display: flex;
  justify-content: center;
`

export const Favorites = styled.button`
  position: fixed;
  bottom: 3%;
  right: 3%;
  background-color: #d3455b;
  color: white;
  width: 150px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 0;
  border-radius: 1rem;
  font-size: 1.1rem;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.25);
  transition: filter 0.2s ease;

  :hover {
    filter: brightness(1.2);
  }

  > svg {
    margin-right: 0.4rem;
  }
`
