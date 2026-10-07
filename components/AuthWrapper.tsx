"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";

const STORAGE_KEY = "pipwiki-auth";
const PASSWORD = "1212312121";

export function AuthWrapper({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);
  const [open, setOpen] = useState(false);
  const [password, setPassword] = useState("");
  const [rejected, setRejected] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();

  useEffect(() => {
    setAuthed(sessionStorage.getItem(STORAGE_KEY) === "1");
    setReady(true);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (password === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      return;
    }
    setRejected(true);
    setPassword("");
    inputRef.current?.focus();
  }

  if (authed) return children;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-paper">
      {ready ? (
        <div className="flex flex-col items-center">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={open ? inputId : undefined}
            onClick={() => {
              setOpen((current) => !current);
              setRejected(false);
              setPassword("");
            }}
            className="cursor-pointer font-serif text-[15px] tracking-wide text-ink-soft"
          >
            unlock
          </button>
          {open ? (
            <form
              onSubmit={unlock}
              className={[
                "mt-5 flex h-11 w-72 max-w-[80vw] items-center rounded-full border bg-paper-raised pr-1 pl-4",
                rejected ? "border-alert" : "border-line",
              ].join(" ")}
            >
              <input
                ref={inputRef}
                id={inputId}
                type="password"
                value={password}
                aria-label="Password"
                aria-invalid={rejected}
                autoComplete="off"
                spellCheck={false}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setRejected(false);
                }}
                className="min-w-0 flex-1 bg-transparent text-sm text-ink outline-none"
              />
              <button
                type="submit"
                aria-label="Unlock"
                className="grid size-8 shrink-0 place-items-center rounded-full text-moss hover:bg-sidebar"
              >
                <Arrow />
              </button>
            </form>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" className="size-4" aria-hidden="true">
      <path
        d="M3 8h10M9.5 4.5 13 8l-3.5 3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
