run:
	docker run -dp 3000:3000 --rm --name messenger messenger
stop:
	docker stop messenger
