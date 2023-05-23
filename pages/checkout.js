import Link from "next/link";

export default function Checkout() {
  return (
    <div style={{ textAlign: "center", marginTop: "50vh" }}>
      <p>This is the ugly checkout page.</p>
      <br />
      <Link href="exercises/1">Go back to Exercise 1</Link>
    </div>
  );
}
