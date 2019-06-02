FROM node:10.15.3

EXPOSE 8088

ENTRYPOINT [ "/bin/sh", "-c", "npm", "start" ]

