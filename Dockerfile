FROM node

COPY . /opt

WORKDIR /opt

RUN npm install

EXPOSE 5001

CMD npm start
