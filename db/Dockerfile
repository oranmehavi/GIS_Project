FROM postgres
ENV POSTGRES_PASSWORD docker
ENV POSTGRES_DB gis_db
COPY sql/init.sql /docker-entrypoint-initdb.d/
COPY sql/gis_db.sql /docker-entrypoint-initdb.d/

