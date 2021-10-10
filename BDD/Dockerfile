FROM mariadb:10.5.8-focal
ADD ./init.d /docker-entrypoint-initdb.d
COPY ./utf8.cnf /etc/mysql/mariadb.conf.d/

ENV MYSQL_ROOT_PASSWORD root
#to ease database loading on some computers
ENV MYSQL_INITDB_SKIP_TZINFO 1