import mongoose from 'mongoose';
import type { NextApiRequest, NextApiResponse } from 'next'
import { db } from '../../../database';
import { Entry, IEntry } from '../../../models'

type Data = | { message: string } 
| IEntry

export default function handler(
  _req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  const { id } = _req.query;

  if (!mongoose.isValidObjectId(id)){
    return res.status(400).json({ message: 'id is not valid' });
  }

  switch (_req.method) {
    case 'PUT':
      return updateEntry(_req, res);
    
    case 'GET':
      return getEntry(_req, res);
  
    default:
      return res.status(400).json({ message: 'Endpoint does not exist ' })

  }

}


const updateEntry = async (_req: NextApiRequest, res: NextApiResponse<Data>) => {

  const { id } = _req.query;

  await db.connect();

  const entryToUpdate = await Entry.findById(id);

  if(!entryToUpdate){
    await db.disconnect();
    return res.status(400).json({ message: 'id does not exist' })
  }

 const {
  description = entryToUpdate.description,
  status = entryToUpdate.status
 } = _req.body;
  
 try {
   //runValidators= valida el estutus permitido , new= nos devuelve la info actualizada
    const updatedEntry = await Entry.findByIdAndUpdate(id, {description, status}, {runValidators: true, new : true}); 
    
    // es lo mismos q hacer lo de arriva 
    // entryToUpdate.description
    //entryToUpdate.status=status;
    // await entryToUpdate.save();
   
    await db.disconnect();
   
    res.status(200).json(updatedEntry!)

 } catch (error) {
  await db.disconnect();
  console.log(error)
  return res.status(400).json({ message: ' Bad request' })
 }

}

const getEntry = async (_req: NextApiRequest, res: NextApiResponse<Data>) =>{

  const { id } = _req.query;
  
  await db.connect();

  const entry = await Entry.findById(id);
  
  await db.disconnect();
  if(!entry){
    return res.status(400).json({ message: 'id does not exist' })
  }

  res.status(200).json(entry!)

}