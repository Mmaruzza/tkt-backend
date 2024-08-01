# Usamos la imagen oficial de Node.js 22-alpine como base
FROM node:22-alpine

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /usr/src/app

# Copiamos el package.json y el package-lock.json
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código de la aplicación
COPY . .

# Exponemos el puerto 3001
EXPOSE 3001

# Definimos el comando por defecto para ejecutar la aplicación
CMD ["node", "index.js"]
