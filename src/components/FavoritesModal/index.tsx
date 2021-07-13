import { useEffect, useCallback, useState } from 'react'

import { FaHeart, FaSadTear, FaTimes } from 'react-icons/fa'
import { useFavorites } from '../../hooks/Favorites'
import { useToast } from '../../hooks/Toast'
import api from '../../services/api'
import BoxResult from '../BoxResult'
import DotsLoader from '../DotsLoader'
import { Container, Overlay, SectionFavorites } from './styles'

interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
}

interface FavoritesModalProps {
  handleToggleModalFavorites(): void
}

const FavoritesModal: React.FC<FavoritesModalProps> = ({
  handleToggleModalFavorites,
}) => {
  const { favorites } = useFavorites()
  const { addToast } = useToast()
  const [characters, setCharacters] = useState<ICharacter[]>([])

  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)

  const getFavoritesCharacters = useCallback(async () => {
    setIsErrored(false)
    setIsLoading(true)

    if (!favorites[0]) {
      setIsErrored(true)
      setIsLoading(false)

      addToast({
        type: 'error',
        title: 'Houve um problema ao buscar.',
        description: 'Parece que você não tem nenhum personagem favorito',
      })

      return
    }

    try {
      const { data } = await api.get(`character/[${favorites}]`)

      addToast({
        type: 'info',
        title: 'Busca concluída',
        description: 'Buscamos seus personagens favoritos!',
      })

      setCharacters(data)
    } catch {
      setCharacters([])

      setIsErrored(true)
    } finally {
      setIsLoading(false)
    }
  }, [addToast, favorites])

  useEffect(() => {
    getFavoritesCharacters()
  }, [])

  return (
    <>
      <Container>
        <button type="button" onClick={handleToggleModalFavorites}>
          <FaTimes />
        </button>

        <h2>
          <FaHeart /> Seus personagens favoritos <FaHeart />
        </h2>

        {isLoading ? (
          <>
            <strong>
              Estamos buscando, só um segundinho.
              <DotsLoader color="#159fed" />
            </strong>
          </>
        ) : (
          <>
            {isErrored ? (
              <>
                <FaSadTear />
                <h3>
                  Parece que você não tem nenhum personagem como favorito,
                  favorite algum para que ele apareça aqui.
                </h3>
              </>
            ) : (
              <SectionFavorites>
                {characters[0] &&
                  characters.map(character => (
                    <BoxResult key={character.id} character={character} />
                  ))}
              </SectionFavorites>
            )}
          </>
        )}
      </Container>
      <Overlay onClick={handleToggleModalFavorites} />
    </>
  )
}

export default FavoritesModal
