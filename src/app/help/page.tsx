"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const HelpPage = () => {
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
        <h1 className="text-2xl font-bold">Help & FAQ</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Start Guide</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Ibadah Tracker helps you maintain consistency in your daily worship.
            Here&apos;s how to get started:
          </p>
          <div className="space-y-2">
            <div className="flex gap-2">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                1
              </div>
              <p>Add your daily ibadah tasks using the Add Custom button</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                2
              </div>
              <p>Track your progress by marking tasks as complete</p>
            </div>
            <div className="flex gap-2">
              <div className="bg-primary text-primary-foreground w-6 h-6 rounded-full flex items-center justify-center text-sm font-medium">
                3
              </div>
              <p>View your progress and streaks in the Progress tab</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How do I add a custom ibadah?</AccordionTrigger>
              <AccordionContent>
                Click the &quot;Add Custom&quot; button on the main dashboard.
                Enter a name, description, and preferred time for your ibadah.
                The new ibadah will appear in your daily tracking list.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>How are streaks calculated?</AccordionTrigger>
              <AccordionContent>
                A streak is counted when you complete all your tracked ibadah
                for consecutive days. Missing a day will reset your streak to
                zero.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>Can I use the app offline?</AccordionTrigger>
              <AccordionContent>
                Yes! The app works offline and will sync your data when
                you&apos;re back online. You can track your ibadah without an
                internet connection.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>How do I export my data?</AccordionTrigger>
              <AccordionContent>
                Go to Settings, scroll to the Data Management section, and click
                &quot;Export Data&quot;. Your data will be downloaded as a JSON
                file.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>How do I delete my account?</AccordionTrigger>
              <AccordionContent>
                Go to Settings, scroll to the Data Management section, and click
                &quot;Delete Account&quot;. This action is permanent and cannot
                be undone.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
};

export default HelpPage;
