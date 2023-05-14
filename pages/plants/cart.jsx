import Head from "next/head";
import { useRouter } from "next/router";

import { linkCSS } from "../../components/Button";
import { PageShell } from "../../components/Layout";

export default function Profile() {
  const router = useRouter();
  function handleGoBack() {
    const hasPrevPage = window.history.length > 1;
    /*
    🐛 React Router and Next do not support go back using <Link />
      https://stackoverflow.com/questions/72676015/react-router-go-back-using-link
    */

    if (hasPrevPage) {
      router.back();
    } else {
      router.push("/"); // fallback to homepage
    }
  }

  return (
    <PageShell>
      <Head>
        <title>Plants Cart</title>
      </Head>

      <main>
        <h1>Plants Cart</h1>

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
