import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import SnakeGame from '../../../components/Juegos/SnakeGame'

describe('SnakeGame', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<SnakeGame></SnakeGame>)
        expect(getByTestId('snake')).toBeInTheDocument()
    })

    it('muestra imagen y enlace correctamente', () => {
        const { getByTestId } = render(<SnakeGame></SnakeGame>)
        expect(getByTestId('snakeImg')).toBeInTheDocument()
    })

    it('muestra descripción correctamente', () => {
        const { getByTestId } = render(<SnakeGame></SnakeGame>)
        expect(getByTestId('snakeDesc')).toBeInTheDocument()
    })
})