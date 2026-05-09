"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export type CodeSnippet = {
  id: string;
  label: string;
  language: string;
  code: string;
};

export function CodeSnippets({ snippets }: { snippets: CodeSnippet[] }) {
  return (
    <Tabs defaultValue={snippets[0]?.id} className="w-full">
      <TabsList>
        {snippets.map((s) => (
          <TabsTrigger key={s.id} value={s.id}>
            {s.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {snippets.map((s) => (
        <TabsContent key={s.id} value={s.id} className="mt-4">
          <CopyableCode code={s.code} language={s.language} />
        </TabsContent>
      ))}
    </Tabs>
  );
}

function CopyableCode({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = React.useState(false);

  const onCopy = React.useCallback(async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // ignore — older browsers without clipboard API
    }
  }, [code]);

  return (
    <div className="relative rounded-md border border-border bg-muted/40">
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-border">
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono">
          {language}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={onCopy}
          className="h-7 px-2 text-xs"
          aria-label="Copy code"
        >
          {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
          <span className="ml-1.5">{copied ? "Copied" : "Copy"}</span>
        </Button>
      </div>
      <pre className="overflow-x-auto p-3 text-xs leading-relaxed">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
