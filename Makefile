createDB:
	cd Backend && python manage.py makemigrations && python manage.py migrate

#populateDBForDev:
#	cd Backend && python manage.py cdsu && python manage.py populate_db_protocols && python manage.py populate_db_patients

populateProtocols:
	cd Backend && python manage.py hypoglycemic && python manage.py hypo2dummy

run:
	cd Backend && python manage.py runserver