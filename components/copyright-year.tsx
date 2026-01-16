"use client";

export function CopyrightYear() {
  return (
    <p>
      Copyright &copy; {new Date().getFullYear()}{" "}
    </p>
  );
}