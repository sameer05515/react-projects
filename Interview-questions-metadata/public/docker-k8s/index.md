# What are commonly used commands of docker

Docker is a popular containerization platform that allows you to build, deploy, and manage applications using lightweight containers. Here are some commonly used Docker commands:

1. **docker run**: This command is used to create and start a new container from a specified image. It pulls the image from a registry if it doesn't already exist locally.

   Example: `docker run image_name`

2. **docker build**: This command is used to build a Docker image from a Dockerfile, which contains instructions on how to create the image.

   Example: `docker build -t image_name .`

3. **docker pull**: This command is used to download a Docker image from a registry, without starting a container.

   Example: `docker pull image_name`

4. **docker ps**: This command lists all running containers.

   Example: `docker ps`

5. **docker images**: This command lists all locally available Docker images.

   Example: `docker images`

6. **docker stop**: This command is used to stop a running container.

   Example: `docker stop container_id`

7. **docker rm**: This command is used to remove one or more stopped containers.

   Example: `docker rm container_id`

8. **docker rmi**: This command is used to remove one or more Docker images.

   Example: `docker rmi image_name`

9. **docker exec**: This command is used to run a command inside a running container.

   Example: `docker exec container_id command`

10. **docker-compose**: This command is used to manage multi-container Docker applications using a YAML file (docker-compose.yml).

    Example: `docker-compose up`

These are just a few examples of commonly used Docker commands. Docker provides a comprehensive set of commands and options for managing containers and images, allowing you to perform various tasks related to containerization and deployment.



# What are commonly used commands of docker-compose

Docker Compose is a tool used to define and run multi-container Docker applications. It allows you to manage multiple containers and their dependencies using a YAML file. Here are some commonly used Docker Compose commands:

1. **docker-compose up**: This command creates and starts containers defined in the docker-compose.yml file.

   Example: `docker-compose up`

2. **docker-compose down**: This command stops and removes containers, networks, and volumes defined in the docker-compose.yml file.

   Example: `docker-compose down`

3. **docker-compose build**: This command builds or rebuilds the images defined in the docker-compose.yml file.

   Example: `docker-compose build`

4. **docker-compose start**: This command starts existing containers defined in the docker-compose.yml file.

   Example: `docker-compose start`

5. **docker-compose stop**: This command stops running containers defined in the docker-compose.yml file, without removing them.

   Example: `docker-compose stop`

6. **docker-compose restart**: This command restarts containers defined in the docker-compose.yml file.

   Example: `docker-compose restart`

7. **docker-compose ps**: This command lists the status of containers defined in the docker-compose.yml file.

   Example: `docker-compose ps`

8. **docker-compose logs**: This command displays the logs of containers defined in the docker-compose.yml file.

   Example: `docker-compose logs`

9. **docker-compose exec**: This command runs a command inside a running container defined in the docker-compose.yml file.

   Example: `docker-compose exec service_name command`

10. **docker-compose pull**: This command pulls the latest images for services defined in the docker-compose.yml file.

    Example: `docker-compose pull`

These are some commonly used commands in Docker Compose. With Docker Compose, you can define complex multi-container applications, specify their dependencies and configurations, and manage them using a single command-line tool.



# What are commonly used commands for Kubernetes

Kubernetes is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Here are some commonly used commands for Kubernetes:

1. **kubectl create**: This command is used to create resources in a Kubernetes cluster. You can create various resources such as deployments, services, pods, etc.

   Example: `kubectl create deployment my-deployment --image=image_name`

2. **kubectl get**: This command is used to retrieve information about resources in a Kubernetes cluster. You can get information about pods, services, deployments, nodes, etc.

   Example: `kubectl get pods`

3. **kubectl describe**: This command provides detailed information about a specific resource.

   Example: `kubectl describe pod my-pod`

4. **kubectl apply**: This command is used to apply configuration changes to resources in a Kubernetes cluster. It is often used to update or modify existing resources.

   Example: `kubectl apply -f my-config.yaml`

5. **kubectl delete**: This command is used to delete resources from a Kubernetes cluster.

   Example: `kubectl delete pod my-pod`

6. **kubectl scale**: This command is used to scale the number of replicas for a deployment or replicaset.

   Example: `kubectl scale deployment my-deployment --replicas=3`

7. **kubectl logs**: This command is used to retrieve the logs of a specific pod.

   Example: `kubectl logs my-pod`

8. **kubectl exec**: This command is used to execute a command inside a running container in a pod.

   Example: `kubectl exec my-pod -- command`

9. **kubectl port-forward**: This command is used to forward network traffic from a local machine to a pod.

   Example: `kubectl port-forward my-pod 8080:80`

10. **kubectl rollout**: This command is used to manage rollouts and updates of deployments.

    Example: `kubectl rollout restart deployment my-deployment`

These are some commonly used commands in Kubernetes. Kubernetes provides a rich set of commands and options to manage and operate containerized applications in a cluster environment.


# What are commonly used commands used in Dockerfile

A Dockerfile is a text file that contains instructions for building a Docker image. Here are some commonly used commands in a Dockerfile:

1. **FROM**: This command specifies the base image for your Docker image. It is typically the first line in a Dockerfile.

   Example: `FROM ubuntu:latest`

2. **RUN**: This command executes a command inside the container during the build process. It is used to install packages, run scripts, or perform any other necessary setup steps.

   Example: `RUN apt-get update && apt-get install -y python3`

3. **COPY**: This command copies files and directories from the build context (the directory containing the Dockerfile) to the image.

   Example: `COPY app.py /app/`

4. **ADD**: This command is similar to COPY, but it can also handle URLs and automatically extract compressed files.

   Example: `ADD https://example.com/file.tar.gz /`

5. **WORKDIR**: This command sets the working directory for subsequent instructions in the Dockerfile.

   Example: `WORKDIR /app`

6. **EXPOSE**: This command specifies the network ports that the container listens on at runtime.

   Example: `EXPOSE 8080`

7. **CMD**: This command specifies the default command to run when a container is started from the image. It can be overridden with command-line arguments.

   Example: `CMD ["python3", "app.py"]`

8. **ENTRYPOINT**: This command specifies the executable that will run when the container starts. It is similar to CMD but cannot be overridden with command-line arguments.

   Example: `ENTRYPOINT ["python3", "app.py"]`

9. **ENV**: This command sets environment variables inside the container.

   Example: `ENV MY_ENV_VAR=my_value`

10. **VOLUME**: This command creates a mount point and marks it as externally mounted. It is used to persist data or share data between containers.

    Example: `VOLUME /data`

These are some commonly used commands in a Dockerfile. Dockerfiles provide a way to define the steps required to build an image, customize the container environment, and specify the behavior of the container at runtime.


## Collated list of commands for Docker, Docker-compose and K8s

Please write commands related to 
1. docker 
2. Docker compose
3. Kubernetes 

Sure! Here are some commonly used commands for Docker, Docker Compose, and Kubernetes:

**Docker:**

1. **docker run:**
   - Description: Run a container from a Docker image.
   - Example: `docker run -d -p 8080:80 nginx`

2. **docker build:**
   - Description: Build a Docker image from a Dockerfile.
   - Example: `docker build -t myapp .`

3. **docker ps:**
   - Description: List running containers.
   - Example: `docker ps`

4. **docker images:**
   - Description: List Docker images.
   - Example: `docker images`

5. **docker pull:**
   - Description: Pull a Docker image from a registry.
   - Example: `docker pull ubuntu`

6. **docker stop:**
   - Description: Stop a running container.
   - Example: `docker stop container_id`

7. **docker rm:**
   - Description: Remove one or more containers.
   - Example: `docker rm container_id`

8. **docker rmi:**
   - Description: Remove one or more images.
   - Example: `docker rmi image_id`

**Docker Compose:**

1. **docker-compose up:**
   - Description: Create and start containers defined in the docker-compose.yml file.
   - Example: `docker-compose up -d`

2. **docker-compose down:**
   - Description: Stop and remove containers created by `docker-compose up`.
   - Example: `docker-compose down`

3. **docker-compose build:**
   - Description: Build or rebuild services defined in the docker-compose.yml file.
   - Example: `docker-compose build`

4. **docker-compose ps:**
   - Description: List containers started by `docker-compose up`.
   - Example: `docker-compose ps`

5. **docker-compose exec:**
   - Description: Run a command in a running container.
   - Example: `docker-compose exec service_name command`

**Kubernetes:**

1. **kubectl apply:**
   - Description: Apply configuration changes to resources.
   - Example: `kubectl apply -f deployment.yaml`

2. **kubectl get:**
   - Description: Display one or many resources.
   - Example: `kubectl get pods`

3. **kubectl describe:**
   - Description: Show details of a specific resource or group of resources.
   - Example: `kubectl describe pod pod_name`

4. **kubectl logs:**
   - Description: Print the logs from a container in a pod.
   - Example: `kubectl logs pod_name`

5. **kubectl exec:**
   - Description: Execute a command in a container.
   - Example: `kubectl exec -it pod_name -- command`

6. **kubectl delete:**
   - Description: Delete resources by filenames, stdin, resources, resources and names, or by resources and label selector.
   - Example: `kubectl delete pod pod_name`

These commands provide a starting point for interacting with Docker, Docker Compose, and Kubernetes. Depending on your specific use case and requirements, you may need to use additional commands or options.

Certainly! Here are a few more commands for Docker, Docker Compose, and Kubernetes:

**Docker:**

9. **docker exec:**
   - Description: Run a command in a running container.
   - Example: `docker exec -it container_id command`

10. **docker network ls:**
    - Description: List Docker networks.
    - Example: `docker network ls`

11. **docker volume ls:**
    - Description: List Docker volumes.
    - Example: `docker volume ls`

12. **docker-compose logs:**
    - Description: View output from containers started by `docker-compose up`.
    - Example: `docker-compose logs`

**Docker Compose:**

6. **docker-compose restart:**
   - Description: Restart services.
   - Example: `docker-compose restart service_name`

7. **docker-compose scale:**
   - Description: Scale services to a specified number of containers.
   - Example: `docker-compose scale service_name=3`

8. **docker-compose exec:**
   - Description: Run a command in a service container.
   - Example: `docker-compose exec service_name command`

**Kubernetes:**

7. **kubectl scale:**
   - Description: Scale a resource.
   - Example: `kubectl scale deployment/deployment_name --replicas=3`

8. **kubectl rollout:**
   - Description: Manage the rollout of a resource.
   - Example: `kubectl rollout status deployment/deployment_name`

9. **kubectl port-forward:**
   - Description: Forward one or more local ports to a pod.
   - Example: `kubectl port-forward pod_name 8080:80`

10. **kubectl create:**
    - Description: Create a resource from a file or stdin.
    - Example: `kubectl create -f deployment.yaml`

11. **kubectl edit:**
    - Description: Edit resources in an external editor.
    - Example: `kubectl edit deployment/deployment_name`

These additional commands provide more flexibility and control over managing containers, services, and resources in Docker, Docker Compose, and Kubernetes environments.