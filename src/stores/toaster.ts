import { defineStore } from 'pinia'


export interface Toaster {
  message: string
  timeout?: number
}


export const useToastersStore = defineStore('toasters', {

  state: () => { 

    return {
      toasters: [] as Toaster[],
    }

  },
  
  actions: {

    create(toaster: Toaster): Toaster {

      this.toasters.push(toaster)

      return toaster
    },

    close(index: number) {

      return this.toasters.splice(index, 1)
    }


  },
})

