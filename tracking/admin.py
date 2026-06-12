from django.contrib import admin
from .models import SearchActivity, Tracker, TrackerDetection,BlockedTracker,Notification

admin.site.register(SearchActivity)
admin.site.register(Tracker)
admin.site.register(TrackerDetection)
admin.site.register(BlockedTracker)
admin.site.register(Notification)