# 个人开发者，Spring Boot 项目如何部署



今天给大家分享一下，作为个人开发者，Spring Boot 项目是如何部署的。



## 环境介绍

Linux

docker

docker-compose



## 目录结构

```
erwin-windrunner
- backups
- data
- jars
- build-docker-compose.sh
- docker-compose.yml
- Dockerfile
```



## 文件



#### Dockerfile

```
FROM openjdk:17-jdk-alpine
MAINTAINER Erwin Feng xfsy_2015@163.com

ENV active = 'dev'

ENV TZ=Asia/Shanghai

RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY erwin-windrunner-*.jar erwin-windrunner.jar
ENTRYPOINT ["sh", "-c", "java -jar erwin-windrunner.jar --spring.profiles.active=$active"]
```



#### docker-compose.yml

```yaml
version: "3"
services:
  # 服务名称
  erwin-windrunner:
    # Dockerfile所在目录(. 表示同级目录下)
    build: .
    # 镜像名称
    image: fengwenyi/erwin-windrunner
    # 容器名称
    container_name: erwin-windrunner
    restart: always
    # 端口
    ports:
      - "9090:9090"
    # 挂载
    volumes:
      - ./data/log:/data/log
      - ./data/file:/data/file
    environment:
      # 指定时区
      - TZ="Asia/Shanghai"
      - active=prod
```



#### build-docker-compose.sh

```shell
docker-compose down
docker-compose rm
mv *.jar backups/
cd jars
name=$(ls -lt *.jar|awk '{print $9}'|head -1)
cp $name ..
cd ..
docker-compose build
docker-compose up -d
docker-compose logs -f
```



## 操作

1. 每次升级，我们只需要把打包好的 jar 文件上传到 jars 文件下。

   >  需要注意版本，每次都会取最大的。

2. 执行 shell 命令：`sh build-docker-compose.sh`。