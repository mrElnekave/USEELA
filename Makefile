.PHONY: all clean check_env kill_node install start_frontend start_backend

all: package-lock.json check_env start_frontend

package-lock.json: install

check_env:
	./check_env.sh

kill_node:
	-killall node

install:
	npm install
	-git update-index --assume-unchanged package-lock.json

start_frontend: start_backend
	-git update-index --assume-unchanged src/frontend/public/index.html
	node ./change_index.js
	./front.sh

start_backend: kill_node
	nodemon ./src/backend/server.js &
	sleep 1

clean:
	rm -f package-lock.json
