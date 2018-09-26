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
	cd Backend && python manage.py cdsu ${arg}

createProtocols:
	cd Backend && \
	python manage.py cleanAll && \
	python manage.py hypoglycemic && \
#	python manage.py continuousIntravenousInfusion && \
	python manage.py diabeticInpatients && \
	python manage.py surgicalDiabeticInpatient


populateInitialConfigs:
	cd Backend && \
	python manage.py populate_flatpages ${arg}

populateDBRandomData:
	cd Backend && \
	python manage.py populate_db_patients ${arg}

demo: createDB createSuperUser createProtocols populateInitialConfigs populateDBRandomData

