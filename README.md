# Images

This README provides instructions on how to set up and run the Elasticsearch, Logstash, and Kibana (ELK) stack using Docker Compose.

## Prerequisites

- Docker and Docker Compose installed on your system
- Sufficient system resources to run the containers

## Setup

1. Create a `docker-compose.yml` file in your project directory with the following content:


version: '3'
services:
  elasticsearch:
    image: docker.elastic.co/elasticsearch/elasticsearch:7.15.2
    container_name: elasticsearch
    environment:
      - node.name=elasticsearch
      - discovery.type=single-node
      - bootstrap.memory_lock=true
      - 'ES_JAVA_OPTS=-Xms512m -Xmx512m'
    ulimits:
      memlock:
        soft: -1
        hard: -1
    volumes:
      - es-data:/usr/share/elasticsearch/data
    ports:
      - 9200:9200
    networks:
      - images-network

  logstash:
    image: docker.elastic.co/logstash/logstash:7.15.2
    container_name: logstash
    volumes:
      - ./logstash/config/logstash.yml:/usr/share/logstash/config/logstash.yml
      - ./logstash/pipeline/logstash.conf:/usr/share/logstash/pipeline/logstash.conf
    ports:
      - 5000:5000
    environment:
      - 'LS_JAVA_OPTS=-Xmx256m -Xms256m'
    networks:
      - images-network
    depends_on:
      - elasticsearch

  kibana:
    image: docker.elastic.co/kibana/kibana:7.15.2
    container_name: kibana
    ports:
      - 5601:5601
    environment:
      - ELASTICSEARCH_URL=http://elasticsearch:9200
      - 'NODE_OPTIONS=--max-old-space-size=2048'
    networks:
      - images-network
    depends_on:
      - elasticsearch

networks:
  images-network:
    external: true

volumes:
  es-data:
    driver: local


2. Create the necessary Logstash configuration files:
   - Create a `logstash` folder in your project directory
   - Inside the `logstash` folder, create a `config` folder and a `pipeline` folder
   - In the `config` folder, create a `logstash.yml` file
   - In the `pipeline` folder, create a `logstash.conf` file

3. Ensure that the `images-network` Docker network exists or create it using:
   
   docker network create images-network
   

## Running the Stack

To start the ELK stack, run the following command in the directory containing your `docker-compose.yml` file:


docker-compose up -d


This will start all the services in detached mode.

## Accessing the Services

- Elasticsearch: http://localhost:9200
- Kibana: http://localhost:5601
- Logstash: Port 5000 (for sending logs)

## Stopping the Stack

To stop the ELK stack, run:


docker-compose down


This will stop and remove the containers, but preserve the data volume.

## Notes

- Elasticsearch data is persisted in a Docker volume named `es-data`
- Make sure to configure your Logstash pipeline in the `logstash/pipeline/logstash.conf` file
- Adjust the Java heap sizes in the `ES_JAVA_OPTS` and `LS_JAVA_OPTS` environment variables if needed
- The `NODE_OPTIONS` for Kibana increases the memory limit to prevent out-of-memory issues
