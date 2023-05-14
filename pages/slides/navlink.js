import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import styled, { css } from "styled-components";

const Container = styled.div`
  /* Dark theme */
  --theme-text_0: #e2e2e2;
  --theme-text_invert: #343434;
  --theme-bg_0: #3a383b;
  --theme-bg_1: #2e2a2f;
  --theme-primary: hsl(180deg 100% 45%);
  --theme-primary_smooth: hsl(180deg 100% 19%);

  background: var(--theme-bg_0);
  padding: 10px 10px 40px;
  text-align: left !important;

  ul {
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 160px;
    padding: 24px 20px;
    background: var(--theme-bg_1);
    border-radius: 10px;
    box-shadow: 2px 2px var(--theme-primary_smooth);
    margin: 0;
    height: 145px;

    ${({ $hasStyles }) =>
      $hasStyles &&
      css`
        list-style: none;
      `}

    li {
      color: var(--theme-text_0);
    }
  }

  a {
    color: white;
    ${({ $hasStyles }) => $hasStyles && LinkStyled}
  }

  button {
    font-size: 1.2rem;
    margin-left: 32px; /* don't judge my css skills, okay? */
  }
`;

var LinkStyled = css`
  display: block;
  color: var(--theme-text_0);
  text-decoration: none;
  padding: 4px 12px;
  border-radius: 12px;
  font-weight: 500;

  &:hover {
    color: var(--theme-primary);
  }

  &:focus-visible {
    --theme-bg_0: var(--theme-bg_1);
    outline: 1px solid transparent;
    box-shadow: var(--theme-bg_0) 0 0 0 2px, var(--theme-secondary) 0 0 0 4px;
  }

  &[aria-current] {
    background: var(--theme-primary);
    color: var(--theme-text_invert);
  }
`;

export default function Page() {
  const [hasStyles, setHasStyles] = useState(true);

  return (
    <Container
      style={{
        textAlign: "center",
        transform: "scale(2)",
        transformOrigin: "0 0",
      }}
      $hasStyles={hasStyles}
    >
      <style jsx global>{`
        body {
          overflow: hidden; /* for iframe in slides */
          background: #3a383b; /* dark -> bg_0 */
        }
      `}</style>
      <nav>
        <ul>
          <li>
            <MenuLink href="#home">Home</MenuLink>
          </li>
          <li>
            <MenuLink href="#inbox">Inbox</MenuLink>
          </li>
          <li>
            <MenuLink href="#documents">Documents</MenuLink>
          </li>
        </ul>
        <br />
        <button onClick={() => setHasStyles((b) => !b)}>
          {hasStyles ? "Remove styles" : "Add styles"}
        </button>
      </nav>
    </Container>
  );
}

function MenuLink({ href, children, ...props }) {
  const router = useRouter();
  const hash = router.asPath.split("#")[1] || "home";

  const isCurrent = href === `#${hash}`;

  return (
    <Link href={href} {...props}>
      <a
        {...(isCurrent && {
          "aria-current": "page",
        })}
      >
        {children}
      </a>
    </Link>
  );
}
