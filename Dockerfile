FROM node:0.12@sha256:02e8e9903c8d974e8874d0144413d398a41d62f54bafec4d2cf3ac2a8501dd28
EXPOSE 80
ADD . .
RUN cd programs/server && npm install
CMD node main.js
