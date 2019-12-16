FROM node

COPY . /opt

WORKDIR /opt

RUN apt install youtube-dl && npm install

EXPOSE 5001

CMD npm start
