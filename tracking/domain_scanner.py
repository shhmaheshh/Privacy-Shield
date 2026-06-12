
from .models import Tracker
SUSPICIOUS_KEYWORDS = [ "track", "ads", "analytics", "click", "promo", "gift", "free", "login" ]

def scan_domain(domain):

    risk_score = 0

    reasons = []

    domain = domain.lower()

    trackers = Tracker.objects.all()

    for tracker in trackers:

        if tracker.domain.lower() in domain:

            reasons.append(
                f"Known tracker found: {tracker.tracker_name}"
            )

            if tracker.risk_level == "High":
                risk_score += 50

            elif tracker.risk_level == "Medium":
                risk_score += 30

            else:
                risk_score += 10

    for keyword in SUSPICIOUS_KEYWORDS:

        if keyword in domain:

            risk_score += 10

            reasons.append(
                f"Contains suspicious keyword: {keyword}"
            )

    suspicious = risk_score >= 30

    return {
        "suspicious": suspicious,
        "risk_score": risk_score,
        "reasons": reasons
    }