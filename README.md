# Backend RESTFul API

## Manual Installation 

## Steps
 
# Download and transfer project files

### 1) Clone the repository, install node packages  and verify routes locally

``` 
//on local
git clone https://github.com/ArnoldThanos/backend-RESTFulAPI.git
cd backend-RESTFulAPI
npm install
npm start
```

Open your local browser and try accessing     
`http://localhost:3000/api/laboratorios`   
`http://localhost:3000/api/exames`  

## Implemented Methods

### Laboratorio

Create `Laboratorio` instance using:

 Key| Description| Required
 ---|---|---
 `nome`       | laboratory name.             | **Yes**
 `endereco`      | Address.                            | **Yes**
 `status`  | Status is a boolean                         | No, <br> Default setting: `true`.
 `exames` | Id tests references | No.




