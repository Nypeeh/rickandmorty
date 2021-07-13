import { ChangeEvent, useCallback, useEffect, useState } from 'react'
import { FaHeart, FaSadTear } from 'react-icons/fa'

import BoxResult from '../components/BoxResult'
import DotsLoader from '../components/DotsLoader'
import FavoritesModal from '../components/FavoritesModal'
import Pagination from '../components/Pagination'
import SearchInput from '../components/SearchInput'
import { useToast } from '../hooks/Toast'
import api from '../services/api'

import {
  Container,
  Main,
  SectionResults,
  PaginationContainer,
  Favorites,
} from '../styles/Home'

interface ICharacter {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
}

interface IResultInformation {
  count: number
  pages: number
}

interface IHandleSearchCharacterProps {
  hasButtonSearchClicked: boolean
}

const Home: React.FC = () => {
  const { addToast } = useToast()

  const [characterName, setCharacterName] = useState('')
  const [characters, setCharacters] = useState<ICharacter[]>([])
  const [offset, setOffset] = useState(1)
  const [isShowModal, setIsShowModal] = useState(false)

  const [isLoading, setIsLoading] = useState(false)
  const [isErrored, setIsErrored] = useState(false)

  const [resultInfo, setResultInfo] = useState<IResultInformation>(
    {} as IResultInformation,
  )

  const handleChangeInputSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.value) {
        setCharacterName(event.target.value)
      }
    },
    [],
  )

  const handleToggleModalFavorites = useCallback(() => {
    setIsShowModal(state => !state)
  }, [])

  const handleSearchCharacter = useCallback(
    async ({ hasButtonSearchClicked }: IHandleSearchCharacterProps) => {
      if (characterName) {
        setIsErrored(false)
        setIsLoading(true)

        try {
          const { data } = await api.get(`character/?name=${characterName}`, {
            params: {
              page: offset,
            },
          })

          if (hasButtonSearchClicked) {
            addToast({
              type: 'info',
              title: 'Busca concluída',
              description: `Encontramos ${data.info.count} resultados para você!`,
            })
          }

          setCharacters(data.results)
          setResultInfo(data.info)
        } catch {
          setCharacters([])
          setResultInfo({} as IResultInformation)

          addToast({
            type: 'error',
            title: 'Houve um problema na busca',
            description: `Procuramos por ${characterName} como você nos informou, porém não achamos nada.`,
          })

          setIsErrored(true)
        } finally {
          setIsLoading(false)
        }
      }
    },
    [addToast, characterName, offset],
  )

  useEffect(() => {
    handleSearchCharacter({ hasButtonSearchClicked: false })
  }, [offset])

  return (
    <>
      <Container>
        <Main>
          <SearchInput onChange={handleChangeInputSearch} />
          <button
            onClick={() =>
              handleSearchCharacter({ hasButtonSearchClicked: true })
            }
            type="button"
          >
            {isLoading ? <DotsLoader /> : 'Procurar'}
          </button>
        </Main>

        {characters[0] ? (
          <>
            <h2>{resultInfo.count} resultado(s)</h2>

            <SectionResults>
              {characters.map(character => (
                <BoxResult key={character.id} character={character} />
              ))}
            </SectionResults>
          </>
        ) : (
          <>
            {isLoading ? (
              <h2>
                Estamos buscando, só um segundinho.
                <DotsLoader color="#159fed" />
              </h2>
            ) : (
              <>
                {isErrored ? (
                  <>
                    <h3>
                      Parece que este personagem não existe, mas não se
                      preocupe, procure outro.
                    </h3>
                    <FaSadTear />
                  </>
                ) : (
                  <>
                    <h2>
                      Buscaremos seu personagem favorito, é só pesquisar acima.
                    </h2>
                    <img src="/searching-image.svg" alt="Searching" />
                  </>
                )}
              </>
            )}
          </>
        )}

        {resultInfo.pages > 1 && (
          <PaginationContainer>
            <Pagination
              totalPages={resultInfo.pages}
              offset={offset}
              setOffset={setOffset}
            />
          </PaginationContainer>
        )}

        <Favorites onClick={() => setIsShowModal(true)}>
          <FaHeart />
          Favoritos
        </Favorites>
      </Container>

      {isShowModal && (
        <FavoritesModal
          handleToggleModalFavorites={handleToggleModalFavorites}
        />
      )}
    </>
  )
}

export default Home
