import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Othello from '../../../components/Juegos/Othello'

describe('Othello', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Othello></Othello>)
        expect(getByTestId('othello')).toBeInTheDocument()
    })

    it('muestra imagen y enlace correctamente', () => {
        const { getByTestId } = render(<Othello></Othello>)
        expect(getByTestId('othelloImg')).toBeInTheDocument()
    })

    it('muestra descripción correctamente', () => {
        const { getByTestId } = render(<Othello></Othello>)
        expect(getByTestId('othelloDesc')).toBeInTheDocument()
    })
})