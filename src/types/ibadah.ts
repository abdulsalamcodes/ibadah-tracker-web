export interface Ibadah {
    id: number;
    name: string;
    description: string;
    completed: boolean;
    time: string;
  }
  
  export interface IbadahStats {
    total: number;
    completed: number;
    percentage: number;
  }