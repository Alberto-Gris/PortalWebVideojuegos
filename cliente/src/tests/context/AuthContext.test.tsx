import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { AuthContext, AuthProvider, useAuthContext } from '../../context/AuthContext'

describe('AuthContext', () => {
    it ('se genera correctamente', () => {
        const aux = AuthContext
        expect(aux).toBeDefined()
    })
})

describe('useAuthContext', () => {
    it ('se genera correctamente', () => {
        const aux = useAuthContext
        expect(aux).toBeDefined()
    })
})

describe.skip('AuthProvider', () => {
    it ('renderiza correctamente', () => {
        const { getByTestId } = render(<AuthProvider></AuthProvider>)
        expect(getByTestId('provider')).toBeInTheDocument()
    })
})