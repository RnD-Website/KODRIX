"use client";
import { useState } from "react";
import Container from "./ui/Container";
import Card from "./ui/Card";
import Button from "./ui/Button";
import FileExplorer from "./developer/FileExplorer";
import CodeEditor from "./developer/CodeEditor";
import TaskTimeline from "./developer/TaskTimeline";
import AgentPanel from "./developer/AgentPanel";

export default function CustomerStory() {
  const [file, setFile] = useState(2);
  return (
    <section id="story" className="kx-section relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute right-[-10%] top-0 h-full w-[70%] opacity-70" style={{ background: "radial-gradient(60% 60% at 60% 40%, rgba(239,90,0,.35), transparent 70%)" }} />
      <Container className="relative grid items-center gap-12 md:grid-cols-[430px_1fr] md:gap-8">
        <div data-reveal>
          <p className="eyebrow">Customer story</p>
          <h2 className="kx-h2 mt-5">How NOVA TECH builds and ships software with autonomous AI agents.</h2>
          <p className="mt-6 text-[15px] leading-[1.55] text-fg-2">
            NOVA TECH brings <strong className="font-medium text-fg">AI-assisted development</strong> into its engineering workflow using KODRIX. From <strong className="font-medium text-fg">repetitive coding tasks</strong> to debugging and <strong className="font-medium text-fg">code reviews</strong>, its team can focus more on building meaningful products.
          </p>
          <div className="mt-7 flex items-center gap-4">
            <Card flat className="px-4 py-3">
              <p className="font-pixel text-[28px] leading-none">5 / 5</p>
              <p className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">Workflow steps · illustrative</p>
            </Card>
            <Button variant="light" href="#" event="story_read">Read the story</Button>
          </div>
          <p className="mt-5 max-w-[360px] font-mono text-[9.5px] leading-4 text-fg-3">NOVA TECH is a fictional example company. Figures and visuals are illustrative demonstration data, not customer results.</p>
        </div>

        <div data-clip data-reveal className="relative">
          <div className="relative [perspective:1600px]">
            <div className="overflow-hidden rounded-xl border border-white/15 bg-[#0a0b10] shadow-[0_50px_140px_-40px_rgba(239,90,0,.55)] transition-transform duration-700 ease-out md:[transform:rotateY(-8deg)_rotateX(2deg)] md:hover:[transform:rotateY(-2deg)]">
              <div className="flex h-9 items-center gap-1.5 border-b border-line-2 px-3"><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><i className="h-2 w-2 rounded-full bg-white/20" /><span className="ml-3 font-mono text-[10px] text-fg-3">nova-tech / web-app — KODRIX workspace</span></div>
              <div className="grid min-h-[360px] grid-cols-[150px_1fr] md:min-h-[430px] md:grid-cols-[170px_1fr_190px]">
                <div className="space-y-3 border-r border-line-2 p-2"><FileExplorer active={file} onSelect={setFile} /></div>
                <div className="min-w-0 md:border-r md:border-line-2"><CodeEditor fileIndex={file} /></div>
                <div className="hidden space-y-4 p-3 md:block">
                  <p className="font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">Agents</p>
                  <AgentPanel agents={[{ name: "Code", task: "", state: "done" }, { name: "Debug", task: "", state: "done" }, { name: "Review", task: "reading diff", state: "working" }]} />
                  <p className="pt-2 font-mono text-[9px] uppercase tracking-[0.08em] text-fg-3">Tasks</p>
                  <TaskTimeline tasks={[{ label: "Scaffold", state: "done" }, { label: "Build UI", state: "done" }, { label: "Review", state: "active" }, { label: "Ship", state: "pending" }]} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
