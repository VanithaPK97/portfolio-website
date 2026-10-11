import { Fragment } from "react";
import type { Rich } from "@/content/profile";
import { LogoPill } from "./logo-pill";

// Renders a Rich line: plain strings as text, brand markers as logo pills.
export function RichText({ value }: { value: Rich }) {
  return (
    <>
      {value.map((part, i) => (
        <Fragment key={i}>
          {typeof part === "string" ? part : <LogoPill brand={part.brand} />}
        </Fragment>
      ))}
    </>
  );
}
