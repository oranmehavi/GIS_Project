Run DB container:
    1. docker build -t gis_db .
    2. docker run --name my_db -p 5432:5432 gis_db

Connect the DB using DBeaver/DataGrip
    1. host: localhost
    2. port: 5432
    3. Database: gis_db
    4. username: postgres
    5. password: docker