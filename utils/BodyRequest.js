import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import faker from "k6/x/faker";
const novaData = new Date()
const novoUUID = uuidv4()

export function novoPet(){
  return JSON.stringify({
    "id": 1,
    "category": {
      "id": 1,
      "name": "Chachorro"
    },
    "name": faker.animal.petName(),
    "photoUrls": [
      "string"
    ],
    "tags": [
      {
        "id": 1,
        "name": faker.animal.dog()
      }
    ],
    "status": "available"
  })
}
