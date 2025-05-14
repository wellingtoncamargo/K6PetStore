import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
import { FormData } from 'https://jslib.k6.io/formdata/0.0.2/index.js';
import faker from "k6/x/faker";
import http from 'k6/http';

const novaData = new Date()
const novoUUID = uuidv4()

export function novoPet(){
  return JSON.stringify({
    "id": 500,
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
var imageData = open('./logotipo_k6.jpg', 'b')
export function newImage(){
  const formdata = {
        additionalMetadata: 'file',
        file: http.file(imageData, 'logotipo_K6.jpg', 'image/.jpeg'),
    };
  return formdata
}