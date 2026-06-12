from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from collections import Counter
from django.contrib.auth.models import User

from .profile_risk import calculate_profile_risk
from .serializers import SearchActivitySerializer
from .detector import detect_tracker
from .privacy_score import calculate_privacy_score
from .alerts import generate_privacy_alert
from .domain_scanner import scan_domain
from .report_generator import generate_report

from .models import (
    SearchActivity,
    Tracker,
    TrackerDetection,
    BlockedTracker,
    Notification
)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def log_search(request):

    data = request.data.copy()

    serializer = SearchActivitySerializer(data=data)

    if serializer.is_valid():

        serializer.save(user=request.user)

        return Response(
            {
                "message": "Search logged successfully"
            },
            status=status.HTTP_201_CREATED
        )

    return Response(
        serializer.errors,
        status=status.HTTP_400_BAD_REQUEST
    )


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def detect_tracking(request):

    url = request.data.get('url')

    tracker_data = detect_tracker(url)

    if tracker_data:

        tracker, created = Tracker.objects.get_or_create(
            tracker_name=tracker_data['name'],
            domain=tracker_data['domain'],
            risk_level=tracker_data['risk']
        )

        TrackerDetection.objects.create(
            user=request.user,
            tracker=tracker,
            source_url=url
        )

        # Create notification only for HIGH risk trackers
        if tracker.risk_level == "High":

            Notification.objects.create(
                user=request.user,
                title="High Risk Tracker Detected",
                message=f"{tracker.tracker_name} was detected."
            )

        return Response({
            "tracker_detected": True,
            "tracker_name": tracker.tracker_name,
            "risk_level": tracker.risk_level
        })

    return Response({
        "tracker_detected": False,
        "message": "No tracker detected"
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def privacy_dashboard(request):

    detections = TrackerDetection.objects.filter(
        user=request.user
    )

    result = calculate_privacy_score(detections)

    alert_data = generate_privacy_alert(result)

    result.update(alert_data)

    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def tracker_analytics(request):

    detections = TrackerDetection.objects.filter(
        user=request.user
    )

    total = detections.count()

    high = 0
    medium = 0
    low = 0

    tracker_names = []

    for detection in detections:

        tracker_names.append(
            detection.tracker.tracker_name
        )

        risk = detection.tracker.risk_level

        if risk == 'High':
            high += 1

        elif risk == 'Medium':
            medium += 1

        elif risk == 'Low':
            low += 1

    most_detected = None

    if tracker_names:

        most_detected = (
            Counter(tracker_names)
            .most_common(1)[0][0]
        )

    return Response({
        "total_trackers_detected": total,
        "high_risk_trackers": high,
        "medium_risk_trackers": medium,
        "low_risk_trackers": low,
        "most_detected_tracker": most_detected
    })


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def suspicious_domain_scan(request):

    domain = request.data.get('domain')

    result = scan_domain(domain)

    return Response(result)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def recent_activity(request):

    detections = (
        TrackerDetection.objects
        .filter(user=request.user)
        .order_by('-detected_at')[:10]
    )

    data = []

    for detection in detections:

        data.append({
            "tracker": detection.tracker.tracker_name,
            "risk": detection.tracker.risk_level,
            "url": detection.source_url,
            "time": detection.detected_at
        })

    return Response(data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def advertising_risk(request):

    searches = SearchActivity.objects.filter(
        user=request.user
    )

    detections = TrackerDetection.objects.filter(
        user=request.user
    )

    result = calculate_profile_risk(
        searches,
        detections
    )

    return Response(result)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vanish_all(request):

    detections = TrackerDetection.objects.filter(
        user=request.user
    )

    blocked_count = 0

    for detection in detections:

        _, created = BlockedTracker.objects.get_or_create(
            user=request.user,
            tracker=detection.tracker
        )

        if created:
            blocked_count += 1

    deleted_count = detections.count()

    detections.delete()

    return Response({
        "message": "Trackers vanished and blocked",
        "blocked_trackers": blocked_count,
        "deleted_detections": deleted_count
    })


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def privacy_report(request):

    searches = SearchActivity.objects.filter(
        user=request.user
    )

    detections = TrackerDetection.objects.filter(
        user=request.user
    )

    report = generate_report(
        request.user,
        searches,
        detections
    )

    return Response(report)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notifications(request):

    notifications = Notification.objects.filter(
        user=request.user
    ).order_by('-created_at')

    data = []

    for n in notifications:

        data.append({
            "title": n.title,
            "message": n.message,
            "read": n.is_read,
            "time": n.created_at
        })

    return Response(data)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def notification_count(request):

    count = Notification.objects.filter(
        user=request.user,
        is_read=False
    ).count()

    return Response({
        "unread_notifications": count
    })
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def mark_notifications_read(request):

    Notification.objects.filter(
        user=request.user,
        is_read=False
    ).update(is_read=True)

    return Response({
        "message": "Notifications marked as read"
    })
@api_view(['POST'])
def extension_tracker_detect(request):

    tracker_name = request.data.get("tracker_name")
    risk_level = request.data.get("risk_level")
    source_url = request.data.get("source_url")

    tracker, _ = Tracker.objects.get_or_create(
        tracker_name=tracker_name,
        domain=tracker_name.lower(),
        risk_level=risk_level
    )

    user = User.objects.first()

    TrackerDetection.objects.create(
        user=user,
        tracker=tracker,
        source_url=source_url
    )
    Notification.objects.create(
    user=user,
    title="Tracker Detected",
    message=f"{tracker_name} ({risk_level} Risk) detected on {source_url}"
)

    return Response({
        "message": "Tracker stored"
    })
@api_view(['GET'])
def blocked_trackers(request):

    trackers = BlockedTracker.objects.all()

    data = []

    for item in trackers:

        data.append({
            "tracker": item.tracker.tracker_name
        })

    return Response(data)
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def live_tracker_feed(request):

    detections = (
        TrackerDetection.objects
        .filter(user=request.user)
        .order_by('-detected_at')[:20]
    )

    data = []

    for detection in detections:

        data.append({
            "tracker": detection.tracker.tracker_name,
            "risk": detection.tracker.risk_level,
            "website": detection.source_url,
            "time": detection.detected_at
        })

    return Response(data)
@api_view(['GET'])
def tracker_list(request):

    trackers = Tracker.objects.all()

    data = []

    for tracker in trackers:

        data.append({
            "domain": tracker.domain,
            "name": tracker.tracker_name,
            "risk": tracker.risk_level
        })

    return Response(data)