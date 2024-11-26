export type ElectionDatum = {
    year: number;
    expenses: number;
  }
  
  export const colors = {
    expense: '#f45a6d',
  }
  
  export const capitalize = (s: string): string => {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  
  export const data: ElectionDatum[] = [
    {
      year: 1980,
      expenses: 35480948,
    },
    {
      year: 1984,
      expenses: 37449813,
    },
    {
      year: 1988,
      expenses: 41716679,
    },
    {
      year: 1992,
      expenses: 44856747,
    },
    {
      year: 1996,
      expenses: 47295351,
    },
    {
      year: 2000,
      expenses: 50830580,
    },
    {
      year: 2004,
      expenses: 58894561,
    },
    {
      year: 2008,
      expenses: 69338846,
    },
    {
      year: 2012,
      expenses: 65752017,
    },
    {
      year: 2016,
      expenses: 65677288,
    },
    {
      year: 2020,
      expenses: 74216146,
    },
  ]
  