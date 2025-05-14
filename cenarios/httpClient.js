import http from 'k6/http';
import * as body from '../data/BodyRequest.js'
import { sleep, fail, check } from 'k6';
import {Trend, Rate, Counter} from 'k6/metrics';


const headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization':'Basic YXBpX2tleTpzcGVjaWFsLWtleQ=='
};

const statusGet = 200;

const customTrend = new Trend('custom_waiting_time');
const requestCount = new Counter('custom_request_count');
const failureRate = new Rate('custom_failure_rate');

export function getPetsbyStatus(status){
    const lista = ['pending','sold', 'available']
    
    const res = http.get(`https://petstore.swagger.io/v2/pet/findByStatus?status=${lista.includes(status)? status : fail('Status inexistente ou não informado!')}`)

    check(res,{
        "Consulta por status retornado com sucesso": (r) => r.status === statusGet
    })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return res.body != null? JSON.parse(res.body): fail('Status inexistente ou não informado!')
}

export function getPetsbyId(id){ 
    
    const res = http.get(`https://petstore.swagger.io/v2/pet/${id}`)

    check(res,{
        "Consulta por id retornado com sucesso": (r) => r.status === statusGet
    })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return JSON.parse(res.body)
}

export function postNewPet(){
        
    const res = http.post(`https://petstore.swagger.io/v2/pet`,body.novoPet(), { headers })

    check(res,{
        "Pet cadastrado com sucesso": (r) => r.status === statusGet
    })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return JSON.parse(res.body)
}

const imageBin = open('../data/logotipo_K6.jpg', 'b');
export function postInsertImage(id){
    const headers = {
        'Authorization': 'Basic YXBpX2tleTpzcGVjaWFsLWtleQ==', // substitua com seu token real
        'Accept': 'application/json',
    };
    const formData = body.newImage()
    // const formData ={
    //     additionalMetadata: 'file',
    //     file: http.file(imageBin, 'logotipo_K6.jpg', 'image/.jpeg'),
    // };
   
    const res = http.post(`https://petstore.swagger.io/v2/pet/${id}/uploadImage`,formData, { headers })

    check(res,{
                "Pet imagem incluida com sucesso": (r) => r.status === statusGet
            })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return res.body
}

export function putPet(putBody){
        
    const res = http.put(`https://petstore.swagger.io/v2/pet`, JSON.stringify(putBody), { headers })

    check(res,{
        "Cadastro alterado com sucesso": (r) => r.status === statusGet
    })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return JSON.parse(res.body)
}

export function deletePetbyId(id){ 
    
    const res = http.del(`https://petstore.swagger.io/v2/pet/${id}`)

    check(res,{
        "Apagando pet por id retornado com sucesso": (r) => r.status === statusGet
    })
    customTrend.add(res.timings.waiting);
    requestCount.add(1);
    failureRate.add(res.status !== statusGet);
    return JSON.parse(res.body)
}

export default function () {
    const post = postNewPet()
    console.info(post)
    post.category.name = 'Cachorro'
    console.info(putPet(post))
    console.info(postInsertImage(post.id))
    console.info(getPetsbyId(post.id))
}