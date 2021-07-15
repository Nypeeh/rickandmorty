import { useCallback, useState } from 'react'
import { FaCheck, FaHeart } from 'react-icons/fa'
import { useFavorites } from '../../hooks/Favorites'
import { Container, ImgContainer, Content, FavoriteButton } from './styles'

interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
}

interface BoxResultProps {
  character: Character
}

const BoxResult: React.FC<BoxResultProps> = ({ character }) => {
  const { favorites, addFavorite, removeFavorite } = useFavorites()

  const [isFavorite, setIsFavorite] = useState(() => {
    const isAlreadyFavorite = favorites.find(
      favorite => favorite === character.id,
    )

    if (isAlreadyFavorite) {
      return true
    }

    return false
  })

  const handleFavorite = useCallback(() => {
    addFavorite(character.id)
    setIsFavorite(!isFavorite)
  }, [addFavorite, character.id, isFavorite])

  const handleUnFavorite = useCallback(() => {
    removeFavorite(character.id)
    setIsFavorite(!isFavorite)
  }, [character.id, isFavorite, removeFavorite])

  return (
    <Container>
      <ImgContainer>
        <img src={character.image} alt={character.name} />
      </ImgContainer>

      <Content>
        <strong>{character.name}</strong>

        <p>
          Gênero:{' '}
          <b>
            {character.gender === 'unknown'
              ? 'Não informado'
              : character.gender}
          </b>
        </p>

        <p>
          Status:{' '}
          <b>
            {character.status === 'unknown'
              ? 'Não informado'
              : character.status}
          </b>
        </p>

        <p>
          Espécie: <b>{character.species}</b>
        </p>
      </Content>

      <FavoriteButton
        onClick={isFavorite ? handleUnFavorite : handleFavorite}
        isFavorite={isFavorite}
        type="button"
      >
        {isFavorite ? (
          <>
            <FaCheck /> Favoritado
          </>
        ) : (
          <>
            <FaHeart /> Favoritar
          </>
        )}
      </FavoriteButton>
    </Container>
  )
}

export default BoxResult
