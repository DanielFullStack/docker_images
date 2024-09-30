# Kafka

```bash
docker exec -it kafka kafka-topics --create --topic password_recovery_requests --bootstrap-server localhost:9092 --partitions 3 --replication-factor 1
```