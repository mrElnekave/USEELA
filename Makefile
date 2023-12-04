.PHONY: all clean check_env kill_node install start_frontend start_backend

all: package-lock.json check_env start_frontend

package-lock.json: install

check_env:
	./check_env.sh

kill_node:
	-killall node

install:
	npm install

start_frontend: start_backend
	node ./change_index.js
	./front.sh

start_backend: kill_node
	nodemon ./src/backend/server.js &
	sleep 2

clean:
	rm -f package-lock.json