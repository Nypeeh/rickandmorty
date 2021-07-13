import { ChangeEventHandler, useCallback, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'

import { Container } from './styles'

interface SearchInputProps {
  onChange?: ChangeEventHandler<HTMLInputElement>
}

const SearchInput: React.FC<SearchInputProps> = ({ onChange }) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState(false)
  const [isFilled, setIsFilled] = useState(false)

  const handleFocus = useCallback(() => {
    setIsFocused(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    setIsFilled(!!inputRef.current?.value)
  }, [])

  return (
    <Container isFocused={isFocused} isFilled={isFilled}>
      <FaSearch />
      <input
        ref={inputRef}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={onChange}
        placeholder="Encontre o seu personagem favorito"
      />
    </Container>
  )
}

export default SearchInput
