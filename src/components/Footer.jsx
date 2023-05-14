import styled from "styled-components";

import { Link } from "./Button";
import { SROnly } from "./Layout";

const FooterWrapper = styled.footer`
  position: relative;
  background: var(--theme-bg_1);
  margin-top: 14rem;
  font-size: 1.4rem;
  line-height: 1.2;

  p {
    margin: 4px 0;
  }
`;

const Feedback = styled(Link)`
  position: absolute;
  top: -46px;
  left: 0;
  background: var(--theme-bg_1);
  padding: 4px 12px;
  border-radius: 8px;
  box-shadow: 0 0 2px 0px var(--theme-primary);
  text-decoration: none;
  transform: box-shadow 250ms;

  &:hover {
    color: var(--theme-primary);
  }

  &::before {
    content: none;
  }
`;

const FooterArea = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  max-width: 100%;
  width: var(--theme-width);
  padding: 3rem 12px;
  margin: auto;

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }
`;

const FooterStart = styled.div`
  position: relative;
  margin-right: 16px;
  text-align: left;
`;

const FooterEnd = styled.div`
  text-align: right;

  a {
    margin: 6px 0;
  }
`;

const FooterCredits = styled.p`
  opacity: 0.8;
  font-size: 1.3rem;
`;

const Echos = styled.span`
  position: absolute;
  bottom: 100%;
  left: calc(50vw + var(--theme-width) / 2 + 16px);
  width: 80px;
  height: 80px;
  background: linear-gradient(
    180deg,
    rgba(255, 63, 51, 0.21) 0%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: -1;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 110px;
    left: -50px;
    top: -45px;
    background: linear-gradient(
      180deg,
      rgba(113, 168, 255, 0.28) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 150px;
    left: -20px;
    top: -100px;
    background: linear-gradient(
      180deg,
      rgba(0, 16, 255, 0.07) 0%,
      rgba(255, 255, 255, 0) 100%
    );
  }
`;

export function Footer() {
  return (
    <FooterWrapper>
      <Echos />
      <FooterArea>
        <FooterStart>
          <Feedback
            href="https://forms.gle/YyRNbUuzGUNjVUss5"
            rel="noreferrer"
            target="_blank"
          >
            Send anonymous feedback
          </Feedback>
          <FooterCredits>
            Last update:{" "}
            <time dateTime="2022-09-27T21:51:00Z">
              28 September 2022 · 21:51 UTC
            </time>
          </FooterCredits>
          <p>
            Made without coffee by{" "}
            <Link
              href="https://sandrina-p.net"
              rel="noreferrer"
              target="_blank"
            >
              Sandrina Pereira
            </Link>
            .
          </p>

          <FooterCredits>© 2022 All Rights Reserved.</FooterCredits>
          <p>
            <Link href="https://github.com/sandrina-p/workshop-a11y-react-alicante">
              Source code
            </Link>
            .
          </p>
        </FooterStart>
        <FooterEnd>
          <address>
            <SROnly id="a11y_sn">Contacts</SROnly>
            <ul aria-labelledby="a11y_sn">
              <li>
                <Link href="http://twitter.com/a_sandrina_p">twitter</Link>
              </li>
              <li>
                <Link href="mailto:a.sandrina.p@gmail.com?subject=Hi%20there!&amp;body=So,%20I%20just%20saw%20your%20workshop%20materials%20and...">
                  e-mail
                </Link>
              </li>
              <li>
                <Link href="http://codepen.io/sandrina-p">codepen</Link>
              </li>
            </ul>
          </address>
        </FooterEnd>
      </FooterArea>
    </FooterWrapper>
  );
}
