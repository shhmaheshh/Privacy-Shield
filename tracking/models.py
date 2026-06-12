from django.db import models
from django.contrib.auth.models import User


class SearchActivity(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_query = models.CharField(max_length=255)
    browser = models.CharField(max_length=100)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.search_query
class Tracker(models.Model):
    tracker_name = models.CharField(max_length=100)
    domain = models.CharField(max_length=255)
    risk_level = models.CharField(max_length=50)

    def __str__(self):
        return self.tracker_name
class TrackerDetection(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    detected_at = models.DateTimeField(auto_now_add=True)
    source_url = models.CharField(max_length=255)

    def __str__(self):
        return self.source_url
class BlockedTracker(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tracker = models.ForeignKey(Tracker, on_delete=models.CASCADE)
    blocked_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('user', 'tracker')

    def __str__(self):
        return f"{self.user.username} - {self.tracker.tracker_name}"
class Notification(models.Model):

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    title = models.CharField(max_length=200)

    message = models.TextField()

    is_read = models.BooleanField(
        default=False
    )

    created_at = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title