import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Flappybird from '../../../components/Juegos/Flappybird'

describe('Flappybird', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Flappybird></Flappybird>)
        expect(getByTestId('flappybird')).toBeInTheDocument()
    })

    it('muestra imagen y enlace correctamente', () => {
        const { getByTestId } = render(<Flappybird></Flappybird>)
        expect(getByTestId('flappybirdImg')).toBeInTheDocument()
    })

    it('muestra descripción correctamente', () => {
        const { getByTestId } = render(<Flappybird></Flappybird>)
        expect(getByTestId('flappybirdDesc')).toBeInTheDocument()
    })
})