build:
	docker build -t bioinformatics-ua/genericcdss:latest .

dock-run:
	docker-compose up --no-recreate -d
#   docker run -p 8000:8000 -i -t bioinformatics-ua/genericcdss

createDB:
	cd Backend && python manage.py makemigrations && python manage.py migrate

#populateDBForDev:
#	cd Backend && python manage.py cdsu && python manage.py populate_db_protocols && python manage.py populate_db_patients

run:
	cd Backend && python manage.py runserver

createProtocols:
	cd Backend && python manage.py hypoglycemic && python manage.py hypo2dummy
