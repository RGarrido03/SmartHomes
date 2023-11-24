DROP DATABASE IF EXISTS smarthomes;
CREATE DATABASE smarthomes
  WITH ENCODING='UTF8'
  LC_COLLATE='pt_PT.UTF-8'
  LC_CTYPE='pt_PT.UTF-8'
  TEMPLATE=template0;


DROP TABLE IF EXISTS device;
DROP TABLE IF EXISTS house;
DROP TABLE IF EXISTS client;


CREATE TABLE client (
  client_id         SERIAL PRIMARY KEY,
  username          VARCHAR(50)  NOT NULL,
  name              VARCHAR(100) NOT NULL,
  password          VARCHAR(255) NOT NULL,
  email             VARCHAR(100) NOT NULL
);

CREATE TABLE house (
  house_id          SERIAL PRIMARY KEY,
  client_id         INT NOT NULL,
  name              VARCHAR(100) NOT NULL,
  location          VARCHAR(255) NOT NULL,
  electricitypow    NUMERIC(10, 2) NOT NULL, -- eletricidade sumário power
  electricitymon    NUMERIC(10, 2) NOT NULL, -- eletricidade sumário money
  waterliters       NUMERIC(10, 2) NOT NULL, -- agua sumário liters
  watermon          NUMERIC(10, 2) NOT NULL, -- agua sumário money
  totalsolarpv      INT NOT NULL, -- (valor arredondado do) total Solar PV generation
  totalwindgen      INT NOT NULL, -- (valor arredondado do) total wind generation
  sentogrid         INT NOT NULL, -- (valor arredondado do) total sent to grid
  waterlitersyest   INT NOT NULL, -- (valor arredondado da) water liters spend the day before
  waterlitersweek   INT NOT NULL, -- (valor arredondado da) water liters spend in the week
  CONSTRAINT fk_client_id
      FOREIGN KEY(client_id) 
	      REFERENCES client(client_id)
);

CREATE TYPE device_type AS ENUM ('SOLARPV', 
                                 'WINDTURBINE', 
                                 'PLUG', 
                                 'GRIDMETER', 
                                 'AC', 
                                 'LIGHT', 
                                 'TV', 
                                 'SMARTASSISTANT', 
                                 'CARCARGER', 
                                 'VACUUM', 
                                 'DESUMIDIFIER', 
                                 'OVEN');

CREATE TABLE device (
    device_id       SERIAL PRIMARY KEY,
    house_id        INT NOT NULL, 
    name            VARCHAR(100),
    house_area      VARCHAR(100),
    type            device_type, -- enum da linha 37
    CONSTRAINT fk_house_id
      FOREIGN KEY(house_id) 
	      REFERENCES house(house_id)
);

-- test values
INSERT INTO client (username, name, password, email)
VALUES ('falcao2.2', 'Diogo Falcão', 'senha123', 'joe@example.com');

INSERT INTO house (client_id, name, location, electricitypow, electricitymon, waterliters, watermon, totalsolarpv, totalwindgen, sentogrid, waterlitersyest, waterlitersweek)
VALUES (1, 'Casa do Digas', 'Castelo Branco', 150.75, 120.50, 200.25, 180.75, 300, 150, 75, 50, 300);

INSERT INTO device (house_id, name, house_area, type)
VALUES (1, 'Solar Panel 1', 'Backyard', 'SOLARPV'),
       (1, 'Google Home', 'Living Room', 'SMARTASSISTANT'),
       (1, 'TV', 'Living Room', 'TV'),
       (1, 'AC', 'Bedroom', 'AC');

