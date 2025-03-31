import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import SnakeT from '../../../components/Tutoriales/SnakeT'

describe.skip('TutorialSnake', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<SnakeT></SnakeT>)
        expect(getByTestId('snakeT')).toBeInTheDocument()
    })
})