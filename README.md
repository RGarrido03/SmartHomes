# SmartHomes

![Static Badge](https://img.shields.io/badge/python-%3E%3D3.11-green)
![Static Badge](https://img.shields.io/badge/java-%3E%3D17-orange)
![Static Badge](https://img.shields.io/badge/spring_boot-%3E%3D3.1.5-blue)
![Static Badge](https://img.shields.io/badge/next.js-%3E%3D14.0.3-yellow)




Project for "Introdução à Engenharia de Software", 2023/2024

## Description

The SmartHomes application is designed to **address the problem of efficient and
sustainable home resources management**. Therefore, it provides a solution for homeowners
to monitor and control their electricity and water. This solution is made for it to work in all
and any devices plugged into the house (unlike HomeKit), as it is not dependent on the
devices but on the physical interfaces they are plugged into.

This kind of set up also prevents complex programming skills or automation skills from the
user (like it may happen in other cases like Google Home). Adding various functions from
other mainstream applications, such as smart device control and control and info about
household resources. Instead of merely controlling devices, we gain insights into how to
intelligently assist the environment and your wallet.

## UI

Login                      |  Home insight             | Home Overview
:-------------------------:|:-------------------------:|:-------------------------:
![Screenshot from 2023-12-18 10-05-44](https://github.com/RGarrido03/SmartHomes/assets/63374228/2fdf4e6b-0751-483e-a005-45e7cd9be724)|![Screenshot from 2023-12-18 10-06-50](https://github.com/RGarrido03/SmartHomes/assets/63374228/b023a39c-5967-473a-a264-525b1c65d4a3) | ![Screenshot from 2023-12-18 10-14-26](https://github.com/RGarrido03/SmartHomes/assets/63374228/6e240a83-d624-4d11-bfc7-a5c50ac03f59)

Enviromental                      |  Electricity           | Water
:-------------------------:|:-------------------------:|:-------------------------:
![Screenshot from 2023-12-18 10-16-41](https://github.com/RGarrido03/SmartHomes/assets/63374228/dafcf8c8-45b3-44d7-92fe-5a9299a8ba1c)|![Screenshot from 2023-12-18 10-17-12](https://github.com/RGarrido03/SmartHomes/assets/63374228/003d0e4f-18a4-4c4d-b00a-b6e5889d4453)| ![Screenshot from 2023-12-18 10-17-57](https://github.com/RGarrido03/SmartHomes/assets/63374228/cd17a9de-169e-4b94-ba4f-c8648d9f5827)

Devices                      |  Costs           | Settings
:-------------------------:|:-------------------------:|:-------------------------:
![Screenshot from 2023-12-18 10-18-59](https://github.com/RGarrido03/SmartHomes/assets/63374228/e03c6024-4e87-4b0f-95c4-76875d505756)|![Screenshot from 2023-12-18 10-19-30](https://github.com/RGarrido03/SmartHomes/assets/63374228/45b973ca-1efa-49bc-9423-d4c663e1ea22)|![Screenshot from 2023-12-18 10-21-51](https://github.com/RGarrido03/SmartHomes/assets/63374228/f8ab64c1-1ad2-45ed-b28c-f70c23b1d395)







## Usage
### One time usage
```
$ docker compose up -build

```

### More then once
```
$ docker compose down --volumes
$ docker builder prune -all 
$ docker compose up -build
```

## Architecture
### Module interactions
![Achitecture](./docs/Achitecture.png)


## Rest API Documentation (swagger)

The SmartHomes App API has various entities (house, devices,...) and functions to each one of them. To see more details go to:
[/api/docs/index.html](http://localhost/api/docs/index.html)

## Personas and scenarios mail and passwords
### Ana
email: ana@ua.pt</br>
password: anaanaana
### John
email: john@ua.pt</br>
password: johnjohn
### Petter
email: peter@ua.pt</br>
password: petterpetter

### Contributors
- 68264: Bruno Lopes => Team Manager
- 108712: Diogo Falcão => Architect
- 108011: Fábio Matias => Product Owner
- 107927: Rúben Garrido => DevOps master
