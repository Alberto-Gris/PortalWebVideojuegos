import { describe, it, expect } from 'vitest'
import { getByTestId, render, screen } from '@testing-library/react'
import LoginPage from '../../components/LoginPage'

describe('Encabezado', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<LoginPage />)
        screen.debug()
        expect(getByTestId('prueba')).toBeInTheDocument()
    })
})