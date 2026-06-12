KNOWN_TRACKERS = [
    {
        "name": "Google Analytics",
        "domain": "google-analytics.com",
        "risk": "Medium"
    },
    {
        "name": "DoubleClick",
        "domain": "doubleclick.net",
        "risk": "High"
    },
    {
        "name": "Facebook Pixel",
        "domain": "facebook.net",
        "risk": "High"
    }
]


def detect_tracker(url):

    for tracker in KNOWN_TRACKERS:

        if tracker['domain'] in url:
            return tracker

    return None