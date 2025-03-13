import { uuidv4 } from 'https://jslib.k6.io/k6-utils/1.4.0/index.js';
const novaData = new Date()
const novoUUID = uuidv4()

export function bodyCreditoParcelado(customer, parcela, valor, bandeira) {
  
  novaData.setUTCHours(novaData.getHours())
  return {
    "transaction_code": novoUUID.replaceAll('-', '').toUpperCase(),
    "creation_date": novaData.toISOString().substring(0, 19),
    "value": valor,
    "establishment": 1050,
    "original_value": valor,
    "installment_quantity": parcela,
    "original_status": "PAID",
    "customer_code": customer,
    "cod_authorization": 123456,
    "acquirer": "PAGSEGURO",
    "card_brand": bandeira.toUpperCase(),
    "capture_type": "E",
    "ip": "127.0.0.1",
    "port": 12345,
    "card_hash_df": "HASHDF",
    "bin": "471672",
    "holder": "0637",
    "pan_mask": "471672******0637",
    "pan_mask_full": "471672******0637",
    "user_code": "123456",
    "device": {
      "model": "samsung SM-J105B",
      "imei": "IMEI",
      "device_id": "DEVICEID",
      "device_type": "C",
      "reader_serial_number": "SERIALNUMBER",
      "reader_model": "PAX_S920_BGW"
    },
    "mobile_application_id": "34335",
    "ksn": "629949804109e9600122",
    "nsu_sitef": "123654",
    "nsu_host": "976431",
    "payment_type": "C",
    "firmware": "2.4.123",
    "shared_library": "001.38 191125",
    "latitude": "-10.0",
    "longitude": "-20.0",
    "company": "T1234567890",
    "user_reference": "666667",
    "simcard_serial": "81234567890",
    "terminal": "AP392170",
    "switch_response": {
      "switch_cod_transaction": novoUUID.replaceAll('-', '').toUpperCase(),
      "switch_response_code": 0,
      "switch_response_message": "TRANSACAO AUTORIZADA",
      "switch_response_code_host": 0,
      "switch_response_date_host": novaData.toISOString().substring(0, 19),
      "switch_status": 0,
      "switch_creation_date": novaData.toISOString().substring(0, 19)
    },
    "cne": "0005/88694580",
    "arqc": "ARQC",
    "aid": "A0000005372010",
    "aid_name": `CREDITO ${bandeira.toUpperCase()}`,
    "gateway": "SWITCH",
    "authentication": 1,
    "capture_mode": "C",
    "capture_method": "",
    "initialization_mode": 1,
    "acquirer_category": 1,
    "integrator_code": "INTEGRATOR CODE",
    "soft_descriptor": "Pag*SoftDescriptor",
    "user_application_id": "6814944"
  }
}

export function bodyAlteraEscrowUnique(value, dataIni, dataFim) {
  return {
    "channel": "MOBILE",
    "capture": "PRESENTIAL_CAPTURE",
    "paymentMethod": "CREDIT_CARD",
    "paymentProcessor": "OTHERS",
    "startedAt": dataIni,
    "endedAt": dataFim,
    "escrow": {
      "type": "UNIQUE",
      "value": value
    },
    "costs": [
      {
        "type": "INTERMEDIATION_RATE",
        "installments": [
          {
            "min": 1,
            "max": 1,
            "value": 1.99
          },
          {
            "min": 2,
            "max": 18,
            "value": 1.99
          }
        ]
      },
      {
        "type": "INTERMEDIATION_FEE",
        "installments": [
          {
            "min": 1,
            "max": 1,
            "value": 0
          },
          {
            "min": 2,
            "max": 18,
            "value": 0
          }
        ]
      }
    ]
  }
}

export function bodyForcaPayment(paymentId) {
  return JSON.stringify({
    "type": "exec",
    "mbean": "ps.bko.unit.jmx:name=paymentJmx,type=PaymentJmx",
    "operation": "reprocessPaymentSyncByPaymentCode(java.lang.String)",
    "arguments": [
      paymentId
    ]
  })
}

export function bodySuspensao(paymentId){
  return JSON.stringify({
    "created_at": novaData.toISOString().substring(0, 19)+"-03:00",
    "payment_code": paymentId,
    "reason": "CHARGEBACK",
    "reference_code": novoUUID
  })
}

export function bodyRemoveSuspensao(valorCancelado){
  return JSON.stringify({
    "reasons": [
      {
        "canceled_amount": valorCancelado,
        "created_at": novaData.toISOString().substring(0, 19)+"-03:00",
        "order": 1,
        "reason": "CHARGEBACK"
      }
    ]
  })
}

export function bodyAntecipacao(codCustomer,agenda){
  if(Array.isArray(agenda)){
    var fee_amount = agenda.reduce((arr, x) => {return arr+x.fee_amount},0)
    var gross_amount = agenda.reduce((arr, x) => {return arr+x.gross_amount},0)
    var dates = agenda.reduce((arr, x) => arr.concat(x.due_date.toString()),[])
  }else{
    var fee_amount = agenda.fee_amount
    var gross_amount = agenda.gross_amount
    var dates = new Array(agenda.due_date)
  }

  return JSON.stringify({
    "origin": "DESK",
    "anticipation_code": novoUUID,
    "guarantees_due_dates": dates,
    "anticipation_type": "CLIENT",
    "expected_amounts": {
        "fee_amount": fee_amount.toString(),
        "gross_amount": gross_amount.toString()
    },
    "customer_code": codCustomer
  })
}
