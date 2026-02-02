FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# Exponemos el puerto de Vite (por defecto 5173)
EXPOSE 5173

# IMPORTANTE: Para que Vite funcione en Docker, hay que pasarle el host 0.0.0.0
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]