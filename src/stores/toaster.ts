import { defineStore } from 'pinia'


export interface Toaster {
  message: string
  name: string
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

      const toastsCount = this.toasters.push(toaster)

      setTimeout(() => {
        this.close(toastsCount -1)
      }, 2500)

      return toaster
    },

    close(index: number) {
      return this.toasters.splice(index, 1)
    }

  },
})

