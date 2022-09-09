import type { NextApiRequest, NextApiResponse } from 'next';
import { Entry, IEntry } from '../../../models';
import { db } from '../../../database'

type Data = 
| { message: string }
| IEntry[]
| IEntry

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  switch(_req.method) {

    case 'GET':
      return getEntries(res);
    
    case 'POST':
      return postEntries(_req,res);
    
    default:
      return res.status(400).json({ message: 'Endpoint does not exist ' })
  

  }

}


const getEntries = async (_res: NextApiResponse<Data>) => {
  
  await db.connect();
  const entries = await Entry.find().sort({createdAt: 'ascending'});
  await db.disconnect();
  
  _res.status(200).json(entries);

}

const postEntries = async( _req: NextApiRequest, _res: NextApiResponse<Data>) =>{

  const { description = '' } = _req.body;

  const newEntry = new Entry({
    description,
    createdAt: Date.now(),
  })
  
  try {

    await db.connect();
    await newEntry.save();
    await db.disconnect();

    return _res.status(201).json(newEntry); 
    
  } catch (error) {

    await db.disconnect();
    console.log(error)
    return _res.status(500).json({message:' Something went wrong, check server console '}); 

  }
}