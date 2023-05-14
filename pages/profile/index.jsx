import Head from "next/head";
import { useRouter } from "next/router";

import { linkCSS } from "../../components/Button";
import { PageShell } from "../../components/Layout";

export default function Profile() {
  const router = useRouter();

  function handleGoBack() {
    const hasPrevPage = window.history.length > 1;

    if (hasPrevPage) {
      router.back();
    } else {
      router.push("/"); // fallback to homepage
    }
  }

  return (
    <PageShell>
      <Head>
        <title>Profile</title>
      </Head>

      <main>
        <h1>Profile Page</h1>
        <br />
        <br />
        <p>
          This is just a placeholder page. Please,{" "}
          <button onClick={handleGoBack} css={linkCSS}>
            go back
          </button>{" "}
          :)
        </p>
      </main>
    </PageShell>
  );
}
