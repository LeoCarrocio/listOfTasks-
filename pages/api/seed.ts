import type { NextApiRequest, NextApiResponse } from 'next';
import {db, seedData} from '../../database';
import { Entry } from '../../models'

type Data = {
  message?:string
}

export default async function seed(_req: NextApiRequest, _res: NextApiResponse<Data>) {
 
 if( process.env.NODE_ENV === 'production'){
    return _res.status(400).json({message: 'You do not have access to the service '})
 }

 await db.connect()

 await Entry.deleteMany();

 await Entry.insertMany(seedData.entries);

 await db.disconnect()
 
 _res.status(200).json({ message: ' Process carried out correctly ' })
}
