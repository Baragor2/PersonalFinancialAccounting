#!/bin/bash

python3 manage.py shell < app/utils/create_superuser.py
python3 manage.py runserver 0.0.0.0:8000
