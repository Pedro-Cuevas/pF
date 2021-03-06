INSERT INTO OFFER VALUES ('1', 'Data analyst', '2022-07-01', '2022-08-31', 'Trabajo como analista de datos junior', 'Disponible');
INSERT INTO OFFER VALUES ('2', 'Software developer intern', '2022-06-01', '2022-07-31', 'Becario en desarrollo de software', 'Disponible');
INSERT INTO OFFER VALUES ('3', 'Trabajador de limpieza', '2022-05-01', '2022-10-31', 'Trabajador encargado de limpiar', 'No disponible');

INSERT INTO APPLICATIONS VALUES ('1', '1', '1'); 
INSERT INTO APPLICATIONS VALUES ('2', '1', '2');
INSERT INTO APPLICATIONS VALUES ('3', '3', '2');
INSERT INTO APPLICATIONS VALUES ('4', '3', '1');
INSERT INTO APPLICATIONS VALUES ('5', '2', '3');

INSERT INTO USER VALUES ('1', 'Admin', 'Admin', 'Telefónica', 'admin@telefonica.com', '{noop}12345', 'ROLE_ADMIN');
INSERT INTO USER VALUES ('2', 'Isabela', 'Goetsch', 'Business', 'isabela@gmail.com', '{noop}67891', 'ROLE_USER');
INSERT INTO USER VALUES ('3', 'Pedro', 'Cuevas', 'Teleco+Business', 'pedro@gmail.com', '{noop}12345', 'ROLE_USER');

INSERT INTO SUGERENCIAS VALUES ('1', 'user1@mail.com', 'Ofreceis demasaidas pocas practicas');
INSERT INTO SUGERENCIAS VALUES ('2', 'user2@mail.com', 'La web es dificil de usar si eres ciego');
INSERT INTO SUGERENCIAS VALUES ('3', 'user3@mail.com', 'Dadle un aumento a los programadores de la web');

INSERT INTO NEWSLETTER VALUES ('1', 'user1@mail.com', 'Pedro', 'M'); 
INSERT INTO NEWSLETTER VALUES ('2', 'user1@mail.com', 'Carmela', 'F');
INSERT INTO NEWSLETTER VALUES ('3', 'user1@mail.com', 'Luis', 'M');
