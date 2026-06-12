def calculate_privacy_score(detections):

    score = 100

    high = 0
    medium = 0
    low = 0

    for detection in detections:

        risk = detection.tracker.risk_level

        if risk == 'High':
            score -= 30
            high += 1

        elif risk == 'Medium':
            score -= 15
            medium += 1

        elif risk == 'Low':
            score -= 5
            low += 1

    if score < 0:
        score = 0

    return {
        "privacy_score": score,
        "high_risk_trackers": high,
        "medium_risk_trackers": medium,
        "low_risk_trackers": low
    }