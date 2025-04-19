"use client";

import { logout } from "../actions/auth";

export default function Home() {
  return (
    <div>
      <button onClick={async () => logout()}>Logout</button>
    </div>
  );
}
