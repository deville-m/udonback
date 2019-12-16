FROM node

COPY . /opt

WORKDIR /opt

RUN apt update &&\
	apt install -y ffmpeg &&\
	curl -L https://yt-dl.org/downloads/latest/youtube-dl -o /usr/local/bin/youtube-dl &&\
	chmod a+rx /usr/local/bin/youtube-dl &&\
	npm install

EXPOSE 5001

CMD npm start
