FROM node:lts-stretch

RUN curl -o- -L https://yarnpkg.com/install.sh | bash -s -- --version 1.12.3 && \
  ln -sf $HOME/.yarn/bin/yarn /usr/local/bin/yarn && \
  ln -sf $HOME/.yarn/bin/yarnpkg /usr/local/bin/yarnpkg

WORKDIR /usr/app
COPY . .
RUN yarn