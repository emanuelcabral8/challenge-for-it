# Instrucciones para visualizar el proyecto (App de tareas Keepify)

Las principales tecnologías usadas fueron Next JS, Material UI, Prisma, PostgreSQL y TypeScript.

**En WSL, ejecutar los siguientes comandos:**

1. Clonar el repositorio:
   ```bash
   git clone git@github.com:emanuelcabral8/challenge-for-it.git

2. Dirigirse a la carpeta creada
    ```bash
    cd challenge-for-it

3. Instalar las dependencias
     ```bash
     pnpm install

4. Con Docker Desktop abierto, ejecutar el siguiente comando
     ```bash
    docker compose up -d     

5. Hacer una migración de prisma
     ```bash
     pnpm prisma migrate dev init

6. Iniciar el servidor de desarrollo
    ```bash
    pnpm dev

Se incluyen imágenes de la app funcionando junto a capturas de Postman para mostrar el estado de la base de datos
    
![](images/1.png)
![](images/2.png)
![](images/3.png)
![](images/4.png)
![](images/5.png)
![](images/6.png)
![](images/7.png)
![](images/8.png)
![](images/9.png)
**Se opta marcarla como completada y aparece en la ruta /completed**
![](images/10.png)
    

