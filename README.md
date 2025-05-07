To start the project, you need to create an .env file in the root, and fill it with variables from .env.example.
And create a local.py file in core/project/settings:
```
from .main import *

DEBUG = True
```