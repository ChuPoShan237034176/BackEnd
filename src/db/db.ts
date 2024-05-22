
import { MongoClient, ServerApiVersion, ObjectId } from 'mongodb'


export class Db {
  static async connect() {

    const uri = "mongodb+srv://monicayakkha:AywNmWUFlprAttr8@cluster0.0zctoob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

    const client = await MongoClient.connect(uri,
    {
    serverApi: {version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
    }}
    )
    return client.db('ts-mongodb')
  }
}

export interface staff {
  name: string
  password: string
  email: string
  regcode: string
}

export interface User {
  name: string
  password: string
  email: string
}

export interface dog {
  name: string
  age: string
  breeds: string
  info: string
  Pic: string
}



export async function dbChackstafflogin(semail: string, pass: string){
  const db = await Db.connect()
  const data = await db
    .collection<staff>('staff')
    .find({email:semail,password:pass})
    .toArray()

  return data
}

export async function dbFindStaff(semail: string){
  const db = await Db.connect()
  const data = await db
    .collection<staff>('staff')
    .find({email:semail})
    .toArray()

  return JSON.stringify(data)
}

export async function dbInsertStaff(staff: staff){
  const db = await Db.connect()
  await db.collection('staff').insertOne(staff)
}


export async function dbInsertDog(dog: dog){
  const db = await Db.connect()
  await db.collection('dog').insertOne(dog)
}

export async function dbDelDog(id:string){

  let oid:any;

  try {
    oid=new ObjectId(id);
  } catch (error) {
    console.log(error);
    return "[]";
  }

  const db = await Db.connect()
  await db.collection('dog').deleteOne({"_id": oid})
}

export async function dbEditDog(id:string, dog:any){

  let oid:any;

  try {
    oid=new ObjectId(id);
  } catch (error) {
    console.log(error);
    return "[]";
  }

  //console.log(oid, dog)
  const db = await Db.connect()
  await db.collection('dog').updateOne({"_id": oid}, dog,{ upsert: false});
}


export async function Getalldoglist(){
  const db = await Db.connect()
  const data = await db
    .collection<dog>('dog')
    .find()
    .toArray()

  return JSON.stringify(data)
}

export async function dbGetdog(id:string){
  
  let oid:any;

  try {
    oid=new ObjectId(id);
  } catch (error) {
    console.log(error);
    return "[]";
  }
  
  const db = await Db.connect()
  const data = await db
    .collection<dog>('dog')
    .find({"_id": oid})
    .toArray()

  return JSON.stringify(data)
}

export async function dbGetdogs(SearchData:any){
  
  const db = await Db.connect()
  const data = await db
    .collection<dog>('dog')
    .find(SearchData)
    .toArray()

  return JSON.stringify(data)
}