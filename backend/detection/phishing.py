class PhishingDetector:
    def score(self, content: str):
        score = 0
        suspicious_words = ["urgent", "verify", "account", "bank", "password", "suspended", "security"]
        
        content_lower = content.lower()
        
        # Word match logic
        matches = [word for word in suspicious_words if word in content_lower]
        score += len(matches) * 15

        # Typosquatting Logic inside Phishing Score
        # (If 'rn' is followed by 'icrosoft', that's a huge red flag)
        if "rnicrosoft" in content_lower or "g00gle" in content_lower:
            score += 50

        score = min(score, 100)
        label = "Safe"
        if score > 70: label = "Critical"
        elif score > 30: label = "Suspicious"
        
        return {"score": score, "label": label}