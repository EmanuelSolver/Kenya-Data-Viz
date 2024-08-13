from django.core.management.base import BaseCommand
import logging

logger = logging.getLogger('django')

class Command(BaseCommand):
    help = 'Test logging'

    def handle(self, *args, **kwargs):
        logger.debug('This is a debug message')
        logger.error('This is an error message')
