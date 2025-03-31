import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Ayuda from '../../components/Ayuda'
import { useBackground } from '../../components/BackgroundContext'

describe.skip('Ayuda', () => {
    it('renderiza correctamente', () => {
        const { result } = renderHook(() => useBackground())
        const { getByTestId } = render(<Ayuda></Ayuda>)
        expect(getByTestId('ayuda')).toBeInTheDocument()
    })
})