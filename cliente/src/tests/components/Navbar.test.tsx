import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Navbar from '../../components/Navbar'

describe.skip('Navbar', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Navbar></Navbar>)
        expect(getByTestId('navbar')).toBeInTheDocument()
    })

    it('muestra link en logo', () => {
        const { getByTestId } = render(<Navbar></Navbar>)
        expect(getByTestId('linkLogo')).toBeInTheDocument()
    })
})