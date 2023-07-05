FROM ubuntu AS base
# Install dependencies
RUN apt-get update
RUN apt-get install -y curl make net-tools pip && curl -fsSL https://deb.nodesource.com/setup_19.x | bash - && apt-get install -y nodejs
RUN pip install websockets
WORKDIR /app

FROM base as dashboard
COPY dashboard /app
RUN npm install
EXPOSE 5173
CMD make

FROM base as cpe
COPY central_point_of_entry /app
EXPOSE 8080
CMD python3 server.py


FROM base as msn-api-server
COPY msn_api_server /app
EXPOSE 8889
CMD make

FROM base as msn-data-server
COPY msn_data_server /app
EXPOSE 8012
CMD make start1

FROM base as mx-api-server
COPY mx_api_server /app
EXPOSE 8889
CMD make

FROM base as mx-data-server
COPY mx_data_server /app
EXPOSE 8008
CMD make start1
