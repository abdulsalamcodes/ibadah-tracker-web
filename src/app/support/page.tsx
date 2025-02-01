"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ChevronLeft, Mail, MessageSquare } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

const SupportPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // In a real app, you would send this to your backend
    // For now, we'll simulate an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setSubmitted(true);
    setLoading(false);
    setName("");
    setEmail("");
    setMessage("");
  };

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
        <h1 className="text-2xl font-bold">Contact Support</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Direct Support</CardTitle>
          <CardDescription>
            Have a question or need help? Send us a message and we&apos;ll get
            back to you as soon as possible.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-2 p-4 bg-secondary rounded-lg">
            <Mail className="h-5 w-5" />
            <p className="text-sm">
              Support Email: abdulsalamabodunrin369@gmail.com
            </p>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Send Message</CardTitle>
          <CardDescription>
            Fill out the form below to send us a message
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="How can we help?"
                className="min-h-[100px]"
                required
              />
            </div>

            {submitted && (
              <Alert>
                <AlertDescription>
                  Thank you for your message. We&apos;ll get back to you soon.
                </AlertDescription>
              </Alert>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Common Issues</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">App not syncing?</h3>
                <p className="text-sm text-muted-foreground">
                  Check your internet connection and try refreshing the app.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Notifications not working?</h3>
                <p className="text-sm text-muted-foreground">
                  Ensure notifications are enabled in your device settings and
                  the app.
                </p>
              </div>
            </div>

            <div className="flex gap-3">
              <MessageSquare className="h-5 w-5 flex-shrink-0" />
              <div>
                <h3 className="font-medium">Data not saving?</h3>
                <p className="text-sm text-muted-foreground">
                  Try logging out and back in to refresh your session.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupportPage;
