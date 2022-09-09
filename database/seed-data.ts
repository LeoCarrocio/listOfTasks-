
interface SeedData{
  entries:SeedEntry[];
}
interface SeedEntry{
  description:string;
  status:string;
  createdAt:number;
}


export const seedData: SeedData = {
  entries: [
    {
      description:'Pendient : gsfkjghskfjghskfjghsdfsdvsdvsdvds',
      status:'pending',
      createdAt: Date.now()+123344,
    },
    {
      description:'in-progress : gsfkjghskfjghskfjghvsdvsdvsdvv',
      status:'in-progress',
      createdAt: Date.now()+10000000,
    },
    {
      description:'finished : gsfkjghs kfjghskfjghsdghdhgd',
      status:'finished',
      createdAt: Date.now(),
    }
  ]
}
