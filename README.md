
# Question Paper Generator

A Question paper Generator which looks for questions in the Question Store and then generate the question paper based on the total marks and the distribution of marks based on Difficulty.Using Nodejs for developement. 





  
## Run Locally

Clone the project

```bash
  git clone https://github.com/AayushAnand07/Question-Generator.git
```

Go to the project directory

```bash
  cd Question-Generator
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## API Reference

#### Generate Question Papers

```http
  POST /api/generate
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `totalMarks` | `int` | **Required** |
| `Easy` | `int` | **Required** |
| `Medium` | `int` | **Required** |
| `Hard` | `int` | **Required** |




### Example Request JSON

```http
  {
  "totalMarks": 100,
  "difficultyDistribution": {
    "Easy": 20,
    "Medium": 50,
    "Hard":30
    
  }
}

```




### Example Request cURL
```
curl --location 'http://localhost:3001/api/generate' \
--header 'Content-Type: application/json' \
--data '{
  "totalMarks": 100,
  "difficultyDistribution": {
    "Easy": 20,
    "Medium": 50,
    "Hard":30
    
  }
}'
```


## Demo

Response Demo

![image](https://github.com/AayushAnand07/Question-Generator/assets/41218074/44e99df9-547d-4f50-890a-4b3e81b27cf2)&nbsp;
# EdgeCases

## In case of invalid request 
```
{
    "status": 400,
    "error": "Invalid request format."
}
```
![image](https://github.com/AayushAnand07/Question-Generator/assets/41218074/b58cc160-1f03-4d0c-b528-38260a3af4f1)

&nbsp;

## Validate Total Marks
```
{
    "status": 400,
    "error": "Invalid total marks."
}
```
![image](https://github.com/AayushAnand07/Question-Generator/assets/41218074/272839ee-e6e1-43aa-a574-fa082612da52)


&nbsp;

## Validate Total Difficulty percentage
```
{
    "status": 400,
    "error": "Difficulty distribution must add up to 100 %"
}
```
![image](https://github.com/AayushAnand07/Question-Generator/assets/41218074/70884f1b-891f-4179-ad56-42ceb93a5377)


&nbsp;

## Validate each difficulty  marks availability in question store according to request
```
{
    "status": 400,
    "error": "Total marks asked for easy exceeds available questions"
}
```
![image](https://github.com/AayushAnand07/Question-Generator/assets/41218074/c80b975c-e3f5-4afa-b42c-adfa43788fc0)







