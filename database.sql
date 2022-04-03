
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE "user" (
    "id" SERIAL PRIMARY KEY,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL
);



CREATE TABLE "user_preferences" (
"preference_id" SERIAL PRIMARY KEY,
"user_id" int REFERENCES "user" (id),
"route_id" int NOT NULL,
"route_label" VARCHAR(50),
"direction_id" int NOT NULL,
"direction_name" VARCHAR(20),
"place_code" VARCHAR(4),
"description" VARCHAR(50),
"stop_id" int,
"time" time,
"phone" VARCHAR(11),
"email" VARCHAR(50),
"notify_mode" VARCHAR(6)
);