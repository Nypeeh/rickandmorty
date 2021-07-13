import styled, { css } from 'styled-components'

interface FavoriteButtonProps {
  isFavorite: boolean
}

export const Container = styled.div`
  max-width: 300px;
  margin: 1rem;
  background-color: white;
  box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.1);
  border-radius: 1rem;
  cursor: pointer;
  transition: box-shadow 0.2s ease;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 1rem;

  :hover {
    box-shadow: 0 0 16px 2px rgba(0, 0, 0, 0.3);
  }
`

export const ImgContainer = styled.div`
  width: 100%;
  height: 170px;

  > img {
    border-radius: 1rem 1rem 0 0;
    display: block;
    width: 100%;
    height: 100%;
  }
`

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.8rem 0;

  strong {
    margin: 0 0 0.9rem;
    color: #4b4b4b;
  }

  p {
    font-size: 0.9rem;

    b {
      color: #159fed;
    }
  }
`

export const FavoriteButton = styled.button<FavoriteButtonProps>`
  border: 0;
  margin-top: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 35px;
  width: 90%;
  border-radius: 0.3rem;
  font-size: 1rem;
  color: white;
  background-color: #d3455b;
  transition: filter 0.2s ease;

  > svg:first-child {
    margin-right: 0.4rem;
  }

  :hover {
    filter: brightness(1.1);
  }

  ${({ isFavorite }) =>
    isFavorite &&
    css`
      background-color: #00bfa5;
    `}
`
