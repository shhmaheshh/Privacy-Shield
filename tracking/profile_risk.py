def calculate_profile_risk(searches, detections):

    score = 0
    reasons = []

    search_count = searches.count()
    tracker_count = detections.count()

    score += min(search_count * 2, 30)

    if search_count > 5:
        reasons.append("High search activity")

    high_risk_count = 0

    for detection in detections:

        if detection.tracker.risk_level == "High":
            high_risk_count += 1

    score += high_risk_count * 10

    if high_risk_count:
        reasons.append(
            f"{high_risk_count} high-risk trackers detected"
        )

    score += min(tracker_count * 3, 40)

    if tracker_count > 3:
        reasons.append(
            "Multiple tracker networks observed"
        )

    score = min(score, 100)

    return {
        "advertising_profile_risk": score,
        "reasons": reasons
    }