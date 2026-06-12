from django.urls import path
from . import views
from .views import log_search ,detect_tracking,privacy_dashboard,tracker_analytics,suspicious_domain_scan,recent_activity,advertising_risk,vanish_all,privacy_report,recent_activity,notifications,notification_count,mark_notifications_read,extension_tracker_detect,blocked_trackers

urlpatterns = [
    path('log-search/', log_search),
    path('detect-tracker/', detect_tracking),
    path('privacy-dashboard/', privacy_dashboard),
    path('tracker-analytics/', tracker_analytics),
    path('scan-domain/', suspicious_domain_scan),
    path('recent-activity/', recent_activity),
    path('advertising-risk/',advertising_risk),
    path('vanish-all/', vanish_all),
    path('privacy-report/', privacy_report),
    path('recent-activity/', recent_activity),
    path('notifications/',notifications),
    path('notification-count/',notification_count),
    path('mark-notifications-read/', mark_notifications_read),
    path("extension-detect/",extension_tracker_detect),
    path("blocked-trackers/",blocked_trackers),
    path("live-feed/",views.live_tracker_feed),
    path("tracker-list/",views.tracker_list),
    
]