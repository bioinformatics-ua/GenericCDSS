#######################################################################
##############              Deploy management            ##############
#######################################################################
build:
	docker build -t bioinformatics-ua/genericcdss:latest .

dock-run:
	docker-compose up --no-recreate -d
#   docker run -p 8000:8000 -i -t bioinformatics-ua/genericcdss

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
	python manage.py populate_db_patients ${patientN}

demo: createDB createSuperUser createProtocols populateInitialConfigs populateDBRandomData

defaultDemo:
	make demo force=--force patientN=--patientNumber=20
#improve

