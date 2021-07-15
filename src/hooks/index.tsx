import { FavoritesProvider } from './Favorites'
import { ToastProvider } from './Toast'

export const AppProvider: React.FC = ({ children }) => {
  return (
    <ToastProvider>
      <FavoritesProvider>{children}</FavoritesProvider>
    </ToastProvider>
  )
}
