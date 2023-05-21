import ReactMarkdown from "react-markdown";
import styled from "styled-components";

import { linkCSS } from "../Button";
import { Stack } from "../Layout";
import { useContextExercise } from "./LayoutExercise";

const PanelStart = styled.div`
  display: flex;
  justify-content: flex-end;
  padding-right: 16px;
  width: auto;
`;

const PanelEnd = styled.div`
  font-size: 1.4rem;
  padding-left: 16px;
`;

const PanelContent = styled(Stack)`
  align-items: flex-start;
  width: 100%;
  max-width: var(--theme-width);

  details {
    cursor: pointer;
  }

  summary {
    white-space: nowrap;
  }

  ul {
    margin: 0;
  }

  li {
    margin-bottom: 4px;
  }
`;

const Container = styled(Stack)`
  gap: 16px;
  flex-wrap: wrap;

  @media (min-width: 43em) {
    gap: 0;
    justify-content: center;
    flex-wrap: nowrap;

    ${PanelStart} {
      width: calc(100% - 30ch);
      // 75em = 1200px
      /* width: calc(50% + 20rem); */
    }

    ${PanelEnd} {
      width: 30ch;
      /* min-width: 100%;
      max-width: 40ch; */
      border-left: 1px dashed var(--theme-primary);
    }

    ${PanelEnd} ${PanelContent} {
      flex-direction: column;
      max-width: 44ch;
    }
  }

  @media (min-width: 56em) {
    ${PanelStart} {
      width: calc(50% + 20rem);
    }

    ${PanelEnd} {
      width: 50%;
    }
  }
`;

function Chapter({
  Exercise,
  Solution,
  briefing,
  briefing_bonus,
  explanation,
  resources,
}) {
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
            <summary>Briefing</summary>
            <ReactMarkdown>{briefing}</ReactMarkdown>
          </details>

          <details>
            <summary>References</summary>
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

          {briefing_bonus && (
            <details>
              <summary>Bonus A11Y</summary>
              <ReactMarkdown>{briefing_bonus}</ReactMarkdown>
            </details>
          )}

          {variant === "solution" && explanation && (
            <details>
              <summary>🔥 Solution explained</summary>
              <ReactMarkdown>{explanation}</ReactMarkdown>
            </details>
          )}
        </PanelContent>
      </PanelEnd>
    </Container>
  );
}

export function Chapters({ cases, solutions }) {
  const chapters = cases.map((materials, i) => ({
    ...materials,
    ...solutions[i],
  }));

  return (
    <Stack direction="column" gap="100px">
      {chapters.map(({ id, ...props }) => {
        return <Chapter key={id} {...props} />;
      })}
    </Stack>
  );
}
