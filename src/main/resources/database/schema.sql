DROP TABLE IF EXISTS OFFER;
DROP TABLE IF EXISTS APPLICATIONS;

CREATE TABLE OFFER (
    "ID" INTEGER IDENTITY PRIMARY KEY,	
	"OFFER_NAME" VARCHAR2(40) NOT NULL,
	"DATE_BEGINING" DATE NOT NULL,
    "DATE_END" DATE NOT NULL,
	"OFFER_DESCRIPTION" VARCHAR2(100) NOT NULL,
	"OFFER_AVAILABLE" VARCHAR2(40) NOT NULL
);


CREATE TABLE APPLICATIONS (
	"ID" INTEGER IDENTITY PRIMARY KEY,
	"OFFER_ID" INTEGER NOT NULL,
	"USER_ID" INTEGER NOT NULL
)