import { defineStore } from 'pinia'

export interface Search {
    city: string,
    temperature: number | null
  }
  
  
  export const useSearchStore = defineStore('search', {
  
    state: () => { 
  
      return {
        searches: [] as Search[],
      }
  
    },
  
    actions: {
      add(search: Search): Search {
        this.searches.push(search)
  
        return search
      },

      delete(index: number) {
        return this.searches.splice(index, 1)
      }
    }
  
  })