import Head from "next/head";
import { useRouter } from "next/router";

import { linkCSS } from "../../src/components/Button";
import { PageShell } from "../../src/components/Layout";

export default function Profile() {
  const router = useRouter();
  const category = router.query?.category;
  console.log(router);
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
        <title>Plants</title>
      </Head>

      <main>
        <h1>Plants</h1>

        {category && <h2>{category}</h2>}

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
