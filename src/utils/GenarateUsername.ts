import Chance from 'chance';
import { v4 as uuidv4 } from 'uuid';

const chance = new Chance();

const nameGenerate= ():string=>{
  const randomWord1 = chance.word();
  const id = uuidv4(); 

  const randomName:string = `${randomWord1}-${id}`;
  return randomName;
}

export default nameGenerate
