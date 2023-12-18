# SmartHomes

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

## Usage
### One time usage
```
$ docker compose up -build

```

### More then once
```
$ docker prune 
$ docker compose up -build

## Architecture
### Module interactions
![Achitecture](https://github.com/RGarrido03/SmartHomes/assets/63374228/8ebcf236-b172-4559-8811-612b9e17f70b)
 

```
### Contributors
- 68264: Bruno Lopes
- 108712: Diogo Falcão
- 108011: Fábio Matias
- 107927: Rúben Garrido
