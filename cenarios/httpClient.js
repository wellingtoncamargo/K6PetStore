import http from 'k6/http';
import { sleep, fail, check } from 'k6';
import {Trend, Rate, Counter} from 'k6/metrics';

const headers = {
    'accept': 'application/json',
    'api_key':'special-key'
};

const statusGet = 200;

const customTrend = new Trend('custom_waiting_time');
const requestCount = new Counter('custom_request_count');
const failureRate = new Rate('custom_failure_rate');

export function gatPetsbyStatus(status){ //pending
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

export default function () {
    console.info(gatPetsbyStatus('pending'))
}