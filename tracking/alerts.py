def generate_privacy_alert(score_data):

    score = score_data['privacy_score']
    high = score_data['high_risk_trackers']

    if score <= 30:
        return {
            "alert": "Critical Privacy Risk",
            "message": "Multiple high-risk trackers detected"
        }

    elif score <= 60:
        return {
            "alert": "Medium Privacy Risk",
            "message": "Tracking activity is increasing"
        }

    elif high >= 3:
        return {
            "alert": "High-Risk Trackers Found",
            "message": "Several dangerous trackers detected"
        }

    return {
        "alert": "Safe",
        "message": "Privacy status looks good"
    }