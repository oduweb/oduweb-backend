FROM node:9-slim
WORKDIR /index
COPY package.json /index
RUN npm install
COPY . /install
CMD ["npm","start"]
