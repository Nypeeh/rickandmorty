import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

import Cookies from 'js-cookie'
import { addYears } from 'date-fns'

interface FavoritesContextData {
  favorites: number[]
  addFavorite(favoriteId: number): void
  removeFavorite(favoriteId: number): void
}

const FavoritesContext = createContext<FavoritesContextData>(
  {} as FavoritesContextData,
)

export const FavoritesProvider: React.FC = ({ children }) => {
  const [favorites, setFavorites] = useState<number[]>(() => {
    const favoritesInStorage = Cookies.get('@RickAndMorty:favorites')

    if (favoritesInStorage) {
      return JSON.parse(favoritesInStorage)
    }

    return []
  })

  const addFavorite = useCallback(
    (favoriteId: number) => {
      const favoriteIdAlreadyExists = favorites.find(
        favorite => favorite === favoriteId,
      )

      if (favoriteIdAlreadyExists) {
        return
      }

      const newFavorites = [...favorites, favoriteId]

      setFavorites(newFavorites)

      Cookies.set('@RickAndMorty:favorites', JSON.stringify(newFavorites), {
        expires: addYears(new Date(), 10),
      })
    },
    [favorites],
  )

  const removeFavorite = useCallback(
    (favoriteId: number) => {
      const newFavorites = favorites.filter(favorite => favorite !== favoriteId)

      setFavorites(newFavorites)

      Cookies.set('@RickAndMorty:favorites', JSON.stringify(newFavorites), {
        expires: addYears(new Date(), 10),
      })
    },
    [favorites],
  )

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)

  if (!context) {
    throw new Error('useFavorites must be used within a ToastProvider')
  }

  return context
}
