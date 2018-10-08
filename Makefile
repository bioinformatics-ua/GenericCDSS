#######################################################################
##############              Deploy management            ##############
#######################################################################
docker-build:
	docker build -t bioinformatics-ua/genericcdss:latest .

docker-run:
	docker-compose up --no-recreate -d

docker-delete:
	docker rm -f genericcdss_db_1 genericcdss_web_1 genericcdss_nginx_1

run:
	cd Backend && python manage.py runserver

#######################################################################
##############               Data management             ##############
#######################################################################
createDB:
	cd Backend && python manage.py makemigrations && python manage.py migrate

createSuperUser:
	cd Backend && python manage.py cdsu ${force}

createProtocols:
	cd Backend && \
	python manage.py cleanAllProtocols && \
	python manage.py hypoglycemic && \
	python manage.py protocolTest && \
#	python manage.py continuousIntravenousInfusion && \
	python manage.py diabeticInpatients && \
	python manage.py surgicalDiabeticInpatient


populateInitialConfigs:
	cd Backend && \
	python manage.py populate_flatpages ${force}

populateDBRandomData:
	cd Backend && \
	python manage.py populate_db_patients ${patientN} ${force}

demo: createDB createSuperUser createProtocols populateInitialConfigs populateDBRandomData

defaultDemo:
	make demo force=--force patientN=--patientNumber=20

setUpSystem: createDB createSuperUser populateInitialConfigs


