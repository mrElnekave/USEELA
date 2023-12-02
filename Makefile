.PHONY: all clean

all: package-lock.json

package-lock.json: install start_frontend

kill_node:
	-killall node

install:
	npm install

start_frontend: start_backend
	./front.sh

start_backend: kill_node
	nodemon ./src/backend/server.js &
	sleep 2

clean:
	rm -f package-lock.json
	rm -f 