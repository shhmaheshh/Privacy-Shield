from .privacy_score import calculate_privacy_score
from .profile_risk import calculate_profile_risk


def generate_report(user, searches, detections):

    privacy = calculate_privacy_score(detections)

    profile = calculate_profile_risk(
        searches,
        detections
    )

    return {
        "user": user.username,
        "privacy_score": privacy["privacy_score"],
        "high_risk_trackers": privacy["high_risk_trackers"],
        "medium_risk_trackers": privacy["medium_risk_trackers"],
        "low_risk_trackers": privacy["low_risk_trackers"],
        "advertising_profile_risk":
            profile["advertising_profile_risk"],
        "recommendation":
            "Enable Vanish mode and avoid high-risk domains."
    }