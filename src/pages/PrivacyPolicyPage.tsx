import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicyPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container flex items-center h-14 px-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="ml-2 text-lg font-semibold">Privacy Policy</h1>
        </div>
      </header>

      <main className="container px-4 py-6 max-w-3xl mx-auto">
        <div className="prose prose-sm dark:prose-invert">
          <p className="text-muted-foreground text-sm mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
            <p className="text-muted-foreground">
              Welcome to AcuPharm. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy explains how we collect, use, and safeguard your information when you use our application.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
            <p className="text-muted-foreground mb-2">We may collect the following types of information:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Account information (email address, name) when you sign in with Google</li>
              <li>Usage data (quiz scores, study progress, achievements)</li>
              <li>Device information and app preferences</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
            <p className="text-muted-foreground mb-2">We use your information to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Provide and maintain our service</li>
              <li>Track your learning progress and achievements</li>
              <li>Personalize your experience</li>
              <li>Improve our application</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">4. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate security measures to protect your personal information. 
              Your data is stored securely and we use industry-standard encryption for data transmission.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">5. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We use Google Sign-In for authentication. When you sign in with Google, 
              their privacy policy applies to the information they collect. 
              We only receive your basic profile information (name and email).
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">6. Your Rights</h2>
            <p className="text-muted-foreground mb-2">You have the right to:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-1">
              <li>Access your personal data</li>
              <li>Request correction of your data</li>
              <li>Request deletion of your account</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-3">7. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us through the application.
            </p>
          </section>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicyPage;
