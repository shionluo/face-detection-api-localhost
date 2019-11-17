FROM node:12.13.0

WORKDIR /usr/src/face-detection-api

COPY ./ ./

RUN npm install

CMD ["/bin/bash"]