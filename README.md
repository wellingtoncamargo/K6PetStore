## 📦 K6PetStore

O **K6PetStore** é um projeto de testes de desempenho que utiliza o [k6](https://k6.io/), uma ferramenta de código aberto para testes de carga, visando avaliar a performance da API do PetStore.  
Este repositório contém scripts de teste que simulam diferentes cenários de uso da API, permitindo identificar gargalos e otimizar o desempenho do sistema.

### 🔧 Tecnologias Utilizadas

- [k6](https://k6.io/) para criação e execução dos testes de carga.
- JavaScript para desenvolvimento dos scripts de teste.
- [Swagger PetStore](https://petstore.swagger.io/) como API alvo dos testes.

### 🚀 Como Executar os Testes

1. Instale o [k6](https://k6.io/docs/getting-started/installation/) em sua máquina.
2. Clone este repositório:

   ```bash
   git clone https://github.com/wellingtoncamargo/K6PetStore.git
   cd K6PetStore

3. Execute o script de teste desejado:
   ```bash
   k6 run nome-do-script.js

### 📈 Resultados
Os resultados dos testes serão exibidos no terminal, incluindo métricas como tempo de resposta, taxa de erros e throughput.
Essas informações são essenciais para avaliar a capacidade da API e identificar possíveis melhorias.   
