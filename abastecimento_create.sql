CREATE DATABASE abastecimento;
USE abastecimento;

CREATE TABLE modelo_veiculo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  fabricante VARCHAR(100) NOT NULL
);

CREATE TABLE veiculo (
  id INT AUTO_INCREMENT PRIMARY KEY,
  placa VARCHAR(10) NOT NULL,
  volume_reservatorio DECIMAL(6, 3) NOT NULL,
  ano_fabricacao INT NOT NULL,
  ano_modelo INT NOT NULL,
  hodometro_inicial DECIMAL(12, 3) NOT NULL,
  modelo_veiculo_id INT NOT NULL,
  FOREIGN KEY (modelo_veiculo_id) REFERENCES modelo_veiculo(id)
);

CREATE TABLE lancamento_abastecimento (
  id INT AUTO_INCREMENT PRIMARY KEY,
  data TIMESTAMP NOT NULL,
  volume DECIMAL(6, 3) NOT NULL,
  hodometro DECIMAL(12, 3) NOT NULL,
  valor_litro DECIMAL(6, 2) NOT NULL,
  veiculo_id INT NOT NULL,
  FOREIGN KEY (veiculo_id) REFERENCES veiculo(id)
);

insert into modelo_veiculo(nome, fabricante) values ('HB20', 'Hyundai');
insert into modelo_veiculo(nome, fabricante) values ('Azera', 'Hyundai');

insert into veiculo(placa, volume_reservatorio, ano_fabricacao, ano_modelo, hodometro_inicial, modelo_veiculo_id) values ('AAA4321', 42, 2021, 2021, 1, 1);
insert into veiculo(placa, volume_reservatorio, ano_fabricacao, ano_modelo, hodometro_inicial, modelo_veiculo_id) values ('BCD5678', 34, 2021, 2022, 2, 1);
insert into veiculo(placa, volume_reservatorio, ano_fabricacao, ano_modelo, hodometro_inicial, modelo_veiculo_id) values ('HTA4985', 50, 2022, 2022, 1, 2);

insert into lancamento_abastecimento(data, volume, hodometro, valor_litro, veiculo_id) values ('2022-08-01 08:34:12', 40.500, 1, 5.37, 1);
insert into lancamento_abastecimento(data, volume, hodometro, valor_litro, veiculo_id) values ('2022-08-02 07:12:45', 23.750, 45.783, 5.11, 1);