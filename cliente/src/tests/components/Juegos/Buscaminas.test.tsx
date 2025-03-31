import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Buscaminas from '../../../components/Juegos/Buscaminas'

describe('Buscaminas', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Buscaminas></Buscaminas>)
        expect(getByTestId('buscaminas')).toBeInTheDocument()
    })

    it('muestra imagen y enlace correctamente', () => {
        const { getByTestId } = render(<Buscaminas></Buscaminas>)
        expect(getByTestId('buscaminasImg')).toBeInTheDocument()
    })

    it('muestra descripción correctamente', () => {
        const { getByTestId } = render(<Buscaminas></Buscaminas>)
        expect(getByTestId('buscaminasDesc')).toBeInTheDocument()
    })
})