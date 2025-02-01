"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, Shield, Lock, Eye, Database } from "lucide-react";

const PrivacyPage = () => {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => window.history.back()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Privacy Policy</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Introduction</CardTitle>
        </CardHeader>
        <CardContent className="prose prose-sm">
          <p>Last updated: February 1, 2025</p>
          <p>
            This Privacy Policy describes how Ibadah Tracker (&quot;we&quot;,
            &quot;us&quot;, or &quot;our&quot;) collects, uses, and shares your
            personal information when you use our application.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Database className="h-5 w-5" />
            <CardTitle>Information We Collect</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <h3 className="font-medium">Personal Information</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Email address (for account creation and communication)</li>
            <li>Name (optional, for personalization)</li>
            <li>Device information (for app functionality)</li>
          </ul>

          <h3 className="font-medium">Usage Data</h3>
          <ul className="list-disc pl-6 space-y-2">
            <li>Ibadah tracking data</li>
            <li>App preferences and settings</li>
            <li>Performance and interaction data</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            <CardTitle>How We Use Your Information</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ul className="list-disc pl-6 space-y-2">
            <li>To provide and maintain our Service</li>
            <li>To notify you about changes to our Service</li>
            <li>To provide customer support</li>
            <li>
              To gather analysis or valuable information to improve our Service
            </li>
            <li>To monitor the usage of our Service</li>
            <li>To detect, prevent and address technical issues</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <CardTitle>Data Security</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We implement appropriate security measures to protect your personal
            information:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>End-to-end encryption for data transmission</li>
            <li>Secure data storage with regular backups</li>
            <li>Regular security audits and updates</li>
            <li>Access controls and authentication measures</li>
          </ul>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            <CardTitle>Your Rights</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>You have the right to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Access your personal data and receive information about its
              processing
            </li>
            <li>Request correction of inaccurate personal data</li>
            <li>Request deletion of your personal data</li>
            <li>Object to processing of your personal data</li>
            <li>Request restriction of processing your personal data</li>
            <li>Data portability (receive your data in a structured format)</li>
          </ul>
          <p className="mt-4">
            To exercise any of these rights, please contact us through the
            support section in the app or email us at support@ibadahtracker.com
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Changes to This Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            We may update our Privacy Policy from time to time. We will notify
            you of any changes by:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Posting the new Privacy Policy on this page</li>
            <li>Sending you an email notification</li>
            <li>Displaying a notice in the app</li>
          </ul>
          <p className="mt-4">
            We recommend that you review this Privacy Policy periodically for
            any changes.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            If you have any questions about this Privacy Policy, please contact
            us:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Through the support section in the app</li>
            <li>By email: support@ibadahtracker.com</li>
            <li>By visiting our website: www.ibadahtracker.com/contact</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPage;
