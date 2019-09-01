/* global describe, expect, it */

const rdf = require('@rdfjs/data-model')
const { termToNTriples } = require('@rdfjs/to-ntriples')
const TermSet = require('..')

describe('@rdfjs/term-set', () => {
  it('should be a constructor', () => {
    expect(typeof TermSet).toBe('function')
  })

  describe('.size', () => {
    it('should be a number property', () => {
      const termset = new TermSet()

      expect(typeof termset.size).toBe('number')
    })

    it('should return the size of the index', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet([term])

      expect(termset.size).toBe(1)
    })
  })

  describe('.add', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.add).toBe('function')
    })

    it('should add the given term to the index', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet()

      termset.add(term)

      expect([...termset.index.values()][0]).toBe(term)
      expect([...termset.index.keys()][0]).toBe(termToNTriples(term))
    })

    it('should keep the term if another one with the same N-Triple representation is added', () => {
      const term0 = rdf.namedNode('http://example.org/')
      const term1 = rdf.namedNode(term0.value)
      const termset = new TermSet()

      termset.add(term0)
      termset.add(term1)

      expect(termset.index.size).toBe(1)
      expect(term0.equals([...termset.index.values()][0])).toBe(true)
    })

    it('should return the Termset itself', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet()

      termset.add(term)

      expect(termset.add(term)).toBe(termset)
    })
  })

  describe('.clear', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.clear).toBe('function')
    })

    it('should clear the index', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet([term])

      termset.clear()

      expect(termset.index.size).toBe(0)
    })
  })

  describe('.delete', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.delete).toBe('function')
    })

    it('should delete the given term', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      termset.delete(term1)

      expect(termset.index.size).toBe(1)
      expect(term0.equals([...termset.index.values()][0])).toBe(true)
    })

    it('should return true if the given term was deleted', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet([term])

      expect(termset.delete(term)).toBe(true)
    })

    it('should return false if the given term was not deleted', () => {
      const term = rdf.namedNode('http://example.org/')
      const termset = new TermSet()

      expect(termset.delete(term)).toBe(false)
    })
  })

  describe('.entries', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.entries).toBe('function')
    })

    it('should return an iterator that contains an array element [term, term] for each term', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      const entries = [...termset.entries()]

      expect(entries.length).toBe(2)
      expect(term0.equals(entries[0][0])).toBe(true)
      expect(term0.equals(entries[0][1])).toBe(true)
      expect(term1.equals(entries[1][0])).toBe(true)
      expect(term1.equals(entries[1][1])).toBe(true)
    })
  })

  describe('.forEach', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.forEach).toBe('function')
    })

    it('should loop over all terms in insertion order', () => {
      const terms = []
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      termset.forEach(term => {
        terms.push(term)
      })

      expect(terms.length).toBe(2)
      expect(term0.equals(terms[0])).toBe(true)
      expect(term1.equals(terms[1])).toBe(true)
    })
  })

  describe('.has', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.has).toBe('function')
    })

    it('should return true if the Termset contains the given term', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      expect(termset.has(term1)).toBe(true)
    })

    it('should return false if the Termset does not contain the given term', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0])

      expect(termset.has(term1)).toBe(false)
    })
  })

  describe('.values', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset.add).toBe('function')
    })

    it('should return an iterator that contains all terms', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      const values = [...termset.values()]

      expect(values.length).toBe(2)
      expect(term0.equals(values[0])).toBe(true)
      expect(term1.equals(values[1])).toBe(true)
    })
  })

  describe('Symbol.iterator', () => {
    it('should be a method', () => {
      const termset = new TermSet()

      expect(typeof termset[Symbol.iterator]).toBe('function')
    })

    it('should return an iterator that contains all terms', () => {
      const term0 = rdf.namedNode('http://example.org/0')
      const term1 = rdf.namedNode('http://example.org/1')
      const termset = new TermSet([term0, term1])

      const terms = [...termset]

      expect(terms.length).toBe(2)
      expect(term0.equals(terms[0])).toBe(true)
      expect(term1.equals(terms[1])).toBe(true)
    })
  })
})
