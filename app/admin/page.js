"use client";

import * as React from "react";
import { Lock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

/* Internal ops dashboard. Not linked from the public site. */

function Stat({ label, value }) {
  return (
    <Card>
      <CardContent className="p-5 text-center">
        <div className="font-display text-3xl font-semibold text-pine">
          {value ?? "—"}
        </div>
        <div className="mt-1 text-xs font-medium uppercase tracking-wide text-sub">
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

function Table({ title, cols, rows, render }) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="border-b border-border px-5 py-3 font-semibold text-ink">
          {title}
        </div>
        <div className="max-h-80 overflow-auto">
          <table className="w-full text-sm">
            <thead className="sticky top-0 bg-cream text-left text-xs uppercase tracking-wide text-sub">
              <tr>
                {cols.map((c) => (
                  <th key={c} className="px-5 py-2 font-medium">{c}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.length === 0 && (
                <tr>
                  <td colSpan={cols.length} className="px-5 py-6 text-center text-sub">
                    Nothing yet
                  </td>
                </tr>
              )}
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-border/60">
                  {render(r).map((cell, j) => (
                    <td key={j} className="px-5 py-2.5 text-ink">{cell}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

const fmt = (d) => (d ? new Date(d).toLocaleDateString() : "");

export default function AdminPage() {
  const [password, setPassword] = React.useState("");
  const [data, setData] = React.useState(null);
  const [error, setError] = React.useState("");
  const [loading, setLoading] = React.useState(false);

  async function load(e) {
    e?.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Failed to load.");
      setData(json);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (!data) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-cream px-6">
        <Card className="w-full max-w-sm">
          <CardContent className="p-8">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-pine-tint">
              <Lock className="h-5 w-5 text-pine" />
            </div>
            <h1 className="font-display text-2xl font-semibold text-ink">
              Village Ops
            </h1>
            <form onSubmit={load} className="mt-5 space-y-3">
              <Input
                type="password"
                placeholder="Dashboard password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm font-medium text-danger">{error}</p>}
              <Button type="submit" variant="coral" className="w-full" disabled={loading}>
                {loading ? "Loading…" : "Open dashboard"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    );
  }

  const t = data.totals;

  return (
    <main className="min-h-screen bg-cream pb-16">
      <header className="border-b border-border bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="font-display text-xl font-semibold text-ink">
            Village Ops
          </span>
          <Button variant="outline" size="sm" onClick={() => load()} disabled={loading}>
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </Button>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-6 px-6 pt-8">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
          <Stat label="Waitlist" value={t.waitlist} />
          <Stat label="Sitter apps" value={t.sitters} />
          <Stat label="Founding Moms" value={t.ambassadors} />
          <Stat label="App users" value={t.appUsers} />
          <Stat label="Meetups" value={t.meetups} />
          <Stat label="Connections" value={t.connections} />
          <Stat label="Messages" value={t.messages} />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Table
            title="Signups by source"
            cols={["Source", "Signups"]}
            rows={data.bySource}
            render={(r) => [r.source, r.signups]}
          />
          <Table
            title="Signups by ZIP (launch map)"
            cols={["ZIP", "Signups"]}
            rows={data.byZip}
            render={(r) => [r.zip, r.signups]}
          />
        </div>

        <Table
          title="Recent waitlist signups"
          cols={["Contact", "ZIP", "Source", "Date"]}
          rows={data.recent.waitlist}
          render={(r) => [r.contact, r.zip || "—", r.source || "(direct)", fmt(r.created_at)]}
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <Table
            title="Sitter applications"
            cols={["Name", "Email", "ZIP", "Rate", "Date"]}
            rows={data.recent.sitters}
            render={(r) => [r.full_name, r.email, r.zip || "—", r.hourly_rate || "—", fmt(r.created_at)]}
          />
          <Table
            title="Founding Mom applications"
            cols={["Name", "Email", "Neighborhood", "Date"]}
            rows={data.recent.ambassadors}
            render={(r) => [r.full_name, r.email, r.neighborhood || "—", fmt(r.created_at)]}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Table
            title="App users (profiles)"
            cols={["Name", "Type", "Neighborhood", "Joined"]}
            rows={data.recent.profiles}
            render={(r) => [r.display_name, r.parent_type, r.neighborhood || "—", fmt(r.onboarded_at)]}
          />
          <Table
            title="Recent meetups"
            cols={["Title", "When", "Where"]}
            rows={data.recent.meetups}
            render={(r) => [r.title, r.when_text, r.place_name]}
          />
        </div>
      </div>
    </main>
  );
}
