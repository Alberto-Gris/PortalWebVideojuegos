import { describe, it, expect, afterEach, vi } from 'vitest'
import { render, renderHook, screen } from '@testing-library/react'
import Tutorial from '../../components/Tutorial'

describe('Tutorial', () => {
    it('renderiza correctamente', () => {
        const { getByTestId } = render(<Tutorial></Tutorial>)
        expect(getByTestId('tutorial')).toBeInTheDocument()
    })
})