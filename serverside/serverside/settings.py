from pathlib import Path
from datetime import timedelta
import os
from decouple import config


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-b1ab8sd$ah(m-j0vf%q*ssgt0&x0y8%3v@3)ekr(-vboj)4*q$"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']



# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    "rest_framework",
    "rest_framework_simplejwt",
    "csp",
    "corsheaders",
    "accounts",
    "macroeconomics",
    "financialanalysis",
    "stripepayment",
    "mpesapayment",
]


CSP_DEFAULT_SRC = ("'self'",)
CSP_SCRIPT_SRC = (
    "'self'",
    "'unsafe-eval'",
    "https://js.stripe.com",       # Allow scripts from Stripe
    "https://newassets.hcaptcha.com",  # Allow hCaptcha if needed
    "https://polyfill.io",
    "blob:",                       # Allow blob URLs
)
CSP_STYLE_SRC = (
    "'self'",
    "https://fonts.googleapis.com"
)
CSP_FRAME_SRC = (
    "'self'",
    "https://js.stripe.com",       # Allow if Stripe embeds frames
)
CSP_CONNECT_SRC = (
    "'self'",
    "https://api.stripe.com",      # Allow connections to Stripe's API
)



MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "csp.middleware.CSPMiddleware",

]



CORS_ALLOWED_ORIGINS = [
    'http://localhost:5173',
]

CSRF_TRUSTED_ORIGINS = [
    'http://localhost:5173',
]

CORS_ALLOW_CREDENTIALS = True

# Configure REST Framework
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ),
}

# JWT settings
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=5),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': True,
    'BLACKLIST_AFTER_ROTATION': True,
    'ALGORITHM': 'HS256',
    'SIGNING_KEY': '!@swy123key',
    'AUTH_HEADER_TYPES': ('Bearer',),
}



ROOT_URLCONF = "serverside.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "serverside.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "db.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Directory where collectstatic will gather all static files for production
STATIC_ROOT = os.path.join(BASE_DIR, 'staticfiles')

# Directory for static files during development
STATIC_URL = '/static/'

# Directories to look for static files in addition to STATIC_ROOT
STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]



# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': 'Debugger/django_debug.log',
        },
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file', 'console'],
            'level': 'DEBUG',
            'propagate': True,
        },
        'django.request': {
            'handlers': ['file'],
            'level': 'ERROR',
            'propagate': False,
        },
    },
}



# stripe env variables
STRIPE_TEST_PUBLIC_KEY = config('STRIPE_TEST_PUBLIC_KEY')
STRIPE_SECRET_KEY = config('STRIPE_SECRET_KEY')
DEBUG = config('DEBUG', default=False, cast=bool)

#mpesa env variables
CONSUMER_KEY = config('CONSUMER_KEY')
CONSUMER_SECRET = config('CONSUMER_SECRET')
PASS_KEY = config('PASS_KEY')
BUSINESS_SHORT_CODE = config('BUSINESS_SHORT_CODE')


