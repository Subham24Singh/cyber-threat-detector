import re
from difflib import SequenceMatcher

class LinkScanner:
    def __init__(self):
        # List of popular domains to protect
        self.target_brands = ["microsoft.com", "google.com", "facebook.com", "apple.com", "netflix.com", "amazon.com", "paypal.com"]

    def scan(self, text: str):
        findings = []
        urls = re.findall(r'(https?://[^\s]+|[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})', text)
        
        for url in urls:
            domain = url.split("//")[-1].split("/")[0].lower()
            
            # 1. Check for Typosquatting (Similarity)
            for brand in self.target_brands:
                # If it's NOT the exact brand, but looks 80% like it
                similarity = SequenceMatcher(None, domain, brand).ratio()
                
                if similarity > 0.8 and domain != brand:
                    findings.append(f"Typosquatting Detected: '{domain}' looks like '{brand}'")

            # 2. Check for IP address
            if re.search(r'\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}', url):
                findings.append(f"Suspicious IP: {url}")
                
            # 3. Check for suspicious TLDs
            if url.endswith((".zip", ".mov", ".top", ".xyz")):
                findings.append(f"Suspicious Domain Extension: {url}")

        return findings