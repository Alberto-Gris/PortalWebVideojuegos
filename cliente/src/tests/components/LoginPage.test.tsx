import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import LoginPage from '../../components/LoginPage'

describe.skip('LoginPage', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<LoginPage></LoginPage>)
        expect(getByTestId('loginPage')).toBeInTheDocument()
    })

    it('muestra form cuando no autenticado', () => {
        const { getByTestId } = render(<LoginPage></LoginPage>)
        expect(getByTestId('loginPageUnauth')).toBeInTheDocument()
    })
})
