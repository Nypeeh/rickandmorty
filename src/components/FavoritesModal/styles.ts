import { shade } from 'polished'
import styled from 'styled-components'

export const Container = styled.div`
  z-index: 2;
  position: fixed;
  top: 50%;
  left: 50%;
  background-color: white;
  color: #4b4b4b;
  width: 90vw;
  height: 90vh;
  border-radius: 1.5rem;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 1rem 2px rgba(0, 0, 0, 0.3);
  padding: 1.5rem 2%;
  overflow-y: auto;

  > button {
    position: absolute;
    top: 2%;
    right: 2%;
    background-color: #f5d3d8;
    width: 40px;
    height: 40px;
    border: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0.5rem;
    transition: 0.2s ease;

    :hover {
      background-color: #d3455b;

      > svg {
        color: white;
      }
    }

    > svg {
      font-size: 1.2rem;
      color: #d3455b;
    }
  }

  h2 {
    display: inline-block;
    width: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    padding-bottom: 1rem;
    margin-bottom: 1rem;

    > svg {
      color: #d3455b;
    }

    > svg:first-child {
      margin-right: 0.5rem;
    }

    > svg:last-child {
      margin-left: 0.5rem;
    }
  }

  > h3,
  strong {
    display: inline-block;
    width: 100%;
    text-align: center;
    font-size: 1.5rem;
    margin-top: 1rem;
    color: ${shade(0.1, '#d3455b')};
  }

  strong {
    color: #4b4b4b;
  }

  > svg {
    display: block;
    margin: 2rem auto 0;
    font-size: 5rem;
    color: ${shade(0.1, '#d3455b')};
  }
`

export const Overlay = styled.div`
  z-index: 1;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.3);
`

export const SectionFavorites = styled.div`
  margin: 2rem auto 0;
  padding: 0 3%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
