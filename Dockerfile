FROM node:lts

LABEL author="Jose Luis Chavez"

COPY [".", "/usr/src/"]

WORKDIR /usr/src

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]