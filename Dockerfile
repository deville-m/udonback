FROM node

COPY . /opt

WORKDIR /opt

RUN apt update &&\
    apt install youtube-dl ffmpeg &&\
    npm install

EXPOSE 5001

CMD npm start
