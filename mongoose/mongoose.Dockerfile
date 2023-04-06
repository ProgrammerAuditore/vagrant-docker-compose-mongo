FROM node:14.21.3-slim

RUN mkdir -p /home/max98/workspace/mongoose

WORKDIR /home/max98/workspace/mongoose 

COPY package*.json /home/max98/workspace/mongoose

RUN npm install 

COPY . .

EXPOSE 3055 3055

CMD ["npm", "run", "dev"]