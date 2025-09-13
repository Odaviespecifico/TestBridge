const { calculateScore } = require('./supabase');
const { percentageToCEFR } = require('./supabase');

import { expect, test } from 'vitest'

test('calculateScore returns correct score, hits, and misses', () => {
    const respostasAluno = {
        q1: 'A',
        q2: 'B',
        q3: 'C',
    };
    const gabarito = {
        q1: 'A',
        q2: 'C',
        q3: 'B',
    };
    const resultado = calculateScore(respostasAluno, gabarito);
    
    expect(resultado).toEqual({
        acertos: 1,
        erros: 2,
        pontuação: '0.33',
    });
});

test('calculateScore handles empty responses', () => {
    const respostasAluno = {};
    const gabarito = {
        q1: 'A',
        q2: 'B',
        q3: 'C',
    };
    const resultado = calculateScore(respostasAluno, gabarito);

    expect(resultado).toEqual({
        acertos: 0,
        erros: 3,
        pontuação: '0.00',
    });
});

test('calculateScore handles all correct responses', () => {
    const respostasAluno = {
        q1: 'A',
        q2: 'B',
        q3: 'C',
    };
    const gabarito = {
        q1: 'A',
        q2: 'B',
        q3: 'C',
    };
    const resultado = calculateScore(respostasAluno, gabarito);

    expect(resultado).toEqual({
        acertos: 3,
        erros: 0,
        pontuação: '1.00',
    });
});

