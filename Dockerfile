FROM oven/bun:1 AS base

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de tu proyecto
COPY . .

# Instala las dependencias del proyecto
RUN bun install

# Expone el puerto en el que tu servidor escucha
EXPOSE 3000

# Comando para iniciar el servidor
CMD ["bun", "run", "start"]