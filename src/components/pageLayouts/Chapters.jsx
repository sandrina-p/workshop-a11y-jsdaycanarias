import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { linkCSS } from "../Button";
import { Stack } from "../Layout";
import { useContextExercise } from "./Briefing";

const Container = styled(Stack)`
  gap: 0;
`;

const PanelStart = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 50%;
  flex-shrink: 0;
  border-right: 1px dashed var(--theme-primary);
  padding-right: 16px;

  @media (min-width: 75em) {
    // 1200px
    width: calc(50% + 20rem); // @TODO responsive
  }
`;

const PanelEnd = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  flex-grow: 1;
  padding-left: 16px;
`;

const PanelContent = styled.div`
  width: 100%;
  max-width: var(--theme-width);

  details {
    cursor: pointer;
    max-width: 45ch;
  }

  ul {
    margin: 0;
  }
`;

export function Chapters({ chapters }) {
  return (
    <Stack direction="column" gap="100px">
      {chapters.map(({ id, ...props }) => {
        return <Chapter key={id} {...props} />;
      })}
    </Stack>
  );
}

function Chapter({ Exercise, Solution, briefing, explanation, resources }) {
  const { variant } = useContextExercise();

  return (
    <Container>
      <PanelStart>
        <PanelContent>
          {variant === "exercise" && <Exercise />}
          {variant === "solution" && <Solution />}
        </PanelContent>
      </PanelStart>
      <PanelEnd>
        <PanelContent>
          <details>
            {variant === "exercise" && (
              <>
                <summary>Briefing</summary>
                <ReactMarkdown>{briefing}</ReactMarkdown>
              </>
            )}
            {variant === "solution" && (
              <>
                <summary>Explanation</summary>
                <ReactMarkdown>{explanation}</ReactMarkdown>
              </>
            )}
            <p>Resources:</p>
            <ul>
              {resources?.map(({ name, url, extra }) => (
                <li key={name}>
                  {extra ? "Extra: " : ""}
                  <a href={url} css={linkCSS} target="_blank" rel="noreferrer">
                    {name}
                  </a>
                </li>
              ))}
            </ul>
          </details>
        </PanelContent>
      </PanelEnd>
    </Container>
  );
}
