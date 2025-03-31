import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Tetris from '../../../components/Juegos/Tetris'

describe('Tetris', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Tetris></Tetris>)
        expect(getByTestId('tetris')).toBeInTheDocument()
    })

    it('muestra imagen y enlace correctamente', () => {
        const { getByTestId } = render(<Tetris></Tetris>)
        expect(getByTestId('tetrisImg')).toBeInTheDocument()
    })

    it('muestra descripción correctamente', () => {
        const { getByTestId } = render(<Tetris></Tetris>)
        expect(getByTestId('tetrisDesc')).toBeInTheDocument()
    })
})