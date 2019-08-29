# Backend RESTFul API

## technologies

- Node.js 

- Postman 

- MongoDB 

## Dependencies

- Express 

- Mongoose 

- Body-Parser 

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

## Implemented Methods

### Laboratorio

Create `Laboratorio` instance using:

 Key| Description| Required
 ---|---|---
 `nome`       | laboratory name.             | **Yes**
 `endereco`      | Address.                            | **Yes**
 `status`  | Status is a boolean                         | No, <br> Default setting: `true`.
 `exames` | Id tests references | No.

### Exames

Create `Exames` instance using:

 Key| Description| Required
 ---|---|---
 `nome`       | laboratory name.             | **Yes**
 `tipo`      | Address.                            | **Yes**, value:  analise clinica or imagem
 `status`  | Status is a boolean                         | No, <br> Default setting: `true`.


## Architecture REST

- Laboratory list - GET: http://localhost:3000/api/laboratorios (locally) \
                         https://restful-api-dasa.herokuapp.com/api/laboratorios 

   .  If success returns all laboratories in the database, each laboratory with a JSON format.
   
- Add a laboratory - POST: http://localhost:3000/api/laboratorios/new (locally)\
                           https://restful-api-dasa.herokuapp.com/api/laboratorios/new 
  
  . Adds a new laboratory to our database, needs to send nome, endereco (exames are optional ). auto generated ID and status created with a true value as "activo".
  
- Update a laboratory by ID - PUT: http://localhost:3000/api/laboratorios/:id (locally)\
                                   https://restful-api-dasa.herokuapp.com/api/laboratorios/:id

  . Update a certain laboratory.
  
- Delete a laboratory by ID - DELETE: http://localhost:3000/api/laboratorios/:id (locally)\
                                      https://restful-api-dasa.herokuapp.com/api/laboratorios/:id

   . Delete a certain laboratory.
   
- Exames list - GET: http://localhost:3000/api/exames (locally)\
                     https://restful-api-dasa.herokuapp.com/api/exames
                     
   .  If success returns all exames in the database, each exam with a JSON format.
   
- Add a 'exame'- POST: http://localhost:3000/api/exame/new (locally)\
                       https://restful-api-dasa.herokuapp.com/api/exame/new
  
  . Adds a new 'exame' to our database, needs to send nome, tipo. Auto generated ID and status created with a true value as "activo".
  
- Update a 'exame' by ID - PUT: http://localhost:3000/api/exame/:id (locally)\
                                https://restful-api-dasa.herokuapp.com/api/exame/:id
  . Update a certain 'exame'.
  
- Delete a 'exame' by ID - DELETE: http://localhost:3000/api/laboratorios/:id (locally)\
                                   https://restful-api-dasa.herokuapp.com/api/laboratorios/:id
   . Delete a certain 'exame'.
   
- Associate a 'exame' by ID to a laboratory - PUT: http://localhost:3000/api/exame/:id/associate (locally)\
                                                   https://restful-api-dasa.herokuapp.com/api/exame/:id/associate
  . Associate an ID 'exame' to a laboratory, needs to send laboratory ID. Only associate if laboratory and exam are as "activo"
  
- Unassociate a 'exame' by ID to a laboratory - PUT: http://localhost:3000/api/exame/:id/unassociate (locally)\
                                                     https://restful-api-dasa.herokuapp.com/api/exame/:id/unassociate 
  . Unassociate an ID 'exame' to a laboratory, needs to send laboratory ID. Only unassociate if laboratory and exam are as "activo"

- EndPoint to search a 'exame' - GET: http://localhost:3000/api/search?exameName=radiografia (locally)\
                                      https://restful-api-dasa.herokuapp.com/api/search?exameName=radiografia 
                                      "radiografia is just an example of search"
  . Search a 'exame' name and returns all laboratories associated to that 'exame'.
  
## Tests

They were fully realized in Postman's automated environment, proving the success of each functionality. The tests that were done in this case can be seen in the figure below, just in the left tab. Postman is an extremely useful tool for manually testing or automating testing of any REST API.


![testes](https://res.cloudinary.com/dnyvrnqdx/image/upload/v1567022026/samples/Screenshot_from_2019-08-28_16-51-57_zeo1jr.png)




