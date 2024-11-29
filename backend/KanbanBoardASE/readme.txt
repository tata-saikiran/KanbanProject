
To run the mysql container, run the following command:
```
docker run --name some-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=mydatabase -e MYSQL_USER=user -e MYSQL_PASSWORD=password -d mysql:latest
```


